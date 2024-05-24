import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';


export default function Schedule() {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-gray-800">
        <Head>
          <title>Spacey</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          <link rel="manifest" href="/site.webmanifest" />
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
          <meta name="msapplication-TileColor" content="#da532c" />
          <meta name="theme-color" content="#ffffff" />
        </Head>

        <div className="w-full max-w-sm mx-auto px-4 mb-60">
            <div className="text-center flex flex-col items-center">
                <svg class="w-24 h-24 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.03v13m0-13c-2.819-.831-4.715-1.076-8.029-1.023A.99.99 0 0 0 3 6v11c0 .563.466 1.014 1.03 1.007 3.122-.043 5.018.212 7.97 1.023m0-13c2.819-.831 4.715-1.076 8.029-1.023A.99.99 0 0 1 21 6v11c0 .563-.466 1.014-1.03 1.007-3.122-.043-5.018.212-7.97 1.023"/>
                </svg>
                <h1 className="text-3xl font-bold mt-4 mb-3">Choose Your Syllabus</h1>
            </div>
            <div className="space-y-4">
                <Link href="/a_level" legacyBehavior>
                    <a className="block w-full text-center text-lg font-semibold transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none bg-slate-900 text-white hover:bg-white hover:text-black hover:border-black border border-transparent py-3 rounded-md my-10">
                        A - Level
                    </a>
                </Link>
                <Link href="" legacyBehavior> 
                    <a className="block w-full text-center text-lg font-semibold transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none bg-slate-900 text-white hover:bg-white hover:text-black hover:border-black border border-transparent py-3 rounded-md my-2">
                        Customize on your own
                    </a>
                </Link>
            </div>
        </div>
      </div>
    )
}
