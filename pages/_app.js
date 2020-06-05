
import UserProvider from '../src/services/Providers/UserProvider';
import '@styles/global.css';

export default function App({ Component, pageProps }) {
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  );
}
