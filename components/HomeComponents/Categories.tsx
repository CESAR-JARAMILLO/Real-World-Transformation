import React from 'react';
import { Box, Flex, useMediaQuery, Grid, Text, Link, VStack } from '@chakra-ui/react';

const Categories = () => {
  const [isLargerThanMD] = useMediaQuery("(min-width: 768px)");

  return (
    <Flex justifyContent="center">
      <Grid
        templateColumns={isLargerThanMD ? "repeat(2, 1fr)" : "1fr"}
        gap={6}
        m={14}
      >
        <Flex direction="column" gap={6}>
          <Box 
            background="linear-gradient(rgba(0,0,0,0.75), rgba(0,0,0,0.75)), url('/images/fitness.jpg')"
            bgPosition="center"
            bgRepeat="no-repeat"
            bgSize="cover"
            minH="250px" 
            flex="1" 
            minW={{ base: "350px", md: "450px" }} 
            borderRadius={10}
            display="flex"
            alignItems="center"
            justifyContent="center"
            color="white"
          >
            <VStack spacing={2}>
              <Text fontSize="2xl" fontWeight="bold">DIET TIPS</Text>
              <Link href="#" color="white">View Blog</Link>
            </VStack>
          </Box>
          <Box 
            background="linear-gradient(rgba(0,0,0,0.75), rgba(0,0,0,0.75)), url('/images/fitness.jpg')"
            bgPosition="center"
            bgRepeat="no-repeat"
            bgSize="cover"
            minH="250px" 
            minW={{ base: "350px", md: "450px" }} 
            flex="1" 
            borderRadius={10}
            display="flex"
            alignItems="center"
            justifyContent="center"
            color="white"
          >
            <VStack spacing={2}>
              <Text fontSize="2xl" fontWeight="bold">EXCERSISE TIPS</Text>
              <Link href="#" color="white">View Blog</Link>
            </VStack>
          </Box>
        </Flex>
        <Box 
          background="linear-gradient(rgba(0,0,0,0.75), rgba(0,0,0,0.75)), url('/images/fitness.jpg')"
          bgPosition="center"
          bgRepeat="no-repeat"
          bgSize="cover"
          minH={isLargerThanMD ? "500px" : "250px"} 
          minW={{ base: "350px", md: "450px" }} 
          borderRadius={10}
          display="flex"
          alignItems="center"
          justifyContent="center"
          color="white"
        >
          <VStack spacing={2}>
            <Text fontSize="2xl" fontWeight="bold">LIFESTYLE TIPS</Text>
            <Link href="#" color="white">View Blog</Link>
          </VStack>
        </Box>
      </Grid>
    </Flex>
  );
};

export default Categories;
