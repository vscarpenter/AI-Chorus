import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();
    const correctPassword = process.env.ACCESS_PASSWORD;

    if (!correctPassword) {
      return NextResponse.json(
        { error: 'Access password not configured' },
        { status: 500 }
      );
    }

    if (password === correctPassword) {
      // Set authentication cookie
      const response = NextResponse.json({ success: true });

      // Set cookie that expires in 24 hours
      response.cookies.set('ai-chorus-auth', process.env.AUTH_SECRET!, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
        path: '/'
      });

      return response;
    } else {
      return NextResponse.json(
        { error: 'Invalid password' },
        { status: 401 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 500 }
    );
  }
}