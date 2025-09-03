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

// Import the refactored, database-handling vote function
import { handleVote } from "@/lib/voteHandler";

// Assuming PollVote receives the poll and the current user's ID as props
export default function PollVote({
  poll: initialPoll,
  userId,
}: {
  poll: Poll;
  userId: string;
}) {
  const [poll, setPoll] = useState(initialPoll);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isVoted, setIsVoted] = useState(false);
  const [isPending, startTransition] = useTransition();

  // Your original logic to calculate total votes
  const totalVotes = poll.options.reduce((acc, opt) => acc + opt.votes, 0);

  // This is the updated function that handles both local state and the database write
  const onCastVote = async () => {
    if (!selectedOption) return;

    // Use a transition to manage the pending state
    startTransition(async () => {
      try {
        // Call the database function to record the vote.
        // We pass the poll ID, user ID, and selected option ID.
        await handleVote(poll.id, userId, selectedOption);

        // After a successful database write, update the local state for a smooth UI experience
        const updatedOptions = poll.options.map((opt) =>
          opt.id === selectedOption ? { ...opt, votes: opt.votes + 1 } : opt
        );
        setPoll({ ...poll, options: updatedOptions });
        setIsVoted(true);
      } catch (error) {
        // Handle any errors from the database operation
        console.error("Failed to cast vote:", error);
        // You might want to show an error message to the user here
      }
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
            onClick={onCastVote} // Call the new async function on button click
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
