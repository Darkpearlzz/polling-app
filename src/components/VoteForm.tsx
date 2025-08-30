"use client";
import React from "react";
import Button from "./ui/button";
import Input from "./ui/input";
import { Poll } from "../lib/polls";

type VoteFormProps = {
  poll: Poll;
  onVote: (optionId: string) => void;
};

export default function VoteForm({ poll, onVote }: VoteFormProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">{poll.question}</h2>
      <form className="space-y-2">
        {poll.options.map((option) => (
          <div key={option.id} className="flex items-center gap-2">
            <Input
              type="radio"
              name="vote"
              value={option.id}
              id={option.id}
              className="w-4 h-4"
              onChange={() => onVote(option.id)}
            />
            <label htmlFor={option.id}>{option.label}</label>
          </div>
        ))}
      </form>
    </div>
  );
}
