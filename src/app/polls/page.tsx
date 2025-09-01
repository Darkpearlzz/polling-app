import { polls } from "@/lib/polls";
import PollCard from "@/components/PollCard";

export default function PollsIndexPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight mb-6">
        Available Polls
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {polls.map((poll) => (
          <PollCard key={poll.id} poll={poll} />
        ))}
      </div>
    </div>
  );
}
