import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types pour TypeScript
export interface User {
  id: string
  email: string
  name: string
  role: 'teacher' | 'student'
  created_at: string
}

export interface Course {
  id: string
  teacher_id: string
  date: string
  time: string
  location: string
  is_online: boolean
  is_available: boolean
  created_at: string
}

export interface Booking {
  id: string
  course_id: string
  student_id: string
  duration: number
  subject: string
  notes?: string
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
  created_at: string
}

export interface Document {
  id: string
  booking_id: string
  student_id: string
  file_name: string
  file_url: string
  file_type: string
  created_at: string
}
