import '@styles/global.css';
import UserProvider from '../src/services/Providers/UserProvider';

export default function App({ Component, pageProps }) {
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  );
}
