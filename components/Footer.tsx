import React from 'react';
import { Box, Flex, Link, Spacer, Text, Icon, VStack, useMediaQuery, useColorModeValue, Divider, Image } from '@chakra-ui/react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { EmailIcon, PhoneIcon } from '@chakra-ui/icons'; // Importing Chakra UI icons

import FooterOverlay from './FooterOverlay';

const Footer = () => {
  const [isLargerThanMD] = useMediaQuery("(min-width: 768px)");

  return (
    <Box as="footer" role="contentinfo" mt="240px" py={"80px"} pt={{ base: '240px', md: '180px' }} pb={{ base: '4', md: '8' }} bg={'blackAlpha.900'} color="whiteAlpha.900" textAlign="center" position="relative">
      <FooterOverlay />
      <VStack direction="column" maxW="6xl" mx="auto" px={{ base: '6', md: '8' }} align={isLargerThanMD ? 'stretch' : 'center'} spacing="40px">
        <Flex direction={isLargerThanMD ? 'row' : 'column'} w="100%" justifyContent={isLargerThanMD ? 'space-between' : 'center'} align="center">
          <Box textAlign="center">
          <Image src="/images/logo.svg" alt="logo" mx="auto" display="block" />
            {!isLargerThanMD && <Divider borderColor="whiteAlpha.400" my="32px" w="320px" />}
          </Box>
          <Flex direction={{ base: 'column', md: 'row' }} mt={{ base: '0', md: '0' }} gap={{ base: 6, md: 20 }} textAlign="center">
            <Link href="/blogs">BLOG</Link>
            <Link href="/about">ABOUT</Link>
            <Link href="/contact">CONTACT</Link>
          </Flex>
        </Flex>
        {isLargerThanMD && <Divider borderColor="whiteAlpha.400" w="100%" />}
        <Flex direction={isLargerThanMD ? 'row' : 'column'} w="100%" justifyContent={isLargerThanMD ? 'space-between' : 'center'} align={isLargerThanMD ? "end" : "center"}>
          <VStack alignItems={isLargerThanMD ? 'flex-start' : 'center'} spacing={1} color={'whiteAlpha.600'}>
            <Text fontSize="lg" fontWeight="bold">Contact Us</Text>
            <Flex alignItems="center">
              <EmailIcon />
              <Text ml={2}>example@email.com</Text>
            </Flex>
            <Flex alignItems="center">
              <PhoneIcon />
              <Text ml={2}>+1 234 567 890</Text>
            </Flex>
          </VStack>
          <Flex direction="row" mt={{ base: '40px', md: '0' }} align="center" gap={8}>
            <Link href="#">
              <Icon as={FaFacebookF} color="#4169E1" boxSize={6} />
            </Link>
            <Link href="#">
              <Icon as={FaTwitter} color="#4169E1" boxSize={6} />
            </Link>
            <Link href="#">
              <Icon as={FaInstagram} color="#4169E1" boxSize={6} />
            </Link>
            <Link href="#">
              <Icon as={FaLinkedinIn} color="#4169E1" boxSize={6} />
            </Link>
          </Flex>
        </Flex>
      </VStack>
    </Box>
  );
};

export default Footer;
