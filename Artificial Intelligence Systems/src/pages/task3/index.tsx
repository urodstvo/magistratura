import { useEffect } from "react";
import { Chart } from "./chart";
import { EventsConfigurator } from "./events";
import { Provider } from "./provider";
import { Errors } from "./validate";

export const TaskPage = () => {
  useEffect(() => {
    document.title = "Задание 3";
  }, []);

  return (
    <Provider>
      <div className="p-10 flex flex-col xl:flex-row xl:gap-10 ">
        <div className="w-[500px]">
          <EventsConfigurator />
        </div>
        <div className="flex-1">
          <Chart />
          <Errors />
        </div>
      </div>
    </Provider>
  );
};
