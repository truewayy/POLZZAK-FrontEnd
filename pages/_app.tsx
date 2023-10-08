import '@/public/global.css';
import '@/public/calendar.css';

import { ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import { useState } from 'react';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { RecoilRoot } from 'recoil';

import { Interceptor } from '@/components/Interceptor';
import Layout from '@/components/Layout/layout';
import polzzakTheme from '@/public/theme/theme';

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  return (
    <Interceptor>
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <Hydrate state={pageProps.dehydratedState}>
            <ChakraProvider theme={polzzakTheme}>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </ChakraProvider>
          </Hydrate>
        </RecoilRoot>
      </QueryClientProvider>
    </Interceptor>
  );
}
