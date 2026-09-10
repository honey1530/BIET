import { Department, StudentProfile, FacultyProfile, Course, PlacementDrive, AIAgentInfo, AttendanceRecord, ExamSchedule, StudentComplaint, InteractionThread, DailyAttendanceLog } from '../types';

export const DEPARTMENTS: Department[] = [
  { code: 'CSE', name: 'Computer Science & Engineering', hod: 'Dr. V. Rama Krishna', studentCount: 720, facultyCount: 32, nbaAccredited: true },
  { code: 'AIDS', name: 'CSE (AI & Data Science)', hod: 'Dr. G. Srinivas Rao', studentCount: 360, facultyCount: 18, nbaAccredited: true },
  { code: 'ECE', name: 'Electronics & Communication Engg', hod: 'Dr. K. Srimannarayana', studentCount: 480, facultyCount: 24, nbaAccredited: true },
  { code: 'EEE', name: 'Electrical & Electronics Engg', hod: 'Dr. M. Satyanarayana', studentCount: 240, facultyCount: 14, nbaAccredited: true },
  { code: 'ME', name: 'Mechanical Engineering', hod: 'Dr. P. V. S. R. Prasad', studentCount: 240, facultyCount: 15, nbaAccredited: false },
  { code: 'CE', name: 'Civil Engineering', hod: 'Dr. T. N. V. Prasad', studentCount: 180, facultyCount: 12, nbaAccredited: false },
  { code: 'MBA', name: 'Master of Business Administration', hod: 'Dr. Ch. Anjaneyulu', studentCount: 120, facultyCount: 8, nbaAccredited: false }
];

export const SAMPLE_STUDENTS: StudentProfile[] = [
  {
    id: 's1',
    htno: '21A91A0501',
    name: 'Kolla Sai Teja',
    department: 'CSE',
    yearSection: '3-CSE-A',
    regulation: 'R20',
    cgpa: 8.84,
    attendancePercentage: 88.5,
    jvdEligible: true,
    jvdStatus: 'Disbursed',
    totalFee: 65000,
    dueFee: 0,
    phone: '+91 98480 12345',
    email: '21a91a0501@bietbvrm.ac.in',
    parentPhone: '+91 94401 12345',
    backlogs: 0,
    skills: ['Java', 'React', 'Python', 'Data Structures', 'PostgreSQL', 'Spring Boot']
  },
  {
    id: 's2',
    htno: '21A91A0512',
    name: 'Gudimetla Navyasri',
    department: 'CSE',
    yearSection: '3-CSE-A',
    regulation: 'R20',
    cgpa: 9.12,
    attendancePercentage: 92.0,
    jvdEligible: true,
    jvdStatus: 'Disbursed',
    totalFee: 65000,
    dueFee: 0,
    phone: '+91 98480 23456',
    email: '21a91a0512@bietbvrm.ac.in',
    parentPhone: '+91 94401 23456',
    backlogs: 0,
    skills: ['Python', 'Machine Learning', 'SQL', 'FastAPI', 'Tailwind CSS']
  },
  {
    id: 's3',
    htno: '21A91A0528',
    name: 'Penmetsa Varma',
    department: 'CSE',
    yearSection: '3-CSE-B',
    regulation: 'R20',
    cgpa: 7.25,
    attendancePercentage: 71.2, // At Risk (<75%)
    jvdEligible: true,
    jvdStatus: 'Pending Verification',
    totalFee: 65000,
    dueFee: 15000,
    phone: '+91 98480 34567',
    email: '21a91a0528@bietbvrm.ac.in',
    parentPhone: '+91 94401 34567',
    backlogs: 1,
    skills: ['C++', 'HTML/CSS', 'MySQL']
  },
  {
    id: 's4',
    htno: '22A91A5405',
    name: 'Nallamothu Sravani',
    department: 'AIDS',
    yearSection: '2-AIDS-A',
    regulation: 'R20',
    cgpa: 8.45,
    attendancePercentage: 84.0,
    jvdEligible: true,
    jvdStatus: 'Disbursed',
    totalFee: 65000,
    dueFee: 0,
    phone: '+91 98480 45678',
    email: '22a91a5405@bietbvrm.ac.in',
    parentPhone: '+91 94401 45678',
    backlogs: 0,
    skills: ['Python', 'TensorFlow', 'Pandas', 'Scikit-Learn']
  },
  {
    id: 's5',
    htno: '21A91A0418',
    name: 'Alluri Raju Prasad',
    department: 'ECE',
    yearSection: '3-ECE-A',
    regulation: 'R20',
    cgpa: 7.90,
    attendancePercentage: 68.5, // At Risk (<75%)
    jvdEligible: true,
    jvdStatus: 'Awaiting Govt Clearance',
    totalFee: 65000,
    dueFee: 20000,
    phone: '+91 98480 56789',
    email: '21a91a0418@bietbvrm.ac.in',
    parentPhone: '+91 94401 56789',
    backlogs: 2,
    skills: ['Embedded C', 'MATLAB', 'VLSI Design', 'Arduino']
  },
  {
    id: 's6',
    htno: '23A91A0502',
    name: 'Muppidi Harsha Vardhan',
    department: 'CSE',
    yearSection: '1-CSE-A',
    regulation: 'R23',
    cgpa: 8.60,
    attendancePercentage: 90.2,
    jvdEligible: true,
    jvdStatus: 'Disbursed',
    totalFee: 70000,
    dueFee: 0,
    phone: '+91 98480 67890',
    email: '23a91a0502@bietbvrm.ac.in',
    parentPhone: '+91 94401 67890',
    backlogs: 0,
    skills: ['Python', 'C Language', 'Web Basics']
  },
  {
    id: 's7',
    htno: '24AP1A0558',
    name: 'KOLAGOTLA HARITHA',
    department: 'CSE',
    yearSection: '2-CSE-A',
    regulation: 'BR24',
    cgpa: 7.69,
    attendancePercentage: 94.5,
    jvdEligible: true,
    jvdStatus: 'Disbursed',
    totalFee: 70000,
    dueFee: 0,
    phone: '+91 99486 39666',
    email: '24ap1a0558@bietbvrm.ac.in',
    parentPhone: '+91 99486 39666',
    fatherName: 'KOLAGOTLA VENKATESWARA REDDY',
    backlogs: 0,
    skills: ['Operating Systems', 'Full Stack Development', 'Software Engineering', 'Data Structures & Algorithms']
  }
];

