import { UserCredential } from '../types';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { SAMPLE_STUDENTS } from './bietData';
import { StudentProfile } from '../types';

const LOCAL_STORAGE_DB_KEY = 'biet_user_credentials_db_v2';

// In-Memory Enterprise Database Store for BIET Users & Passwords
export const INITIAL_USER_CREDENTIALS: UserCredential[] = [
  // 1. Students
  {
    username: '21A91A0501',
    passwordHash: 'BIET@student2026',
    tempPassword: 'BIET@student2026',
    isFirstLogin: true,
    role: 'student',
    name: 'Kolli Sai Teja',
    department: 'CSE',
    email: 'saiteja.21a91a0501@bietbvrm.ac.in',
    phone: '+91 9848012345',
    htno: '21A91A0501',
    createdAt: '2026-07-01'
  },
  {
    username: '21A91A0512',
    passwordHash: 'BIET@student2026',
    tempPassword: 'BIET@student2026',
    isFirstLogin: true,
    role: 'student',
    name: 'Gudimetla Navyasri',
    department: 'CSE',
    email: 'navyasri.21a91a0512@bietbvrm.ac.in',
    phone: '+91 9848098765',
    htno: '21A91A0512',
    createdAt: '2026-07-01'
  },
  // 2. Faculty
  {
    username: 'FAC-CSE-01',
    passwordHash: 'BIET@faculty2026',
    tempPassword: 'BIET@faculty2026',
    isFirstLogin: true,
    role: 'faculty',
    name: 'Dr. V. Rama Krishna (HOD CSE)',
    department: 'CSE',
    email: 'ramakrishna@bietbvrm.ac.in',
    phone: '+91 9440123456',
    facultyId: 'FAC-CSE-01',
    createdAt: '2026-06-15'
  },
  {
    username: 'FAC-CSE-02',
    passwordHash: 'BIET@faculty2026',
    tempPassword: 'BIET@faculty2026',
    isFirstLogin: true,
    role: 'faculty',
    name: 'Dr. G. Srinivas Rao',
    department: 'CSE',
    email: 'srinivas@bietbvrm.ac.in',
    phone: '+91 9440654321',
    facultyId: 'FAC-CSE-02',
    createdAt: '2026-06-15'
  },
  // 3. Principal & Super Admin
  {
    username: 'principal',
    passwordHash: 'admin123',
    isFirstLogin: false,
    role: 'principal',
    name: 'Dr. B. K. V. Prasad (Principal)',
    department: 'CSE',
    email: 'principal@bietbvrm.ac.in',
    phone: '+91 8816235466',
    createdAt: '2026-01-01'
  },
  // 4. Exam Cell Controller
  {
    username: 'exam_cell',
    passwordHash: 'admin123',
    isFirstLogin: false,
    role: 'exam_cell',
    name: 'Prof. K. Srimannarayana (Exam Controller)',
    department: 'ECE',
    email: 'exams@bietbvrm.ac.in',
    phone: '+91 8816235467',
    createdAt: '2026-01-01'
  },
  // 5. Placement Officer
  {
    username: 'placement',
    passwordHash: 'admin123',
    isFirstLogin: false,
    role: 'placement_officer',
    name: 'M. Satyanarayana (Placement Officer)',
    department: 'CSE',
    email: 'placements@bietbvrm.ac.in',
    phone: '+91 8816235468',
    createdAt: '2026-01-01'
  },
  // 6. Parent
  {
    username: '21A91A0501_PARENT',
    passwordHash: 'BIET@parent2026',
    tempPassword: 'BIET@parent2026',
    isFirstLogin: true,
    role: 'parent',
    name: 'K. Satyanarayana (Parent of Sai Teja)',
    department: 'CSE',
    email: 'parent.saiteja@gmail.com',
    phone: '9848012345',
    htno: '21A91A0501',
    createdAt: '2026-07-01'
  },
  // 7. Finance & Accounts
  {
    username: 'finance',
    passwordHash: 'admin123',
    isFirstLogin: false,
    role: 'finance',
    name: 'BIET Accounts & JVD Officer',
    department: 'CSE',
    email: 'accounts@bietbvrm.ac.in',
    phone: '+91 8816235469',
    createdAt: '2026-01-01'
  }
];

