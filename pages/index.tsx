import { useState } from "react";
import clsx from "clsx";

const POSTER = "/1_0_poster.jpg";

const VIDEOS = [
  [
    { src: "/1_1_out.mp4" },
    { src: "/1_2_out.mp4" },
    { src: "/1_3_out.mp4" },
    { src: "/1_4_out.mp4" },
  ],
  [{ src: "/2_1_out.mp4" }, { src: "/2_2_out.mp4" }],
  [{ src: "/3_1_out.mp4" }, { src: "/3_2_out.mp4" }, { src: "/3_3_out.mp4" }],
];

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

      setTimeout(() => setShowEmail(true), 100);
    }

    setCurrentVideo((s) => (s + 1) % VIDEOS[project].length);
  };

  return (
    <div className="text-xxs sm:text-xs">
      <div
        className="absolute h-screen w-screen flex flex-col justify-center items-center"
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
        <div
          className={clsx(
            "flex-none flex relative w-full justify-center items-center",
            showTitle ? "hidden" : null
          )}
        >
          <div className="relative">
            <div className="object-contain inset-0">
              <img
                className={clsx(
                  "m-auto object-contain inset-0 max-h-3/4 outline-none",
                  "transition-opacity duration-1500 py-1 px-10 opacity-0"
                )}
                src={POSTER}
              />
            </div>
            {VIDEOS[project].map(({ src }, i) => (
              <video
                autoPlay
                playsInline
                muted
                loop
                key={src}
                className={clsx(
                  "absolute m-auto object-contain inset-0 max-h-3/4 md:max-h-video outline-none",
                  "transition-opacity duration-1500 py-1 px-10",
                  showEmail && i === currentVideo ? "opacity-100" : "opacity-0"
                )}
                src={src}
              />
            ))}
          </div>
        </div>
        <div className="content-center justify-center text-center">
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

