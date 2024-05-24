import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';

const topics = {
    Chinese: ['Topic 1', 'Topic 2', 'Topic 3'],
    English: ['Topic A', 'Topic B', 'Topic C'],
    French: ['Sujet 1', 'Sujet 2', 'Sujet 3'],
    Business: ['Topic X', 'Topic Y', 'Topic Z'],
    Economics: ['Topic E1', 'Topic E2', 'Topic E3'],
    Geography: ['Topic G1', 'Topic G2', 'Topic G3'],
    History: ['Topic H1', 'Topic H2', 'Topic H3'],
    Philosophy: ['Topic P1', 'Topic P2', 'Topic P3'],
    Psychology: ['Topic PS1', 'Topic PS2', 'Topic PS3'],
    Biology: ['Topic B1', 'Topic B2', 'Topic B3'],
    Chemistry: ['Topic C1', 'Topic C2', 'Topic C3'],
    Mathematics: ['Topic M1', 'Topic M2', 'Topic M3'],
    Physics: ['Topic PH1', 'Topic PH2', 'Topic PH3'],
  };

export default function TopicPage() {
    const router = useRouter();
    const { subject } = router.query;
  
    const subjectTopics = topics[subject] || [];
  
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-gray-800">
        <Head>
          <title>{subject} - Spacey</title>
          <meta name="description" content={`Topics for ${subject}`} />
        </Head>
        <div className="w-full max-w-sm mx-auto px-4 mb-60">
          <div className="text-left mb-6">
            <h1 className="text-5xl font-bold mt-10 mb-10 text-black">{subject}</h1>
            <p className="-mt-5 mb-10 ml-3 text-black">Topics in {subject}</p>
          </div>
          <div className="text-center">
            <div className="flex flex-col items-center space-y-3">
              {subjectTopics.map((topic, index) => (
                <div key={index} className="w-full flex items-center border border-black rounded-lg px-4 py-2 mb-3">
                  <div className="text-2xl mr-4">{topic}</div>
                  <div className="relative w-full">
                    <label htmlFor={`labels-range-input-${index}`} className="sr-only">Labels range</label>
                    <input 
                      id={`labels-range-input-${index}`} 
                      type="range" 
                      defaultValue="1000" 
                      min="100" 
                      max="1500" 
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700" 
                    />
                    <div className="absolute w-full flex justify-between text-sm text-gray-500 dark:text-gray-400 -bottom-6">
                      <span>Easy</span>
                      <span>OK</span>
                      <span>Intermediate</span>
                      <span>Hard</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <Link href="/" passHref>
            <button className="mt-10 text-blue-500">Go back</button>
          </Link>
        </div>
      </div>
    );
}
