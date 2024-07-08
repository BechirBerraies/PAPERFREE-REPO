import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import { ChatBubbleLeftEllipsisIcon } from "@heroicons/react/24/solid";
import { ArrowLeftStartOnRectangleIcon } from "@heroicons/react/24/solid";
import IconResult from "./IconResult";

function Results() {

  let storedData = localStorage.getItem('data');
  let dataObject = storedData ? JSON.parse(storedData) : null;
  console.log(dataObject.accuracy);
  const [progressCIN, setProgressCIN] = useState(dataObject.accuracy); // Set the initial progress value for CIN
  const [progressPass, setProgressPass] = useState(50); // Set the initial progress value for Passeport
  const [progressCert, setProgressCert] = useState(20); // Set the initial progress value for Certificat de residance

  function getProgressBarColor(progress) {
    //function that determines the color of the progress bar
    if (progress >= 0 && progress <= 30) {
      return "bg-red-500"; // Red color for 0 to 30%
    } else if (progress > 30 && progress <= 80) {
      return "bg-yellow-500"; // Yellow color for 31 to 80%
    } else if (progress > 80 && progress <= 100) {
      return "bg-green-500"; // Green color for 81 to 100%
    } else {
      return "bg-gray-500"; // Default color if progress is out of expected range
    }
  }
  /* function that detects when elements are on screen and returns true, used for page animations  */
  function useIsVisible(ref) {
    const [isIntersecting, setIntersecting] = useState(false);

    useEffect(() => {
      const observer = new IntersectionObserver(([entry]) => {
        setIntersecting(entry.isIntersecting);
      });

      observer.observe(ref.current);
      return () => {
        observer.disconnect();
      };
    }, [ref]);

    return isIntersecting;
  }
  /* IsVisible1 is True if element appears on screen , so it goes from False to True and that's where the transition animation happens */
  const ref1 = useRef();
  const isVisible1 = useIsVisible(ref1); /*for main body animation */
  const ref2 = useRef();
  const isVisible2 = useIsVisible(ref2); /*for header only animation */
  const ref3 = useRef();
  const isVisible3 =
    useIsVisible(
      ref3
    ); /*for horizontal line animation (<hr> tag) because it fades in to 50% opacity only */
  return (
    <div>
      <header ref={ref2} className=" h-24">
        <div
          className={`flex justify-between transition ease-in-out duration-700 ${isVisible1 ? "opacity-100" : "opacity-0"}`}
        >
          <Link>
            <img
              className="w-60 mt-6 mr-4"
              src="../public/images/logoBETA.png"
            />
          </Link>
          <Link to="/">
            <div
              className="text-white border
            p-1 ml-6 mt-5
            hover:bg-red-600 ease-in-out duration-500
            hover:scale-105
            "
            >
              خروج
              <ArrowLeftStartOnRectangleIcon className="inline-block w-6 h-6 text-white ml-3s mr-2" />
            </div>
          </Link>
        </div>
        <hr
          ref={ref3}
          className={`mt-3 border-2
        mix-blend-overlay
        transition ease-in-out duration-700 ${isVisible3 ? "opacity-50" : "opacity-0"}
        `}
        />
      </header>
      <div
        ref={ref1}
        className={`flex justify-around 
      transition ease-in-out duration-300 ${isVisible1 ? "opacity-100" : "opacity-0"} 
      ease-in-out duration-700 ${isVisible1 ? "translate-x-0" : "translate-y-4"} `}
      >
        <div className="flex flex-col items-center w-80">
          <div className="h-44 w-full mb-3 border-2 border-gray-100 text-white text-center">
            CIN animation placeholder
          </div>

          <div
            className=" bg-gray-200 h-4 rounded-full w-full"
            style={{ direction: "ltr" }}
          >
            <motion.div
              className={`${getProgressBarColor(progressCIN)} h-full rounded-full `}
              initial={{ width: 0, opacity: 0 }}
              animate={{
                width: `${progressCIN}%`,
                opacity: 1,
                transition: {
                  width: {
                    ease: "easeInOut",
                    duration: 1,
                  },
                  opacity: {
                    duration: 0.1,
                  },
                },
              }}
            ></motion.div>
     
          </div>
          <div
            className="text-white text-center mt-1
          "
          >
            تواقف بنسبة {progressCIN} %
          </div>
          <div className="relative flex items-center">
            <ChatBubbleLeftEllipsisIcon className="w-6 h-6 text-black absolute ml-3s mr-2 pointer-events-none" />
            <button
              type="submit"
              className="
                bg-gradient-to-b from-[#FED33D] from-15% to-[#F67C0B]
                rounded-lg
                text-black text-lg 
                text-center
                font-semibold
                pl-2 pr-9 py-2 mt-2 mb-2

                hover:ease-in-out duration-500
                hover:
                "
            >
              <Link to="/">التفاصيل</Link>
            </button>
          </div>
          {/* <CheckCircleIcon className="text-green-500 inline-block mr-2 w-10 h-10 " /> */}
          <IconResult progress={progressCIN} />
        </div>
      </div>
    </div>
  );
}

export default Results;