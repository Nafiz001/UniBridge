import { query } from './db';
import { Application } from '../types/application';
import { UniversityModel } from './university.model';

export class ApplicationModel {
  /**
   * Validate student eligibility and create application
   * Rejects application if student doesn't meet university requirements
   */
  static async createApplication(applicationData: Application): Promise<{
    success: boolean;
    message: string;
    applicationId?: number;
  }> {
    const { university_id, student_name, email, phone, gpa, ielts } = applicationData;

    // Fetch university requirements
    const university = await UniversityModel.getUniversityById(university_id);

    if (!university) {
      return {
        success: false,
        message: 'University not found',
      };
    }

    // SERVER-SIDE VALIDATION: Check eligibility
    const isEligible = UniversityModel.checkEligibility(university, gpa, ielts);

    if (!isEligible) {
      const reasons: string[] = [];
      
      if (gpa < university.min_gpa) {
        reasons.push(`GPA ${gpa} is below minimum requirement of ${university.min_gpa}`);
      }
      
      if (ielts < university.min_ielts) {
        reasons.push(`IELTS ${ielts} is below minimum requirement of ${university.min_ielts}`);
      }

      return {
        success: false,
        message: `Application rejected: ${reasons.join('; ')}`,
      };
    }

    // Insert valid application into database
    const insertQuery = `
      INSERT INTO applications (university_id, student_name, email, phone, gpa, ielts, created_at)
      VALUES ($1, $2, $3, $4, $5, $6, NOW())
      RETURNING id
    `;

    const result = await query(insertQuery, [university_id, student_name, email, phone, gpa, ielts]);

    return {
      success: true,
      message: 'Application submitted successfully!',
      applicationId: result.rows[0].id,
    };
  }

  /**
   * Get all applications for a specific university
   */
  static async getApplicationsByUniversity(universityId: number): Promise<Application[]> {
    const result = await query(
      'SELECT * FROM applications WHERE university_id = $1 ORDER BY created_at DESC',
      [universityId]
    );
    return result.rows;
  }

  /**
   * Get all applications by email
   */
  static async getApplicationsByEmail(email: string): Promise<Application[]> {
    const result = await query(
      `SELECT a.*, u.name as university_name 
       FROM applications a 
       JOIN universities u ON a.university_id = u.id 
       WHERE a.email = $1 
       ORDER BY a.created_at DESC`,
      [email]
    );
    return result.rows;
  }

  /**
   * Get application by ID
   */
  static async getApplicationById(id: number): Promise<Application | null> {
    const result = await query('SELECT * FROM applications WHERE id = $1', [id]);
    return result.rows[0] || null;
  }
}