export const BIET_COURSES: Course[] = [
  {
    code: 'R232101',
    name: 'Discrete Mathematics & Graph Theory',
    department: 'CSE',
    credits: 3,
    semester: 3,
    regulation: 'R23',
    facultyName: 'Dr. V. Rama Krishna',
    enrolledStudents: 180,
    syllabusUnits: ['Mathematical Logic & Proofs', 'Set Theory & Algebraic Structures', 'Combinatorics & Recurrence Relations', 'Graph Theory Basics', 'Trees & Planar Graphs']
  },
  {
    code: 'R203102',
    name: 'Database Management Systems',
    department: 'CSE',
    credits: 3,
    semester: 5,
    regulation: 'R20',
    facultyName: 'Prof. K. Satyanarayana',
    enrolledStudents: 175,
    syllabusUnits: ['ER Modeling & Relational Schema', 'SQL & Complex Queries', 'Normalization (1NF to BCNF)', 'Transaction Management & ACID Properties', 'Indexing & Query Optimization']
  },
  {
    code: 'R203103',
    name: 'Operating Systems',
    department: 'CSE',
    credits: 3,
    semester: 5,
    regulation: 'R20',
    facultyName: 'Dr. M. Sridevi',
    enrolledStudents: 175,
    syllabusUnits: ['Process Management & CPU Scheduling', 'Deadlocks & Synchronization (Semaphores)', 'Memory Management & Paging', 'Virtual Memory & Page Replacement', 'File Systems & Storage Disk Scheduling']
  },
  {
    code: 'R203104',
    name: 'Computer Networks',
    department: 'CSE',
    credits: 3,
    semester: 5,
    regulation: 'R20',
    facultyName: 'Dr. P. Venkateswara Rao',
    enrolledStudents: 175,
    syllabusUnits: ['OSI & TCP/IP Reference Models', 'Data Link Layer & MAC Protocols', 'Network Layer Routing Algorithms', 'Transport Layer (TCP/UDP Flow Control)', 'Application Layer (DNS, HTTP, SMTP)']
  },
  {
    code: 'R232105',
    name: 'Object Oriented Programming via Java',
    department: 'CSE',
    credits: 3,
    semester: 3,
    regulation: 'R23',
    facultyName: 'Prof. S. N. Murthy',
    enrolledStudents: 180,
    syllabusUnits: ['Java Fundamentals & OOP Principles', 'Inheritance & Interfaces', 'Exception Handling & Multithreading', 'Java I/O & Streams', 'GUI Programming & Swing/JavaFX']
  },
  {
    code: 'R203106',
    name: 'Formal Languages & Automata Theory',
    department: 'CSE',
    credits: 3,
    semester: 5,
    regulation: 'R20',
    facultyName: 'Dr. G. Ramesh',
    enrolledStudents: 175,
    syllabusUnits: ['Finite Automata (DFA/NFA)', 'Regular Expressions & Pumping Lemma', 'Context-Free Grammars & Pushdown Automata', 'Turing Machines & Decidability', 'Undecidability & NP-Completeness']
  }
];

