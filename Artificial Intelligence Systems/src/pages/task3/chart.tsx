"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
  type DefaultLegendContentProps,
} from "recharts";

import { ChartConfig, ChartContainer, ChartLegend } from "@/components/ui/chart";
import { useMaxValue, useProvider } from "./provider";
import { useMemo } from "react";

const CustomLegend = (props: DefaultLegendContentProps) => {
  const { payload } = props;

  return (
    <ul className="flex gap-2 justify-center mt-4">
      {payload?.map((entry, index) => {
        const num = entry.value.replace("term", "");
        return (
          <li key={`item-${index}`} className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
            {`Терм ${num}`}
          </li>
        );
      })}
    </ul>
  );
};

type DataObject = {
  x: number;
  [key: string]: number | string | undefined;
};

const genFuncValue = (zero: number, one: number, x: number) => {
  if (one === zero) return 1;
  const a = -1 / (zero - one);
  const b = -zero * a;

  return a * x + b;
};

const useGenerateData = () => {
  const { value } = useMaxValue();
  const { actions } = useProvider();

  const data: DataObject[] = useMemo(
    () =>
      new Array(value + 1).fill(0).map((_, index) => ({
        x: index,
      })),
    [value]
  );

  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < actions.length; j++) {
      if (i >= actions[j].event[0] && i <= actions[j].event[1])
        data[i][`term${j}`] = genFuncValue(actions[j].event[0], actions[j].event[1], i);
      else if (i > actions[j].event[1] && i < actions[j].event[2]) data[i][`term${j}`] = 1;
      else if (i >= actions[j].event[2] && i <= actions[j].event[3])
        data[i][`term${j}`] = genFuncValue(actions[j].event[3], actions[j].event[2], i);
      else data[i][`term${j}`] = undefined;
    }
  }

  return data;
};

// const testData = [
//   { x: 0, term0: 0 },
//   { x: 1, term0: 1 },
//   { x: 2, term0: 0 },
//   { x: 3, term0: 1 },
// ];

const chartConfig = {} satisfies ChartConfig;

export const Chart = () => {
  const { value } = useMaxValue();
  const { actions } = useProvider();
  const data = useGenerateData();
  return (
    <ChartContainer config={chartConfig} className="w-[500px] h-[300px] ">
      <LineChart
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
        <XAxis dataKey="x" type="number" tickLine={false} tickMargin={8} max={value} />
        <YAxis dataKey="" tickLine={false} tickMargin={8} max={1} />

        {actions.map((_, index) => {
          const randomColor = Math.floor(Math.random() * 16777215).toString(16);
          return (
            <Line
              dataKey={`term${index}`}
              type="linear"
              stroke={`#${randomColor}`}
              strokeWidth={2}
              dot={false}
            />
          );
        })}

        <ChartLegend content={<CustomLegend />} />
      </LineChart>
    </ChartContainer>
  );
};
