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
  const [titleFaded, setTitleFaded] = useState(false);

  const [currentVideo, setCurrentVideo] = useState(image);

  const onClick = function () {
    if (showTitle) {
      setShowTitle(false);

      setTimeout(() => setShowEmail(true), 100);
      setTimeout(() => setTitleFaded(true), 1000);
    }

    setCurrentVideo((s) => (s + 1) % VIDEOS[project].length);

    document.querySelectorAll("video").forEach((v) => {
      v.play();
    });
  };

  return (
    <>
      <div
        className={clsx(
          "flex-none flex flex-col h-screen w-screen justify-center items-center text-xxs sm:text-xs"
        )}
        onClick={onClick}
      >
        <div className={clsx("relative", showTitle ? "hidden" : null)}>
          <div className="object-contain inset-0">
            <img
              className={clsx(
                "m-auto object-contain inset-0 max-h-3/4 outline-none",
                "transition-opacity duration-1500 px-10 opacity-0"
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
                "transition-opacity duration-1500 px-10",
                showEmail && i === currentVideo ? "opacity-100" : "opacity-0"
              )}
              src={src}
            />
          ))}
        </div>
        <div className="content-center justify-center text-center">
          <a
            id="email"
            href="mailto:office@clovisbaronian.com"
            className={clsx(
              "tracking-widest transition-opacity duration-1500 block p-2",
              showTitle ? "hidden" : null,
              showEmail ? "opacity-100" : "opacity-0"
            )}
          >
            office@clovisbaronian.com
          </a>
        </div>
      </div>
      <span
        id="name"
        style={{
          transform: "translate(-50%, -50%)",
          left: "50%",
          top: "50%",
        }}
        className={clsx(
          "text-xxs sm:text-xs tracking-widest transition-opacity duration-1500 text-center fixed",
          showTitle ? "opacity-100" : "opacity-0"
        )}
      >
        sam clovis + georgina baronian &amp; associates
      </span>
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

