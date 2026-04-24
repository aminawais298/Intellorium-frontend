export type Role = 'STUDENT' | 'ADMIN' | 'INSTRUCTOR';
export type ApplicationStatus = 'PENDING' | 'SUBMITTED' | 'UNDER_REVIEW' | 'APPROVED' | 'REJECTED';
export type PaymentStatus = 'UNPAID' | 'PARTIAL' | 'PAID';
export type ProgramStatus = 'ACTIVE' | 'UPCOMING' | 'COMPLETED';
export type PaymentMethodType = 'CARD' | 'BANK_TRANSFER' | 'JAZZ_CASH' | 'EASY_PAISA';
export type PaymentTransactionStatus = 'PENDING' | 'COMPLETED' | 'FAILED';

export interface User {
  id: string;
  email: string;
  role: Role;
  emailVerified: boolean;
  firstName?: string;
  lastName?: string;
  studentId?: string;
  applicationStatus?: ApplicationStatus;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  details?: unknown;
}

export interface Guardian {
  id: string;
  firstName: string;
  lastName: string;
  relationship: string;
  phone: string;
  email?: string;
  address?: string;
}

export interface AcademicInfo {
  id: string;
  previousQualification: string;
  institution: string;
  graduationYear?: number;
  gpa?: number;
  field?: string;
}

export interface BusinessLog {
  id: string;
  month: number;
  revenue: number;
  customers: number;
  milestones?: string;
  challenges?: string;
  nextSteps?: string;
  notes?: string;
  createdAt: string;
}

export interface BusinessMetrics {
  totalRevenue: number;
  totalCustomers: number;
  lastUpdated: string;
}

export interface Student {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  dateOfBirth?: string;
  gender?: string;
  phone?: string;
  nationality?: string;
  religion?: string;
  cnicNumber?: string;
  postalAddress?: string;
  streetOrArea?: string;
  city?: string;
  country?: string;
  profileImage?: string;
  businessName?: string;
  businessIdea?: string;
  currentOccupation?: string;
  experienceYears?: number;
  applicationStatus: ApplicationStatus;
  paymentStatus: PaymentStatus;
  enrollmentDate?: string;
  businessMetrics?: BusinessMetrics;
  guardian?: Guardian;
  academicInfo?: AcademicInfo;
  businessLogs?: BusinessLog[];
  user?: { email: string; emailVerified: boolean };
}

export interface Program {
  id: string;
  name: string;
  description: string;
  duration: number;
  startDate: string;
  endDate: string;
  fee: number;
  serviceFeesPercentage: number;
  maxStudents: number;
  currentStudents: number;
  status: ProgramStatus;
  curriculum?: Record<string, { title: string; topics: string[] }>;
  image?: string;
}

export interface Application {
  id: string;
  studentId: string;
  programId: string;
  status: ApplicationStatus;
  submittedDate: string;
  reviewedDate?: string;
  rejectionReason?: string;
  program?: { name: string; startDate: string; fee: number };
}

export interface Payment {
  id: string;
  amount: number;
  amountPaid: number;
  paymentType: string;
  status: PaymentTransactionStatus;
  paymentMethod: PaymentMethodType;
  transactionId?: string;
  paymentDate?: string;
  dueDate?: string;
  createdAt: string;
}

export interface ApplicationFormData {
  programId: string;
  studentInfo: {
    firstName: string;
    lastName: string;
    phone: string;
    dateOfBirth: string;
    gender: string;
    nationality: string;
    religion?: string;
    cnicNumber?: string;
    postalAddress: string;
    streetOrArea?: string;
    city: string;
    country: string;
    currentOccupation?: string;
    experienceYears?: number;
  };
  guardianInfo: {
    firstName: string;
    lastName: string;
    relationship: string;
    phone: string;
    email?: string;
    address?: string;
  };
  academicInfo: {
    previousQualification: string;
    institution: string;
    graduationYear?: number;
    gpa?: number;
    field?: string;
  };
  businessIdea: string;
  businessName: string;
  paymentMethod: PaymentMethodType;
}

export interface DashboardOverview {
  enrolledProgram: string;
  monthsCompleted: number;
  progressPercentage: number;
  currentMonth: number;
  studentName: string;
}

export interface DashboardData {
  overview: DashboardOverview;
  businessMetrics: {
    totalRevenue: number;
    totalCustomers: number;
    monthlyGrowth: number;
    targetRevenue: number;
    targetAchievement: number;
  };
  cohortStats: {
    totalStudents: number;
    averageRevenue: number;
    yourRank: number;
  };
  cohortNetwork: {
    id: string;
    name: string;
    businessName: string;
    profileImage?: string;
    revenue: number;
  }[];
  recentLogs: BusinessLog[];
  businessLogChart: { month: string; revenue: number; customers: number }[];
}
