import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { questions } from "./questions";
import { Provider } from "./provider";
import { useEffect, useState } from "react";
import { Results } from "./components/results";
import { Button } from "@/components/ui/button";
import { ArrowUpIcon } from "@radix-ui/react-icons";

export const LAB3PAGE = () => {
  useEffect(() => {
    document.title = "Экспертная система | ЛР 3";
  }, []);

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight) setIsVisible(true);
      else setIsVisible(false);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {}, []);

  return (
    <Provider>
      <main className="grid grid-cols-[400px_1fr] gap-10 2xl:grid-cols-[1fr_600px_1fr] py-10 px-20 size-full min-h-screen relative">
        {isVisible && (
          <Button
            className="fixed bottom-10 right-10 rounded-full"
            size="icon"
            onClick={() =>
              window.scrollTo({
                behavior: "smooth",
                top: 0,
              })
            }
          >
            <ArrowUpIcon strokeWidth={2} />
          </Button>
        )}
        <div className="w-full flex justify-center">
          <Results />
        </div>
        <div className="w-[600px] items-center flex flex-col gap-10">
          <h1 className="text-2xl font-bold">Экспертная система для подбора карьеры</h1>
          {questions.map((el) => (
            <Card key={el.id} className="w-full">
              <CardHeader>
                <CardTitle>
                  {el.id + 1}. {el.content}
                </CardTitle>
                <CardDescription>
                  {el.description.split("\n").map((el, ind) => (
                    <p key={ind}>{el}</p>
                  ))}
                </CardDescription>
              </CardHeader>
              <CardContent>{el.element}</CardContent>
            </Card>
          ))}
        </div>
      </main>
    </Provider>
  );
};
