import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAnswersContext } from "../provider";
import { careers, weights } from "../weights";
import { useEffect, useState } from "react";

export const Results = () => {
  const { answers } = useAnswersContext();
  const [result, setResult] = useState<number[]>(new Array(14).fill(0.0));

  useEffect(() => {
    const r = new Array(14).fill(0.0);
    for (const key in careers) {
      const career = careers[key as keyof typeof careers];
      for (const question of weights)
        if (answers[question.question_id] !== -1)
          r[career.id] += question.matrix[career.id][answers[question.question_id]];

      r[career.id] /= career.max_weight;
      if (r[career.id] < 0) r[career.id] = 0;
    }

    setResult(r);
  }, [answers]);

  return (
    <Card className="w-[400px] h-fit fixed top-10">
      <CardHeader>
        <CardTitle>Результаты экспертной системы</CardTitle>
        <CardDescription>Список вероятностей склонности к определенной карьере</CardDescription>
      </CardHeader>
      <CardContent>
        {Object.keys(careers)
          .sort(
            (a, b) =>
              result[careers[b as keyof typeof careers].id] -
              result[careers[a as keyof typeof careers].id]
          )
          .map((el) => (
            <div
              key={careers[el as keyof typeof careers].id}
              className="flex justify-between items-center first-of-type:text-slate-900"
            >
              <div>{el}</div>
              <span>{result[careers[el as keyof typeof careers].id].toFixed(2)}</span>
            </div>
          ))}
      </CardContent>
    </Card>
  );
};
