/* eslint-disable react/jsx-props-no-spreading */

import 'styles/global.css';

export default function App({ Component, pageProps }) {
	return <Component {...pageProps} />;
}
