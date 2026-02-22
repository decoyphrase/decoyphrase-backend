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
    const { data, tags } = body;

    if (!data || !Array.isArray(tags)) {
      return NextResponse.json(
        {
          error:
            'Invalid request body. Expected "data" (string) and "tags" (array).',
        },
        { status: 400, headers: CORS_HEADERS },
      );
    }

    // Convert base64 data back to a Buffer for Turbo
    const bufferData = Buffer.from(data, "base64");

    const turbo = getTurboClient();
    const uploadResult = await turbo.uploadFile({
      fileStreamFactory: () => bufferData,
      fileSizeFactory: () => bufferData.length,
      dataItemOpts: { tags },
    });

    return NextResponse.json(
      {
        dataItemId: uploadResult.id,
        status: "pending", // Note: Turbo uploads are eventually confirmed on Arweave
      },
      { status: 200, headers: CORS_HEADERS },
    );
  } catch (error: unknown) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Failed to upload to Turbo" },
      { status: 500, headers: CORS_HEADERS },
    );
  }
}
