import { AuthTokenRequest, AuthTokenResponse } from "../models/auth";

export async function getFrontendToken(): Promise<{
  token?: string;
  ok: boolean;
}> {
  try {
    const accountId = process.env.NEXT_PUBLIC_ACCOUNTID ?? "";
    const authorizationId = process.env.NEXT_PUBLIC_AUTHORIZATIONID ?? "";
    const body: AuthTokenRequest = { accountId, authorizationId };
    const response = await fetch("/api/get-token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      throw new Error(
        `Error en la solicitud: ${response.status} ${response.statusText}`
      );
    }
    const data: AuthTokenResponse = await response.json();
    if (!data.success) {
      throw new Error("Autenticación fallida");
    }
    const newToken = data.message;

    return { token: newToken, ok: true };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
  } catch (e: any) {
    return { ok: false };
  }
}
