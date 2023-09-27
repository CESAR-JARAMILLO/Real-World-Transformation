import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardBody,
  FormControl,
  FormLabel,
  Input,
  Stack,
  StackDivider,
  Text,
  Textarea,
} from '@chakra-ui/react';
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import ImageUploader from './ImageUploader';
import FormSection from './FormSection';

const CreateBlogForm = () => {
  const user = useUser();
  const supabase = useSupabaseClient();
  const [blogTitle, setBlogTitle] = useState<string>('');
  const [paragraphOneTitle, setParagraphOneTitle] = useState<string>('');
  const [paragraphOne, setParagraphOne] = useState<string>('');
  const [slug, setSlug] = useState<string>('');
  const [mainImageUrl, setMainImageUrl] = useState<string | null>(null);
  const [sectionOneImageUrl, setSectionOneImageUrl] = useState<string | null>(null);

  const handleBlogTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBlogTitle(e.target.value);
  }

  const handleParagraphOneTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setParagraphOneTitle(e.target.value);
  }

  const handleParagraphOneChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setParagraphOne(e.target.value);
  }

  const handleSlugChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSlug(e.target.value);
  }

  const handleSubmit = () => {
    supabase.from('posts')
    .insert({
      title: blogTitle,
      main_image_url: mainImageUrl,
      subtitle_1: paragraphOneTitle,
      sub_image_url_1: sectionOneImageUrl,
      paragraph_1: paragraphOne,
      category: 'health',
      user_id: user?.id,
      slug,

    })
    .then(response => {console.log(response)})
  }

  return (
    <Card m="auto" mt={20} w="xl">
      <CardBody>
        <Stack divider={<StackDivider />} spacing="4">
          <Box>
            <Text mb={2} textAlign={'center'} fontSize="2xl" fontWeight="bold">
                Blog Header
            </Text>
            <FormControl>
              <FormLabel>Blog Title</FormLabel>
              <Input onChange={handleBlogTitleChange} />
            </FormControl>
            <ImageUploader setUrl={setMainImageUrl} imageSectionName={'Main Image'} />
          </Box>
          <FormSection
            handleParagraphOneTitleChange={handleParagraphOneTitleChange}
            handleParagraphOneChange={handleParagraphOneChange}
            setSectionOneImageUrl={setSectionOneImageUrl}
          />
          <Box>
            <Text mb={2} textAlign={'center'} fontSize="2xl" fontWeight="bold">
                Page Slug
            </Text>  
            <FormControl>
                <FormLabel>Slug</FormLabel>
                <Textarea onChange={handleSlugChange} />
            </FormControl>
          </Box>
          <Button onClick={handleSubmit} colorScheme="blue">
            Create Blog
          </Button>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default CreateBlogForm;
