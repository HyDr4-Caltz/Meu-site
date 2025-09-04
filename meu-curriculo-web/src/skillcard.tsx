import { useState } from 'react'
import { Box, VStack, Image, Text, Center } from '@chakra-ui/react'
import { motion, AnimatePresence, type Variants } from 'framer-motion'

interface SkillCardProps{
    skill: {
        name: string;
        iconUrl: string;
        color: string;
        description: string;
    };
}


export const SkillCard = ({ skill }: SkillCardProps) => {

    console.log(skill);

    const [ishover, sethishover] = useState(false);



    return (
        <motion.div
            key={skill.name}
            whileHover={{scale: 1.1}}
            initial={{opacity: 0, y:20}}
            animate={{opacity: 1, y:0}}
            exit={{opacity: 0, y:-20}}
            transition={{duration: 0.3}}
            onMouseEnter={() => sethishover(true)}
            onMouseLeave={() => sethishover(false)}
        >
                <Box
                    p={6}
                    w='200px'
                    minH='150px'
                    borderRadius='md'
                    shadow='lg'
                    cursor='pointer'
                    
                    bgGradient={
                        ishover ? `linear(to-br, ${skill.color}, gray.800)` : 'linear(to-br, gray.700, gray.800)'
                    }
                    boxShadow={
                        ishover ? `0px 5px 20px ${skill.color}55` : 'none'
                    }
                    transition="all 0.3s ease-in-out"
                    overflow="hidden"
                >
                    <AnimatePresence mode='wait'>
                        {!ishover ? (
                            <motion.div
                                key='icon'
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                <VStack spacing={4} h="100%" justify='center'>
                                    <Image
                                        src={skill.iconUrl}
                                        alt={`logo da marca ${skill.name}`}
                                        boxSize='60px'
                                        objectFit='contain'
                                        />
                                        <Text fontWeight='bold'>{skill.name}</Text>
                                </VStack>
                            </motion.div>
                        ) : (
                            <motion.div
                                key='description'
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }} 
                            >
                                <Center h='100%' justifySelf='center'>
                                    <Text fontSize='sm' fontFamily='mono' textAlign='center'>
                                        {skill.description}
                                    </Text>
                                </Center>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </Box>
        </motion.div>
    );
};