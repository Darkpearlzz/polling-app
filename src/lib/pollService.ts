import { collection, addDoc, getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";

// Define the shape of the poll data.
export interface PollData {
  title: string;
  options: string[];
}

const firebaseConfig = JSON.parse(
  process.env.NEXT_PUBLIC_FIREBASE_CONFIG || "{}"
);
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Asynchronously creates a new poll document in Firestore.
export const createPoll = async (data: PollData, userId: string) => {
  // Validate that the title and options are not empty.
  if (!data.title || data.options.length === 0) {
    throw new Error("Title and options are required.");
  }

  // Map the provided options into the final format,
  // initializing the vote count for each option to 0.
  const formattedOptions = data.options.map((option) => ({
    text: option,
    votes: 0,
  }));

  // Create the final poll object to be stored in Firestore.
  const newPoll = {
    title: data.title,
    options: formattedOptions,
    userId,
    createdAt: new Date(),
  };

  try {
    const docRef = await addDoc(collection(db, "polls"), newPoll);
    console.log("Poll created with ID: ", docRef.id);

    return { id: docRef.id, ...data };
  } catch (error) {
    console.error("Error adding document: ", error);
    throw new Error("Failed to create poll.");
  }
};
