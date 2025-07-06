import { NextRequest, NextResponse } from "next/server";

const qrURL =
  "http://test.bnb.com.bo/QRSimple.API/api/v1/main/getQRWithImageAsync";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const { qrData, token } = await req.json();
    if (!qrData) {
      return NextResponse.json({ error: "Missing QR data" }, { status: 400 });
    }

    if (!token) {
      return NextResponse.json(
        { error: "No se recibió el token" },
        { status: 500 }
      );
    }

    const body = {
      currency: qrData.currency,
      gloss: qrData.gloss,
      amount: qrData.amount,
      singleUse: true,
      expirationDate: new Date(Date.now() + 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0],
      additionalData: "campo Glosa",
      destinationAccount: 1,
    };

    const qrResponse = await fetch(qrURL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!qrResponse.ok) {
      const text = await qrResponse.text();
      return NextResponse.json({ error: text }, { status: qrResponse.status });
    }

    const qrDataResponse = await qrResponse.json();
    if (!qrDataResponse.success) {
      return NextResponse.json(
        { error: qrDataResponse.message || "Error al generar QR" },
        { status: 400 }
      );
    }

    return NextResponse.json({ qrResponse: qrDataResponse, ok: true });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
