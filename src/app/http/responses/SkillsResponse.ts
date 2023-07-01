import { SkillsResponseType } from "../../../types/skills";

export const SkillsResponse = (
  data: SkillsResponseType | SkillsResponseType[]
) => {
  if (Array.isArray(data)) {
    return data.map((d) => objectResponse(d));
  }

  return objectResponse(data);
};

const objectResponse = (skillsData: SkillsResponseType) => {
  return {
    id: skillsData.id,
    title: skillsData.title,
    about: skillsData.about,
    satisfacationAbout: skillsData.satisfacationAbout,
    satisfacationPercentage: skillsData.satisfacationPercentage,
    technology: skillsData.technology,
    years: skillsData.years,
    yearsTitle: skillsData.yearsTitle,
  };
};
