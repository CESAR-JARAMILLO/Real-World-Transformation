import { Box, Text, Heading, useMediaQuery, Flex, Image } from "@chakra-ui/react";

interface ImageTextBoxProps {
  imageUrl: any;
  backgroundColor: string;
  textColor: string;
  header: string;
  bodyTextOne: string;
  bodyTextTwo: string | null;
  isTextOnLeft: boolean;
}

const ImageTextBox: React.FC<ImageTextBoxProps> = ({
  imageUrl,
  backgroundColor,
  textColor,
  header,
  bodyTextOne,
  bodyTextTwo,
  isTextOnLeft,
}) => {
  const [isLargerThanMD] = useMediaQuery("(min-width: 768px)");

  return (
    <>
      {isLargerThanMD ? (
        <Flex
          position="relative"
          direction={isTextOnLeft ? "row" : "row-reverse"}
          borderRadius={20}
          bgColor={backgroundColor}
          m="auto"
          mt={{ md: "80px", lg: "100px", xl: "120px" }}
          h={ bodyTextTwo ? { md: "75vh", lg: "60vh", xl: "50vh" } : "50vh"}
          w={{ base: "100%", sm: "90%", md: "88%", lg: "85%" }}
          overflow="hidden"
        >
          <Box w="60%" h="100%" color={textColor} flex="1" display="flex" flexDirection="column" justifyContent="center" px={20}>
            <Heading mb={8}>{header}</Heading>
            <Text mb={6}>{bodyTextOne}</Text>
            <Text>{bodyTextTwo}</Text>
            <Image 
              src="/images/oval.svg" 
              alt="oval" 
              position="absolute"
              top="50%"
              left={isTextOnLeft ? "20%" : "80%"}
              transform="translate(-50%, -50%)"
              height="80%"
              width="100%"
            />
            <Image 
              src="/images/oval.svg" 
              alt="oval" 
              position="absolute"
              top="70%"
              right={isTextOnLeft ? "-50%" : "80%"}
              transform="translate(-50%, -50%) rotate(180deg)"
              height="50%"
              width="100%"
            />
          </Box>
          <Box w="40%">
            <Image src={imageUrl} alt={header} objectFit="cover" h="100%"/>
          </Box>
        </Flex>
      ) : (
        <Flex
          position="relative"
          direction="column-reverse"
          borderRadius={{ base: 0, sm: 20 }}
          bgColor={backgroundColor}
          m="auto"
          mt={{ base: "0", sm: "60px" }}
          h={bodyTextTwo ? { sm: "80vh" } : { sm: "68vh" }}
          w={{ base: "100%", sm: "90%" }}
          overflow="hidden"
        >
          <Box w="100%" color={textColor} flex="1" display="flex" flexDirection="column" justifyContent="center" px={{ base: 6, sm: 12 }} py={16}>
            <Heading mb={4}>{header}</Heading>
            <Text mb={3}>{bodyTextOne}</Text>
            <Text>{bodyTextTwo}</Text>
            <Image 
              src="/images/oval.svg" 
              alt="oval" 
              position="absolute"
              top="80%"
              left="50%"
              transform="translate(-20%, -40%) rotate(180deg)"
              height="50%"
              width="100%"
            />
            <Image 
              src="/images/oval.svg" 
              alt="oval" 
              position="absolute"
              top="50%"
              left="-10%"
              transform="translate(-20%, -40%) rotate(180deg)"
              height="30%"
              width="100%"
            />
          </Box>
          <Box h="100%">
            <Image src={imageUrl} alt={header} objectFit="cover"/>
          </Box>
        </Flex>
      )}
    </>
  );
};


export default ImageTextBox;
