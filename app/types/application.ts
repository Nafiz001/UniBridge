export interface Application {
  id?: number;
  university_id: number;
  student_name: string;
  email: string;
  phone: string;
  gpa: number;
  ielts: number;
  created_at?: Date;
}

export interface ApplicationFormData {
  student_name: string;
  email: string;
  phone: string;
  gpa: number;
  ielts: number;
  university_id: number;
}
