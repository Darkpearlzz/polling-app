import Link from "next/link";
import { polls } from "../../lib/polls";

export default function PollsIndexPage() {
  return (
    <div className="max-w-2xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Polls</h1>
      <ul className="space-y-2">
        {polls.map((p) => (
          <li key={p.id} className="rounded border p-3 bg-white">
            <div className="font-medium">{p.question}</div>
            <Link
              href={`/polls/${p.id}`}
              className="text-blue-600 text-sm hover:underline"
            >
              View & vote
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
