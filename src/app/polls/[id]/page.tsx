import { notFound } from "next/navigation";
import { getPoll } from "../../../lib/polls";
import VoteForm from "../../../components/VoteForm";

export default function PollDetailPage({ params }: { params: { id: string } }) {
  const poll = getPoll(params.id);
  if (!poll) return notFound();

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-semibold">{poll.question}</h1>
      <VoteForm pollId={poll.id} options={poll.options} />
    </div>
  );
}
