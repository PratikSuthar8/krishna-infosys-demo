import { authenticator } from "@otplib/preset-default";
import QRCode from "qrcode";

const ISSUER = "Krishna Infosys Admin";

export function generateMfaSecret() {
  return authenticator.generateSecret();
}

export function buildOtpauthUrl(email: string, secret: string) {
  return authenticator.keyuri(email, ISSUER, secret);
}

export async function qrDataUrl(otpauthUrl: string) {
  return QRCode.toDataURL(otpauthUrl, {
    errorCorrectionLevel: "M",
    margin: 2,
    width: 220,
  });
}

export function verifyTotp(token: string, secret: string) {
  try {
    return authenticator.check(String(token).replace(/\s/g, ""), secret);
  } catch {
    return false;
  }
}
