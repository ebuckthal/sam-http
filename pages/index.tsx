import { useState } from "react";
import clsx from "clsx";
import Head from "next/head";

const VIMEOS = [
  ["501301025", "501302594"],
  ["501304437", "501306722"],
  ["514807081", "514799946"],
];

const HomePage: React.FC<{ PROJECT: string[] }> = ({ PROJECT }) => {
  const [showTitle, setShowTitle] = useState(true);
  const [showEmail, setShowEmail] = useState(false);
  const [showId, setShowId] = useState(PROJECT[0]);

  const onClick = () => {
    if (showTitle) {
      document.querySelectorAll("video").forEach((v) => v.play());
      setShowTitle(false);
      setTimeout(() => setShowEmail(true), 100);
      return;
    }

    // Increment showId to next ID in the PROJECT list
    setShowId((s) => PROJECT[(PROJECT.indexOf(s) + 1) % PROJECT.length]);
  };

  return (
    <main className="text-xxs sm:text-xs text-center tracking-widest">
      <Head>
        <title>sam clovis + georgina baronian &amp; associates</title>
        <meta
          name="description"
          content="sam clovis + georgina baronian & associates"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div
        onClick={onClick}
        className="h-screen w-screen flex justify-center items-center"
      >
        <div
          className={clsx(
            "flex-none flex flex-col h-screen w-screen justify-center items-center",
            showTitle ? "hidden" : null
          )}
        >
          {/* CAROUSEL */}
          <div className="relative px-10">
            {/* This image is used to keep the "magic" height/width ratio */}
            <img
              className="object-cover w-full h-auto max-h-video"
              width="1088"
              height="1538"
              src="/1.png"
            />

            {PROJECT.map((id) => (
              <iframe
                onClick={onClick}
                id={id}
                key={id}
                className={clsx(
                  "absolute w-full h-full inset-0",
                  "transition-opacity duration-1500",
                  showEmail && id === showId ? "opacity-100" : "opacity-0"
                )}
                src={`https://player.vimeo.com/video/${id}?background=1&quality=720p`}
                allowFullScreen
              />
            ))}
            <div className="absolute inset-0"></div>
          </div>

          {/* EMAIL */}
          <div className="content-center justify-center">
            <a
              onClick={(e) => e.stopPropagation()}
              href="mailto:office@clovisbaronian.com"
              className={clsx(
                "transition-opacity duration-1500 block p-3 outline-none",
                showEmail ? "opacity-100" : "opacity-0"
              )}
            >
              office@clovisbaronian.com
            </a>
          </div>
        </div>

        {/* TITLE */}
        <span
          className={clsx(
            "cursor-default transition-opacity duration-1500 absolute",
            showTitle ? "opacity-100" : "opacity-0"
          )}
        >
          sam clovis + georgina baronian &amp; associates
        </span>
      </div>
    </main>
  );
};

export async function getServerSideProps() {
  function shuffleArray(array: any[]) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  }

  // choose a random project from list of VIMEO IDS and randomize it
  const PROJECT = VIMEOS[Math.floor(Math.random() * VIMEOS.length)];
  shuffleArray(PROJECT);

  return {
    props: { PROJECT },
  };
}

export default HomePage;

