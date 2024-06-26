import Head from 'next/head'
import Image from 'next/image'
import dynamic from 'next/dynamic';

const SiGooglechat = dynamic(() => import('react-icons/si').then((module) => module.SiGooglechat), { ssr: false });
const SiYoutubemusic = dynamic(() => import('react-icons/si').then((module) => module.SiYoutubemusic), { ssr: false });
const GiVote = dynamic(() => import('react-icons/gi').then((module) => module.GiVote), { ssr: false });
const AiFillGithub = dynamic(() => import('react-icons/ai').then((module) => module.AiFillGithub), { ssr: false });

import LegendaryPlayers from '../public/Spacey (new) Logo  .png';
import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Spacey</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="apple-touch-icon" sizes="180x180" href="/Spacey Logo (2).png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/Spacey Logo (2).png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/Spacey Logo (2).png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/Spacey Logo (2).png" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      
      <div className='flex flex-col items-center justify-center min-h-screen -mt-20'>
        <section className="flex flex-col items-center">
          <div className='flex flex-col items-center md:px-5 lg:px-20 pt-20 pb-8 md:py-10 lg:py-10 h-auto'>
            <Image src={LegendaryPlayers} alt="Spacey Logo" width={70} height={86} />
            <div className="flex flex-col items-center gap-4 pt-6">
              <h1 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl">
                Welcome to Spacey!
              </h1>
              <p className="text-slate-500 text-base sm:text-lg md:text-xl">
                &#39;&#39;Your Time, Your Success&#39;&#39;
              </p>
            </div>
            <div className="flex gap-4 pt-6">
              <Link href="auth/Login" legacyBehavior>
                <a
                  className="inline-flex items-center justify-center text-xs sm:text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none data-[state=open]:bg-slate-100 bg-slate-900 text-white hover:bg-slate-700 h-11 px-4 sm:px-8 rounded-md"
                >
                  Show Schedule
                </a>
              </Link>
              <Link href="/studylist" legacyBehavior>
                <a
                  className="inline-flex items-center justify-center text-xs sm:text-sm font-medium transition-colors focus:outline-none focus:ring-2  disabled:opacity-50 disabled:pointer-events-none data-[state=open]:bg-slate-100 bg-transparent border border-slate-200 hover:bg-slate-100 h-11 px-4 sm:px-8 rounded-md"
                >
                  Customise Study Schedule 
                </a>
              </Link>
            </div>
          </div>
        </section>
      </div> 
    </div>
  )
}