export const JNTUK_COURSES: Course[] = BIET_COURSES;

export const PLACEMENT_DRIVES: PlacementDrive[] = [
  {
    id: 'p1',
    companyName: 'TCS (Tata Consultancy Services)',
    logo: 'https://images.unsplash.com/photo-1542744094-3a31b272c490?auto=format&fit=crop&w=120&q=80',
    role: 'System Engineer / Digital Role',
    packageLpa: 7.2,
    driveDate: '2026-08-15',
    eligibilityCgpa: 6.5,
    maxBacklogsAllowed: 1,
    eligibleBranches: ['CSE', 'AIDS', 'ECE', 'EEE', 'ME', 'CE'],
    registeredCount: 340,
    selectedCount: 42,
    status: 'Registration Open'
  },
  {
    id: 'p2',
    companyName: 'Infosys Specialist Programmer',
    logo: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=120&q=80',
    role: 'Power Programmer / DSE',
    packageLpa: 9.5,
    driveDate: '2026-08-22',
    eligibilityCgpa: 7.5,
    maxBacklogsAllowed: 0,
    eligibleBranches: ['CSE', 'AIDS', 'ECE'],
    registeredCount: 210,
    selectedCount: 18,
    status: 'Registration Open'
  },
  {
    id: 'p3',
    companyName: 'Virtusa Consulting',
    logo: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=120&q=80',
    role: 'Full Stack Java Engineer',
    packageLpa: 6.5,
    driveDate: '2026-09-02',
    eligibilityCgpa: 7.0,
    maxBacklogsAllowed: 0,
    eligibleBranches: ['CSE', 'AIDS', 'ECE'],
    registeredCount: 185,
    selectedCount: 0,
    status: 'Upcoming'
  },
  {
    id: 'p4',
    companyName: 'Accenture Advanced App Engineering',
    logo: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=120&q=80',
    role: 'Application Development Associate',
    packageLpa: 4.5,
    driveDate: '2026-07-20',
    eligibilityCgpa: 6.0,
    maxBacklogsAllowed: 2,
    eligibleBranches: ['CSE', 'AIDS', 'ECE', 'EEE', 'ME', 'CE', 'MBA'],
    registeredCount: 410,
    selectedCount: 68,
    status: 'Completed'
  }
];