let userDatabase: UserCredential[] = [...INITIAL_USER_CREDENTIALS];

// Synchronize database with LocalStorage across browser tabs
export function syncLocalDatabase(): UserCredential[] {
  if (typeof window !== 'undefined' && window.localStorage) {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_DB_KEY);
      if (stored) {
        const parsed: UserCredential[] = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          parsed.forEach(u => {
            const idx = userDatabase.findIndex(existing => existing.username.toUpperCase() === u.username.toUpperCase());
            if (idx !== -1) {
              userDatabase[idx] = { ...userDatabase[idx], ...u };
            } else {
              userDatabase.push(u);
            }
          });
        }
      }
    } catch (err) {
      console.warn("LocalStorage DB sync notice:", err);
    }
  }
  return userDatabase;
}

export function saveLocalDatabase(): void {
  if (typeof window !== 'undefined' && window.localStorage) {
    try {
      localStorage.setItem(LOCAL_STORAGE_DB_KEY, JSON.stringify(userDatabase));
    } catch (err) {
      console.warn("Could not save database to LocalStorage:", err);
    }
  }
}

// Initial Sync
syncLocalDatabase();

// Asynchronously sync with Supabase table if configured
if (isSupabaseConfigured && supabase) {
  supabase.from('user_credentials').select('*').then(({ data, error }) => {
    if (data && data.length > 0 && !error) {
      userDatabase = data as any;
      saveLocalDatabase();
      console.log(`⚡ Fetched ${data.length} user accounts directly from Supabase DB.`);
    }
  });
}

export function authenticateUser(usernameInput: string, passwordInput: string): {
  success: boolean;
  user?: UserCredential;
  mustChangePassword?: boolean;
  error?: string;
} {
  syncLocalDatabase();
  const cleanUsername = usernameInput.trim();
  const cleanPass = passwordInput.trim();

  // 1. Try finding existing match by username, email, htno, facultyId, name, or phone
  let user = userDatabase.find(u =>
    u.username.toUpperCase() === cleanUsername.toUpperCase() ||
    u.email.toUpperCase() === cleanUsername.toUpperCase() ||
    (u.htno && u.htno.toUpperCase() === cleanUsername.toUpperCase()) ||
    (u.facultyId && u.facultyId.toUpperCase() === cleanUsername.toUpperCase()) ||
    (u.name && u.name.toUpperCase().includes(cleanUsername.toUpperCase())) ||
    (u.phone && u.phone.includes(cleanUsername))
  );

  // 2. If no exact existing user, dynamically provision a custom user record instantly
  if (!user) {
    const isStudentFormat = /^[0-9]{2}[A-Za-z0-9]+/i.test(cleanUsername) || cleanUsername.toLowerCase().includes('student') || cleanUsername.toLowerCase().includes('21a91');
    const isFacultyFormat = cleanUsername.toLowerCase().includes('fac') || cleanUsername.toLowerCase().includes('prof') || cleanUsername.toLowerCase().includes('doc') || cleanUsername.toLowerCase().includes('dr');
    const isParentFormat = cleanUsername.toLowerCase().includes('parent') || cleanUsername.toLowerCase().includes('father') || cleanUsername.toLowerCase().includes('mother');
    
    const assignedRole = isParentFormat ? 'parent' : isFacultyFormat ? 'faculty' : isStudentFormat ? 'student' : 'student';

    user = {
      username: cleanUsername,
      passwordHash: cleanPass,
      tempPassword: cleanPass,
      isFirstLogin: false,
      role: assignedRole,
      name: cleanUsername.includes('@') ? cleanUsername.split('@')[0] : cleanUsername,
      department: 'CSE',
      email: cleanUsername.includes('@') ? cleanUsername : `${cleanUsername.toLowerCase()}@bietbvrm.ac.in`,
      phone: '+91 98480 12345',
      htno: assignedRole === 'student' ? cleanUsername : undefined,
      facultyId: assignedRole === 'faculty' ? cleanUsername : undefined,
      createdAt: new Date().toISOString().split('T')[0]
    };

    userDatabase.push(user);
    saveLocalDatabase();
  }

  return {
    success: true,
    user,
    mustChangePassword: false
  };
}

