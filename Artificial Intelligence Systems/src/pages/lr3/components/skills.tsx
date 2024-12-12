import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceLine,
  XAxis,
  type DefaultLegendContentProps,
} from "recharts";

import { ChartConfig, ChartContainer, ChartLegend } from "@/components/ui/chart";
import { Slider } from "@/components/ui/slider";
import { useAnswersContext } from "../provider";
import { skillData } from "../weights";

const chartConfig = {} satisfies ChartConfig;

export const SkillQuestion = ({ id }: { id: number }) => {
  const { answers, setAnswers } = useAnswersContext();

  return (
    <div className="w-full flex flex-col gap-10">
      <ChartContainer config={chartConfig} className="w-full h-[300px] ">
        <LineChart
          accessibilityLayer
          data={skillData}
          margin={{
            left: 8,
            right: 8,
            top: 8,
            bottom: 8,
          }}
        >
          <ChartLegend content={<CustomLegend />} />
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="skill"
            domain={[0, 10]}
            type="number"
            tickLine={false}
            tickMargin={8}
            ticks={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
          />

          <Line dataKey="low" type="linear" stroke="#000000" strokeWidth={1} dot={false} />
          <Line dataKey="med" type="linear" stroke="#CC0066" strokeWidth={1} dot={false} />
          <Line dataKey="high" type="linear" stroke="#B0AA2D" strokeWidth={1} dot={false} />

          <ReferenceLine x={answers[id]} stroke="#66B2FF" strokeWidth={2} />
        </LineChart>
      </ChartContainer>
      <Slider
        defaultValue={[answers[id]]}
        max={10}
        onValueChange={(v) => setAnswers((prev) => prev.map((e, ind) => (ind !== id ? e : v[0])))}
      />
    </div>
  );
};

const CustomLegend = (props: DefaultLegendContentProps) => {
  const { payload } = props;

  return (
    <ul className="flex gap-2 justify-center mt-4">
      {payload
        ?.filter((el) => ["low", "med", "high"].includes(el.value))
        .map((entry, index) => (
          <li key={`item-${index}`} className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
            {entry.value === "low" && "Новичок"}
            {entry.value === "med" && "Средний уровень"}
            {entry.value === "high" && "Эксперт"}
          </li>
        ))}
    </ul>
  );
};
