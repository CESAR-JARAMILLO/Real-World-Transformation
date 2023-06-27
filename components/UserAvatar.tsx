import { useState, useEffect, SetStateAction } from 'react';
import { Box, Button, Center, Avatar, Spinner } from '@chakra-ui/react';
import { supabase } from '../lib/supabaseClient';

interface UserAvatarProps {
  uid: string | undefined;
  url: string;
  size: number | "sm" | "md" | "lg" | "xl" | "2xl" | "2xs" | "xs" | "full";
  onUpload: (url: string) => void;
}

export default function UserAvatar({ uid, url, size, onUpload }: UserAvatarProps) {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    async function downloadImage(path: string) {
      try {
        const { data, error } = await supabase.storage.from('avatars').download(path);
        if (error) {
          throw error;
        }

        const url = URL.createObjectURL(data);
        setAvatarUrl(url);
      } catch (error) {
        console.log('Error downloading image: ', error);
      }
    }

    if (url) downloadImage(url);
  }, [url]);

  const uploadAvatar = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.');
      }

      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const filePath = `${uid}-${Math.random()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage.from('avatars').upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      onUpload(filePath);
    } catch (error) {
      console.error('Error uploading avatar:', error);
      alert('Error uploading avatar!');
    } finally {
      setUploading(false);
    }
  };

  const sizeValue = typeof size === 'number' ? `${size}px` : size;

  return (
    <Box>
      <Box>
        {avatarUrl ? (
          <Avatar name="Avatar" src={avatarUrl} size={sizeValue} />
        ) : (
          <Box className="avatar no-image" h={sizeValue} w={sizeValue} />
        )}
        <Center mt={4}>
          <Button
            className="button primary"
            as="label"
            htmlFor="single"
            disabled={uploading}
            variant={uploading ? 'disabled' : 'solid'}
          >
            {uploading ? (
              <>
                <Spinner color="white" size="sm" mr={2} />
                Uploading ...
              </>
            ) : (
              'Upload'
            )}
          </Button>
        </Center>
        <input
          style={{
            visibility: 'hidden',
            position: 'absolute',
          }}
          type="file"
          id="single"
          accept="image/*"
          onChange={uploadAvatar}
          disabled={uploading}
        />
      </Box>
    </Box>
  );
}
