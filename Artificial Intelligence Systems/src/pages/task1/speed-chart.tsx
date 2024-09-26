"use client";

import {
  CartesianGrid,
  Label,
  Line,
  LineChart,
  ReferenceLine,
  XAxis,
  YAxis,
  type DefaultLegendContentProps,
} from "recharts";

import { ChartConfig, ChartContainer, ChartLegend } from "@/components/ui/chart";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { highSpeedFunc, lowSpeedFunc, medSpeedFunc } from "./functions";
import { SpeedContext } from ".";
import { useContext } from "react";

const CustomLegend = (props: DefaultLegendContentProps) => {
  const { payload } = props;

  return (
    <ul className="flex gap-2 justify-center mt-4">
      {payload?.map((entry, index) => (
        <li key={`item-${index}`} className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
          {entry.value === "low" && "Медленная"}
          {entry.value === "med" && "Умеренная"}
          {entry.value === "high" && "Высокая"}
        </li>
      ))}
    </ul>
  );
};

const generateData = () => {
  return new Array(11).fill(0).map((_, index) => ({
    speed: index,
    high: highSpeedFunc(index),
    med: medSpeedFunc(index),
    low: lowSpeedFunc(index),
  }));
};

const chartConfig = {} satisfies ChartConfig;

export const SpeedChart = () => {
  const { speed } = useContext(SpeedContext);
  const data = generateData();
  return (
    <Card className="shadow-none w-fit">
      <CardHeader className="items-center flex flex-col">
        <CardTitle>Терм-множество скорости разработки</CardTitle>
        <CardDescription className="max-w-md text-center flex justify-center">
          Измеряется временем, затраченным на завершение определенной функциональности или выпуска
          нового релиза.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-10">
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
            <XAxis
              dataKey="speed"
              max={10}
              type="number"
              ticks={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
            >
              <Label value="Скорость разработки, неделя" offset={-10} position="insideBottom" />
            </XAxis>
            <YAxis dataKey="" tickLine={false} tickMargin={8} max={1} />

            <Line dataKey="low" type="linear" stroke="red" strokeWidth={2} dot={false} />
            <Line dataKey="med" type="linear" stroke="green" strokeWidth={2} dot={false} />
            <Line dataKey="high" type="linear" stroke="blue" strokeWidth={2} dot={false} />

            <ReferenceLine x={speed} stroke="purple" />

            <ChartLegend content={<CustomLegend />} />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
