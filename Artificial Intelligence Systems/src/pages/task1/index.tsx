import { createContext, useEffect, useState } from "react";
import { QualityChart } from "./quality-chart";
import { SpeedChart } from "./speed-chart";
import { Rules } from "./rules";
import { PerfomanceChart } from "./perfomance-chart";

export const SpeedContext = createContext<{
  setSpeed: (speed: number) => void;
  speed: number;
}>({
  setSpeed: () => {},
  speed: 0,
});

export const QualityContext = createContext<{
  setQuality: (quality: number) => void;
  quality: number;
}>({
  setQuality: () => {},
  quality: 0,
});

const Provider = ({ children }: { children: React.ReactNode }) => {
  const [quality, setQuality] = useState(0);
  const [speed, setSpeed] = useState(0);
  return (
    <SpeedContext.Provider value={{ speed, setSpeed }}>
      <QualityContext.Provider value={{ quality, setQuality }}>{children}</QualityContext.Provider>
    </SpeedContext.Provider>
  );
};

export const TaskPage = () => {
  useEffect(() => {
    document.title = "Задание 1";
  }, []);

  return (
    <Provider>
      <div className="p-10 flex flex-col ">
        <div className="flex justify-center items-center gap-10 flex-col xl:flex-row xl:items-stretch">
          <SpeedChart />
          <QualityChart />
          <PerfomanceChart />
        </div>
        <Rules />
      </div>
    </Provider>
  );
};
