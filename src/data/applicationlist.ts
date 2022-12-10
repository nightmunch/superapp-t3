export type ApplicationProps = {
  title: string;
  image_src: string;
  description: string;
};

export const applicationList: ApplicationProps[] = [
  {
    title: "Money Track",
    image_src: "/undraw_investing.svg",
    description:
      "Allow users to track their financial transactions. This can include monitoring their daily expenses, managing their claims and track their current net worth.",
  },
  {
    title: "Chef Burp",
    image_src: "/undraw_cooking.svg",
    description:
      "Allow users to share their recipes with others and access a larger collection of recipes contributed by the community. The application may include features such as ingredient lists and step-by-step instructions.",
  },
];
