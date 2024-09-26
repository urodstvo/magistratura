import { useEffect } from "react";

export const TaskPage = () => {
  useEffect(() => {
    document.title = "Задание 2";
  }, []);

  return <>task2</>;
};
