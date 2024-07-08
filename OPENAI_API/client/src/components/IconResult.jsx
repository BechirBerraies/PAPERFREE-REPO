import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { XCircleIcon } from "@heroicons/react/24/solid";
import { delay, easeInOut, motion, spring } from "framer-motion";

function IconResult(props) {
  if (props.progress > 80 && props.progress <= 100) {
    return (
      <motion.div
        initial={{
          scale: 0,
          rotateZ: -180,
        }}
        animate={{
          scale: 1,
          rotateZ: 0,
          transition: {
            scale: {
              type: "tween",
              damping: 9,
              delay: 1,
              duration: 0.4,
            },
            rotateZ: {
              delay: 1,
              duration: 0.4,
              type: "spring",
              damping: 11,
            },
          },
        }}
      >
        <CheckCircleIcon className="text-green-500 inline-block w-14 h-14 " />
      </motion.div>
    );
  } else {
    return (
      <motion.div
        initial={{
          scale: 0,
          rotateZ: -180,
        }}
        animate={{
          scale: 1,
          rotateZ: 0,
          transition: {
            scale: {
              type: "tween",
              damping: 9,
              delay: 1,
              duration: 0.4,
            },
            rotateZ: {
              delay: 1,
              duration: 0.4,
              type: "spring",
              damping: 11,
            },
          },
        }}
      >
        <XCircleIcon className="text-red-600 inline-block w-14 h-14" />
      </motion.div>
    );
  }
}

export default IconResult;