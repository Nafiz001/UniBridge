export interface University {
  id: number;
  name: string;
  country: string;
  degree_level: string;
  min_gpa: number;
  min_ielts: number;
  tuition_fee: number;
  description: string;
  is_eligible?: boolean;
}

export interface UniversityFilters {
  country?: string;
  degreeLevel?: string;
  tuitionMin?: number;
  tuitionMax?: number;
  studentGPA?: number;
  studentIELTS?: number;
}
