"use client";

import {
  Area,
  CartesianGrid,
  ComposedChart,
  Label,
  Line,
  XAxis,
  YAxis,
  type DefaultLegendContentProps,
} from "recharts";

import { ChartConfig, ChartContainer, ChartLegend } from "@/components/ui/chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useContext } from "react";
import { QualityContext, SpeedContext } from ".";
import {
  highQualityFunc,
  highSpeedFunc,
  lowQualityFunc,
  lowSpeedFunc,
  medQualityFunc,
  medSpeedFunc,
} from "./functions";

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

const data = [
  { performance: 0, low: 1, med: undefined, high: undefined },
  { performance: 40, low: 1, med: 0, high: undefined },
  { performance: 50, low: 0, med: 1, high: undefined },
  { performance: 65, low: undefined, med: 1, high: 0 },
  { performance: 75, low: undefined, med: 0, high: 1 },
  { performance: 100, low: undefined, med: undefined, high: 1 },
];

const chartConfig = {} satisfies ChartConfig;

export const PerfomanceChart = () => {
  const { speed } = useContext(SpeedContext);
  const { quality } = useContext(QualityContext);

  const isLow =
    (lowSpeedFunc(speed) && lowQualityFunc(quality)) ||
    (lowSpeedFunc(speed) && medQualityFunc(quality)) ||
    (medSpeedFunc(speed) && lowQualityFunc(quality)) ||
    (highSpeedFunc(speed) && lowQualityFunc(quality));

  const isMed =
    (lowSpeedFunc(speed) && highQualityFunc(quality)) ||
    (medSpeedFunc(speed) && medQualityFunc(quality));

  const isHigh =
    (medSpeedFunc(speed) && highQualityFunc(quality)) ||
    (highSpeedFunc(speed) && medSpeedFunc(quality)) ||
    (highSpeedFunc(speed) && highQualityFunc(quality));

  const dataWithRange = data.map((el) => ({
    ...el,
    rangeLow: isLow && el.low !== undefined ? [0, el.low] : undefined,
    rangeMed: isMed && el.med !== undefined ? [0, el.med] : undefined,
    rangeHigh: isHigh && el.high !== undefined ? [0, el.high] : undefined,
  }));
  return (
    <Card className="shadow-none w-fit">
      <CardHeader className="items-center flex flex-col">
        <CardTitle>Терм-множество производительности разработки ПО</CardTitle>
      </CardHeader>
      <CardContent className="p-10">
        <ChartContainer config={chartConfig} className="w-[500px] h-[300px] ">
          <ComposedChart
            accessibilityLayer
            data={dataWithRange}
            margin={{
              left: 12,
              right: 12,
              top: 12,
              bottom: 12,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="performance"
              type="number"
              tickLine={false}
              tickMargin={8}
              max={10}
              ticks={[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]}
            >
              <Label
                value="Производительность разработки, %"
                offset={-10}
                position="insideBottom"
              />
            </XAxis>
            <YAxis dataKey="" tickLine={false} tickMargin={8} max={1} />

            <Line dataKey="low" type="linear" stroke="red" strokeWidth={2} dot={false} />
            <Line dataKey="med" type="linear" stroke="green" strokeWidth={2} dot={false} />
            <Line dataKey="high" type="linear" stroke="blue" strokeWidth={2} dot={false} />

            <Area dataKey="rangeLow" stroke="black" fill="black" />
            <Area dataKey="rangeMed" stroke="black" fill="black" />
            <Area dataKey="rangeHigh" stroke="black" fill="black" />
            <ChartLegend content={<CustomLegend />} />
          </ComposedChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
