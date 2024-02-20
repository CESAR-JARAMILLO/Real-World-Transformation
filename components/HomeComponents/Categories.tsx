import React from 'react';
import { Box, Flex, useMediaQuery, Grid, Text, Link, VStack } from '@chakra-ui/react';

const Categories = () => {
  const [isLargerThanMD] = useMediaQuery("(min-width: 768px)");

  return (
    <Flex justifyContent="center" mt={isLargerThanMD ? "160px" : "120px"}>
      <Grid
        templateColumns={isLargerThanMD ? "repeat(2, 1fr)" : "1fr"}
        gap={6}
        mx={14}
      >
        <Flex direction="column" gap={6}>
          <Box 
            background="linear-gradient(rgba(33, 76, 206 ,0.3), rgba(33, 76, 206 ,0.3)), url('https://st2.depositphotos.com/1005563/8505/i/450/depositphotos_85057086-stock-photo-diet-and-fitness-vitamin-concept.jpg')"
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
              <Link href="/blogs" color="white">View Blog</Link>
            </VStack>
          </Box>
          <Box 
            background="linear-gradient(rgba(33, 76, 206 ,0.3), rgba(33, 76, 206 ,0.3)), url('https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg?cs=srgb&dl=pexels-victor-freitas-841130.jpg&fm=jpg')"
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
              <Link href="/blogs" color="white">View Blog</Link>
            </VStack>
          </Box>
        </Flex>
        <Box 
          background="linear-gradient(rgba(33, 76, 206 ,0.3), rgba(33, 76, 206 ,0.3)), url('https://media.istockphoto.com/id/618982838/photo/lace-up-for-the-workout-of-your-life.jpg?s=612x612&w=0&k=20&c=TiOXixIIyLNcP6GqKglpsZRUgliwxCVskeVI-dqCRec=')"
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
            <Link href="/blogs" color="white">View Blog</Link>
          </VStack>
        </Box>
      </Grid>
    </Flex>
  );
};

export default Categories;
