import { NextResponse } from "next/server";

// In production, you should restrict this to your specific Arlink frontend domain
export const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export function checkAuthentication(request: Request): boolean {
  const authHeader = request.headers.get("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return false;
  }
  const token = authHeader.split(" ")[1];
  return token === process.env.API_SECRET_KEY;
}

export function handlePreflight() {
  return NextResponse.json({}, { headers: CORS_HEADERS });
}

export function unauthorizedResponse() {
  return NextResponse.json(
    { error: "Unauthorized" },
    { status: 401, headers: CORS_HEADERS },
  );
}

// Helper to reliably get the Turbo client securely on the server
export function getTurboClient() {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { TurboFactory, ArweaveSigner } = require("@ardrive/turbo-sdk/node");

  const jwkString = process.env.MASTER_WALLET_JWK;
  if (!jwkString) {
    throw new Error("MASTER_WALLET_JWK is not configured on the server.");
  }

  const jwk = JSON.parse(jwkString);
  const signer = new ArweaveSigner(jwk);

  return TurboFactory.authenticated({
    signer,
    token: "arweave",
  });
}
