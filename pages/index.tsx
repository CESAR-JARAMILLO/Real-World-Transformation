import Head from 'next/head';
import {
  Box,
  Button,
  Flex,
  Image,
  Heading,
  VStack,
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
        align="center"
        justify={{ base: 'center', md: 'space-around', xl: 'space-between' }}
        direction={{ base: 'column-reverse', md: 'row' }}
        wrap="nowrap"
        minH="70vh"
        px={{ base: 8, md: 24 }}
        mb={16}
      >
        <Box
          shadow="lg"
          rounded="lg"
          p={8}
          w="100%"
          maxW="lg"
        >
          <VStack
            spacing={4}
            align="stretch"
          >
            <Heading
              as="h1"
              size="xl"
              fontWeight="bold"
              color="primary.800"
              textAlign={['center', 'center', 'left', 'left']}
            >
              Real World Transformation
            </Heading>
            <Heading
              as="h2"
              size="md"
              color="primary.800"
              opacity="0.8"
              fontWeight="normal"
              lineHeight={1.5}
              textAlign={['center', 'center', 'left', 'left']}
            >
              Join us on a journey of transformation and discover the world of fitness like never before.
            </Heading>
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
        </Box>
        <Box
          w={{ base: '80%', sm: '60%', md: '50%' }}
          mb={{ base: 12, md: 0 }}
        >
          <Image src="/images/fitness.jpg" w={'100%'} rounded="1rem" shadow="2xl" />
        </Box>
      </Flex>
    </>
  );
}