export const BIET_AI_AGENTS: AIAgentInfo[] = [
  {
    id: 'agent_academic',
    name: '1. Academic & Credit Advisor',
    role: 'JNTUK CBCS Pathing & Credit Auditor',
    category: 'Academics',
    iconName: 'GraduationCap',
    description: 'Provides personalized credit tracking under JNTUK R20/R23 regulations, elective choices, and prerequisite validation.',
    examplePrompts: [
      'Check my credit completion for 3rd Year B.Tech CSE under R20 regulation.',
      'Which professional electives match my Machine Learning track?'
    ]
  },
  {
    id: 'agent_finance',
    name: '2. Finance & JVD Ledger Agent',
    role: 'AP JVD Scholarship & Fee Reconciler',
    category: 'Finance',
    iconName: 'IndianRupee',
    description: 'Tracks tuition fee dues, Jagananna Vidya Deevena (JVD) disbursement status, and SBI Collect bank challan entries.',
    examplePrompts: [
      'What is my pending tuition fee balance for 2026 academic year?',
      'Show JVD disbursement status for student HTNO 21A91A0501.'
    ]
  },
  {
    id: 'agent_placement',
    name: '3. Placement & Career Coach',
    role: 'Aisprx Drive & Resume Matchmaker',
    category: 'Career',
    iconName: 'Briefcase',
    description: 'Scans resumes against upcoming TCS, Infosys, Virtusa hiring drives and generates customized technical interview questions.',
    examplePrompts: [
      'Match my resume skills with TCS Digital 7.2 LPA requirement.',
      'Generate 5 technical interview questions for Virtusa Full Stack Java role.'
    ]
  },
  {
    id: 'agent_exam',
    name: '4. JNTUK Exam Cell Agent',
    role: 'Bloom\'s Paper Generator & Seating Solver',
    category: 'Examinations',
    iconName: 'FileCheck',
    description: 'Generates Mid-Exam Question Papers conforming to Bloom\'s Taxonomy and solves exam hall seating plans with branch isolation.',
    examplePrompts: [
      'Generate JNTUK Mid-1 Question Paper for Database Management Systems (R20).',
      'Solve seating allocation for Hall 301 with 30 students from CSE and ECE.'
    ]
  },
  {
    id: 'agent_library',
    name: '5. Library OPAC & Research Agent',
    role: 'Digital Repository & IEEE Journal Finder',
    category: 'Library',
    iconName: 'BookOpen',
    description: 'Searches central library OPAC catalog, IEEE Xplore subscriptions, and recommended textbook availability.',
    examplePrompts: [
      'Find reference books available for Discrete Mathematics by Tremblay & Manohar.',
      'Search IEEE papers on AI in Smart Agriculture published after 2024.'
    ]
  },
  {
    id: 'agent_research',
    name: '6. Faculty Research & Patent Agent',
    role: 'AICTE / DST Grant & Citation Summarizer',
    category: 'Research',
    iconName: 'Microscope',
    description: 'Assists faculty in drafting research grant proposals for AICTE RPS/DST and tracking Scopus citations.',
    examplePrompts: [
      'Draft an executive summary for an AICTE Research Promotion Scheme (RPS) proposal.',
      'Summarize key patents in VLSI low-power circuit design.'
    ]
  },
  {
    id: 'agent_executive',
    name: '7. Principal Executive Agent',
    role: 'Institutional KPI & Text-to-SQL Analytics',
    category: 'Management',
    iconName: 'Building2',
    description: 'Empowers Principal and HODs to run natural language queries across attendance, results, fees, and campus operations.',
    examplePrompts: [
      'Show B.Tech CSE students with attendance below 75% and CGPA above 8.0.',
      'List total JVD fee reimbursement pending from AP Govt for 2025-26.'
    ]
  },
  {
    id: 'agent_admissions',
    name: '8. EAMCET/ICET Admissions Agent',
    role: 'Counseling & Document Verification Assistant',
    category: 'Admissions',
    iconName: 'UserPlus',
    description: 'Guides prospective students through AP EAMCET/ECET/ICET cutoff ranks, seat allotment, and document verification.',
    examplePrompts: [
      'What was the AP EAMCET CSE cutoff rank for BIET Bhimavaram in 2025?',
      'What original certificates are required for B.Tech lateral entry admission?'
    ]
  },
  {
    id: 'agent_grievance',
    name: '9. Anti-Ragging & Grievance Agent',
    role: '24/7 Campus Safety & Welfare Guardian',
    category: 'Support',
    iconName: 'ShieldAlert',
    description: 'Provides confidential reporting channels for anti-ragging, hostel issues, transport grievances, and academic support.',
    examplePrompts: [
      'How do I submit a confidential feedback regarding bus route 4 (Tadepalligudem)?',
      'What is the BIET Anti-Ragging Committee contact number and guidelines?'
    ]
  },
  {
    id: 'agent_analytics',
    name: '10. NAAC SSR & NBA SAR Reporting Agent',
    role: 'Accreditation Metrics & CO-PO Engine',
    category: 'Quality Assurance',
    iconName: 'BarChart3',
    description: 'Automates CO-PO attainment calculations, NAAC Criterion 2 & 3 reporting, and NBA accreditation SAR documentation.',
    examplePrompts: [
      'Calculate CO-PO attainment matrix for Database Management Systems.',
      'Generate NAAC Criterion 2.6 Student Performance and Learning Outcomes summary.'
    ]
  }
];

