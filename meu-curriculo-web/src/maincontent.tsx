import React, { useRef, useState, useCallback } from 'react';
import {
  Box, Flex, Heading, VStack, Text, SimpleGrid, HStack, IconButton, Image, Grid, Tag, Button,
  transition
} from '@chakra-ui/react';
import { motion, useScroll, useSpring, AnimatePresence, type MotionValue, hover, type Variants } from 'framer-motion';
import { TimelineSVG } from './timeline';
import { SkillCard } from './skillcard';
import { ChevronLeftIcon, ChevronRightIcon, EmailIcon, Icon } from '@chakra-ui/icons';
import { ReactComponent as LinkedinIcon } from './icons/linkedin-original.svg';
import { ReactComponent as GithubIcon } from './icons/github-original.svg';
import { ReactComponent as WhatsappIcon} from './icons/cdnlogo.com_whatsapp-icon.svg';

const ContatoLink = ({ icon, href, text }: { icon: React.ElementType, href: string, text: string }) => (
  <HStack as="a" href={href} target="_blank" _hover={{ color: 'blue.300' }} spacing={3}>
    <Icon as={icon} boxSize='20px' />
    <Text>{text}</Text>
  </HStack>
);

export const MainContent = ({ data }: { data: any }) => {
  const experienceRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: experienceRef,
    offset: ["start center", "end end"]
  });
  const pathLength: MotionValue<number> = useSpring(scrollYProgress, { stiffness: 400, damping: 90 });

  const containervariant = {
    hidden: {},
    visibe: {
      opacity:1,
      transition: {
        staggerChildren: 5
      }
    }
  };

  const itemvariant = {
    hidden: {y:20, opacity: 0},
    visible: {y:20, opacity: 1}
  };



  const iconvariant: Variants = {
    rest: {
      rotate: 0,
      scale: 1,
      filter: "none"
    },
    hover: {
      scale: 1.5,
      filter: "drop-shadow(0 2px 2px rgba(255, 255, 255, 1))",
      rotate: [0, -15, 15, -15, 15, 0],
      transition: {duration: 0.5, ease: "easeInOut"}
    }
  };

  const MotionSimpleGrid = motion(SimpleGrid);
  const MotionBox = motion(Box);

  const [indiceAtual, setIndiceAtual] = useState(0);
  const [experienciaAberta, setExperienciaAberta] = useState<number | null>(null);
  const [contatoAberto, setContatoAberto] = useState(false);

  const skills = data.skills;
  const skillsVisiveis = skills.slice(indiceAtual, indiceAtual + 3);

  const Timeline_top_offset = 30;
  const Vertical_spacing = 750;
  const Timeline_Bottom = 300;

  const containerHeight = 
  Timeline_top_offset + 
  ((data.experiencia.length - 1) * Vertical_spacing) + 
  Timeline_Bottom;

  const irParaProximo = () => {
    if (indiceAtual + 3 < skills.length) {
      setIndiceAtual(indiceAtual + 3);
    }
  };

  const irParaAnterior = () => {
    if (indiceAtual > 0) {
      setIndiceAtual(indiceAtual - 3);
    }
  };

  const handleToggleExperiencia = useCallback((index: number) => {
    console.log('handleToggleExperiencia chamado com índice:', index);
    console.log('Estado atual experienciaAberta:', experienciaAberta);
    if (experienciaAberta === index) {
      console.log('Fechando experiência:', index);
      setExperienciaAberta(null);
    } else {
      console.log('Abrindo experiência:', index);
      setExperienciaAberta(index);
    }
    console.log('Novo estado será:', experienciaAberta === index ? null : index);
  }, [experienciaAberta]);

  return (
    <Box as="main">
      <Box 
        as={motion.div}
        initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        minHeight="100vh" display="flex" alignItems="center" justifyContent="center"
      >
        <Box maxW="container.lg" mx="auto" my={20} p={8} pb={10} bg="gray.800" borderRadius="xl" boxShadow="inner">
          <Heading as="h3" size="xl" textAlign="center" mb={12}>Habilidades</Heading>
          <Flex align="center" justify="center">
            <IconButton
              aria-label="Anterior" icon={<ChevronLeftIcon w={8} h={8} />}
              onClick={irParaAnterior} isRound size="lg" mr={8} bg="gray.600"
              _hover={{ bg: 'gray.500' }}
            />
            <AnimatePresence mode="wait">
              <motion.div
              variants={containervariant}
              initial='hidden'
              animate='visible'
              exit='hidden'
              key={indiceAtual}
              >
                <HStack spacing={8}>
                  {skillsVisiveis && skillsVisiveis.map((skill: any) => (
                    <motion.div key={skill.name} variants={itemvariant}>
                      <SkillCard skill={skill} />
                    </motion.div>
                  ))}
                </HStack>
              </motion.div>
            </AnimatePresence>
            <IconButton
              aria-label="Próximo" icon={<ChevronRightIcon w={8} h={8} />}
              onClick={irParaProximo} isRound size="lg" ml={8} bg="gray.600"
              _hover={{ bg: 'gray.500' }}
            />
          </Flex>
        </Box>
      </Box>

      <Box
        as={motion.div}
        initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        minHeight="100vh" display="flex" alignItems="center"
        py={20} ref={experienceRef} position={'relative'}
      >
        <Box maxW="container.lg" mx="auto" px={8} w={'100%'} h={`${containerHeight}px`}>
          <Heading as="h2" size="2xl" mb={12} color="blue.300" textAlign="center">
            Experiência Profissional
          </Heading>
          <Box position="relative" minH='500px'>
            <Box position={'absolute'} top={0} left={0}>
              <TimelineSVG scrollYProgress={pathLength} experiences={data.experiencia} onPointClick={handleToggleExperiencia} />
            </Box>
              {data.experiencia && data.experiencia.map((exp: any, index: number) => {
                const isOpen = experienciaAberta === index;

                const yPosition = Timeline_top_offset + (index * Vertical_spacing);

                console.log(`Experiência ${index}: experienciaAberta=${experienciaAberta}, index=${index}, isOpen=${isOpen}`);
                return (
                  <Box key={index} position="absolute" top={`${yPosition - 15}px`} left={'80px'} width={'calc(100% - 80px)'}>
                    <Box onClick={() => handleToggleExperiencia(index)} cursor="pointer" pb={4}>
                      <Heading as="h4" size="md">{exp.role}</Heading>
                      <Text fontSize="sm" color="gray.400" mb={2}>{exp.empresa} • {exp.period}</Text>
                    </Box>
                    {isOpen && (
                      <MotionBox whileHover={{scale: 1.05, boxShadow: '0px 10px 30px rgba(0, 229, 255, 0.2)'}} transition={{ duration: 0.3}}>
                        <>
                          {console.log(`Renderizando descrição para experiência ${index}:`, exp.description)}
                          <Box mt={2} p={4} bg="gray.800" borderRadius="md" border="1px" borderColor="gray.700">
                            <Text color="gray.300" fontSize="md" lineHeight="tall">{exp.description}</Text>
                          </Box>
                        </>
                      </MotionBox>
                    )}
                  </Box>
                );
              })}
          </Box>
        </Box>
      </Box>

      <Box
        as={motion.div}
        initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        minHeight="100vh" display="flex" alignItems="center" justifyContent="center"
      >
        <Box maxW="container.xl" mx="auto" px={8}>
          <Heading as="h2" size="2xl" mb={12} color="blue.300" textAlign="center">
            Projetos
          </Heading>
          <Box maxW={'container.lg'} mx='auto' my={'20'} p='10' bg="gray.800" borderRadius="xl" boxShadow="inner"> 
            <MotionSimpleGrid column={{base: 2, md:2, lg:3}} spacing={10} variants={containervariant} initial='hidden' whileInView={'visible'} viewport={{ once: true, amount: 0.2}}>
              {data.projetos && data.projetos.map((project: any, index: number) => (
                <MotionBox
                key={'index'} variants={itemvariant} 
                whileHover={{scale: 1.05, boxShadow: '0px 10px 30px rgba(0, 229, 255, 0.2)'}} 
                transition={{ duration: 0.3}}
                bg={'gray.900'} borderRadius={'lg'} overflow={'hidden'} border={'1px'} borderColor={'gray.700'} h={'100%'}>
                    <Image
                      src={project.img}
                      alt={`Screenshot do projeto ${project.name}`} w="100%" h="200px" objectFit="cover"
                    />
                    <Box p={6}>
                      <Heading as="h4" size="md" mb={2}>{project.name}</Heading>
                      <Text fontSize="sm" color="gray.400" mb={4}>{project.description}</Text>
                      <HStack spacing={2} mb={4} wrap="wrap">
                        {project.tecnologias.map((tech: string) => (
                          <Tag size="sm" key={tech} colorScheme="blue">{tech}</Tag>
                        ))}
                      </HStack>
                      <HStack spacing={4}>
                        <motion.div initial='rest' whileHover={'hover'}>
                          <Button as="a" 
                          href={project.link} target="_blank" leftIcon={
                            <motion.div variants={iconvariant}>
                              <GithubIcon width={'16px'} height={'16px'}/>
                            </motion.div>
                          } 
                          _hover={{bg:'gray.400'}}>
                            GitHub
                          </Button>
                        </motion.div>
                      </HStack>
                    </Box>
                </MotionBox>
              ))}
            </MotionSimpleGrid>
          </Box>
        </Box>
      </Box>

      <Box
        as={motion.div}
        initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        minHeight="100vh" display="flex" alignItems="center" justifyContent="center"
      >
        <Grid
          templateColumns={{ base: '1fr', md: '300px 1fr' }} gap={10} maxW="container.lg"
          mx="auto" px={8}
        >
          <Flex justify="center" align="center">
            <Image
              src="https://avatars.githubusercontent.com/u/76762518?s=400&u=ce6c557fdec729b77e7522ba91e7361a7ae3fdd6&v=4" alt="Foto de perfil" borderRadius="full"
              boxSize="300px" objectFit="cover" border="4px" borderColor="blue.400"
            />
          </Flex>
          <Box>
            <Heading as="h2" size="2xl" mb={6} color="blue.300" fontFamily="'Zhi Mang Xing', cursive">
              Sobre Mim
            </Heading>
            <Text fontSize="lg" lineHeight="tall" mb={8}>{data.about}</Text>
            <Box p={4} bg="blue.800" borderRadius="md" textAlign="center" cursor="pointer"
              _hover={{ bg: 'blue.700' }} transition="background-color 0.2s"
              onClick={() => setContatoAberto(!contatoAberto)}
            >
              <Text fontWeight="bold">{contatoAberto ? 'Fechar Contato' : 'Ver Contato'}</Text>
            </Box>
            <AnimatePresence>
              {contatoAberto && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }} style={{ overflow: 'hidden' }}
                  transition={{ duration: 0.5 }}
                >
                  <Box p={4} mt={4} bg="gray.800" borderRadius="md" border="1px" borderColor="blue.400">
                    <VStack spacing={4} align="start">
                      <ContatoLink icon={EmailIcon} href={`mailto:${data.contato.email}`} text={data.contato.email} />
                      <ContatoLink icon={LinkedinIcon} href={data.contato.linkedin} text="LinkedIn" />
                      <ContatoLink icon={GithubIcon} href={data.contato.github} text="GitHub" />
                      <ContatoLink icon={WhatsappIcon} href={`https://wa.me/${data.contato.numero.replace(/\D/g, '')}`} text={data.contato.numero} />
                    </VStack>
                  </Box>
                </motion.div>
              )}
            </AnimatePresence>
          </Box>
        </Grid>
      </Box>

    </Box>
  );
};