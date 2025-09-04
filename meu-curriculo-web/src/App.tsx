import React, { useState, useEffect, useMemo } from 'react';
import { Box } from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

import { SplashScreen } from './splashscreen';
import { MainContent } from './maincontent'; // O nome do seu arquivo está em minúsculas
import { Novocursor } from './customcursor';

import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { ISourceOptions } from "@tsparticles/engine";

const MemoizedParticles = React.memo(({ options }: { options: ISourceOptions }) => {
  return (
    <Particles
      id="tsparticles"
      options={options}
      style={{
        position: 'fixed',
        zIndex: -1,
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
      }}
    />
  );
});

function App() {
  const [data, setData] = useState<any>(null);
  const [iniciou, setIniciou] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/curriculum');
        setData(response.data);
      } catch (error) {
        console.error("Erro ao buscar dados da API:", error);
      }
    };
    fetchData();
  }, []);

  const handleEnter = () => {
    if (!iniciou) {
      setIniciou(true);
    }
  };

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    });
  }, []);

  const options: ISourceOptions = useMemo(
    () => ({
        background: { color: { value: "transparent" } },
        fpsLimit: 120,
        interactivity: { enable: false },
        particles: {
            color: { value: "#00E5FF" },
            links: { color: "#00E5FF", distance: 150, enable: true, opacity: 0.3, width: 1 },
            move: { direction: "none", enable: true, outModes: { default: "bounce" }, random: false, speed: 1, straight: false },
            number: { density: { enable: true }, value: 80 },
            opacity: { value: 0.3 },
            shape: { type: "circle" },
            size: { value: { min: 1, max: 3 } },
        },
        detectRetina: true,
    }),
    [],
  );
  
  if (!data) {
    return null;
  }

  return (
    <Box>
      <Novocursor />
      <MemoizedParticles options={options} />

      <AnimatePresence>
        {!iniciou ? (
          <motion.div
            key="splash"
            exit={{ opacity: 0, transition: { duration: 1.0 } }}
          >
            <SplashScreen onEnter={handleEnter} />
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 1.2, delay: 0.5 } }}
          >
            <MainContent data={data} />
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
}

export default App;