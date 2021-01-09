import { useRef, useState } from "react";
import clsx from "clsx";

const VIDEOS = [["1_0.mp4", "1_1.mp4", "1_2.mp4"]];

const HomePage: React.FC<{ project: number; image: number }> = ({
  project,
  image,
}) => {
  const [showTitle, setShowTitle] = useState(true);
  const [showEmail, setShowEmail] = useState(false);

  const [currentVideo, setCurrentVideo] = useState(image);

  const onClick = function () {
    if (showTitle) {
      setShowTitle(false);

      setTimeout(() => {
        setShowEmail(true);
      }, 3000);
      return;
    }

    setCurrentVideo((s) => (s + 1) % VIDEOS[project].length);
  };

  return (
    <div className="text-xs sm:text-base">
      <div
        className="absolute p-3 h-screen w-screen flex flex-col justify-center items-center"
        onClick={onClick}
      >
        <span
          id="name"
          className={clsx(
            "cursor-pointer tracking-widest transition-opacity duration-1500 text-center",
            showTitle ? "opacity-100" : "opacity-0"
          )}
        >
          sam clovis + georgina baronian &amp; associates
        </span>
      </div>
      <div
        className="flex flex-col h-screen w-screen justify-center items-center"
        onClick={onClick}
      >
        <div className="flex-none h-5/6 relative w-full">
          {VIDEOS[project].map((src, i) => (
            <video
              id={src}
              src={src}
              loop
              autoPlay
              muted
              playsInline
              className={clsx(
                "absolute m-auto outline-none inset-0 object-contain transition-opacity duration-1500 h-full",
                !showTitle && i === currentVideo ? "opacity-100" : "opacity-0"
              )}
            />
          ))}
        </div>
        <div className="content-center justify-center text-center my-2">
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
    </div>
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

