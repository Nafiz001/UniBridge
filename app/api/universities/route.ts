import { NextRequest, NextResponse } from 'next/server';
import { UniversityModel } from '@/app/lib/university.model';

/**
 * GET /api/universities
 * Controller for fetching universities with filters
 * Query params: country, degreeLevel, tuitionMin, tuitionMax, studentGPA, studentIELTS
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    const filters = {
      country: searchParams.get('country') || undefined,
      degreeLevel: searchParams.get('degreeLevel') || undefined,
      tuitionMin: searchParams.get('tuitionMin') ? Number(searchParams.get('tuitionMin')) : undefined,
      tuitionMax: searchParams.get('tuitionMax') ? Number(searchParams.get('tuitionMax')) : undefined,
      studentGPA: searchParams.get('studentGPA') ? Number(searchParams.get('studentGPA')) : undefined,
      studentIELTS: searchParams.get('studentIELTS') ? Number(searchParams.get('studentIELTS')) : undefined,
    };

    const universities = await UniversityModel.getUniversities(filters);

    return NextResponse.json({
      success: true,
      data: universities,
      count: universities.length,
    });
  } catch (error) {
    console.error('Error fetching universities:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch universities',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
