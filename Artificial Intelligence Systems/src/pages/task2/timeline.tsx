import { ChartContainer, ChartLegend } from "@/components/ui/chart";
import {
  Area,
  AreaChart,
  CartesianGrid,
  DefaultLegendContentProps,
  ReferenceLine,
  XAxis,
} from "recharts";
import { useConfigurator, useTimeline } from "./provider";
import { useEffect, useRef } from "react";

type Data = {
  time: number;
  event1?: [number, number];
  event2?: [number, number];
  event3?: [number, number];
  event4?: [number, number];
  event5?: [number, number];
};

const CustomChartLegend = (props: DefaultLegendContentProps) => {
  const { payload } = props;

  return (
    <ul className="flex gap-2 justify-center mt-4">
      {payload?.map((entry, index) => (
        <li key={`item-${index}`} className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
          {entry.value === "event1" && "Событие 1"}
          {entry.value === "event2" && "Событие 2"}
          {entry.value === "event3" && "Событие 3"}
          {entry.value === "event4" && "Событие 4"}
          {entry.value === "event5" && "Событие 5"}
        </li>
      ))}
    </ul>
  );
};

export const Timeline = () => {
  const events = useConfigurator();
  const { timeline } = useTimeline();

  const data: Data[] = Array.from({ length: 61 }, (_, index) => ({ time: index }));

  for (let t = 0; t <= 60; t++) {
    for (const event of Object.keys(events)) {
      if (
        t >= events[event as keyof typeof events][0] &&
        t <= events[event as keyof typeof events][1]
      ) {
        const number = Number(event.replace("event", ""));
        (data[t][event as keyof Data] as [number, number]) = [(number - 1) * 5, number * 5];
      }
    }
  }

  return (
    <ChartContainer config={{}} className="w-full">
      <AreaChart
        accessibilityLayer
        data={data}
        margin={{
          left: 12,
          right: 12,
          top: 12,
          bottom: 12,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" type="number" tickLine={false} max={60} tickCount={13} />

        <Area dataKey="event1" stroke="#8884d8" fill="#8884d8" />
        <Area dataKey="event2" stroke="red" fill="red" />
        <Area dataKey="event3" stroke="green" fill="green" label="Событие 3" />
        <Area dataKey="event4" stroke="gray" fill="gray" label="Событие 4" />
        <Area dataKey="event5" stroke="blue" fill="blue" label="Событие 5" />

        <ReferenceLine x={timeline} type="number" stroke="purple" />
        <ChartLegend content={CustomChartLegend} />
      </AreaChart>
    </ChartContainer>
  );
};

export const TimelineChanger = () => {
  const { timeline, setTimeline } = useTimeline();

  return (
    <input
      type="range"
      value={timeline}
      min="0"
      max="60"
      className="w-full"
      onChange={(e) => setTimeline(+e.target.value)}
    />
  );
};

export const TimelineManager = () => {
  const startRef = useRef<HTMLButtonElement>(null);
  const stopRef = useRef<HTMLButtonElement>(null);

  const { setTimeline } = useTimeline();
  useEffect(() => {
    const startButton = startRef.current as HTMLButtonElement;
    const stopButton = stopRef.current as HTMLButtonElement;
    let interval: NodeJS.Timeout;

    const handleStart = () => {
      interval = setInterval(() => {
        setTimeline((prev) => (prev + 1 > 60 ? 0 : prev + 1));
      }, 500);
    };

    const handleStop = () => {
      clearInterval(interval);
    };

    startButton.addEventListener("click", handleStart);
    stopButton.addEventListener("click", handleStop);

    return () => {
      clearInterval(interval);
      startButton.removeEventListener("click", handleStart);
      stopButton.removeEventListener("click", handleStop);
    };
  }, [setTimeline]);

  return (
    <div className="flex xl:flex-col gap-2">
      <button ref={startRef} className="w-[120px] bg-green-700 text-white p-1 rounded-md">
        Запустить
      </button>
      <button ref={stopRef} className="w-[120px] bg-gray-500 text-white p-1 rounded-md">
        Остановить
      </button>
    </div>
  );
};
