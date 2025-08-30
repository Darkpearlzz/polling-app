import { useForm } from "react-hook-form";
import Button from "./ui/button";
import Input from "./ui/input";
import { useState } from "react";

type PollFormValues = {
  question: string;
  option1: string;
  option2: string;
};

export function PollForm({
  onSubmit,
}: {
  onSubmit: (data: PollFormValues) => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PollFormValues>();
  const [formError, setFormError] = useState<string | null>(null);

  const submitHandler = (data: PollFormValues) => {
    setFormError(null);
    if (!data.question || !data.option1 || !data.option2) {
      setFormError("All fields are required.");
      return;
    }
    onSubmit(data);
  };

  return (
    <div className="w-full rounded-lg border bg-white shadow p-4">
      <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
        <Input
          label="Poll Question"
          {...register("question", { required: true })}
          error={errors.question && "Question is required"}
        />
        <Input
          label="Option 1"
          {...register("option1", { required: true })}
          error={errors.option1 && "Option 1 is required"}
        />
        <Input
          label="Option 2"
          {...register("option2", { required: true })}
          error={errors.option2 && "Option 2 is required"}
        />
        {formError && <div className="text-red-500 text-sm">{formError}</div>}
        <Button type="submit">Create Poll</Button>
      </form>
    </div>
  );
}
