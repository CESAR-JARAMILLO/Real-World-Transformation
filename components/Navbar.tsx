import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Session } from '@supabase/supabase-js';
import { signOut, getCurrentUserProfile } from '../pages/api/auth';
import { useRouter } from 'next/router';
import {
  Box,
  Flex,
  Avatar,
  Link,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
  IconButton,
  HStack,
  Image,
  Text
} from '@chakra-ui/react';
import { MoonIcon, SunIcon, HamburgerIcon, CloseIcon } from '@chakra-ui/icons';

interface NavLinkProps {
  name: string;
  href: string;
  onClick?: () => void;
  hoverBgColor: string;
}

const NavLink = ({ name, href, onClick, hoverBgColor }: NavLinkProps) => (
  <Link
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: hoverBgColor,
    }}
    href={href}
    onClick={onClick}
  >
    {name}
  </Link>
);

export default function Nav() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const hoverBgColor = useColorModeValue('white', 'gray.900');
  const [session, setSession] = useState<Session | null>(null);
  const [username, setUsername] = useState('');
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [blobUrl, setBlobUrl] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function getCurrentSession() {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (error) {
          throw error;
        }

        if (data && 'session' in data) {
          setSession(data.session);
        } else {
          setSession(null);
        }
      } catch (error) {
        console.error('Error getting session:', error);
        throw error;
      }
    }

    supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT') {
        setSession(session);
      } else if (event === 'SIGNED_IN') {
        setSession(session);
      }
    });

    const fetchAndSetUserData = async () => {
      const userProfile = await getCurrentUserProfile();
      if (userProfile && userProfile[0]) {
        setUsername(userProfile[0].username);
        setAvatarUrl(userProfile[0].avatar_url);
      }
    };

    getCurrentSession();
    fetchAndSetUserData();
  }, []);

  useEffect(() => {
    async function downloadImage(path: string) {
      try {
        const { data, error } = await supabase.storage.from('avatars').download(path);
        if (error) {
          throw error;
        }
  
        const url = URL.createObjectURL(data);
        setBlobUrl(url);
      } catch (error) {
        console.log('Error downloading image:', error);
      }
    }
  
    if (avatarUrl) {
      downloadImage(avatarUrl);
    }
  }, [avatarUrl]);

  const handleSignOut = async () => {
    signOut();
    router.push('/login');
  };

  const Links = session
    ? [
        { name: 'Home', href: '/' },
        { name: 'Posts', href: '/posts' },
        { name: 'About', href: '/about' },
        { name: 'Logout', href: '/login', onClick: handleSignOut },
      ]
    : [
        { name: 'Home', href: '/' },
        { name: 'Posts', href: '/posts' },
        { name: 'About', href: '/about' },
        { name: 'Login', href: '/login' },
      ];

  const menuItemHoverBgColor = useColorModeValue('whiteAlpha.200', 'whiteAlpha.100');
  const menuItemColor = session ? 'white' : 'gray.900';
  const menuItemBgColor = session ? '#4169E1' : 'white';
  const menuListBgColor = session ? '#4169E1' : 'white';

  return (
    <>
      <Box bg={useColorModeValue('white', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-around'}>
          <IconButton
            bgColor={useColorModeValue('white', 'gray.900')}
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <Image src="/images/logo.svg" alt="logo" display="block" />
          <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
            {Links.map((link) => (
              <NavLink key={link.name} name={link.name} href={link.href} onClick={link.onClick} hoverBgColor={hoverBgColor} />
            ))}
          </HStack>
          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={7}>
              <Button bgColor={useColorModeValue('white', 'gray.900')} onClick={toggleColorMode}>
                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              </Button>
              {session && (
                <Menu>
                  <MenuButton
                    as={Button}
                    rounded={'full'}
                    variant={'link'}
                    cursor={'pointer'}
                    minW={0}
                  >
                    <Avatar size={'sm'} src={blobUrl ?? undefined} />
                  </MenuButton>
                  <MenuList bg={menuListBgColor}>
                    <br />
                    <Center>
                      <Avatar size={'2xl'} src={blobUrl ?? undefined} />
                    </Center>
                    <br />
                    <Center>
                      <Text color="white">{username}</Text>
                    </Center>
                    <br />
                    <MenuDivider />
                    <MenuItem
                      as={Link}
                      href="/account"
                      color={menuItemColor}
                      bg={menuItemBgColor}
                      _hover={{
                        bg: menuItemHoverBgColor,
                      }}
                    >
                      Account
                    </MenuItem>
                    {session ? (
                      <MenuItem
                        onClick={handleSignOut}
                        color={menuItemColor}
                        bg={menuItemBgColor}
                        _hover={{
                          bg: menuItemHoverBgColor,
                        }}
                      >
                        Logout
                      </MenuItem>
                    ) : (
                      <MenuItem
                        as={Link}
                        href="/login"
                        color={menuItemColor}
                        bg={menuItemBgColor}
                        _hover={{
                          bg: menuItemHoverBgColor,
                        }}
                      >
                        Login
                      </MenuItem>
                    )}
                  </MenuList>
                </Menu>
              )}
            </Stack>
          </Flex>
        </Flex>
        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              {Links.map((link) => (
                <NavLink key={link.name} name={link.name} href={link.href} onClick={link.onClick} hoverBgColor={hoverBgColor} />
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}
