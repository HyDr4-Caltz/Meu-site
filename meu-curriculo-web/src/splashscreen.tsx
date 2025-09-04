import { background, Box, Heading } from '@chakra-ui/react';
import { VercelBadge } from './card';
import { memo, useMemo, useEffect } from 'react';
import Particles from '@tsparticles/react';
import { Opacity, type ISourceOptions } from "@tsparticles/engine"
import { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { Novocursor } from './customcursor';

interface SplashScreenProprs {
    onEnter: () => void;
}

export function SplashScreen({ onEnter }: SplashScreenProprs) {

    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadSlim(engine);
        });
    }, []);

    const opcaoparticulas: ISourceOptions = useMemo(
        () => ({
            background: {
                color: {
                    value: 'transparent',
                },
            },
            fpsLimit: 120,
            interactivity: {
                enable: false,
            },
            particles: {
                color: {
                    value: '#ffffff'
                },
                move: {
                    direction: 'bottom',
                    enable: true,
                    outModes: {
                        default: 'out',
                    },
                    random: false,
                    speed: 2,
                    straight: false,
                },
                number: {
                    density: {
                        enable: true,
                    },
                    value: 200,
                },
                opacity: {
                    value: 0.5,
                },
                shape: {
                    type: 'circle',
                },
                size: {
                    value: { min: 1, max: 3 },
                },
            },
            detectRetina: true,
        }),
        [],
    );

    return (
        <Box
        w='100vw'
        h='100vh'
        position={'fixed'}
        top={0}
        left={0}
        zIndex={100}
        cursor={'pointer'}
        onClick={onEnter}
        bg='bg.primary'
        >
            <Novocursor />
            <Particles 
                id='snow-particles' 
                options={opcaoparticulas}
                style={{
                    position: 'absolute',
                    zIndex: -1,
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    pointerEvents: 'none',
                }}
            />
            <Box 
            position={'absolute'} 
            top={0}
            left={0}
            w={'100vw'}
            h={'100vh'}
            >
                <VercelBadge scale={1.5} textureZoom={1} textureOffsetX={0.35} textureOffsetY={0.19}/>
            </Box>

            <Box
            position={'absolute'}
            top='50%'
            left='50%'
            transform={'translate(-50%, -50%)'}
            textAlign={'center'}
            >
                <Heading
                as='h1'
                size={'4xl'}
                color={'white'}
                fontFamily="'UnifrakturMaguntia', cursive"
                textShadow={'0 0 5px #00E5FF'}
                letterSpacing={'0.1em'}
                >
                    Daniel
                </Heading>
            </Box>
        </Box>
    );  
}