export const INITIAL_ATTENDANCE_LOGS: AttendanceRecord[] = [
  { id: 'att1', htno: '21A91A0501', studentName: 'Kolla Sai Teja', department: 'CSE', yearSection: '3-CSE-A', courseCode: 'R203102', date: '2026-07-28', status: 'PRESENT', mode: 'Biometric Fingerprint' },
  { id: 'att2', htno: '21A91A0512', studentName: 'Gudimetla Navyasri', department: 'CSE', yearSection: '3-CSE-A', courseCode: 'R203102', date: '2026-07-28', status: 'PRESENT', mode: 'QR Code' },
  { id: 'att3', htno: '21A91A0528', studentName: 'Penmetsa Varma', department: 'CSE', yearSection: '3-CSE-B', courseCode: 'R203102', date: '2026-07-28', status: 'ABSENT', mode: 'Manual' },
  { id: 'att4', htno: '22A91A5405', studentName: 'Nallamothu Sravani', department: 'AIDS', yearSection: '2-AIDS-A', courseCode: 'R203103', date: '2026-07-28', status: 'PRESENT', mode: 'Face Rec' },
  { id: 'att5', htno: '21A91A0418', studentName: 'Alluri Raju Prasad', department: 'ECE', yearSection: '3-ECE-A', courseCode: 'R203104', date: '2026-07-28', status: 'LATE', mode: 'Biometric Fingerprint' }
];

export const EXAM_SCHEDULES: ExamSchedule[] = [
  {
    id: 'ex1',
    examName: 'JNTUK B.Tech III Year I Sem Mid-1 Exams',
    regulation: 'R20',
    date: '2026-08-10',
    session: 'FN (09:30 AM - 11:30 AM)',
    courseCode: 'R203102',
    courseName: 'Database Management Systems',
    branches: ['CSE', 'AIDS'],
    registeredStudentsCount: 360
  },
  {
    id: 'ex2',
    examName: 'JNTUK B.Tech III Year I Sem Mid-1 Exams',
    regulation: 'R20',
    date: '2026-08-11',
    session: 'FN (09:30 AM - 11:30 AM)',
    courseCode: 'R203103',
    courseName: 'Artificial Intelligence & Machine Learning',
    branches: ['CSE', 'AIDS'],
    registeredStudentsCount: 360
  },
  {
    id: 'ex3',
    examName: 'JNTUK B.Tech III Year I Sem Mid-1 Exams',
    regulation: 'R20',
    date: '2026-08-10',
    session: 'AN (02:00 PM - 04:00 PM)',
    courseCode: 'R203104',
    courseName: 'VLSI Design & Embedded Systems',
    branches: ['ECE'],
    registeredStudentsCount: 160
  }
];

export const SAMPLE_COMPLAINTS: StudentComplaint[] = [
  {
    id: 'cmp1',
    ticketNo: 'BIET-CMP-8812',
    htno: '21A91A0501',
    studentName: 'Kolla Sai Teja',
    department: 'CSE',
    category: 'Lab Equipment & Wifi',
    title: 'Computer Science Lab 3 - High-performance GPU Workstation RAM Issue',
    description: 'Workstation CS-LAB-14 in Lab 3 is restarting frequently during Deep Learning TensorFlow model training sessions. Requesting technical maintenance check.',
    isAnonymous: false,
    priority: 'High',
    status: 'In Progress',
    createdAt: '2026-07-27 10:30 AM',
    assignedTo: 'Systems Admin (Lab Systems)',
    resolutionRemarks: 'Memory module tested; replacement RAM stick requested from BIET Central Stores.'
  },
  {
    id: 'cmp2',
    ticketNo: 'BIET-CMP-8815',
    htno: 'ANONYMOUS',
    studentName: 'Anonymous Student',
    department: 'CSE',
    category: 'Bus & Transport',
    title: 'Bus Route 4 (Tanuku - Bhimavaram) Evening Overcrowding',
    description: 'Bus Route 4 is reaching full capacity near Veeravasaram stop. Requesting additional seats or schedule adjustment for 4:30 PM departure.',
    isAnonymous: true,
    priority: 'Medium',
    status: 'Under Review',
    createdAt: '2026-07-28 09:15 AM',
    assignedTo: 'BIET Transport Manager',
    resolutionRemarks: 'Transport manager evaluating additional mini-bus deployment.'
  },
  {
    id: 'cmp3',
    ticketNo: 'BIET-CMP-8819',
    htno: '21A91A0512',
    studentName: 'Gudimetla Navyasri',
    department: 'CSE',
    category: 'Hostel & Mess',
    title: 'Girls Hostel Block B Reading Room Wifi Speed Upgrade',
    description: 'Bandwidth in 2nd Floor Reading Room in Girls Hostel Block B drops during peak evening hours (8 PM - 10 PM). Requesting access point upgrade.',
    isAnonymous: false,
    priority: 'Low',
    status: 'Resolved',
    createdAt: '2026-07-25 04:20 PM',
    assignedTo: 'BIET IT Infrastructure Team',
    resolutionRemarks: 'Dual-band Wi-Fi 6 Access Point installed on 2nd Floor reading lounge.'
  }
];

