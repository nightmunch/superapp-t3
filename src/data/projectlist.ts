type ProjectProps = {
  title: string;
  description: string;
  github?: string;
  link?: string;
  skills: string[];
};

export const ProjectList: ProjectProps[] = [
  {
    title: "SuperApp",
    description:
      "An all-for-one single application that contains many others mini applications to solve users need!",
    github: "https://github.com/nightmunch/superapp-t3",
    link: "https://superapp.nightmunch.com/",
    skills: ["Next.JS", "Typescript", "TailwindCSS", "MongoDB"],
  },
  {
    title: "Digital Wedding Card",
    description: "Personal wedding card for my future wedding InshaAllah",
    github: "https://github.com/nightmunch/digital-wedding-card",
    skills: ["Next.JS", "Typescript", "TailwindCSS", "Supabase"],
  },
  {
    title: "SAPS UI Enchancement",
    description:
      "Elevate old and dull SAPS website with better user experience",
    skills: ["Next.JS", "Typescript", "TailwindCSS"],
  },
];
