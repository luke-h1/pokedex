import '../styles/global.css';
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import type { AppProps } from 'next/app';
import { useState } from 'react';

function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate
        state={
          (pageProps as unknown as { dehydratedState: never }).dehydratedState
        }
      >
        <Component {...pageProps} />
      </Hydrate>
    </QueryClientProvider>
  );
}

export default App;
