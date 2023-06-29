import {
  Box,
  Button,
  Heading,
  VStack,
  Text,
  Link,
  useMediaQuery,
  Grid
} from '@chakra-ui/react';

const Hero = () => {
  const [isLargerThanMD] = useMediaQuery("(min-width: 768px)");

  return (
    <>
      <Grid
        alignItems={isLargerThanMD ? "center" : "start"}
        justifyContent="center"
        templateRows={isLargerThanMD ? "1fr" : "0.3fr 1fr"}
        minH="70vh"
        backgroundImage={isLargerThanMD ? "linear-gradient(rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.65)), url('/images/fitness.jpg')" : "none"}
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
        backgroundSize="cover"
        shadow="2xl"
      >
        {!isLargerThanMD && (
          <Box
            h="30vh"
            backgroundImage="linear-gradient(rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.65)), url('/images/fitness.jpg')"
            backgroundPosition="center"
            backgroundRepeat="no-repeat"
            backgroundSize="cover"
            width="full"
          />
        )}
        <VStack
          spacing={4}
          align="center"
          justify={isLargerThanMD ? "center" : "start"}
          color={isLargerThanMD ? "white" : "black"}
          maxW={{ base: "95%", sm: "75%", md: "65%", lg: "45%" }}
          textAlign="center"
          p={8}
        >
          <Heading as="h1" size={{ base: "xl", sm: "xl", md: "xl", lg: "2xl" }} fontWeight="bold" mb={4}>
          Realistic Transformations for Real People: Your Source for Health and Fitness Inspiration
          </Heading>
          <Text as="h2" lineHeight={1.5} mb={4}>
          Discover realistic transformations and take control of your health and fitness journey today. Our blog is your source of inspiration and practical tips for sustainable change. Join our community and unlock the power within to achieve the life you deserve.
          </Text>
          <Button
            as={Link}
            colorScheme="green"
            borderRadius="8px"
            py="4"
            px="4"
            lineHeight="1"
            size="md"
            href="/posts"
            width={'50%'}
          >
            Start reading
          </Button>
        </VStack>
      </Grid>
    </>
  )
}

export default Hero
