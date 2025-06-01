import { useState } from "react";
import Globe from "react-globe.gl";
import {
  CITIES_DATA,
  ARCS_DATA,
  RINGS_DATA,
  GLOBE_CONFIG,
  ANIMATION_CONFIG,
  INITIAL_CAMERA_POSITION,
} from "../constants/EarthData.js";
import Button from "../components/Button.jsx";
import AnimatedCoding from "../components/AnimatedCoding.jsx";
import RotaryDial from "../components/RotaryDial.jsx";

const About = () => {
  const [hasCopied, setHasCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("isafwansayeed@gmail.com");
    setHasCopied(true);

    setTimeout(() => {
      setHasCopied(false);
    }, 2000);
  };

  return (
    <section className="c-space my-20" id="about">
      <div className="grid xl:grid-cols-3 xl:grid-rows-6 md:grid-cols-2 grid-cols-1 gap-5 h-full">
        <div className="col-span-1 xl:row-span-3">
          <div className="grid-container">
            <img
              src="./assets/grid1.gif"
              alt="grid-1"
              className="w-full sm:h-[276px] h-fit object-contain"
            />

            <div>
              <p className="grid-headtext">Hi, I'm Safwan Sayeed</p>
              <p className="grid-subtext">
                I am an Undergraduate Student pursuing a B.E in Computer Science
                and Engineering. I am passionate about Coding, specializing in
                Web, Blockchain development, Game and Android applications. I
                enjoy exploring innovative solutions and creating engaging
                experiences through technology.
              </p>
            </div>
          </div>
        </div>

        <div className="col-span-1 xl:row-span-3">
          <div className="grid-container">
            <AnimatedCoding />
            <div>
              <p className="grid-headtext">Tech Stack</p>
              <p className="grid-subtext">
                I specialize in a diverse range of languages, frameworks, and
                tools to build robust and scalable applications. My focus is on
                creating dynamic user experiences, beautiful front-end
                applications, powerful backend logic, and efficient data
                management while utilizing modern development tools like cloud
                services for seamless deployment.
              </p>
            </div>
          </div>
        </div>

        <div className="col-span-1 xl:row-span-4">
          <div className="grid-container">
            <div className="rounded-3xl w-full sm:h-[326px] h-fit flex justify-center items-center">
              <Globe
                height={326}
                width={326}
                {...GLOBE_CONFIG}
                pointsData={CITIES_DATA}
                pointColor={() => "#ffffff"}
                pointAltitude={0.02}
                pointRadius={(d) => d.size * 0.3 + 0.2}
                pointsMerge={ANIMATION_CONFIG.pointsMerge}
                pointsTransitionDuration={
                  ANIMATION_CONFIG.pointsTransitionDuration
                }
                arcsData={ARCS_DATA}
                arcColor={(d) => d.color}
                arcDashLength={() => Math.random() * 0.4 + 0.3}
                arcDashGap={() => Math.random() * 0.3 + 0.1}
                arcDashAnimateTime={() => 2000 + Math.random() * 3000}
                arcStroke={() => Math.random() * 0.5 + 0.25}
                arcsTransitionDuration={ANIMATION_CONFIG.arcsTransitionDuration}
                arcAltitude={() => Math.random() * 0.4 + 0.1}
                arcAltitudeAutoScale={ANIMATION_CONFIG.arcAltitudeAutoScale}
                arcCurveResolution={ANIMATION_CONFIG.arcCurveResolution}
                arcCircularResolution={ANIMATION_CONFIG.arcCircularResolution}
                ringsData={RINGS_DATA}
                ringColor={() =>
                  `rgba(255,255,255,${Math.random() * 0.4 + 0.2})`
                }
                ringMaxRadius="maxR"
                ringPropagationSpeed="propagationSpeed"
                ringRepeatPeriod="repeatPeriod"
                ringResolution={ANIMATION_CONFIG.ringResolution}
                enablePointerInteraction={
                  ANIMATION_CONFIG.enablePointerInteraction
                }
                lineHoverPrecision={ANIMATION_CONFIG.lineHoverPrecision}
                pointOfView={INITIAL_CAMERA_POSITION}
              />
            </div>
            <div>
              <p className="grid-headtext">
                I'm very flexible with time zone communications & locations
              </p>
              <p className="grid-subtext">
                I'm based in India, Bangalore, but my work knows no borders. I'm
                open to remote work opportunities worldwide and excited to
                collaborate with teams from diverse backgrounds. Feel free to
                reach out if you're looking for a dedicated and passionate team
                member!!
              </p>
              <a
                href="https://www.linkedin.com/in/safwan-sayeed-6a3a482a9"
                target="_blank"
              >
                <Button
                  name="Contact Me"
                  isBeam
                  containerClass="w-full mt-10"
                />
              </a>
            </div>
          </div>
        </div>

        <div className="xl:col-span-2 xl:row-span-3">
          <div className="grid-container">
            <img
              src="./assets/grid3.png"
              alt="grid-3"
              className="w-full sm:h-[266px] h-fit object-contain"
            />

            <div>
              <p className="grid-headtext">My Passion for Coding</p>
              <p className="grid-subtext">
                I love solving problems and building innovative solutions
                through code. Programming is not just my profession; it's my
                passion. I enjoy exploring new technologies and continuously
                enhancing my skills.<br></br>
                In my free time, I engage in:<br></br>⦿ Working on personal
                projects to create impactful applications<br></br>⦿ Contributing
                to open-source projects, giving back to the community and
                collaborating with fellow developers<br></br>⦿ Competitive
                coding to sharpen my problem-solving abilities<br></br>⦿ Ethical
                hacking to understand security challenges better<br></br>
                Coding is more than just a job for me - it's a way to learn,
                grow, and make a difference!
              </p>
            </div>
          </div>
        </div>

        <div className="xl:col-span-1 xl:row-span-2">
          <div className="grid-container flex flex-col items-center">
            <p className="grid-headtext">Contact me</p>
            <div className="w-full flex justify-center items-center">
              <RotaryDial />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
