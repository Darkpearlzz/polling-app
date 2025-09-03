import { doc, writeBatch, increment } from "firebase/firestore";
import { db } from "./firebase-config";

/**
 * Handles a user's vote using a Firestore batch write for improved performance and atomicity.
 * This ensures all updates (incrementing the vote count and recording the user's vote)
 * succeed or fail as a single, atomic operation.
 * @param pollId The ID of the poll.
 * @param userId The ID of the user who is voting.
 * @param optionId The ID of the option the user chose.
 * @returns A promise that resolves when the vote is successfully recorded.
 */
export async function handleVote(
  pollId: string,
  userId: string,
  optionId: string
): Promise<void> {
  const batch = writeBatch(db);

  // Reference to the poll document
  const pollRef = doc(db, "polls", pollId);

  // Reference to the specific option within the poll's subcollection
  const optionRef = doc(db, "polls", pollId, "options", optionId);

  // Reference to the user's vote document
  const userVoteRef = doc(db, "userVotes", `${userId}_${pollId}`);

  // Update the poll option's vote count
  batch.update(optionRef, {
    votes: increment(1),
  });

  // Set a document to record the user's vote
  batch.set(userVoteRef, {
    vote: optionId,
    pollId: pollId,
    userId: userId,
    createdAt: new Date(),
  });

  // Commit the batch write.
  await batch.commit();

  console.log("Vote recorded successfully via batch write.");
}