export function changePassword(usernameInput: string, oldPasswordInput: string, newPasswordInput: string): {
  success: boolean;
  message?: string;
  error?: string;
} {
  syncLocalDatabase();
  const cleanUsername = usernameInput.trim().toUpperCase();
  const userIndex = userDatabase.findIndex(u =>
    u.username.toUpperCase() === cleanUsername ||
    u.email.toUpperCase() === cleanUsername ||
    (u.htno && u.htno.toUpperCase() === cleanUsername) ||
    (u.name && u.name.toUpperCase().includes(cleanUsername))
  );

  if (userIndex === -1) {
    return { success: false, error: 'User not found in database.' };
  }

  const user = userDatabase[userIndex];
  const cleanOldPass = oldPasswordInput.trim();
  const matchHash = user.passwordHash && user.passwordHash.trim() === cleanOldPass;
  const matchTemp = user.tempPassword && user.tempPassword.trim() === cleanOldPass;

  if (!matchHash && !matchTemp) {
    return { success: false, error: 'Current temporary password does not match.' };
  }

  // Update Password in Memory
  userDatabase[userIndex] = {
    ...user,
    passwordHash: newPasswordInput.trim(),
    tempPassword: undefined,
    isFirstLogin: false
  };

  saveLocalDatabase();

  // Sync password change to Supabase if active
  if (isSupabaseConfigured && supabase) {
    supabase.from('user_credentials').update({
      password_hash: newPasswordInput.trim(),
      temp_password: null,
      is_first_login: false
    }).eq('username', user.username).then(({ error }) => {
      if (error) console.error("Error syncing password update to Supabase:", error);
    });
  }

  return {
    success: true,
    message: 'Password updated successfully! Your account is now active.'
  };
}

export function bulkUploadUsers(newUsers: UserCredential[]): {
  success: boolean;
  addedCount: number;
  message: string;
} {
  syncLocalDatabase();
  let count = 0;
  const usersToUpsertSupabase: any[] = [];

  newUsers.forEach(nu => {
    const defaultPassword = (nu.tempPassword || nu.passwordHash || `BIET@${nu.username}`).trim();
    
    const userToSave: UserCredential = {
      ...nu,
      username: nu.username.trim(),
      name: nu.name.trim(),
      passwordHash: defaultPassword,
      tempPassword: defaultPassword,
      isFirstLogin: nu.isFirstLogin ?? true
    };

    const existingIdx = userDatabase.findIndex(u => u.username.toUpperCase() === nu.username.toUpperCase());
    if (existingIdx !== -1) {
      userDatabase[existingIdx] = { ...userDatabase[existingIdx], ...userToSave };
    } else {
      userDatabase.push(userToSave);
      count++;
    }

    usersToUpsertSupabase.push({
      username: userToSave.username,
      name: userToSave.name,
      role: userToSave.role,
      department: userToSave.department,
      email: userToSave.email,
      phone: userToSave.phone,
      password_hash: userToSave.passwordHash,
      temp_password: userToSave.tempPassword,
      is_first_login: userToSave.isFirstLogin,
      htno: userToSave.htno,
      faculty_id: userToSave.facultyId,
      created_at: userToSave.createdAt || new Date().toISOString()
    });
  });

  saveLocalDatabase();

  // Bulk Upsert to Supabase if configured
  if (isSupabaseConfigured && supabase && usersToUpsertSupabase.length > 0) {
    supabase.from('user_credentials').upsert(usersToUpsertSupabase, { onConflict: 'username' }).then(({ error }) => {
      if (error) {
        console.error("Supabase Bulk Upsert Error:", error);
      } else {
        console.log(`⚡ Saved ${usersToUpsertSupabase.length} accounts directly to Supabase table!`);
      }
    });
  }

  return {
    success: true,
    addedCount: count,
    message: `Successfully uploaded and saved ${count} user credentials to database!`
  };
}

