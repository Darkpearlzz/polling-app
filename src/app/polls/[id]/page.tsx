import { notFound } from "next/navigation";
import { getPoll } from "@/lib/polls";
import PollVote from "@/components/PollVote";

export default function PollDetailPage({ params }: { params: { id: string } }) {
  const poll = getPoll(params.id);

  if (!poll) {
    notFound();
  }

  return (
    <div className="max-w-2xl mx-auto">
      <PollVote poll={poll} />
    </div>
  );
}
