import React from "react";
import Typewriter from "typewriter-effect";
import styles from "./styles/register.module.css"

const ImageWithAnimation = ({ imageUrl, text }) => {
  return (
    <div
      className={`relative bg-blue-500 p-4 text-white ${styles.content_image}`}
      style={{
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        objectFit: "contain",
      }}
    >
      {/* Animación de escritura */}
      <div className="absolute inset-0 flex justify-center items-center">
        <h1 className="text-3xl md:text-3xl text-white">
          <Typewriter
            options={{
              strings: [text],
              autoStart: true,
              loop: true,
              delay: 75,
              deleteSpeed: 50,
              pauseFor: 7000,
            }}
          />
        </h1>
      </div>
    </div>
  );
};

export default ImageWithAnimation;
