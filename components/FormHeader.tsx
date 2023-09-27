import React from 'react';
import { Box, Button, Collapse, FormControl, FormLabel, Input, Text, useDisclosure } from '@chakra-ui/react';
import ImageUploader from './ImageUploader';

interface FormHeaderProps {
  handleBlogTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setMainImageUrl: React.Dispatch<React.SetStateAction<string | null>>;
}

const FormHeader: React.FC<FormHeaderProps> = ({ handleBlogTitleChange, setMainImageUrl }) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <>
      <Text mb={2} textAlign={'center'} fontSize="2xl" fontWeight="bold">
        Blog Header
      </Text>
      <Button onClick={onToggle}>Toggle Header</Button>
      <Collapse in={isOpen} animateOpacity>
        <FormControl mt={4}>
          <FormLabel>Blog Title</FormLabel>
          <Input onChange={handleBlogTitleChange} />
        </FormControl>
        <ImageUploader setUrl={setMainImageUrl} imageSectionName={'Main Image'} />
      </Collapse>
    </>
  );
};

export default FormHeader;
