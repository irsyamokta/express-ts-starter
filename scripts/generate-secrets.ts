import crypto from "crypto";
import fs from "fs";
import path from "path";

const generateSecret = () => crypto.randomBytes(64).toString("hex");

const envPath = path.resolve(process.cwd(), ".env");
let envContent = fs.existsSync(envPath) ? fs.readFileSync(envPath, "utf-8") : "";

envContent = envContent.replace(/JWT_SECRET=.*/g, "").replace(/REFRESH_TOKEN_SECRET=.*/g, "");

envContent += `\nJWT_SECRET=${generateSecret()}`;
envContent += `\nREFRESH_TOKEN_SECRET=${generateSecret()}`;

fs.writeFileSync(envPath, envContent.trim());
console.log("✅ JWT_SECRET & REFRESH_TOKEN_SECRET generated successfully!");
