import type { AppProps } from 'next/app'
import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider, Session } from '@supabase/auth-helpers-react'
import { useState } from 'react'
import { ChakraProvider } from '@chakra-ui/react'

import Navbar from '../components/Navbar'
import Footer from '@/components/Footer'

export default function App({
  Component,
  pageProps,
}: AppProps<{
  initialSession: Session
}>) {
  // Create a new supabase browser client on every first render.
  const [supabaseClient] = useState(() => createPagesBrowserClient())

  return (
    <ChakraProvider>
      <SessionContextProvider
        supabaseClient={supabaseClient}
        initialSession={pageProps.initialSession}
      >
        <Navbar />
        <Component {...pageProps} />
        <Footer />
      </SessionContextProvider>
    </ChakraProvider>
  )
}