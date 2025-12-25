import { query } from './db';
import { University, UniversityFilters } from '../types/university';

export class UniversityModel {
  /**
   * Fetch universities with optional filters and eligibility computation
   */
  static async getUniversities(filters: UniversityFilters = {}): Promise<University[]> {
    const { country, degreeLevel, tuitionMin, tuitionMax, studentGPA, studentIELTS } = filters;

    let queryText = 'SELECT * FROM universities WHERE 1=1';
    const params: any[] = [];
    let paramCount = 1;

    // Apply filters
    if (country && country !== 'all') {
      queryText += ` AND country = $${paramCount}`;
      params.push(country);
      paramCount++;
    }

    if (degreeLevel && degreeLevel !== 'all') {
      queryText += ` AND degree_level = $${paramCount}`;
      params.push(degreeLevel);
      paramCount++;
    }

    if (tuitionMin !== undefined) {
      queryText += ` AND tuition_fee >= $${paramCount}`;
      params.push(tuitionMin);
      paramCount++;
    }

    if (tuitionMax !== undefined) {
      queryText += ` AND tuition_fee <= $${paramCount}`;
      params.push(tuitionMax);
      paramCount++;
    }

    queryText += ' ORDER BY name ASC';

    const result = await query(queryText, params);
    const universities: University[] = result.rows;

    // Compute eligibility for each university
    if (studentGPA !== undefined || studentIELTS !== undefined) {
      universities.forEach((uni) => {
        uni.is_eligible = this.checkEligibility(uni, studentGPA, studentIELTS);
      });
    }

    return universities;
  }

  /**
   * Get universities by ID list (for comparison)
   */
  static async getUniversitiesByIds(ids: number[]): Promise<University[]> {
    if (ids.length === 0) {
      return [];
    }

    const placeholders = ids.map((_, index) => `$${index + 1}`).join(', ');
    const queryText = `SELECT * FROM universities WHERE id IN (${placeholders})`;

    const result = await query(queryText, ids);
    return result.rows;
  }

  /**
   * Get a single university by ID
   */
  static async getUniversityById(id: number): Promise<University | null> {
    const result = await query('SELECT * FROM universities WHERE id = $1', [id]);
    return result.rows[0] || null;
  }

  /**
   * Check if a student is eligible for a university
   * Returns true if student meets BOTH GPA and IELTS requirements
   */
  static checkEligibility(
    university: University,
    studentGPA?: number,
    studentIELTS?: number
  ): boolean {
    if (studentGPA !== undefined && studentGPA < university.min_gpa) {
      return false;
    }

    if (studentIELTS !== undefined && studentIELTS < university.min_ielts) {
      return false;
    }

    return true;
  }

  /**
   * Get all unique countries
   */
  static async getCountries(): Promise<string[]> {
    const result = await query('SELECT DISTINCT country FROM universities ORDER BY country ASC');
    return result.rows.map((row) => row.country);
  }

  /**
   * Get all unique degree levels
   */
  static async getDegreeLevels(): Promise<string[]> {
    const result = await query('SELECT DISTINCT degree_level FROM universities ORDER BY degree_level ASC');
    return result.rows.map((row) => row.degree_level);
  }
}
