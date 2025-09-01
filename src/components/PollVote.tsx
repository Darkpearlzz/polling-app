"use client";

import { useState, useTransition } from "react";
import { Poll, PollOption } from "@/lib/polls";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

export default function PollVote({ poll: initialPoll }: { poll: Poll }) {
  const [poll, setPoll] = useState(initialPoll);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isVoted, setIsVoted] = useState(false);
  const [isPending, startTransition] = useTransition();

  const totalVotes = poll.options.reduce((acc, opt) => acc + opt.votes, 0);

  const handleVote = () => {
    if (!selectedOption) return;

    startTransition(() => {
      // In a real app, you would send this to your server/database
      // For demonstration, we'll update the state locally
      const updatedOptions = poll.options.map((opt) =>
        opt.id === selectedOption ? { ...opt, votes: opt.votes + 1 } : opt
      );
      setPoll({ ...poll, options: updatedOptions });
      setIsVoted(true);
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{poll.question}</CardTitle>
        <CardDescription>
          {isVoted
            ? `Thanks for voting! Total votes: ${totalVotes + 1}`
            : "Select an option below and cast your vote."}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {poll.options.map((option) => {
          const votePercentage =
            totalVotes > 0 ? (option.votes / totalVotes) * 100 : 0;

          return (
            <div
              key={option.id}
              onClick={() => !isVoted && setSelectedOption(option.id)}
              className={cn("p-4 border rounded-md transition-all", {
                "cursor-pointer hover:border-primary": !isVoted,
                "border-primary ring-2 ring-primary":
                  selectedOption === option.id && !isVoted,
                "cursor-not-allowed": isVoted,
              })}
            >
              <div className="flex justify-between items-center mb-1">
                <span className="font-medium">{option.label}</span>
                {isVoted && (
                  <span className="text-sm text-muted-foreground">
                    {option.votes} votes ({votePercentage.toFixed(1)}%)
                  </span>
                )}
              </div>
              {isVoted && (
                <div className="w-full bg-secondary rounded-full h-2.5">
                  <div
                    className="bg-primary h-2.5 rounded-full"
                    style={{ width: `${votePercentage}%` }}
                  ></div>
                </div>
              )}
            </div>
          );
        })}
      </CardContent>
      <CardFooter>
        {!isVoted && (
          <Button
            onClick={handleVote}
            disabled={!selectedOption || isPending}
            className="w-full"
          >
            {isPending ? "Voting..." : "Cast Your Vote"}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
