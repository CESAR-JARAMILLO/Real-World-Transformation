import React, { useState } from 'react';
import {
  Button,
  Card,
  CardBody,
  Stack,
  StackDivider,
} from '@chakra-ui/react';
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import FormSection from './FormSection';
import FormHeader from './FormHeader';
import FormPageSlug from './FormPageSlug';
import { useRouter } from 'next/router';

const CreateBlogForm = () => {
  const user = useUser();
  const supabase = useSupabaseClient();
  const router = useRouter();
  const [blogTitle, setBlogTitle] = useState<string>('');
  const [paragraphOneTitle, setParagraphOneTitle] = useState<string>('');
  const [paragraphOne, setParagraphOne] = useState<string>('');
  const [slug, setSlug] = useState<string>('');
  const [mainImageUrl, setMainImageUrl] = useState<string | null>(null);
  const [sectionOneImageUrl, setSectionOneImageUrl] = useState<string | null>(null);
  const [sectionTwoImageUrl, setSectionTwoImageUrl] = useState<string | null>(null);

  const handleBlogTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBlogTitle(e.target.value);
  }

  const handleParagraphTwoTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setParagraphOneTitle(e.target.value);
  }

  const handleParagraphOneTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setParagraphOneTitle(e.target.value);
  }

  const handleParagraphTwoChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setParagraphOne(e.target.value);
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
      subtitle_2: paragraphOneTitle,
      sub_image_url_1: sectionOneImageUrl,
      sub_image_url_2: sectionTwoImageUrl,
      paragraph_1: paragraphOne,
      paragraph_2: paragraphOne,
      category: 'health',
      user_id: user?.id,
      slug,

    })
    .then(response => {
      console.log(response)
      router.push(`/blogs/${slug}`)
    })
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
          <FormSection
            sectionTitle={'Section 2'}
            handleParagraphOneTitleChange={handleParagraphTwoTitleChange}
            handleParagraphOneChange={handleParagraphTwoChange}
            setSectionOneImageUrl={setSectionTwoImageUrl}
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
