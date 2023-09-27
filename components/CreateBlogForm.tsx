import React, { ChangeEvent, useRef, useState } from 'react';
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
  Textarea,
} from '@chakra-ui/react';
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import ImageUploader from './ImageUploader';

const CreateBlogForm = () => {
  const user = useUser();
  const supabase = useSupabaseClient();
  const [blogTitle, setBlogTitle] = useState<string>('');
  const [paragraphOneTitle, setParagraphOneTitle] = useState<string>('');
  const [paragraphOne, setParagraphOne] = useState<string>('');
  const [slug, setSlug] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [url, setUrl] = useState<string | null>(null);

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
      main_image_url: url,
      slug,
      subtitle_1: paragraphOneTitle,
      paragraph_1: paragraphOne,
      category: 'health',
      user_id: user?.id,

    })
    .then(response => {console.log(response)})
  }

  return (
    <Card m="auto" mt={20} w="xl">
      <CardBody>
        <Stack divider={<StackDivider />} spacing="4">
          <Box>
            <FormControl>
              <FormLabel>Blog Title</FormLabel>
              <Input onChange={handleBlogTitleChange} />
            </FormControl>
            <ImageUploader setUrl={setUrl} imageSectionName={'Main Image'} />
          </Box>
          <Box>
            <FormControl>
              <FormLabel>Paragraph 1 Title</FormLabel>
              <Input onChange={handleParagraphOneTitleChange} />
            </FormControl>
            <FormControl>
              <FormLabel>Paragraph 1</FormLabel>
              <Textarea onChange={handleParagraphOneChange} />
            </FormControl>
          </Box>
          <FormControl>
            <FormLabel>Slug</FormLabel>
            <Textarea onChange={handleSlugChange} />
          </FormControl>
          <Button onClick={handleSubmit} colorScheme="blue">
            Create Blog
          </Button>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default CreateBlogForm;
