import '../styles/globals.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { ChakraProvider } from '@chakra-ui/react'

function MyApp({ Component, pageProps }) {

  return (
    <ChakraProvider>
      <div className='flex flex-col min-h-screen bg-white text-black'>
        <div className='flex justify-center'>
          <Navbar />
        </div>
        <main className='flex-grow py-10 md:pt-20 lg:pt-20 px-10'>
          <Component {...pageProps} />
        </main>
      </div>
    </ChakraProvider>
  );
}

export default MyApp;