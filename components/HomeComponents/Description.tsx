import React from 'react';
import { Box, Image, Grid, Text, useMediaQuery, Flex } from '@chakra-ui/react';

type DescriptionItemProps = {
  image: string;
  title: string;
  description: string;
};

const Description = () => {
  const [isLargerThanMD] = useMediaQuery("(min-width: 768px)");

const DescriptionItem: React.FC<DescriptionItemProps> = ({ image, title, description }) => (
  <Box textAlign="center" mb={5}>
    <Image src={image} alt={title} borderRadius="md" mx="auto" display="block" />
    <Text fontSize="xl" fontWeight="bold" mt={5}>
      {title}
    </Text>
    <Text px={isLargerThanMD ? 0 : 10} mt={2}>{description}</Text>
  </Box>
);

  return (
    <Flex justifyContent="center" mt={isLargerThanMD ? "160px" : "120px"}>
      <Grid templateColumns={isLargerThanMD ? "repeat(3, 1fr)" : "1fr"} gap={6} width={isLargerThanMD ? "80%" : "100%"}>
        <DescriptionItem
          image="images/description-image-1.svg"
          title="PASSIONATE"
          description="Each project starts with an in-depth brand research to ensure we only create products that serve a purpose. We merge art, design, and technology into exciting new solutions."
        />
        <DescriptionItem
          image="images/description-image-2.svg"
          title="RESOURCEFUL"
          description="Everything that we do has a strategic purpose. We use an agile approach in all of our projects and value customer collaboration. It guarantees superior results that fulfill our clients needs."
        />
        <DescriptionItem
          image="images/description-image-3.svg"
          title="FRIENDLY"
          description=" We are a group of enthusiastic folks who know how to put people first. Our success depends on our customers, and we strive to give them the best experience a company can provide."
        />
      </Grid>
    </Flex>
  );
};

export default Description;
