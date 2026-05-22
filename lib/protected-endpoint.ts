import { NextRequest, NextResponse } from "next/server";

export function requireHealthToken(request: NextRequest) {
  const configuredToken = process.env.HEALTH_CHECK_TOKEN;
  const providedToken = request.headers.get("x-health-token");

  if (!configuredToken || providedToken !== configuredToken) {
    return NextResponse.json(
      {
        status: "unauthorized",
      },
      {
        status: 401,
      }
    );
  }

  return null;
}