import Image from "next/image";
import { FaLinkedin, FaInstagram, FaGithub, FaEnvelope } from "react-icons/fa";
export default function AboutMe() {
  return (
    <>
      <div className="card bg-neutral text-neutral-content">
        <div className="card-body">
          <div className="flex flex-col sm:flex-row sm:gap-10 md:m-auto xl:w-1/2">
            <div className="flex">
              <div className="my-auto">
                <h1 className="text-lg">Hello!</h1>
                <h2 className="text-3xl font-semibold text-primary">
                  I&apos;m Shahrin
                </h2>
                <h2 className="text-lg">
                  Web Developer & Deep Learning Enthusiast
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
        </div>
      </div>
      <div className="card bg-neutral text-neutral-content">
        <div className="card-body">
          <h1 className="text-center text-xl font-semibold text-primary">
            My socials
          </h1>
          <div className="m-auto mt-3 flex flex-row gap-3">
            <a href="https://www.instagram.com/nightmunch/?theme=dark">
              <FaInstagram className="text-3xl hover:text-primary" />
            </a>
            <a href="https://www.linkedin.com/in/shahrinamin-2703/">
              <FaLinkedin className="text-3xl hover:text-primary" />
            </a>
            <a href="https://github.com/nightmunch">
              <FaGithub className="text-3xl hover:text-primary" />
            </a>
            <a href="mailto:shahrinamin.my@gmail.com">
              <FaEnvelope className="text-3xl hover:text-primary" />
            </a>
          </div>
        </div>
      </div>
      <div className="card bg-neutral text-neutral-content">
        <div className="card-body">
          <h1 className="text-center text-xl font-semibold text-primary">
            About Me
          </h1>
          <p className="mt-3">
            As a passionate software developer, I am dedicated to creating
            high-quality and effective software solutions. I am constantly
            learning and seeking to improve my skills, and I have a strong
            desire to stay up-to-date with the latest technologies and best
            practices in the field. I am a creative problem-solver and enjoy the
            challenge of tackling complex technical issues. In addition, I am
            able to work well in a team environment and am always willing to
            lend a helping hand to my colleagues. Overall, my passion for
            software development shines through in everything I do, and I am a
            valuable asset to any organization.
            <span className="font-semibold text-primary md:mt-2 md:block md:text-center">
              &quot;Jack of all trades, master of some&quot;.
            </span>
          </p>
        </div>
      </div>
      <div className="card bg-neutral text-neutral-content">
        <div className="card-body">
          <h1 className="text-center text-xl font-semibold text-primary">
            Skills
          </h1>
          <div className="mt-3 flex flex-col gap-3 md:flex-row">
            <div className="card bg-base-100">
              <div className="card-body">
                <h1 className="text-center text-lg font-semibold text-secondary">
                  Web Development
                </h1>
                <p>
                  I am passionate about web development and enjoy the challenge
                  of creating dynamic and interactive websites. I am constantly
                  learning and seeking to improve my skills in this area.
                </p>
                <h2 className="text-md mt-3 text-center font-semibold text-secondary">
                  Language/Framework
                </h2>
                <p className="text-center">
                  HTML, CSS, Javascript, PHP, Laravel, React, Typescript
                </p>
              </div>
            </div>
            <div className="card bg-base-100">
              <div className="card-body">
                <h1 className="text-center text-lg font-semibold text-secondary">
                  Data Science & Artificial Intelligence
                </h1>
                <p>
                  I am passionate about data science and enjoy working with
                  large and complex datasets. I am constantly learning and
                  seeking to improve my skills in this area.
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
        </div>
      </div>
    </>
  );
}
