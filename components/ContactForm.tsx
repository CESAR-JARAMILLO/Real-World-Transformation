import { Box, Text, Heading, useMediaQuery, Flex, Image, FormControl, FormLabel, Input, Textarea, Button } from "@chakra-ui/react";

const ContactForm = () => {
  const [isLargerThanMD] = useMediaQuery("(min-width: 768px)");


  return (
    <>
      {isLargerThanMD ? (
        <Flex
          position="relative"
          direction="row"
          borderRadius={20}
          bgColor="#4169E1"
          m="auto"
          mt={{ md: "80px", lg: "100px", xl: "120px" }}
          h={{ md: "75vh", lg: "70vh", xl: "65vh" }}
          w={{ base: "100%", sm: "90%", md: "88%", lg: "85%" }}
          overflow="hidden"
        >
          <Box w="50%" h="100%" color="white" flex="1" display="flex" flexDirection="column" justifyContent="center" px={{ md: 10, lg: 16, xl: 20 }}>
            <Heading zIndex={1} mb={8}>Contact Us</Heading>
            <Text zIndex={1} mb={6}>Ready to take it to the next level? Lets talk about your project or idea and find out how we can help your business grow. If you are looking for unique digital experiences thats relatable to your users, drop us a line.</Text>
            <Image 
              src="/images/oval.svg" 
              alt="oval" 
              position="absolute"
              top="55%"
              left="25%"
              transform="translate(-50%, -50%)"
              height="100%"
              width="100%"
              zIndex={0}
            />
          </Box>
          <Box w="50%" p={10}>
          <form name="contact" data-netlify="true">
          <input type="hidden" name="form-name" value="contact" />
          <FormControl id="name" mt={10}>
            <Input 
              type="text" 
              name="name" 
              placeholder="Name"
              border="none"
              borderBottom="1px solid white"
              borderRadius="0"
              color="white"
              _placeholder={{ color: 'white' }}
            />
          </FormControl>

          <FormControl id="email" mt={10}>
            <Input 
              type="email" 
              name="email" 
              placeholder="Email address"
              border="none"
              borderBottom="1px solid white"
              borderRadius="0"
              color="white"
              _placeholder={{ color: 'white' }}
            />
          </FormControl>

          <FormControl id="phone" mt={10}>
            <Input 
              type="tel" 
              name="phone" 
              placeholder="Phone"
              border="none"
              borderBottom="1px solid white"
              borderRadius="0"
              color="white"
              _placeholder={{ color: 'white' }}
            />
          </FormControl>

          <FormControl id="message" mt={10}>
            <Textarea
              name="message" 
              placeholder="Message"
              border="none"
              borderBottom="1px solid white"
              borderRadius="0"
              color="white"
              _placeholder={{ color: 'white' }}
            />
          </FormControl>

          <Button colorScheme="whiteAlpha" type="submit" px={10} mt={10}>
            Send
          </Button>
        </form>
          </Box>
        </Flex>
      ) : (
        <Flex
          position="relative"
          direction="column"
          borderRadius={{ base: 0, sm: 20 }}
          bgColor="#4169E1"
          m="auto"
          mt={{ base: "0", sm: "60px" }}
          w={{ base: "100%", sm: "90%" }}
          overflow="hidden"
        >
          <Box w="100%" color="white" flex="1" display="flex" flexDirection="column" justifyContent="center" px={{ base: 6, sm: 12 }} textAlign="center">
            <Heading mt={10} mb={4}>Contact Us</Heading>
            <Text mb={3}>Ready to take it to the next level? Lets talk about your project or idea and find out how we can help your business grow. If you are looking for unique digital experiences thats relatable to your users, drop us a line.</Text>
            <Image 
              src="/images/oval.svg" 
              alt="oval" 
              position="absolute"
              top="15%"
              left="50%"
              transform="translate(-20%, -40%) rotate(180deg)"
              height="50%"
              width="100%"
            />
            <Image 
              src="/images/oval.svg" 
              alt="oval" 
              position="absolute"
              top="15%"
              left="-10%"
              transform="translate(-20%, -40%) rotate(180deg)"
              height="30%"
              width="100%"
            />
          </Box>
          <Box h="100%" p={5}>
            <form name="contact" data-netlify="true">
              <input type="hidden" name="form-name" value="contact" />
              <FormControl id="name" mt={10}>
                <Input 
                  type="text" 
                  name="name" 
                  placeholder="Name"
                  border="none"
                  borderBottom="1px solid white"
                  borderRadius="0"
                  color="white"
                  _placeholder={{ color: 'white' }}
                />
              </FormControl>
  
              <FormControl id="email" mt={10}>
                <Input 
                  type="email" 
                  name="email" 
                  placeholder="Email address"
                  border="none"
                  borderBottom="1px solid white"
                  borderRadius="0"
                  color="white"
                  _placeholder={{ color: 'white' }}
                />
              </FormControl>
  
              <FormControl id="phone" mt={10}>
                <Input 
                  type="tel" 
                  name="phone" 
                  placeholder="Phone"
                  border="none"
                  borderBottom="1px solid white"
                  borderRadius="0"
                  color="white"
                  _placeholder={{ color: 'white' }}
                />
              </FormControl>
  
              <FormControl id="message" mt={10}>
                <Textarea
                  name="message" 
                  placeholder="Message"
                  border="none"
                  borderBottom="1px solid white"
                  borderRadius="0"
                  color="white"
                  _placeholder={{ color: 'white' }}
                />
              </FormControl>
  
              <Button colorScheme="whiteAlpha" type="submit" px={10} mt={10}>
                Send
              </Button>
            </form>
          </Box>
        </Flex>
      )}
    </>
  );
}

export default ContactForm