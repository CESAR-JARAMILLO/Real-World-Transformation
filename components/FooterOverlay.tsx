import React from 'react';
import { Box, Heading, Text, Button, Flex, useMediaQuery } from '@chakra-ui/react';

const Overlay = () => {
  const [isLargerThanMD] = useMediaQuery("(min-width: 768px)");

  return (
    <Box position="absolute" top="5%" left="50%" transform="translate(-50%, -50%)" w="85%" bg="#4169E1" borderRadius={20} py={isLargerThanMD ? "72px" : "64px"} px={isLargerThanMD ? "95px" : "24px"}>
      <Flex direction={isLargerThanMD ? 'row' : 'column'} justifyContent="space-between" alignItems="center" color="white">
        <Box w={isLargerThanMD ? "40%" : "100%"} textAlign={isLargerThanMD ? "left" : "center"}>
          <Heading as="h3" size="lg">Let&apos;s talk about your project</Heading>
          <Text pt={2}>Ready to take it to the next level? Contact us today and find out how our expertise can help your business grow.</Text>
        </Box>
        <Button p={6} mt={{ base: '32px', md: '0' }} colorScheme="whiteAlpha">Get in touch</Button>
      </Flex>
    </Box>
  );
};

export default Overlay;
