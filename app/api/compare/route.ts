import { NextRequest, NextResponse } from 'next/server';
import { UniversityModel } from '@/app/lib/university.model';

/**
 * POST /api/compare
 * Controller for comparing universities
 * Body: { universityIds: number[] }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { universityIds } = body;

    // Validate input
    if (!universityIds || !Array.isArray(universityIds)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid request: universityIds array is required',
        },
        { status: 400 }
      );
    }

    // Validate 2-3 universities
    if (universityIds.length < 2 || universityIds.length > 3) {
      return NextResponse.json(
        {
          success: false,
          error: 'Please select 2-3 universities to compare',
        },
        { status: 400 }
      );
    }

    const universities = await UniversityModel.getUniversitiesByIds(universityIds);

    if (universities.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: 'No universities found with the provided IDs',
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: universities,
      count: universities.length,
    });
  } catch (error) {
    console.error('Error comparing universities:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to compare universities',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
