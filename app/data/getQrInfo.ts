import { TQrSearch } from "../models/qrData";
import { qrInfo } from "../models/qrInfo";

export async function getQrInfo(
  qrData: TQrSearch,
  token: string
): Promise<{ qrResponse?: qrInfo; ok: boolean; message?: string }> {
  try {
    const response = await fetch("/api/getQrInfo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ qrData: qrData, token: token }),
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
