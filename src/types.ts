export type DepartmentCode = 'CSE' | 'AIDS' | 'ECE' | 'EEE' | 'ME' | 'CE' | 'MBA';

export interface Department {
  code: DepartmentCode;
  name: string;
  hod: string;
  studentCount: number;
  facultyCount: number;
  nbaAccredited: boolean;
}

export type UserRole = 'principal' | 'student' | 'faculty' | 'hod' | 'exam_cell' | 'placement_officer' | 'parent' | 'finance' | 'attendance' | 'daily_attendance' | 'interaction' | 'complaints' | 'lms' | 'cortex_ai';

export interface StudentProfile {
  id: string;
  htno: string; // JNTUK Hall Ticket Number e.g. 21A91A0501
  name: string;
  department: DepartmentCode;
  yearSection: string; // e.g. "3-CSE-A"
  regulation: 'R20' | 'R23' | 'BR24';
  cgpa: number;
  attendancePercentage: number;
  jvdEligible: boolean;
  jvdStatus: 'Disbursed' | 'Pending Verification' | 'Awaiting Govt Clearance';
  totalFee: number;
  dueFee: number;
  phone: string;
  email: string;
  parentPhone: string;
  fatherName?: string;
  backlogs: number;
  skills: string[];
}

export interface FacultyProfile {
  id: string;
  facultyId: string;
  name: string;
  designation: 'Assistant Professor' | 'Associate Professor' | 'Professor' | 'HOD';
  department: DepartmentCode;
  email: string;
  phone: string;
  assignedCourses: string[]; // Course Codes
  researchPapersCount: number;
}

export interface Course {
  code: string; // e.g. R232101
  name: string;
  department: DepartmentCode;
  credits: number;
  semester: number;
  regulation: 'R20' | 'R23';
  facultyName: string;
  enrolledStudents: number;
  syllabusUnits: string[];
}

export interface AttendanceRecord {
  id: string;
  htno: string;
  studentName: string;
  department: DepartmentCode;
  yearSection: string;
  courseCode: string;
  date: string;
  status: 'PRESENT' | 'ABSENT' | 'LATE' | 'ON_DUTY';
  mode: 'Biometric Fingerprint' | 'QR Code' | 'Face Rec' | 'Manual';
}

export interface ExamSchedule {
  id: string;
  examName: string; // e.g., "JNTUK B.Tech III-I Mid-1 Examinations"
  regulation: 'R20' | 'R23';
  date: string;
  session: 'FN (09:30 AM - 11:30 AM)' | 'AN (02:00 PM - 04:00 PM)';
  courseCode: string;
  courseName: string;
  branches: DepartmentCode[];
  registeredStudentsCount: number;
}

export interface SeatingAllocation {
  benchNo: number;
  hallNo: string;
  seatA: { htno: string; name: string; dept: DepartmentCode; yearSec: string };
  seatB: { htno: string; name: string; dept: DepartmentCode; yearSec: string };
}

export interface PlacementDrive {
  id: string;
  companyName: string;
  logo: string;
  role: string;
  packageLpa: number;
  driveDate: string;
  eligibilityCgpa: number;
  maxBacklogsAllowed: number;
  eligibleBranches: DepartmentCode[];
  registeredCount: number;
  selectedCount: number;
  status: 'Upcoming' | 'Registration Open' | 'In Progress' | 'Completed';
}

export interface AIAgentInfo {
  id: string;
  name: string;
  role: string;
  category: string;
  iconName: string;
  description: string;
  examplePrompts: string[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'agent' | 'system';
  agentName?: string;
  text: string;
  timestamp: string;
  metadata?: any;
}

export interface BloomQuestion {
  id: string;
  unit: number;
  bloomLevel: 'Remembering' | 'Understanding' | 'Applying' | 'Analyzing' | 'Evaluating' | 'Creating';
  marks: number;
  coMapping: 'CO1' | 'CO2' | 'CO3' | 'CO4' | 'CO5';
  questionText: string;
  orQuestionText?: string;
}

export interface ExamPaper {
  id: string;
  courseCode: string;
  courseName: string;
  regulation: 'R20' | 'R23';
  midType: 'Mid-1' | 'Mid-2';
  maxMarks: number;
  durationMinutes: number;
  questions: BloomQuestion[];
}

export interface StudentComplaint {
  id: string;
  ticketNo: string;
  htno: string;
  studentName: string;
  department: DepartmentCode;
  category: 'Academics & Faculty' | 'Hostel & Mess' | 'Bus & Transport' | 'Canteen & Water' | 'Anti-Ragging & Safety' | 'Lab Equipment & Wifi' | 'Fee & Scholarships';
  title: string;
  description: string;
  isAnonymous: boolean;
  priority: 'High' | 'Medium' | 'Low';
  status: 'Submitted' | 'Under Review' | 'In Progress' | 'Resolved';
  createdAt: string;
  assignedTo: string;
  resolutionRemarks?: string;
}

export interface InteractionThread {
  id: string;
  studentHtno: string;
  studentName: string;
  facultyName: string;
  courseCode: string;
  courseName: string;
  topic: string;
  lastMessage: string;
  timestamp: string;
  status: 'Open' | 'Resolved';
  messages: {
    id: string;
    sender: 'student' | 'faculty';
    senderName: string;
    text: string;
    timestamp: string;
  }[];
}

export interface PeriodAttendance {
  periodNo: number;
  timeSlot: string;
  subjectCode: string;
  subjectName: string;
  facultyName: string;
  status: 'PRESENT' | 'ABSENT' | 'LATE' | 'ON_DUTY';
  captureMode: 'Biometric Fingerprint' | 'QR Code' | 'Face Rec' | 'Manual';
}

export interface DailyAttendanceLog {
  date: string;
  dayOfWeek: string;
  periods: PeriodAttendance[];
  presentCount: number;
  totalPeriodsCount: number;
  dailyPercentage: number;
}

export interface UserCredential {
  username: string; // HTNO, Faculty ID, or Email
  passwordHash: string;
  tempPassword?: string;
  isFirstLogin: boolean;
  role: UserRole;
  name: string;
  department: DepartmentCode;
  email: string;
  phone: string;
  htno?: string;
  facultyId?: string;
  createdAt: string;
}

export interface AuthSession {
  isAuthenticated: boolean;
  username: string;
  role: UserRole;
  name: string;
  department: DepartmentCode;
  isFirstLogin: boolean;
  token?: string;
}
