import { useEffect } from "react";
import { Timeline, TimelineChanger, TimelineManager } from "./timeline";
import { EventsConfigurator } from "./events";
import { RelationTable } from "./relations";
import { Provider } from "./provider";

export const TaskPage = () => {
  useEffect(() => {
    document.title = "Задание 2";
  }, []);

  return (
    <Provider>
      <main className="p-10 flex flex-col items-center xl:items-stretch gap-5 xl:flex-row xl:gap-10 ">
        <div>
          <TimelineManager />
        </div>
        <div className="w-full xl:w-1/2 flex flex-col gap-10">
          <Timeline />
          <TimelineChanger />
        </div>
        <div className="flex flex-col gap-10">
          <EventsConfigurator />
          <div className="max-w-[400px]">
            <h3>Типы отношений:</h3>
            <p>– (rts) – последовательно с паузой;</p>
            <p>– (rtsn) –последовательны без паузы; </p>
            <p>– (rtes) – пересекаются; </p>
            <p>– (rtel) – вложенные с примыканием к началу; </p>
            <p>– (rter) – вложенные с примыканием к окончанию; </p>
            <p>– (rte) – вложенные без примыканий; </p>
            <p>– (гtU) – отношение несравнимости темпоров</p>
          </div>
          <RelationTable />
        </div>
      </main>
    </Provider>
  );
};
