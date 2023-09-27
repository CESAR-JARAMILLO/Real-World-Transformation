import React, { useRef, useState } from 'react';
import { Alert, AlertDescription, AlertIcon, Button, Flex, FormControl, Spinner, Text } from '@chakra-ui/react';
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';

interface ImageUploaderProps {
  setUrl: React.Dispatch<React.SetStateAction<string | null>>;
  imageSectionName: string;
}

const ImageUploader = ({ setUrl, imageSectionName }: ImageUploaderProps) => {
  const supabase = useSupabaseClient();
  const user = useUser();
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [alertSuccessText, setAlertSuccessText] = useState<string>('');
  const [alertErrorText, setAlertErrorText] = useState<string>('');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setAlertSuccessText(`${selectedFile.name} file selected.`);
    } else {
      setAlertErrorText("No file selected.");
      setFile(null);
    }
  };

  const handleFileInputClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleUpload = async () => {
    if (!file) {
      console.warn('No file to upload.');
      return;
    }

    setIsLoading(true);

    try {
      const newName = `${Date.now()}${file.name}`;
      const { data, error } = await supabase.storage.from('test').upload(newName, file);
      
      if (error) {
        console.error("Upload error:", error);
        return;
      }
      
      const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/test/${data?.path}`;
      setUrl(url);

    } catch (e) {
      console.error('An unexpected error occurred:', e);
    } finally {
      setIsLoading(false);
      setAlertSuccessText('Successfully uploaded file.');
    }
  };

  return (
    <FormControl pt={5}>
      <input
        type="file"
        onChange={handleFileChange}
        accept="image/*"
        multiple={false}
        ref={fileInputRef}
        style={{ display: 'none' }}
      />
      <Text fontWeight={'500'}>{imageSectionName}</Text>
      <Flex mt={3} align={'center'} justify={'space-around'}>
        <Button onClick={handleFileInputClick}>
          {file ? file.name : 'Select File'}
        </Button>
        <Button onClick={handleUpload} isDisabled={isLoading}>
          Start Upload
        </Button>
      </Flex>
      {alertErrorText || alertSuccessText && (
        <Alert mt={4} status={alertErrorText ? 'error' : 'success'}>
          <AlertIcon />
          <AlertDescription>{alertErrorText ? alertErrorText : alertSuccessText}</AlertDescription>
        </Alert>
      )}
    </FormControl>
  );
};

export default ImageUploader;
