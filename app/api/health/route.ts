import { NextRequest, NextResponse } from "next/server";
import { requireHealthToken } from "@/lib/protected-endpoint";
import { validateEnvironment } from "@/lib/env-validation";

export const dynamic = "force-dynamic";

export function GET(request: NextRequest) {
  const unauthorized = requireHealthToken(request);
  const env = validateEnvironment();
 
  if (unauthorized) {
    return unauthorized;
  }
  
 return NextResponse.json({
    status: env.valid ? "ok" : "warning",
  });

}