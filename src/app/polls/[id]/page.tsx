import { useParams } from "next/navigation";
import VoteForm from "../../../components/VoteForm";

export default function PollDetailPage() {
  const params = useParams();
  const pollId = params?.id;

  const poll = {
    id: pollId,
    question: "What is your favorite programming language?",
    options: ["JavaScript", "Python", "TypeScript", "Go"],
  };

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
