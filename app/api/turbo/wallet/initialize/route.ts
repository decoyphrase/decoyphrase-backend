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

export async function POST(request: Request) {
  if (!checkAuthentication(request)) {
    return unauthorizedResponse();
  }

  try {
    const body = await request.json();
    const { username, publicKey } = body;

    if (!username || !publicKey) {
      return NextResponse.json(
        { error: "Missing username or publicKey" },
        { status: 400, headers: CORS_HEADERS },
      );
    }

    // Example: Emitting a basic initialization transaction
    const turbo = getTurboClient();
    const initPayload = Buffer.from(
      JSON.stringify({ action: "register", username }),
    );

    const uploadResult = await turbo.uploadFile({
      fileStreamFactory: () => initPayload,
      fileSizeFactory: () => initPayload.length,
      dataItemOpts: {
        tags: [
          { name: "App-Name", value: "DecoyPhrase" },
          { name: "Action", value: "InitializeUser" },
          { name: "User-Public-Key", value: publicKey },
        ],
      },
    });

    return NextResponse.json(
      { success: true, txId: uploadResult.id },
      { status: 200, headers: CORS_HEADERS },
    );
  } catch (error: unknown) {
    console.error("Initialization error:", error);
    return NextResponse.json(
      { error: "Failed to initialize wallet" },
      { status: 500, headers: CORS_HEADERS },
    );
  }
}
