import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';

const topics = {
  Chinese: ['Classical Chinese Literature', 'Modern Chinese History', 'Chinese Poetry'],
  English: ['Shakespearean Drama', 'Modernist Literature', 'Postcolonial Literature'],
  French: ['La Révolution Française', 'Le Symbolisme en Littérature', 'Littérature Contemporaine'],
  Business: ['Business Strategy and Planning', 'Marketing and Market Research', 'Financial Management'],
  Economics: ['Microeconomic Theory', 'Macroeconomic Policy', 'International Trade'],
  Geography: ['Physical Geography and Climate Change', 'Urban Geography and Development', 'Environmental Management'],
  History: ['The Tudor Period', 'The Cold War', 'The French Revolution'],
  Philosophy: ['Ethics and Moral Philosophy', 'Philosophy of Religion', 'Political Philosophy'],
  Psychology: ['Cognitive Psychology', 'Developmental Psychology', 'Clinical Psychology'],
  Biology: ['Cell Biology', 'Genetics and Evolution', 'Ecology and Conservation'],
  Chemistry: ['Organic Chemistry', 'Inorganic Chemistry', 'Physical Chemistry'],
  Mathematics: ['Calculus and Analysis', 'Algebra and Number Theory', 'Statistics and Probability'],
  Physics: ['Classical Mechanics', 'Quantum Physics', 'Thermodynamics']
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
            <p className="-mt-5 mb-10 text-black">Topics in {subject}</p>
          </div>
          <div className="text-center">
            <div className="flex flex-col items-center space-y-3">
              {subjectTopics.map((topic, index) => (
                <div key={index} className="w-full flex flex-col items-center border border-gray-600 rounded-lg px-4 py-2 mb-3 relative overflow-hidden bg-background p-2">
                  <div className="text-sm mr-4">{topic}</div>
                  <div className="relative w-full">
                    <label htmlFor={`labels-range-input-${index}`} className="sr-only">Labels range</label>
                    <input 
                      id={`labels-range-input-${index}`} 
                      type="range" 
                      defaultValue="1000" 
                      min="100" 
                      max="1500" 
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" 
                    />
                    <div className="w-full flex justify-between text-sm text-gray-500 -bottom-6">
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
