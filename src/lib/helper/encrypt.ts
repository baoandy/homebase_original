import {
  randomBytes,
  createCipheriv,
  createDecipheriv,
  BinaryLike,
} from "crypto";
import { env } from "@/lib/env";

const algorithm = "aes-256-ctr";
const iv = randomBytes(16);

function encrypt(text: string): string {
  const cipher = createCipheriv(algorithm, env.SSID_SECRET, iv);
  const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
  return `${iv.toString("hex")}:${encrypted.toString("hex")}`;
}

function decrypt(text: string): string {
  const parts = text.split(":");
  const decipher = createDecipheriv(
    algorithm,
    env.SSID_SECRET,
    Buffer.from(parts[0], "hex"),
  );
  const decrypted = Buffer.concat([
    decipher.update(Buffer.from(parts[1], "hex")),
    decipher.final(),
  ]);
  return decrypted.toString();
}

export { encrypt, decrypt };
