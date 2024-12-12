import { Button } from "@/components/ui/button";
import { useAnswersContext } from "../provider";

export const Question = ({
  id,
  answers,
}: {
  id: number;
  answers: { id: number; content: string }[];
}) => {
  const { answers: answersFromContext, setAnswers } = useAnswersContext();

  return (
    <div className="flex flex-col gap-2">
      {answers.map((el) => (
        <Button
          className="justify-start"
          key={el.id}
          variant={answersFromContext[id] === el.id ? "default" : "outline"}
          onClick={() => setAnswers((prev) => prev.map((e, ind) => (ind !== id ? e : el.id)))}
        >
          {el.content}
        </Button>
      ))}
    </div>
  );
};
