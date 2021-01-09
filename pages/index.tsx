import { useEffect, useRef, useState } from "react";
import clsx from "clsx";

const VIDEOS = [["/1_0.mp4", "/1_1.mp4", "/1_2.mp4"]];

var videoAttr = { autoplay: true, loop: true, mute: true, playsinline: true };

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

  useEffect(() => {
    Array.prototype.map.call(
      document.querySelectorAll('img[src*=".mp4"]'),
      function (img) {
        var src = img.src;
        img.src = null;
        img.src = src;
        img.addEventListener("error", function (e) {
          console.log("MP4 in image not supported. Replacing with video", e);
          var video = document.createElement("video");

          video.setAttribute("autoplay", "true");
          video.setAttribute("loop", "true");
          video.setAttribute("muted", "true");
          video.setAttribute("playsinline", "true");

          for (
            var imgAttr = img.attributes, len = imgAttr.length, i = 0;
            i < len;
            i++
          ) {
            video.setAttribute(imgAttr[i].name, imgAttr[i].value);
          }

          img.parentNode.insertBefore(video, img);
          img.parentNode.removeChild(img);
        });
      }
    );
  }, []);

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
        <div className="flex-none flex h-screen-75 relative w-full justify-center items-center">
          {VIDEOS[project].map((src, i) => (
            <div
              key={src}
              className={clsx(
                "absolute transition-opacity duration-1500 inset-0",
                !showTitle && i === currentVideo ? "opacity-100" : "opacity-0"
              )}
            >
              <video
                className="m-auto object-contain inset-0 h-full"
                src={src}
                loop
                autoPlay
                muted
                playsInline
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

