import { NextRequest, NextResponse } from "next/server";
import { requireHealthToken } from "@/lib/protected-endpoint";
import { validateEnvironment } from "@/lib/env-validation";

export const dynamic = "force-dynamic";

export function GET(request: NextRequest) {
  const unauthorized = requireHealthToken(request);

  if (unauthorized) {
    return unauthorized;
  }

  const env = validateEnvironment();

  return NextResponse.json({
    status: env.valid ? "ok" : "warning",
  });
}
