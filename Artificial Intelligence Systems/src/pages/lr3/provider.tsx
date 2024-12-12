import { createContext, useContext, useEffect, useState } from "react";

const answersStorage = JSON.parse(
  sessionStorage.getItem("answers") || "[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1]"
) as number[];

export const Provider = ({ children }: { children: React.ReactNode }) => {
  const [answers, setAnswers] = useState<number[]>(answersStorage);

  useEffect(() => {
    sessionStorage.setItem("answers", JSON.stringify(answers));
  }, [answers]);

  return (
    <AnswersContext.Provider value={{ answers, setAnswers }}>{children}</AnswersContext.Provider>
  );
};

type AnswersContextProps = {
  answers: number[];
  setAnswers: React.Dispatch<React.SetStateAction<number[]>>;
};

const AnswersContext = createContext<AnswersContextProps>({
  answers: new Array(10).fill(-1) as number[],
  setAnswers: () => {},
});

export const useAnswersContext = () => useContext(AnswersContext);
