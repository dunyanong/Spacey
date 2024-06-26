import Link from 'next/link';
import Head from 'next/head';
import { TbCircleLetterA } from "react-icons/tb";
import { MdOutlineChangeCircle } from "react-icons/md";
import { IoBookOutline } from "react-icons/io5";

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
                <IoBookOutline className="w-16 h-16 text-gray-800"/> {/* Smaller size for icon */}
                <h1 className="text-2xl sm:text-3xl font-bold mt-4 mb-3">Choose Your Syllabus</h1> {/* Responsive text size */}
            </div>
            <div className="space-y-4 grid grid-cols-1">
                <Link href="/a_level" legacyBehavior>
                    <a className="block text-center border border-gray-200 rounded-md shadow-md transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none bg-white text-gray-800 hover:bg-white hover:text-gray-800 hover:border-gray-200 p-4 sm:p-6 h-full"> {/* Responsive padding */}
                        <div className="flex flex-col items-center justify-center space-y-2 h-full">
                            <TbCircleLetterA className="w-8 h-8 text-gray-800" /> {/* Smaller size for icon */}
                            <span className="text-sm sm:text-lg font-semibold">A - Level</span> {/* Responsive text size */}
                        </div>
                    </a>
                </Link>
                <Link href="/customize" legacyBehavior> 
                    <a className="block text-center border border-gray-200 rounded-md shadow-md transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none bg-white text-gray-800 hover:bg-white hover:text-gray-800 hover:border-gray-200 p-4 sm:p-6 h-full w-l"> {/* Responsive padding */}
                        <div className="flex flex-col items-center justify-center space-y-2 h-full">
                            <MdOutlineChangeCircle className="w-8 h-8 text-gray-800" /> {/* Smaller size for icon */}
                            <div className="text-sm sm:text-lg font-semibold">Customize on your own</div> {/* Responsive text size */}
                        </div>
                    </a>
                </Link>
            </div>
        </div>
      </div>
    )
}