export const SAMPLE_INTERACTIONS: InteractionThread[] = [
  {
    id: 'th1',
    studentHtno: '21A91A0501',
    studentName: 'Kolla Sai Teja',
    facultyName: 'Dr. V. Rama Krishna',
    courseCode: 'R232101',
    courseName: 'Discrete Mathematics & Graph Theory',
    topic: 'Recurrence Relations & Master Theorem Doubt',
    lastMessage: 'Sir, I solved Question 4 using Master Theorem Case 2. Please verify if my substitution step is correct.',
    timestamp: 'Today, 02:45 PM',
    status: 'Open',
    messages: [
      {
        id: 'm1',
        sender: 'student',
        senderName: 'Kolla Sai Teja',
        text: 'Respected Sir, for Unit 3 Assignment Question 4: T(n) = 2T(n/2) + n log n, can we directly apply Case 2 of Master Theorem or should we use substitution method?',
        timestamp: 'Today, 10:15 AM'
      },
      {
        id: 'm2',
        sender: 'faculty',
        senderName: 'Dr. V. Rama Krishna (HOD CSE)',
        text: 'Hello Sai Teja. Since f(n) = n log n, this falls under extended Case 2 of Master Theorem where f(n) = Theta(n^(log_b a) * log^k n). You can apply extended Case 2 directly. Bring your step derivation after class.',
        timestamp: 'Today, 11:30 AM'
      },
      {
        id: 'm3',
        sender: 'student',
        senderName: 'Kolla Sai Teja',
        text: 'Sir, I solved Question 4 using Master Theorem Case 2. Please verify if my substitution step is correct.',
        timestamp: 'Today, 02:45 PM'
      }
    ]
  },
  {
    id: 'th2',
    studentHtno: '21A91A0501',
    studentName: 'Kolla Sai Teja',
    facultyName: 'Dr. G. Srinivas Rao',
    courseCode: 'R203102',
    courseName: 'Database Management Systems',
    topic: 'JNTUK Mid-1 DBMS B-Tree Indexing Doubt',
    lastMessage: 'Thank you Sir, I understood the split condition in B+ Trees now!',
    timestamp: 'Yesterday, 05:10 PM',
    status: 'Resolved',
    messages: [
      {
        id: 'm4',
        sender: 'student',
        senderName: 'Kolla Sai Teja',
        text: 'Sir, in B+ Tree insertion when an internal node overflows, does the key get copied to parent or moved up?',
        timestamp: 'Yesterday, 04:00 PM'
      },
      {
        id: 'm5',
        sender: 'faculty',
        senderName: 'Dr. G. Srinivas Rao',
        text: 'At leaf level, the key is copied up (remains in leaf). At non-leaf level, the key is pushed up (removed from child). Refer to Unit 5 Lecture Slide 24.',
        timestamp: 'Yesterday, 04:45 PM'
      },
      {
        id: 'm6',
        sender: 'student',
        senderName: 'Kolla Sai Teja',
        text: 'Thank you Sir, I understood the split condition in B+ Trees now!',
        timestamp: 'Yesterday, 05:10 PM'
      }
    ]
  }
];

