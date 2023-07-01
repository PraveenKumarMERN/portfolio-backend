import { DEVICES } from "@prisma/client";
import { object, string } from "yup";

export const LoginRequest = object({
  email: string().required().email(),
  password: string().required(),
  metaData: object(),
  fcmToken: string(),
});
