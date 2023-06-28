import Head from 'next/head';
import {
  Box,
  Button,
  Flex,
  Heading,
  VStack,
  Text,
  Link
} from '@chakra-ui/react';

export default function Home() {
  return (
    <>
      <Head>
        <title>Real World Transformation</title>
        <meta name="description" content="Realistic goals" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Flex
        direction="column"
        alignItems="center"
        justifyContent="center"
        minH="70vh"
        backgroundImage="linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/images/fitness.jpg')"
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
        backgroundSize="cover"
        rounded="1rem"
        shadow="2xl"
        mt={12}
      >
        <VStack
          spacing={4}
          align="stretch"
          color="white"
          maxW={{ base: "90%", sm: "75%", md: "50%", lg: "35%" }}
          textAlign="center"
          p={8}
        >
          <Heading as="h1" size={{ base: "2xl", sm: "2xl", md: "3xl", lg: "3xl" }} fontWeight="bold" mb={4}>
            Real World Transformation
          </Heading>
          <Text as="h2" fontWeight="bold" lineHeight={1.5} mb={4}>
            Join us on a journey of transformation and discover the world of fitness like never before.
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
          >
            Start reading
          </Button>
        </VStack>
      </Flex>
    </>
  );
}