export const SAMPLE_DAILY_ATTENDANCE: DailyAttendanceLog[] = [
  {
    date: '2026-07-28',
    dayOfWeek: 'Tuesday (Today)',
    presentCount: 6,
    totalPeriodsCount: 7,
    dailyPercentage: 85.7,
    periods: [
      { periodNo: 1, timeSlot: '09:30 AM - 10:20 AM', subjectCode: 'R203102', subjectName: 'Database Management Systems', facultyName: 'Dr. G. Srinivas Rao', status: 'PRESENT', captureMode: 'Biometric Fingerprint' },
      { periodNo: 2, timeSlot: '10:20 AM - 11:10 AM', subjectCode: 'R232101', subjectName: 'Discrete Mathematics', facultyName: 'Dr. V. Rama Krishna', status: 'PRESENT', captureMode: 'QR Code' },
      { periodNo: 3, timeSlot: '11:20 AM - 12:10 PM', subjectCode: 'R203103', subjectName: 'Web Technologies', facultyName: 'P. Suresh Kumar', status: 'PRESENT', captureMode: 'Face Rec' },
      { periodNo: 4, timeSlot: '12:10 PM - 01:00 PM', subjectCode: 'R203104', subjectName: 'Operating Systems', facultyName: 'Dr. K. Srimannarayana', status: 'PRESENT', captureMode: 'Manual' },
      { periodNo: 5, timeSlot: '02:00 PM - 02:50 PM', subjectCode: 'R203105', subjectName: 'DBMS Laboratory (Batch A)', facultyName: 'Dr. G. Srinivas Rao', status: 'PRESENT', captureMode: 'Biometric Fingerprint' },
      { periodNo: 6, timeSlot: '02:50 PM - 03:40 PM', subjectCode: 'R203105', subjectName: 'DBMS Laboratory (Batch A)', facultyName: 'Dr. G. Srinivas Rao', status: 'PRESENT', captureMode: 'Biometric Fingerprint' },
      { periodNo: 7, timeSlot: '03:40 PM - 04:30 PM', subjectCode: 'R203106', subjectName: 'AI & Data Science Elective', facultyName: 'M. Satyanarayana', status: 'ABSENT', captureMode: 'Manual' }
    ]
  },
  {
    date: '2026-07-27',
    dayOfWeek: 'Monday',
    presentCount: 7,
    totalPeriodsCount: 7,
    dailyPercentage: 100.0,
    periods: [
      { periodNo: 1, timeSlot: '09:30 AM - 10:20 AM', subjectCode: 'R203102', subjectName: 'Database Management Systems', facultyName: 'Dr. G. Srinivas Rao', status: 'PRESENT', captureMode: 'Biometric Fingerprint' },
      { periodNo: 2, timeSlot: '10:20 AM - 11:10 AM', subjectCode: 'R232101', subjectName: 'Discrete Mathematics', facultyName: 'Dr. V. Rama Krishna', status: 'PRESENT', captureMode: 'Biometric Fingerprint' },
      { periodNo: 3, timeSlot: '11:20 AM - 12:10 PM', subjectCode: 'R203103', subjectName: 'Web Technologies', facultyName: 'P. Suresh Kumar', status: 'PRESENT', captureMode: 'QR Code' },
      { periodNo: 4, timeSlot: '12:10 PM - 01:00 PM', subjectCode: 'R203104', subjectName: 'Operating Systems', facultyName: 'Dr. K. Srimannarayana', status: 'PRESENT', captureMode: 'Manual' },
      { periodNo: 5, timeSlot: '02:00 PM - 02:50 PM', subjectCode: 'R203107', subjectName: 'Linux Shell Programming Lab', facultyName: 'P. Suresh Kumar', status: 'PRESENT', captureMode: 'Biometric Fingerprint' },
      { periodNo: 6, timeSlot: '02:50 PM - 03:40 PM', subjectCode: 'R203107', subjectName: 'Linux Shell Programming Lab', facultyName: 'P. Suresh Kumar', status: 'PRESENT', captureMode: 'Biometric Fingerprint' },
      { periodNo: 7, timeSlot: '03:40 PM - 04:30 PM', subjectCode: 'R203108', subjectName: 'Soft Skills & Quantitative Aptitude', facultyName: 'Placement Trainer', status: 'PRESENT', captureMode: 'Manual' }
    ]
  }
];

