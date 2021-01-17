import { useState } from "react";
import clsx from "clsx";

const POSTER = "/1_0_poster.jpg";

const VIMEOS = [
  ["501301025", "501302594"],
  ["501304437", "501306722"],
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

    setCurrentVideo((s) => (s + 1) % VIMEOS[project].length);

    document.querySelectorAll("video").forEach((v) => {
      v.play();
    });
  };

  return (
    <div onClick={onClick}>
      <div
        className={clsx(
          "flex-none flex flex-col h-screen w-screen justify-center items-center text-xxs sm:text-xs"
        )}
      >
        <div className={clsx("relative px-10")}>
          <div className="object-contain inset-0 max-h-video">
            <img
              className={clsx(
                "m-auto object-contain inset-0 max-h-video outline-none",
                "transition-opacity duration-1500 opacity-0"
              )}
              src={POSTER}
            />
          </div>

          {VIMEOS[project].map((href, i) => (
            <iframe
              onClick={onClick}
              id={href}
              key={href}
              className={clsx(
                "absolute w-full h-full inset-0 outline-none",
                "transition-opacity duration-1500",
                showEmail && i === currentVideo ? "opacity-100" : "opacity-0"
              )}
              src={`https://player.vimeo.com/video/${href}?background=1`}
              width="506"
              height="564"
              frameBorder="0"
              allow="autoplay; fullscreen"
              allowFullScreen
            ></iframe>
          ))}
          <div className="absolute inset-0"></div>
        </div>
        <div className="content-center justify-center text-center">
          <a
            id="email"
            href="mailto:office@clovisbaronian.com"
            className={clsx(
              "tracking-widest transition-opacity duration-1500 block p-3",
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
          "cursor-default text-xxs sm:text-xs tracking-widest transition-opacity duration-1500 text-center fixed whitespace-nowrap",
          showTitle ? "opacity-100" : "opacity-0"
        )}
      >
        sam clovis + georgina baronian &amp; associates
      </span>
    </div>
  );
};

export async function getServerSideProps() {
  const project = Math.floor(Math.random() * VIMEOS.length);
  const image = Math.floor(Math.random() * VIMEOS[project].length);
  return {
    props: { project, image },
  };
}

export default HomePage;

