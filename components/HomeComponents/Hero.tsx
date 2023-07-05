import {
  Box,
  Button,
  Heading,
  VStack,
  Text,
  Link,
  useMediaQuery,
  Grid,
  Image
} from '@chakra-ui/react';

const Hero = () => {
  const [isLargerThanMD] = useMediaQuery("(min-width: 768px)");

  return (
    <>
      <Grid
        templateColumns={isLargerThanMD ? "repeat(2, 1fr)" : "none"}
        alignItems={isLargerThanMD ? "end" : "start"}
        justifyContent="center"
        gap={6}
        minH={isLargerThanMD ? "70vh" : "100vh"}
        bg="#4169E1"
        px={isLargerThanMD ? "50px" : "24px"}
        pb="100px"
        position="relative"
        overflow="hidden"
        w={isLargerThanMD ? "80vw" : "100vw"}
        m="auto"
        mt={isLargerThanMD ? 10 : 2}
        borderRadius={10}
      >
        <Image src="images/oval.svg" alt="logo" position="absolute" right="0" top={isLargerThanMD ? "50%" : "100%"} transform="translateY(-50%)" w={isLargerThanMD ? "50%" : "100%"} h="100%" objectFit="cover" />
        <VStack
          spacing={4}
          align={isLargerThanMD ? "start" : "center"}
          justify="center"
          color="white"
          maxW={{ base: "100%", sm: "100%", md: "75%", lg: "60%" }}
          textAlign={isLargerThanMD ? "left" : "center"}
        >
          <Box>
            <Heading as="h1" size={{ base: "xl", sm: "xl", md: "xl", lg: "2xl" }} fontWeight="bold" mb={4} mt={isLargerThanMD ? "0" : "80px"}>
              Realistic Transformations for Real People
            </Heading>
            <Text as="h2" lineHeight={1.5} mb={4}>
              Discover realistic transformations and take control of your health and fitness journey today. Our blog is your source of inspiration and practical tips for sustainable change. Join our community and unlock the power within to achieve the life you deserve.
            </Text>
            <Button
              as={Link}
              colorScheme="whiteAlpha"
              borderRadius="10px"
              p={6}
              size="md"
              href="/blogs"
              width='50%'
            >
              Start reading
            </Button>
          </Box>
        </VStack>
        <Image 
          src="images/phone.svg" 
          alt="phone" 
          position="absolute" 
          bottom={isLargerThanMD ? "unset" : "10%"} 
          top={isLargerThanMD ? "65%" : "unset"} 
          left={isLargerThanMD ? "27%" : "auto"} 
          transform={isLargerThanMD ? "translateY(-50%)" : "translateY(50%)"} 
          w={isLargerThanMD ? "100%" : "full"} 
          h={isLargerThanMD ? "90%" : "70%"}
          mx="auto" 
          zIndex={0} 
        />
      </Grid>
    </>
  )
}

export default Hero
