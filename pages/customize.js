import Head from 'next/head';
import Image from 'next/image';
import { FaFacebook, FaLinkedin, FaGithub } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import LegendaryPlayers from '../public/Spacey (new) Logo  .png';

export default function Customise() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center text-gray-800 bg-white -mt-12">
            <Head>
                <title>Spacey</title>
                <meta name="description" content="Stay tuned for our upcoming website!" />
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
                <link rel="manifest" href="/site.webmanifest" />
                <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
                <meta name="msapplication-TileColor" content="#da532c" />
                <meta name="theme-color" content="#ffffff" />
            </Head>
            <div className="flex items-center space-x-4">
                <div className="w-24 h-auto">
                    <Image src={LegendaryPlayers} alt="Spacey Logo" width={70} height={86} />
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold">Spacey</h1>
            </div>
            <div className="text-center space-y-4 mt-4">
                <h2 className="text-6xl font-semibold mb-10">Coming Soon!</h2>
                <p className="text-base">Our website is under construction</p>
                <p className="text-base">Stay tuned to our social account for further information!!</p>
            </div>
            <div className="social-links flex space-x-4 mt-4">
                <a href="#" className="text-gray-700 hover:text-gray-900 transition duration-300 ease-in-out"><FaGithub className="w-8 h-8" /></a>
                <a href="#" className="text-gray-700 hover:text-gray-900 transition duration-300 ease-in-out"><FaLinkedin className="w-8 h-8" /></a>
                <a href="#" className="text-gray-700 hover:text-gray-900 transition duration-300 ease-in-out"><FaInstagramSquare className="w-8 h-8" /></a>
                <a href="#" className="text-gray-700 hover:text-gray-900 transition duration-300 ease-in-out"><FaFacebook className="w-8 h-8" /></a>
            </div>


        </div>
    )
}
