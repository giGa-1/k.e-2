import 'src/styles/normalize.css';
// Import Swiper React components

// Import Swiper styles
import 'swiper/css';
import 'src/styles/globals.css'
import type { AppProps } from 'next/app'
import { wrapper } from 'redux/store';


const App = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />
}

export default wrapper.withRedux(App)
