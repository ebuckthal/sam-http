import { useEffect, useRef, useState } from "react";
import clsx from "clsx";

const VIDEOS = [
  [
    { src: "/1_0_out.mp4", poster: "/1_0_poster.jpg" },
    { src: "/1_1_out.mp4", poster: "/1_1_poster.jpg" },
    { src: "/1_2_out.mp4", poster: "/1_2_poster.jpg" },
    { src: "/1_3_out.mp4", poster: "/1_3_poster.jpg" },
  ],
];

const HomePage: React.FC<{ project: number; image: number }> = ({
  project,
  image,
}) => {
  console.log(project, image);
  const [showTitle, setShowTitle] = useState(true);
  const [showEmail, setShowEmail] = useState(false);

  const [currentVideo, setCurrentVideo] = useState(image);

  const onClick = function () {
    if (showTitle) {
      setShowTitle(false);

      setShowEmail(true);
    }

    setCurrentVideo((s) => (s + 1) % VIDEOS[project].length);
  };

  useEffect(() => {
    Array.prototype.map.call(
      document.querySelectorAll('img[src*=".mp4"]'),
      (img) => {
        var src = img.src;
        img.src = null;
        img.src = src;
        img.addEventListener("error", function (e) {
          console.log("MP4 in image not supported. Replacing with video");
          var video = document.createElement("video");

          video.setAttribute("autoplay", "true");
          video.setAttribute("loop", "true");
          video.setAttribute("muted", "true");
          video.setAttribute("playsinline", "true");

          for (const imgAttr of img.attributes) {
            if (imgAttr.name === "data-poster") {
              video.setAttribute("poster", imgAttr.value);
            } else {
              video.setAttribute(imgAttr.name, imgAttr.value);
            }
          }

          img.parentNode.insertBefore(video, img);
          img.parentNode.removeChild(img);
        });
      }
    );
  }, []);

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
        <div className="flex-none flex h-screen-75 relative w-full justify-center items-center">
          {VIDEOS[project].map(({ src, poster }, i) => (
            <div
              key={src}
              className={clsx(
                "absolute transition-opacity duration-1500 inset-0 p-3",
                !showTitle && i === currentVideo ? "opacity-100" : "opacity-0"
              )}
            >
              <img
                className="m-auto object-contain inset-0 h-full outline-none"
                data-poster={poster}
                src={src}
              />
            </div>
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

