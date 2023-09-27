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
import FormSection from './FormSection';
import FormHeader from './FormHeader';
import FormPageSlug from './FormPageSlug';

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

  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
        <FormHeader 
            handleBlogTitleChange={handleBlogTitleChange}
            setMainImageUrl={setMainImageUrl}
          />
          <FormSection
            sectionTitle={'Section 1'}
            handleParagraphOneTitleChange={handleParagraphOneTitleChange}
            handleParagraphOneChange={handleParagraphOneChange}
            setSectionOneImageUrl={setSectionOneImageUrl}
          />
          <FormPageSlug
            handleSlugChange={handleSlugChange}
          />
          <Button onClick={handleSubmit} colorScheme="blue">
            Create Blog
          </Button>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default CreateBlogForm;
