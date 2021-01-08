import { useRef, useState } from "react";
import clsx from "clsx";

const VIDEOS = [["1_0.mp4", "1_1.mp4", "1_2.mp4"]];

const HomePage: React.FC<{ project: number; image: number }> = ({
  project,
  image,
}) => {
  const [animating, setAnimating] = useState(false);
  const [showTitle, setShowTitle] = useState(true);
  const [showEmail, setShowEmail] = useState(false);
  const [showVideo1, setShowVideo1] = useState(false);
  const [showVideo2, setShowVideo2] = useState(false);

  const [projectImage, setProjectImage] = useState(image);
  const [projectImage2, setProjectImage2] = useState(
    (image + 1) % VIDEOS[project].length
  );

  const onClick = function () {
    if (showTitle) {
      setShowTitle(false);
      setShowVideo1(true);

      setTimeout(() => {
        setShowEmail(true);
      }, 3000);
      return;
    }
    if (animating) {
      return;
    }
    setAnimating(true);

    setShowVideo1((s) => !s);
    setShowVideo2((s) => !s);

    setTimeout(() => {
      if (showVideo1) {
        setProjectImage((projectImage2 + 1) % VIDEOS[project].length);
      } else {
        setProjectImage2((projectImage + 1) % VIDEOS[project].length);
      }
      setAnimating(false);
    }, 1500);
  };

  return (
    <>
      <div
        className="absolute h-screen w-screen flex flex-col justify-center items-center text-xl md:text-base lg:text-xs"
        onClick={onClick}
      >
        <span
          id="name"
          className={clsx(
            "cursor-pointer tracking-widest transition-opacity duration-1500",
            showTitle ? "opacity-100" : "opacity-0"
          )}
        >
          sam clovis + georgina baronian &amp; associates
        </span>
      </div>
      <div
        className="absolute h-screen w-screen flex justify-center items-center text-xl md:text-base lg:text-xs"
        onClick={onClick}
      >
        <video
          src={VIDEOS[project][projectImage]}
          autoPlay
          loop
          muted
          playsInline
          className={clsx(
            "absolute object-contain transition-opacity duration-1500 flex-initial h-5/6",
            showVideo1 ? "opacity-100" : "opacity-0"
          )}
        />
        <video
          src={VIDEOS[project][projectImage2]}
          autoPlay
          loop
          muted
          playsInline
          className={clsx(
            "absolute object-contain transition-opacity duration-1500 flex-initial h-5/6",
            showVideo2 ? "opacity-100" : "opacity-0"
          )}
        />
        <div className="self-end content-center justify-center text-center mb-5">
          <a
            id="email"
            href="mailto:office@clovisbaronian.com"
            className={clsx(
              "tracking-widest transition-opacity duration-1500",
              showEmail ? "opacity-100" : "opacity-0"
            )}
          >
            office@clovisbaronian.com
          </a>
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps() {
  const project = Math.floor(Math.random() * VIDEOS.length);
  const image = Math.floor(Math.random() * VIDEOS[project].length);
  return {
    props: { project, image },
  };
}

export default HomePage;

