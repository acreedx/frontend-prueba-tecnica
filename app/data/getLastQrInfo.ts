import { QrDetailsResponse } from "../models/qrDetailsResponse";

export async function getLastQrInfo(
  token: string
): Promise<{ qrResponse?: QrDetailsResponse; ok: boolean; message?: string }> {
  try {
    const response = await fetch("/api/getLastQr", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: token }),
    });
    if (!response.ok) {
      const { error } = await response.json();
      return { ok: false, message: error };
    }
    const data = await response.json();
    return { qrResponse: data.qrResponse, ok: true };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log("Error al generar QR:", error.message);
    return { ok: false };
  }
}
