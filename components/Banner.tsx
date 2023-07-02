import React from 'react'
import { Box, Heading, Text, useMediaQuery, Image } from "@chakra-ui/react"

interface BannerProps {
  title: string;
  subtitle: string;
}

const Banner: React.FC<BannerProps> = ({ title, subtitle }) => {
  const [isLargerThanMD] = useMediaQuery("(min-width: 768px)");

  return (
    <Box 
      position="relative"
      minH="200px" 
      display="flex" 
      alignItems="center" 
      justifyContent="center" 
      flexDirection="column"
      backgroundColor="#4169E1"
      color="white"
      w={isLargerThanMD ? "80vw" : "100vw"}
      m="auto"
      mt={isLargerThanMD ? 10 : 2}
      borderRadius={10}
      overflow="hidden"
      textAlign="center"
      px={10}
    >
      <Image 
        src="/images/oval.svg" 
        alt="oval" 
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(0, -40%) rotate(180deg)"
        height="140%"
        width="100%"
        // objectFit="cover"
      />
      <Image 
        src="/images/oval.svg" 
        alt="oval" 
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-40%, -60%)"
        height="200%"
        width="100%"
        // objectFit="cover"
      />
      <Image 
        src="/images/oval.svg" 
        alt="oval" 
        position="absolute"
        top="80%"
        left="60%"
        transform="translate(-80%, -60%) rotate(180deg)"
        height="100%"
        width="100%"
        // objectFit="cover"
      />
      {isLargerThanMD &&
        <Image 
        src="/images/oval.svg" 
        alt="oval" 
        position="absolute"
        top="50%"
        left="10%"
        transform="translate(-50%, -50%) rotate(60deg)"
        height="130%"
        width="100%"
        // objectFit="cover"
      />
      }
      <Box position="relative">
        <Heading as="h1" size="2xl">{title}</Heading>
        <Text fontSize="lg" mt={2}>{subtitle}</Text>
      </Box>
    </Box>
  )
}

export default Banner
