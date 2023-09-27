import React from 'react';
import { Box, Text, FormControl, FormLabel, Input, Textarea } from '@chakra-ui/react';
import ImageUploader from './ImageUploader';

interface FormSectionProps {
  handleParagraphOneTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleParagraphOneChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  setSectionOneImageUrl: React.Dispatch<React.SetStateAction<string | null>>;
}

const FormSection: React.FC<FormSectionProps> = ({ handleParagraphOneTitleChange, handleParagraphOneChange, setSectionOneImageUrl }) => {
  return (
    <Box>
      <Text mb={2} textAlign={'center'} fontSize="2xl" fontWeight="bold">
        Section 1
      </Text>
      <FormControl>
        <FormLabel>Paragraph 1 Title</FormLabel>
        <Input onChange={handleParagraphOneTitleChange} />
      </FormControl>
      <ImageUploader setUrl={setSectionOneImageUrl} imageSectionName={'Section 1 Image'} />
      <FormControl>
        <FormLabel>Paragraph 1</FormLabel>
        <Textarea onChange={handleParagraphOneChange} />
      </FormControl>
    </Box>
  );
};

export default FormSection;
