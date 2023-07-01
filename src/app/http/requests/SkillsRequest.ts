import { object, string } from "yup";

export const SkillsRequest = object({
  title: string().required(),
  technologyId: string().required(),
  about: string().required(),
  satisfacationAbout: string().required(),
  satisfacationPercentage: string().required(),
  years: string().required(),
  yearsTitle: string().required(),
});


