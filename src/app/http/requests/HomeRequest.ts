import { object, string } from "yup";

export const HomeRequest = object({
  title: string().required(),
  designation: string().required(),
  about: string().required(),
  button: string().required(),
});
