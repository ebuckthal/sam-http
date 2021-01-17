import { useState } from "react";
import clsx from "clsx";
import Head from "next/head";

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

  const [currentVideo, setCurrentVideo] = useState(image);

  const onClick = function () {
    if (showTitle) {
      setShowTitle(false);
      setTimeout(() => setShowEmail(true), 100);
    }

    setCurrentVideo((s) => (s + 1) % VIMEOS[project].length);
  };

  return (
    <div className="text-xxs sm:text-xs text-center tracking-widest">
      <Head>
        <title>sam clovis + georgina baronian &amp; associates</title>
      </Head>
      <div
        onClick={onClick}
        className="h-screen w-screen flex justify-center items-center"
      >
        <div
          className={clsx(
            "flex-none flex flex-col h-screen w-screen justify-center",
            "items-center",
            showTitle ? "hidden" : null
          )}
        >
          <div className="relative px-10">
            {/* This image is used to keep the "magic" height/width ratio */}
            <img
              className="object-cover w-full h-auto max-h-video"
              src="/1.png"
            />

            {VIMEOS[project].map((id, i) => (
              <iframe
                onClick={onClick}
                id={id}
                key={id}
                className={clsx(
                  "absolute w-full h-full inset-0",
                  "transition-opacity duration-1500",
                  showEmail && i === currentVideo ? "opacity-100" : "opacity-0"
                )}
                src={`https://player.vimeo.com/video/${id}?background=1&quality=720p`}
                frameBorder="0"
                allow="autoplay; fullscreen"
                allowFullScreen
              ></iframe>
            ))}
            <div className="absolute inset-0"></div>
          </div>
          <div className="content-center justify-center">
            <a
              href="mailto:office@clovisbaronian.com"
              className={clsx(
                "transition-opacity duration-1500 block p-3",
                showEmail ? "opacity-100" : "opacity-0"
              )}
            >
              office@clovisbaronian.com
            </a>
          </div>
        </div>
        <span
          className={clsx(
            "cursor-default transition-opacity duration-1500 absolute",
            showTitle ? "opacity-100" : "opacity-0"
          )}
        >
          sam clovis + georgina baronian &amp; associates
        </span>
      </div>
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

