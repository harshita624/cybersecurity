

import React from "react";
import Particles from "@tsparticles/react";
import { loadFull } from "@tsparticles/engine";


const ParticlesBackground = () => {
  const particlesInit = async (main) => {
    await loadFull(main);
  };

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        // Your particle options here
      }}
    />
  );
};

export default ParticlesBackground;
