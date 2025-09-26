import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    hasAccessPassword: !!process.env.ACCESS_PASSWORD,
    hasAuthSecret: !!process.env.AUTH_SECRET,
    nodeEnv: process.env.NODE_ENV,
    // Don't expose actual values for security
    passwordLength: process.env.ACCESS_PASSWORD?.length || 0,
    secretLength: process.env.AUTH_SECRET?.length || 0,
  });
}