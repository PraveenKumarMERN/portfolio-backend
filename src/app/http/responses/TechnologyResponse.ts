import { Technology } from "@prisma/client";

export const TechnologyResponse = (data: Technology | Technology[]) => {
  if (Array.isArray(data)) {
    return data.map((d) => objectResponse(d));
  }

  return objectResponse(data);
};

const objectResponse = (technologyData: Technology) => {
  return {
    id: technologyData.id,
    color: technologyData.color,
    image: technologyData.image,
    percentage: technologyData.percentage,
    name: technologyData.name,
  };
};
