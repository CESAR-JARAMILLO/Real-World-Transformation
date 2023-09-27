import React from 'react';
import { Box, Text, FormControl, FormLabel, Input, Textarea, Collapse, useDisclosure, Button } from '@chakra-ui/react';
import ImageUploader from './ImageUploader';

interface FormSectionProps {
  handleParagraphOneTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleParagraphOneChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  setSectionOneImageUrl: React.Dispatch<React.SetStateAction<string | null>>;
  sectionTitle: string;
}

const FormSection: React.FC<FormSectionProps> = ({ handleParagraphOneTitleChange, handleParagraphOneChange, setSectionOneImageUrl, sectionTitle }) => {
  const { isOpen, onToggle } = useDisclosure();
  return (
    <>
      <Text mb={2} textAlign={'center'} fontSize="2xl" fontWeight="bold">
        {sectionTitle}
      </Text>
      <Button onClick={onToggle}>Toggle Section</Button>
      <Collapse in={isOpen} animateOpacity>
        <FormControl mt={4}>
          <FormLabel>Paragraph Title:</FormLabel>
          <Input onChange={handleParagraphOneTitleChange} />
        </FormControl>
        <ImageUploader setUrl={setSectionOneImageUrl} imageSectionName={'Section Image:'} />
        <FormControl>
          <FormLabel>Paragraph Content:</FormLabel>
          <Textarea onChange={handleParagraphOneChange} />
        </FormControl>
      </Collapse>
    </>
  );
};

export default FormSection;
