import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
});

export const registerSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  acceptTerms: z.boolean().refine((v) => v === true, 'You must accept the terms'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

export const studentInfoSchema = z.object({
  firstName: z.string().min(2, 'First name required'),
  lastName: z.string().min(2, 'Last name required'),
  phone: z.string().min(10, 'Valid phone required'),
  dateOfBirth: z.string().min(1, 'Date of birth required'),
  gender: z.string().min(1, 'Gender required'),
  nationality: z.string().min(1, 'Nationality required'),
  religion: z.string().optional(),
  cnicNumber: z.string().optional(),
  postalAddress: z.string().min(5, 'Address required'),
  streetOrArea: z.string().optional(),
  city: z.string().min(2, 'City required'),
  country: z.string().min(2, 'Country required'),
  currentOccupation: z.string().optional(),
  experienceYears: z.number().optional(),
});

export const guardianInfoSchema = z.object({
  firstName: z.string().min(2, 'Guardian first name required'),
  lastName: z.string().min(2, 'Guardian last name required'),
  relationship: z.string().min(1, 'Relationship required'),
  phone: z.string().min(10, 'Valid phone required'),
  email: z.string().email('Valid email required').optional().or(z.literal('')),
  address: z.string().optional(),
});

export const academicInfoSchema = z.object({
  previousQualification: z.string().min(1, 'Qualification required'),
  institution: z.string().min(2, 'Institution name required'),
  graduationYear: z.number().optional(),
  gpa: z.number().min(0).max(4).optional(),
  field: z.string().optional(),
});

export const businessIdeaSchema = z.object({
  businessName: z.string().min(2, 'Business name required'),
  businessIdea: z.string().min(100, 'Please describe your business idea in at least 100 characters'),
  paymentMethod: z.enum(['CARD', 'BANK_TRANSFER', 'JAZZ_CASH', 'EASY_PAISA']),
});

export type LoginForm = z.infer<typeof loginSchema>;
export type RegisterForm = z.infer<typeof registerSchema>;
export type StudentInfoForm = z.infer<typeof studentInfoSchema>;
export type GuardianInfoForm = z.infer<typeof guardianInfoSchema>;
export type AcademicInfoForm = z.infer<typeof academicInfoSchema>;
export type BusinessIdeaForm = z.infer<typeof businessIdeaSchema>;
