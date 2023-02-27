import '../styles/main.scss';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Provider } from 'react-redux';
import store from '@/store/store';

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <Component {...pageProps} />
        {process.env.NODE_ENV === 'development' && (
          <ReactQueryDevtools initialIsOpem={false} position="bottom-left" />
        )}
      </Provider>
    </QueryClientProvider>
  );
}
