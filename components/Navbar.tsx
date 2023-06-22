import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient'
import { Session } from '@supabase/supabase-js'
import { signOut } from '../pages/api/auth'
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
  HStack
} from '@chakra-ui/react';
import { MoonIcon, SunIcon, HamburgerIcon, CloseIcon } from '@chakra-ui/icons';

interface NavLinkProps {
  name: string;
  href: string;
  onClick?: () => void;
}

const NavLink = ({ name, href, onClick }: NavLinkProps) => (
  <Link
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('gray.200', 'gray.700'),
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
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    async function getCurrentSession() {
      const { data, error } = await supabase.auth.getSession();
    
      if (error) {
        console.error('Error getting session:', error.message);
        throw error;
      }

      if (data && 'session' in data) {
        setSession(data.session);
      } else {
        setSession(null);
      }
    }
    
    supabase.auth.onAuthStateChange((event, session) => {
      if (event == 'SIGNED_OUT') {
        setSession(session)
      } else if (event == 'SIGNED_IN') {
        setSession(session)
      }
    })

    getCurrentSession();
  }, []);

  const handleSignOut = async () => {
    signOut()
  }

  const Links = session ? 
      [
        { name: 'Home', href: '/' },
        { name: 'Posts', href: '/posts' },
        { name: 'Logout', href: '/login', onClick: handleSignOut },
      ] : [
        { name: 'Home', href: '/' },
        { name: 'Posts', href: '/posts' },
        { name: 'Login', href: '/login' },
      ]

  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
            {Links.map((link) => (
              <NavLink key={link.name} name={link.name} href={link.href} onClick={link.onClick} />
            ))}
          </HStack>
          <Box>Real World Transformation</Box>
          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={7}>
              <Button onClick={toggleColorMode}>
                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              </Button>
              <Menu>
                <MenuButton
                  as={Button}
                  rounded={'full'}
                  variant={'link'}
                  cursor={'pointer'}
                  minW={0}
                >
                  <Avatar
                    size={'sm'}
                    src={'https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png'}
                  />
                </MenuButton>
                <MenuList alignItems={'center'}>
                  <br />
                  <Center>
                    <Avatar
                      size={'2xl'}
                      src={'https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png'}
                    />
                  </Center>
                  <br />
                  <Center>
                    <p>Username</p>
                  </Center>
                  <br />
                  <MenuDivider />
                  <MenuItem as={Link} href="/account">Account</MenuItem>
                  {session ? (
                    <MenuItem onClick={handleSignOut}>Logout</MenuItem>
                  ) : (
                    <MenuItem as={Link} href="/login">Login</MenuItem>
                  )}
                   
                </MenuList>
              </Menu>
            </Stack>
          </Flex>
        </Flex>
        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              {Links.map((link) => (
                <NavLink key={link.name} name={link.name} href={link.href} onClick={link.onClick} />
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}