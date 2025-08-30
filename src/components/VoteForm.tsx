"use client";

import { useState } from "react";
import Button from "./ui/button";

interface VoteFormProps {
  poll: {
    id: string | string[] | undefined;
    question: string;
    options: string[];
  };
  onVote: (option: string) => void;
}

export default function VoteForm({ poll, onVote }: VoteFormProps) {
  const [selectedOption, setSelectedOption] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedOption) {
      onVote(selectedOption);
    }
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">{poll.question}</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {poll.options.map((option, idx) => (
          <label
            key={idx}
            className="flex items-center space-x-2 cursor-pointer"
          >
            <input
              type="radio"
              value={option}
              checked={selectedOption === option}
              onChange={() => setSelectedOption(option)}
              className="cursor-pointer"
            />
            <span>{option}</span>
          </label>
        ))}
        <Button type="submit" disabled={!selectedOption}>
          Submit Vote
        </Button>
      </form>
    </div>
  );
}
