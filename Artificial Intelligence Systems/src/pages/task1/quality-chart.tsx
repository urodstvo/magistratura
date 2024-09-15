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
import { highQualityFunc, lowQualityFunc, medQualityFunc } from "./functions";
import { QualityContext } from ".";
import { useContext } from "react";

const CustomLegend = (props: DefaultLegendContentProps) => {
  const { payload } = props;

  return (
    <ul className="flex gap-2 justify-center mt-4">
      {payload?.map((entry, index) => (
        <li key={`item-${index}`} className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
          {entry.value === "low" && "Низкая"}
          {entry.value === "med" && "Средняя"}
          {entry.value === "high" && "Высокая"}
        </li>
      ))}
    </ul>
  );
};

const generateData = () => {
  return new Array(101).fill(0).map((_, index) => ({
    speed: index,
    low: lowQualityFunc(index),
    med: medQualityFunc(index),
    high: highQualityFunc(index),
  }));
};

const chartConfig = {} satisfies ChartConfig;

export const QualityChart = () => {
  const { quality } = useContext(QualityContext);
  const data = generateData();
  return (
    <Card className="shadow-none w-fit">
      <CardHeader className="items-center flex flex-col">
        <CardTitle>Терм-множество качества ПО</CardTitle>
        <CardDescription className="max-w-md text-center flex justify-center">
          Оценивается с помощью автоматических тестов (покрытие кода тестами) или анализа качества
          кода (например, по показателю технического долга)
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
              type="number"
              tickLine={false}
              tickMargin={8}
              max={10}
              ticks={[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]}
            >
              <Label value="Качество разработки, %" offset={-10} position="insideBottom" />
            </XAxis>
            <YAxis dataKey="" tickLine={false} tickMargin={8} max={1} />

            <Line dataKey="low" type="linear" stroke="red" strokeWidth={2} dot={false} />
            <Line dataKey="med" type="linear" stroke="green" strokeWidth={2} dot={false} />
            <Line dataKey="high" type="linear" stroke="blue" strokeWidth={2} dot={false} />

            <ReferenceLine x={quality} stroke="purple" />

            <ChartLegend content={<CustomLegend />} />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
