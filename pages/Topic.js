import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { FaSmile, FaMeh, FaFrown } from 'react-icons/fa';
import { auth, db } from '../utils/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { collection, doc, updateDoc, addDoc, serverTimestamp, getDocs, query, where } from "firebase/firestore";
import { topics } from '../data/topics';

export default function TopicPage() {
    const router = useRouter();
    const { subject } = router.query;
    const [user, loading] = useAuthState(auth);
    const [topicsWithDifficulties, setTopicsWithDifficulties] = useState({});
    const [selectedDate, setSelectedDate] = useState(new Date());
  
    const subjectTopics = topics[subject] || [];

    const handleRangeChange = (topicIndex, value) => {
        setTopicsWithDifficulties((prevTopics) => ({
            ...prevTopics,
            [topicIndex]: value
        }));
    };

    const submitTopic = async () => {
      const collectionRef = collection(db, "schedule");
      const promises = Object.entries(topicsWithDifficulties).map(async ([topicIndex, confidence]) => {
          const topic = subjectTopics[topicIndex];
          const querySnapshot = await getDocs(query(collectionRef, where("topic", "==", topic), where("user", "==", user.uid)));
          const existingDocs = querySnapshot.docs;
  
          if (existingDocs.length > 0) {
              // Update existing document
              const docId = existingDocs[0].id;
              const docRef = doc(collectionRef, docId);
              return updateDoc(docRef, {
                  confidence,
                  timestamp: serverTimestamp()
              });
          } else {
              // Add new document
              return addDoc(collectionRef, {
                  topic,
                  timestamp: serverTimestamp(),
                  user: user.uid,
                  avatar: user.photoURL,
                  username: user.displayName,
                  email: user.email,
                  date: selectedDate.toISOString(),
                  confidence,
              });
          }
      });
  
      await Promise.all(promises);
      
      // Reset the state after submitting
      setTopicsWithDifficulties({});
  };
  
  
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
                            <div key={index} className="w-full flex flex-col items-center border border-gray-200 rounded-lg px-4 py-2 mb-3 relative overflow-hidden p-2">
                                <div className="text-md font-medium">{topic}</div>
                                <div className="relative w-full">
                                    <label htmlFor={`labels-range-input-${index}`} className="sr-only">Labels range</label>
                                    <input 
                                        id={`labels-range-input-${index}`} 
                                        type="range" 
                                        defaultValue="50" 
                                        min="0" 
                                        max="100" 
                                        className="w-full h-2 bg-gray-200 text-black rounded-lg appearance-none cursor-pointer" 
                                        onChange={(e) => handleRangeChange(index, e.target.value)}
                                    />
                                    <div className="w-full flex justify-between text-lg text-gray-500 -bottom-6">
                                        <FaFrown style={{ color: 'red' }} />
                                        <FaMeh style={{ color: 'orange' }} />
                                        <FaSmile style={{ color: 'green' }} />                                        
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='flex justify-between items-center'>
                    <Link href="/a_level" passHref>
                        <button className="mt-10 text-blue-500">Go back</button>
                    </Link>
                    <Link href="/studylist" passHref>
                      <button className="mt-10 text-blue-500" onClick={submitTopic}>Submit</button>
                    </Link>                    
                </div>
            </div>
        </div>
    );
}
