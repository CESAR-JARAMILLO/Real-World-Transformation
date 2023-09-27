import React from 'react';
import { Box, Text, FormControl, FormLabel, Input, Collapse, useDisclosure, Button } from '@chakra-ui/react';

interface FormPageSlugProps {
  handleSlugChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormPageSlug: React.FC<FormPageSlugProps> = ({ handleSlugChange }) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <>
      <Text mb={2} textAlign={'center'} fontSize="2xl" fontWeight="bold">
        Page Slug
      </Text>
      <Button onClick={onToggle}>Toggle Section</Button>
      <Collapse in={isOpen} animateOpacity>
        <FormControl>
          <FormLabel>Slug</FormLabel>
          <Input onChange={handleSlugChange} />
        </FormControl>
      </Collapse>
    </>
  );
};

export default FormPageSlug;
