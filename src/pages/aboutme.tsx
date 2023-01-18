import type { NextPage } from "next";
import Image from "next/image";
import { Typewriter } from "react-simple-typewriter";

import { BsTerminal } from "react-icons/bs";
import { FaGithub, FaRobot } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";
import { AiOutlineFolder } from "react-icons/ai";
import { ProjectList } from "../data/projectlist";

const AboutMe: NextPage = () => {
  return (
    <div className="mx-auto mt-5 flex max-w-4xl flex-col justify-center gap-10 px-5 sm:px-0">
      <div className="flex max-w-3xl flex-col sm:flex-row sm:gap-20 md:m-auto">
        <div className="flex">
          <div className="my-auto">
            <h1 className="text-lg">Hello, I&apos;m</h1>
            <h2 className="text-4xl font-bold text-primary">Shahrin Amin</h2>
            <h2 className="text-xl font-bold text-secondary">
              <Typewriter
                words={["Full Stack Developer", "Deep Learning Enthusiast"]}
                loop={0}
              />
            </h2>
            <h2 className="text-md">
              Building cutting-edge web applications and exploring the
              possibilities of Deep Learning
            </h2>
          </div>
        </div>
        <div className="flex-none pt-6 sm:w-64 sm:pt-0">
          <Image
            src="/me.jpg"
            alt="Picture of Shahrin"
            width={1000}
            height={1000}
            className="rounded-full"
          />
        </div>
      </div>
      <div className="flex flex-col justify-center gap-10">
        <h1 className="text-center text-xl font-bold text-primary">
          Technical Skills & Programming Language
        </h1>
        <div className="grid grid-cols-1 divide-y divide-base-content sm:grid-cols-2 sm:divide-x sm:divide-y-0">
          <div className="flex flex-col items-center justify-center gap-2 py-5 sm:px-10">
            <div className="rounded-full bg-primary p-3">
              <BsTerminal className="text-3xl text-base-100" />
            </div>
            <h1 className="text-center text-lg font-bold text-secondary">
              Full Stack Development
            </h1>
            <p className="text-center">
              I am passionate about web development and enjoy the challenge of
              creating dynamic and interactive websites. I am constantly
              learning and seeking to improve my skills in this area.
            </p>
            <h2 className="text-md mt-3 text-center font-semibold text-secondary">
              Language/Framework
            </h2>
            <p className="text-center">
              React, Next.JS, Typescript, TailwindCSS, MongoDB, PHP, Laravel,
              Bootstrap 5, MariaDB, HTML 5, CSS, Javascript, Vue
            </p>
          </div>
          <div className="flex flex-col items-center justify-center gap-2 py-5 sm:px-10">
            <div className="rounded-full bg-primary p-3">
              <FaRobot className="text-3xl text-base-100" />
            </div>
            <h1 className="text-center text-lg font-bold text-secondary">
              Data Science & Artificial Intelligence
            </h1>
            <p className="text-center">
              I am passionate about data science and enjoy working with large
              and complex datasets. I am constantly learning and seeking to
              improve my skills in this area.
            </p>
            <h2 className="text-md mt-3 text-center font-semibold text-secondary">
              Language/Framework
            </h2>
            <p className="text-center">
              Python, Pandas, Numpy, Sklearn, TensorFlow
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center gap-10">
        <h1 className="text-center text-xl font-bold text-primary">Projects</h1>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          {ProjectList.map((project) => (
            <ProjectCard
              key={project.title}
              github={project.github}
              link={project.link}
              title={project.title}
              description={project.description}
              skills={project.skills}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutMe;

const ProjectCard = ({
  github,
  link,
  title,
  description,
  skills,
}: {
  github?: string;
  link?: string;
  title: string;
  description: string;
  skills: string[];
}) => {
  return (
    <div className="group flex flex-col gap-5 bg-base-200 p-5 transition hover:-translate-y-2">
      <div className="flex items-center">
        <AiOutlineFolder className="text-4xl text-secondary" />
        <div className="grow"></div>
        <div className="flex gap-2">
          {github && (
            <a href={github} title="Github">
              <FaGithub className="text-xl hover:text-primary" />
            </a>
          )}
          {link && (
            <a href={link} title="External Link">
              <FiExternalLink className="text-xl hover:text-primary" />
            </a>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="text-lg font-bold group-hover:text-primary">{title}</h1>
        <p className="text-sm text-base-content text-opacity-80">
          {description}
        </p>
        <div className="flex flex-wrap gap-2 group-hover:text-primary">
          {skills.map((skill) => (
            <h3 key={skill} className="text-xs">
              {skill}
            </h3>
          ))}
        </div>
      </div>
    </div>
  );
};
