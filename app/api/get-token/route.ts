import { NextRequest, NextResponse } from "next/server";

const URL = "http://test.bnb.com.bo/ClientAuthentication.API/api/v1/auth/token";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const { accountId, authorizationId } = await req.json();

    if (!accountId || !authorizationId) {
      return NextResponse.json(
        { error: "Missing parameters" },
        { status: 400 }
      );
    }

    const response = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ accountId, authorizationId }),
    });

    if (!response.ok) {
      const text = await response.text();
      return NextResponse.json({ error: text }, { status: response.status });
    }

    const data = await response.json();

    return NextResponse.json(data);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
