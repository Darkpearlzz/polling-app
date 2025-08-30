export type PollOption = { id: string; label: string; votes: number };
export type Poll = { id: string; question: string; options: PollOption[] };

export const polls: Poll[] = [
  {
    id: "1",
    question: "Which frontend do you prefer?",
    options: [
      { id: "react", label: "React", votes: 12 },
      { id: "vue", label: "Vue", votes: 7 },
      { id: "svelte", label: "Svelte", votes: 5 },
    ],
  },
  {
    id: "2",
    question: "Tabs or spaces?",
    options: [
      { id: "tabs", label: "Tabs", votes: 9 },
      { id: "spaces", label: "Spaces", votes: 11 },
    ],
  },
];

export function getPoll(id: string) {
  return polls.find((p) => p.id === id);
}
