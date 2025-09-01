import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";
import { Poll } from "@/lib/polls";

export default function PollCard({ poll }: { poll: Poll }) {
  const totalVotes = poll.options.reduce(
    (sum, option) => sum + option.votes,
    0
  );

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle>{poll.question}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-muted-foreground">{totalVotes} votes</p>
      </CardContent>
      <CardFooter>
        <Link href={`/polls/${poll.id}`} className="w-full">
          <Button className="w-full">View & Vote</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
