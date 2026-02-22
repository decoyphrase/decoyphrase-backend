import { NextResponse } from "next/server";
import {
  checkAuthentication,
  CORS_HEADERS,
  handlePreflight,
  unauthorizedResponse,
  getTurboClient,
} from "@/lib/auth";

export async function OPTIONS() {
  return handlePreflight();
}

export async function GET(request: Request) {
  if (!checkAuthentication(request)) {
    return unauthorizedResponse();
  }

  try {
    const turbo = getTurboClient();
    const balance = await turbo.getBalance();

    return NextResponse.json(
      { winc: balance.winc },
      { status: 200, headers: CORS_HEADERS },
    );
  } catch (error: unknown) {
    console.error("Balance error:", error);
    return NextResponse.json(
      { error: "Failed to fetch balance" },
      { status: 500, headers: CORS_HEADERS },
    );
  }
}