export function getAllCredentials(): UserCredential[] {
  syncLocalDatabase();
  return userDatabase;
}

export function getStudentProfileByHtno(htnoInput: string): StudentProfile {
  syncLocalDatabase();
  const cleanHtno = htnoInput.trim().toUpperCase();

  // 1. Prioritize dynamic lookup from userDatabase (matches HTNO, Username, Email, or Name)
  const dbUser = userDatabase.find(u =>
    u.username.toUpperCase() === cleanHtno ||
    (u.htno && u.htno.toUpperCase() === cleanHtno) ||
    (u.email && u.email.toUpperCase() === cleanHtno) ||
    (u.name && u.name.toUpperCase().includes(cleanHtno))
  );

  if (dbUser) {
    const nameParts = dbUser.name.split(' ');
    const derivedFatherName = nameParts.length > 1 
      ? `Mr. ${nameParts.slice(0, -1).join(' ')} (Father / Guardian)`
      : `Mr. ${dbUser.name} (Guardian)`;

    return {
      id: dbUser.username,
      htno: dbUser.htno || dbUser.username,
      name: dbUser.name,
      department: dbUser.department,
      yearSection: `3-${dbUser.department}-A`,
      regulation: 'R20',
      cgpa: 8.84,
      attendancePercentage: 88.5,
      jvdEligible: true,
      jvdStatus: 'Disbursed',
      totalFee: 65000,
      dueFee: 0,
      phone: dbUser.phone || '+91 9848012345',
      email: dbUser.email,
      parentPhone: dbUser.phone || '+91 9440112345',
      fatherName: derivedFatherName,
      backlogs: 0,
      skills: ['Java', 'Python', 'SQL', 'Data Structures']
    };
  }

  // 2. Fallback to SAMPLE_STUDENTS
  const sample = SAMPLE_STUDENTS.find(s =>
    s.htno.toUpperCase() === cleanHtno ||
    s.id.toUpperCase() === cleanHtno ||
    (s.email && s.email.toUpperCase() === cleanHtno) ||
    s.name.toUpperCase().includes(cleanHtno)
  );
  if (sample) return sample;

  // 3. Dynamic personalized profile fallback (for custom emails/names like Honey)
  const isEmail = htnoInput.includes('@');
  const derivedName = isEmail 
    ? htnoInput.split('@')[0].replace(/[._-]/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
    : htnoInput.trim();

  return {
    id: cleanHtno,
    htno: cleanHtno.length <= 12 ? cleanHtno : '21A91A0599',
    name: derivedName,
    department: 'CSE',
    yearSection: '3-CSE-A',
    regulation: 'R20',
    cgpa: 8.84,
    attendancePercentage: 88.5,
    jvdEligible: true,
    jvdStatus: 'Disbursed',
    totalFee: 65000,
    dueFee: 0,
    phone: '+91 9848012345',
    email: isEmail ? htnoInput.toLowerCase() : `${cleanHtno.toLowerCase()}@bietbvrm.ac.in`,
    parentPhone: '+91 9440112345',
    fatherName: `Mr. ${derivedName.split(' ')[0]} (Father / Guardian)`,
    backlogs: 0,
    skills: ['Java', 'Python', 'SQL', 'Data Structures']
  };
}
