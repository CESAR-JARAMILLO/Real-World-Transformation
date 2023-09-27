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

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    console.log("handleFileChange triggered"); 
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    } else {
      alert("No file selected.");
      setFile(null);
    }
  };
  

  const handleFileInputClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleUpload = async () => {
    console.log("handleUpload started"); 
    if (!file) {
      console.warn('No file to upload.');
      return;
    }
  
    setIsUploading(true);
  
    try {
      const newName = `${Date.now()}${file.name}`;
      const { data, error: uploadError } = await supabase.storage.from('test').upload(newName, file);
  
      if (uploadError) {
        console.error("Upload error:", uploadError);
        return;
      }
  
      if (!data) {
        console.warn('Upload was successful, but no data was returned.');
        return;
      }
  
      const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/test/${data.path}`;
  
      if (user?.id) {
    
        setUrl(url);
        console.log(url);
      }
    } catch (e) {
      console.error('An unexpected error occurred:', e);
    } finally {
      setIsUploading(false);
      // resetFileInput();
    }
  };

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
            <FormControl isRequired>
              <FormLabel>Blog Title</FormLabel>
              <Input onChange={handleBlogTitleChange} />
            </FormControl>
            <FormControl>
              <input
                type="file"
                onChange={handleFileChange}
                accept="image/*"
                multiple={false}
                ref={fileInputRef}
                // style={{ display: 'none' }}
              />
              <Button variant="light" onClick={handleFileInputClick} color="green">
                Upload File
              </Button>
              <Button variant="light" onClick={handleUpload} color="blue">
  Start Upload
</Button>
            </FormControl>
          </Box>
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
          <Button onClick={handleSubmit} colorScheme="blue">
            Create Blog
          </Button>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default CreateBlogForm;
