import { Home } from "@prisma/client";

export const HomeResponse = (data: Home | Home[]) => {
  if (Array.isArray(data)) {
    return data.map((d) => objectResponse(d));
  }

  return objectResponse(data);
};

const objectResponse = (homeData: Home) => {
  return {
    id:homeData.id,
    title: homeData.title,
    about: homeData.about,
    designation: homeData.designation,
    button: homeData.button,
  };
};
