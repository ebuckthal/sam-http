import { useState } from "react";
import clsx from "clsx";
import Head from "next/head";

const VIMEOS = [
  ["501301025", "501302594"],
  ["501304437", "501306722"],
  ["514807081", "514799946"],
  ["517577882", "514807517"],
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
    <main className="text-xxxs sm:text-xxs text-center">
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
          <div className={clsx("max-w-video mx-10")}>
            <div className="relative">
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

            {/* SECONDARY TITLE */}
            <div
              className={clsx(
                "flex flex-col content-center justify-center w-full",
                "transition-opacity duration-1500",
                showEmail ? "opacity-100" : "opacity-0"
              )}
            >
              <a
                onClick={(e) => e.stopPropagation()}
                href="mailto:office@clovisbaronian.com"
                className={clsx(
                  "block outline-none flex flex-row justify-between text-xxxs mt-1"
                )}
              >
                {"office@clovisbaronian.com".split("").map((s) => (
                  <span>{s}</span>
                ))}
              </a>
              <span
                className={clsx("text-xxxxs justify-single tracking-widest")}
              >
                ©2021 sam clovis + georgina baronian & associates
              </span>
            </div>
          </div>
        </div>

        {/* MAIN TITLE */}
        <span
          className={clsx(
            "cursor-default transition-opacity duration-1500 absolute tracking-widerest",
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
  //const PROJECT = VIMEOS[Math.floor(Math.random() * VIMEOS.length)];

  // randomize all videos from all PROJECTS
  const PROJECT = VIMEOS.flat();
  shuffleArray(PROJECT);

  return {
    props: { PROJECT },
  };
}

export default HomePage;

