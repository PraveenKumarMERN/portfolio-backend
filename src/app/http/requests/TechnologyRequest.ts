import { object, string } from "yup";

export const TechnologyRequest = object({
  name: string().required(),
  image: string().required(),
  color: string().required(),
  percentage: string().required(),
});


