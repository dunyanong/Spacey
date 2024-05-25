import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { collection, query, where, orderBy, limit, onSnapshot, doc, updateDoc, addDoc, deleteDoc, serverTimestamp, getDoc } from "firebase/firestore";
import { Box, VStack, Heading, Flex, Input, IconButton, Button } from "@chakra-ui/react";
import { FaCalendarAlt, FaPlus } from "react-icons/fa";
import { useDisclosure } from "@chakra-ui/react";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styled from '@emotion/styled';
import { auth, db } from "../utils/firebase";
import Head from "next/head";

const StudyList = () => {
  const [message, setMessage] = useState({ schedule_detail: "" });
  const [messages, setMessages] = useState([]);
  const [user, loading] = useAuthState(auth);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { isOpen, onOpen, onClose } = useDisclosure();
  const route = useRouter();
  const routeData = route.query;

  const submitMessage = async (e) => {
    e.preventDefault();
    if (!message.schedule_detail) {
      console.log("No message written");
      return;
    }
    if (message.schedule_detail.length > 1000) {
      console.log("Message is too long 🤡");
      return;
    }
  
    try {
      if (message?.hasOwnProperty("id")) {
        const docRef = doc(db, "schedule", message.id);
        const updatedMessage = { ...message, timestamp: serverTimestamp() };
        await updateDoc(docRef, updatedMessage);
        console.log("Document updated successfully:", updatedMessage);
      } else {
        const collectionRef = collection(db, "schedule");
        const newMessage = {
          ...message,
          timestamp: serverTimestamp(),
          user: user.uid,
          avatar: user.photoURL,
          username: user.displayName,
          email: user.email,
          date: selectedDate.toISOString(),
        };
        await addDoc(collectionRef, newMessage);
        console.log("Document added successfully:", newMessage);
        setMessage({ schedule_detail: "" });
      }
    } catch (error) {
      console.error("Error adding or updating document: ", error);
    }
  };

  useEffect(() => {
    if (!user) return;
    
    const q = query(
      collection(db, "schedule"),
      where("user", "==", user.uid),  // Filter by authenticated user's UID
      orderBy("timestamp", "desc"),
      limit(10)
    );
  
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedMessages = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(fetchedMessages);
    });
  
    return () => unsubscribe();
  }, [user]);
  

  const checkUser = async () => {
    if (loading) return;
    if (!user) route.push("/auth/Login");
    if (routeData.id) {
      setMessage({ schedule_detail: routeData.schedule_detail, id: routeData.id });
    }
  };

  useEffect(() => {
    checkUser();
  }, [user, loading]);

  const groupedMessages = {};

  messages.forEach((msg) => {
    const date = new Date(msg.date);
    const today = new Date();
    const diffDays = Math.ceil((date - today) / (1000 * 60 * 60 * 24));

    let heading = "";
    if (diffDays === 0) {
      heading = "Today";
    } else if (diffDays === 1) {
      heading = "Tomorrow";
    } else if (diffDays === -1) {
      heading = "Yesterday";
    } else {
      heading = date.toLocaleDateString(); // Format the date as desired
    }

    groupedMessages[heading] = groupedMessages[heading] || [];
    groupedMessages[heading].push(msg);
  });

  const sortedGroupedMessages = Object.keys(groupedMessages)
    .sort((a, b) => {
      if (a === "Today" || a === "Tomorrow" || a === "Yesterday") return -1;
      if (b === "Today" || b === "Tomorrow" || b === "Yesterday") return 1;
      return new Date(a) - new Date(b);
    })
    .reduce((acc, key) => {
      acc[key] = groupedMessages[key];
      return acc;
    }, {});

    const handleToggleComplete = async (id) => {
      try {
        const docRef = doc(db, "schedule", id);
        const docSnap = await getDoc(docRef);
        const currentData = docSnap.data();
        
        if (docSnap.exists() && currentData.confidence < 100) {
          let updatedConfidence = parseFloat(currentData.confidence) + 30; // Increase confidence by 30
          
          // Ensure updatedConfidence does not exceed 100
          if (updatedConfidence > 100) {
            updatedConfidence = 100;
          }
          
          let newDate = new Date(currentData.date);
          newDate.setDate(newDate.getDate() + 2); // Add 2 days to the date
          
          await updateDoc(docRef, {
            confidence: String(updatedConfidence),
            date: newDate.toISOString(),
          });
          
          console.log("Document updated successfully.");
        } else {
          console.log("Document does not exist or confidence is already 100.");
        }
      } catch (error) {
        console.error("Error updating document:", error);
      }
    };    
    

  return (
    <Box className="md:p-5 w-full max-w-3xl mx-auto pt-20">
      <Head>
        <title>FVG</title>
        <meta name="description" content="Generated by create next app" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <VStack spacing={6} pt={10} pb={12} align="start">
        <Heading as="h1" size="xl">Study List 📚</Heading>
        <Box as="form" onSubmit={submitMessage} w="full">
          <Flex mb={2} align="center" gap={2}>
            <Input
              placeholder="Your study plans"
              value={message.schedule_detail}
              onChange={(e) => setMessage({ ...message, schedule_detail: e.target.value })}
            />
            <IconButton
              icon={<FaCalendarAlt />}
              aria-label="Toggle Calendar"
              onClick={isOpen ? onClose : onOpen}
            />
            <IconButton
              icon={<FaPlus />}
              aria-label="Add"
              type="submit"
            />            
          </Flex>
          {isOpen && (
            <ResponsiveBox mb={2}>
              <Calendar onChange={setSelectedDate} value={selectedDate} />
            </ResponsiveBox>
          )}
        </Box>
        <Box w="full">
          {Object.entries(sortedGroupedMessages).map(([heading, plans]) => (
            <Box key={heading} mb={4}>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Heading as="h2" size="md" mb={2}>{heading}</Heading>
              </Box>
              {plans.map((plan) => {
                // Calculate the color based on confidence
                let color = '';
                if (plan.confidence >= 90) {
                  color = 'lightgreen';
                } else if (plan.confidence >= 80) {
                  color = '#ADFF2F'; 
                } else if (plan.confidence >= 70) {
                  color = '#7FFF00'; 
                } else if (plan.confidence >= 60) {
                  color = 'lightyellow';
                } else if (plan.confidence >= 50) {
                  color = '#FFFFE0'; 
                } else if (plan.confidence >= 40) {
                  color = '#FFD700';
                } else if (plan.confidence >= 30) {
                  color = '#FFA500';
                } else if (plan.confidence >= 20) {
                  color = '#FF8C00';
                } else {
                  color = '#FF6347';
                }
                return (
                  <Box key={plan.id} mb={2} display="flex" alignItems="center" justifyContent="space-between">
                    <Box>{plan.topic}</Box>
                    <Button size="sm" style={{ backgroundColor: color }} onClick={() => handleToggleComplete(plan.id)}>
                      Completed {plan.confidence} %
                    </Button>
                  </Box>
                );
              })}
            </Box>
          ))}
        </Box>
      </VStack>
    </Box>
  );
};

export default StudyList;

const ResponsiveBox = styled(Box)`
  display: flex;
  justify-content: center;
  max-width: 100%; /* Default max width */
  
  @media (min-width: 600px) {
    /* Medium screens */
    max-width: 600px; /* Adjust as needed */
  }

  @media (min-width: 900px) {
    /* Large screens */
    max-width: 800px; /* Adjust as needed */
  }
`;
