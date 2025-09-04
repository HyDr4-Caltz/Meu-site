import { Box } from '@chakra-ui/react';

export const Background = () => {
  return (
    <Box
      position="absolute"
      top="0"
      left="0"
      width="100%"
      height="100%"
      zIndex="-1"
      bgImage="url(https://imgur.com/a/rzCF3xT)"
      bgSize="cover"
      bgPosition="center"
    />
  );
};