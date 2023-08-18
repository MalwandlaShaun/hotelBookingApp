import React from "react";
import "./About.css"; // Import your custom CSS file
import Footer from "../components/common/Footer/Footer";
import NavBar from "../components/common/NavBar/NavBar";

const About = () => {
  return (
    <div className="">
      {/* Navbar */}
      <div className="booking-container" style={{ margin: "0 5%" }}>
        <div className="top-header">
          <NavBar />
        </div>
      </div>
      {/* About Us */}
      <div className="about-container">
        <h1 className="text-center">About Me</h1>

        <div className="row">
          <div className="col-md-6 mx-auto">
            <p>
              Hello! My name is <span id="name"></span>
              <span id="surname"></span> and I am a software developer with over
              two years of experience building web applications with HTML, CSS,
              JavaScript, React, MongoDB, Express, and Node.
            </p>
            <p>
              I received my education from <span id="education"></span>, where I
              excelled in Mathematics and Physical Sciences, earning outstanding
              grades. Later, I studied <span id="major"></span> at
              <span id="university"></span>, where I majored in these fields and
              earned distinctions in Multivariable Calculus and Abstract
              Mathematics. Since then, I have continued to expand my knowledge
              and skills through various online resources and courses, including
              <span id="courses"></span>.
            </p>
            <section id="projects">
              <p>Here are some of the projects that I have completed:</p>
              <ul id="projects-list"></ul>
            </section>

            <p>
              In addition to my projects, I also have freelancing experience,
              which has taught me how to work with clients, other developers and
              also building responsive, accessible, and performant applications.
              During my time as a freelancer, I contributed to various projects
              and accomplishments.
            </p>
            <p>
              When I'm not coding, I enjoy playing video games and Video
              editing. My passion for these hobbies has taught me valuable
              skills, such as attention to detail, creativity, and storytelling,
              which I apply to my software development work to create engaging
              and intuitive user experiences.
            </p>
            <p>
              I am always looking for new challenges and opportunities to grow
              as a software developer. If you're interested in learning more
              about me or my work, please visit my portfolio website at
              <a
                href="https://malwandla-portfolio.netlify.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                malwandla-portfolio.netlify.com
              </a>
              . Thank you for taking the time to get to know me!
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;
