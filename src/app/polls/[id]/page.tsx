"use client";

import { useParams } from "next/navigation";
import { polls } from "../../../lib/polls";
import VoteForm from "../../../components/VoteForm";

export default function PollDetailPage() {
  const params = useParams();
  const pollId = params?.id as string;

  const poll = polls.find((p) => p.id === pollId);

  if (!poll) {
    return (
      <div className="max-w-xl mx-auto p-6">
        <h1 className="text-2xl font-bold">Poll not found</h1>
      </div>
    );
  }

  const handleVote = (option: string) => {
    console.log(`Voted for: ${option}`);
    alert(`You voted for: ${option}`);
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <VoteForm poll={poll} onVote={handleVote} />
    </div>
  );
}
