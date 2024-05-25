import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import emailjs from 'emailjs-com';
import { FaFacebook, FaLinkedin, FaGithub, FaInstagramSquare } from "react-icons/fa";
import LegendaryPlayers from '../public/Spacey (new) Logo  .png';

export default function Customise() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const validateEmail = (email) => {
        return email.toLowerCase().endsWith('@gmail.com');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateEmail(email)) {
            setMessage('Invalid email address. Please use a valid Gmail address.');
            return;
        }

        const templateParams = {
            to_email: email,
            message: 'Thank you for subscribing to Spacey! Stay tuned for our launch.',
        };

        try {
            await emailjs.send(
                'YOUR_SERVICE_ID',  // Replace with your EmailJS service ID
                'YOUR_TEMPLATE_ID', // Replace with your EmailJS template ID
                templateParams,
                'YOUR_USER_ID'      // Replace with your EmailJS user ID
            );
            setMessage('Subscription successful! Please check your email for confirmation.');
        } catch (error) {
            console.error(error);
            setMessage('Failed to send email. Please try again later.');
        }
    };

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
                <p className="text-base">Subscribe to be the first to know when we launch!</p>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-4 w-full max-w-md mt-4">
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="rounded-lg px-4 py-3 w-full border border-gray-300 focus:outline-none focus:border-blue-500"
                    placeholder="Your Email"
                    required
                />
                <button
                    type="submit"
                    className="bg-black hover:bg-white text-white hover:text-black hover:border-black-20 font-semibold rounded-lg px-6 py-3 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Subscribe
                </button>
            </form>
            {message && <p className="mt-4 text-lg">{message}</p>}
            <div className="social-links flex space-x-4 mt-4">
                <a href="#" className="text-gray-700 hover:text-gray-900 transition duration-300 ease-in-out"><FaGithub className="w-8 h-8" /></a>
                <a href="#" className="text-gray-700 hover:text-gray-900 transition duration-300 ease-in-out"><FaLinkedin className="w-8 h-8" /></a>
                <a href="#" className="text-gray-700 hover:text-gray-900 transition duration-300 ease-in-out"><FaInstagramSquare className="w-8 h-8" /></a>
                <a href="#" className="text-gray-700 hover:text-gray-900 transition duration-300 ease-in-out"><FaFacebook className="w-8 h-8" /></a>
            </div>
        </div>
    );
}
