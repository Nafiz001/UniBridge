import { NextRequest, NextResponse } from 'next/server';
import { ApplicationModel } from '@/app/lib/application.model';

/**
 * POST /api/applications
 * Controller for creating applications with server-side validation
 * Body: { university_id, student_name, email, phone, gpa, ielts }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { university_id, student_name, email, phone, gpa, ielts } = body;

    // Validate required fields
    if (!university_id || !student_name || !email || !phone || gpa === undefined || ielts === undefined) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required fields',
        },
        { status: 400 }
      );
    }

    // Validate data types
    if (typeof gpa !== 'number' || typeof ielts !== 'number') {
      return NextResponse.json(
        {
          success: false,
          error: 'GPA and IELTS must be numbers',
        },
        { status: 400 }
      );
    }

    // Validate ranges
    if (gpa < 0 || gpa > 4.0) {
      return NextResponse.json(
        {
          success: false,
          error: 'GPA must be between 0 and 4.0',
        },
        { status: 400 }
      );
    }

    if (ielts < 0 || ielts > 9.0) {
      return NextResponse.json(
        {
          success: false,
          error: 'IELTS must be between 0 and 9.0',
        },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid email format',
        },
        { status: 400 }
      );
    }

    // Validate phone format
    const phoneRegex = /^[\d+\-\s()]+$/;
    if (!phoneRegex.test(phone)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid phone format',
        },
        { status: 400 }
      );
    }

    // Create application with server-side eligibility validation
    const result = await ApplicationModel.createApplication({
      university_id,
      student_name,
      email,
      phone,
      gpa,
      ielts,
    });

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          error: result.message,
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: result.message,
      applicationId: result.applicationId,
    });
  } catch (error) {
    console.error('Error creating application:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to create application',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
