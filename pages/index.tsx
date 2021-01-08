import { useEffect, useState } from "react";

function HomePage() {
  const [animating, setAnimating] = useState(false);
  const [shown, setShown] = useState(null);

  const onClick = function () {
    if (animating) {
      return;
    }
    setAnimating(true);
    document.querySelector("#name").classList.add("opacity-0");

    const videos = ["#video-1", "#video-2"];
    setShown(
      shown === null
        ? Math.floor(Math.random() * videos.length)
        : shown === 1
        ? 0
        : 1
    );
    const show = videos.splice(shown, 1);

    document.querySelector(videos[0]).classList.remove("opacity-100");
    document.querySelector(videos[0]).classList.add("opacity-0");

    setTimeout(() => {
      document.querySelector("#name").classList.add("hidden");
      document.querySelector(videos[0]).classList.add("hidden");
      document.querySelector(show[0]).classList.remove("hidden");
      document.querySelector("#email").classList.remove("hidden");
      setTimeout(() => {
        document.querySelector("#email").classList.add("opacity-100");
        document.querySelector(show[0]).classList.add("opacity-100");
        setTimeout(() => {
          setAnimating(false);
        }, 1000);
      }, 200);
    }, 1000);
  };

  useEffect(() => {
    var videoAttr = {};
    Array.prototype.map.call(
      document.querySelectorAll('img[src*=".mp4"]'),
      function (img) {
        var src = img.src;
        img.src = null;

        img.addEventListener("error", function (e) {
          console.log("MP4 in image not supported. Replacing with video", e);
          var video = document.createElement("video");

          for (var key in videoAttr) {
            video.setAttribute(key, videoAttr[key]);
          }
          video.setAttribute("autoplay", "true");
          video.setAttribute("loop", "true");
          video.setAttribute("mute", "true");
          video.setAttribute("playsinline", "true");

          for (const attr of img.attributes) {
            video.setAttribute(attr.name, attr.value);
          }

          img.parentNode.insertBefore(video, img);
          img.parentNode.removeChild(img);
        });

        img.src = src;
      }
    );
  }, []);

  return (
    <div
      className="h-screen grid min-h-full w-screen justify-center content-center text-xl md:text-base lg:text-xs"
      onClick={onClick}
    >
      <div>
        <img
          id="video-1"
          src="/out_0.mp4"
          className="opacity-0 object-contain transition-opacity duration-1000 hidden max-h-99"
        />
        <img
          id="video-2"
          src="/out_1.mp4"
          className="opacity-0 object-contain transition-opacity duration-1000 hidden max-h-99"
        />
        <div className="flex flex-col content-center justify-center text-center mt-3">
          <span
            id="name"
            className="cursor-pointer tracking-widest transition-opacity duration-1000"
          >
            sam clovis + georgina baronian &amp; associates
          </span>
          <a
            id="email"
            href="mailto:office@clovisbaronian.com"
            className="hidden tracking-widest opacity-0 transition-opacity duration-1000"
          >
            office@clovisbaronian.com
          </a>
        </div>
      </div>
    </div>
  );
}

export default HomePage;

