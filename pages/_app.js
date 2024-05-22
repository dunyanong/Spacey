import '../styles/globals.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'


function MyApp({ Component, pageProps }) {

  return (
    <div className='flex flex-col min-h-screen bg-white text-black'>
      <div className='flex justify-center'>
        <Navbar />
      </div>
      <main className='flex-grow py-10 md:pt-20 lg:pt-20 px-10'>
        <Component {...pageProps} />
      </main>
      <footer className='mt-auto'>
        <Footer />
      </footer>
    </div>
  );
}

export default MyApp;