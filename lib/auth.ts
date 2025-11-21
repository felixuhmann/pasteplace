import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import "server-only";

const SECRET_KEY = new TextEncoder().encode(
  process.env.PASTEPLACE_PASSWORD || "secret"
);

const ALG = "HS256";

export async function signSession() {
  const token = await new SignJWT({})
    .setProtectedHeader({ alg: ALG })
    .setIssuedAt()
    .setExpirationTime("1y") // Long expiration for convenience
    .sign(SECRET_KEY);
  return token;
}

export async function verifySession(token: string) {
  try {
    const { payload } = await jwtVerify(token, SECRET_KEY, {
      algorithms: [ALG],
    });
    return payload;
  } catch (error) {
    return null;
  }
}

export async function login(password: string) {
  const correctPassword = process.env.PASTEPLACE_PASSWORD || "secret";
  if (password !== correctPassword) {
    return false;
  }

  const token = await signSession();
  (await cookies()).set("auth_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365), // 1 year
  });
  return true;
}

export async function logout() {
  (await cookies()).delete("auth_token");
}

export async function getSession() {
  const token = (await cookies()).get("auth_token")?.value;
  if (!token) return null;
  return await verifySession(token);
}
