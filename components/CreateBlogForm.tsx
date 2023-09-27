import { Card, CardBody, Stack, StackDivider, FormControl, FormLabel, Input, Textarea, Button, Box } from '@chakra-ui/react'
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import React, { useState } from 'react'

const CreateBlogForm = () => {
  const user = useUser();
  const supabase = useSupabaseClient();
  const [blogTitle, setBlogTitle] = useState('');
  const [paragraphOneTitle, setParagraphOneTitle] = useState('');
  const [paragraphOne, setParagraphOne] = useState('');
  const [slug, setSlug] = useState('');


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
    .insert({title: 'The Best'})
    .then(response => {console.log(response)})
  }

  return (
    <Card m='auto' mt={20} w='xl'>
      <CardBody>
      <Stack divider={<StackDivider />} spacing='4'>
        <FormControl isRequired>
          <FormLabel>Blog Title</FormLabel>
          <Input onChange={handleBlogTitleChange} />
        </FormControl>
        <Box>
          <FormControl isRequired>
            <FormLabel>Paragraph 1 Title</FormLabel>
            <Input onChange={handleParagraphOneTitleChange} />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Paragraph 1</FormLabel>
            <Textarea onChange={handleParagraphOneChange} />
          </FormControl>
        </Box>
        <FormControl isRequired>
            <FormLabel>Slug</FormLabel>
            <Textarea onChange={handleSlugChange} />
          </FormControl>
        <Button onClick={handleSubmit} colorScheme='blue'>Create Blog</Button>
      </Stack>
      </CardBody>
    </Card>
  )
}

export default CreateBlogForm