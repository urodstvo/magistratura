import { useContext, useId } from "react";
import { QualityContext, SpeedContext } from ".";
import {
  highQualityFunc,
  highSpeedFunc,
  lowQualityFunc,
  lowSpeedFunc,
  medQualityFunc,
  medSpeedFunc,
} from "./functions";

const QualityInput = () => {
  const ctx = useContext(QualityContext);
  const id = useId();
  return (
    <div className="flex gap-1 items-center">
      <label htmlFor={id}>Качество</label>
      <input
        type="number"
        min={0}
        max={100}
        id={id}
        value={ctx.quality}
        onChange={(e) => ctx.setQuality(+e.target.value)}
        className="border-[1px] rounded border-black pl-2 pr-1 py-1 w-[200px]"
      />
    </div>
  );
};

const SpeedInput = () => {
  const ctx = useContext(SpeedContext);
  const id = useId();
  return (
    <div className="flex gap-1 items-center">
      <label htmlFor={id}>Скорость</label>
      <input
        type="number"
        min={0}
        max={10}
        id={id}
        value={ctx.speed}
        onChange={(e) => ctx.setSpeed(+e.target.value)}
        className="border-[1px] rounded border-black pl-2 pr-1 py-1 w-[200px]"
      />
    </div>
  );
};

const RulesList = () => {
  const { speed } = useContext(SpeedContext);
  const { quality } = useContext(QualityContext);
  return (
    <ul className="p-4">
      <li>
        {lowSpeedFunc(speed) && lowQualityFunc(quality) ? "✅" : "❌"}
        <strong>ЕСЛИ</strong> СКОРОСТЬ = МЕДЛЕННАЯ <strong>И</strong> КАЧЕСТВО = НИЗКОЕ{" "}
        <strong>ТО</strong> ПРОИЗВОДИТЕЛЬНОСТЬ = НИЗКАЯ
      </li>
      <li>
        {lowSpeedFunc(speed) && medQualityFunc(quality) ? "✅" : "❌"}
        <strong>ЕСЛИ</strong> СКОРОСТЬ = МЕДЛЕННАЯ <strong>И</strong> КАЧЕСТВО = СРЕДНЕЕ{" "}
        <strong>ТО</strong> ПРОИЗВОДИТЕЛЬНОСТЬ = НИЗКАЯ
      </li>
      <li>
        {lowSpeedFunc(speed) && highQualityFunc(quality) ? "✅" : "❌"}
        <strong>ЕСЛИ</strong> СКОРОСТЬ = МЕДЛЕННАЯ <strong>И</strong> КАЧЕСТВО = ВЫСОКОЕ{" "}
        <strong>ТО</strong> ПРОИЗВОДИТЕЛЬНОСТЬ = СРЕДНЯЯ
      </li>
      <li className="mt-2">
        {medSpeedFunc(speed) && lowQualityFunc(quality) ? "✅" : "❌"}
        <strong>ЕСЛИ</strong> СКОРОСТЬ = УМЕРЕННАЯ <strong>И</strong> КАЧЕСТВО = НИЗКОЕ{" "}
        <strong>ТО</strong> ПРОИЗВОДИТЕЛЬНОСТЬ = НИЗКАЯ
      </li>
      <li>
        {medSpeedFunc(speed) && medQualityFunc(quality) ? "✅" : "❌"}
        <strong>ЕСЛИ</strong> СКОРОСТЬ = УМЕРЕННАЯ <strong>И</strong> КАЧЕСТВО = СРЕДНЕЕ{" "}
        <strong>ТО</strong> ПРОИЗВОДИТЕЛЬНОСТЬ = СРЕДНЯЯ
      </li>
      <li>
        {medSpeedFunc(speed) && highQualityFunc(quality) ? "✅" : "❌"}
        <strong>ЕСЛИ</strong> СКОРОСТЬ = УМЕРЕННАЯ <strong>И</strong> КАЧЕСТВО = ВЫСОКОЕ{" "}
        <strong>ТО</strong> ПРОИЗВОДИТЕЛЬНОСТЬ = ВЫСОКАЯ
      </li>
      <li className="mt-2">
        {highSpeedFunc(speed) && lowQualityFunc(quality) ? "✅" : "❌"}
        <strong>ЕСЛИ</strong> СКОРОСТЬ = ВЫСОКАЯ <strong>И</strong> КАЧЕСТВО = НИЗКОЕ{" "}
        <strong>ТО</strong> ПРОИЗВОДИТЕЛЬНОСТЬ = НИЗКАЯ
      </li>
      <li>
        {highSpeedFunc(speed) && medSpeedFunc(quality) ? "✅" : "❌"}
        <strong>ЕСЛИ</strong> СКОРОСТЬ = ВЫСОКАЯ <strong>И</strong> КАЧЕСТВО = СРЕДНЕЕ{" "}
        <strong>ТО</strong> ПРОИЗВОДИТЕЛЬНОСТЬ = ВЫСОКАЯ
      </li>
      <li>
        {highSpeedFunc(speed) && highQualityFunc(quality) ? "✅" : "❌"}
        <strong>ЕСЛИ</strong> СКОРОСТЬ = ВЫСОКАЯ <strong>И</strong> КАЧЕСТВО = ВЫСОКОЕ{" "}
        <strong>ТО</strong> ПРОИЗВОДИТЕЛЬНОСТЬ = ВЫСОКАЯ
      </li>
    </ul>
  );
};

export const Rules = () => {
  return (
    <div className="flex items-center mt-5 flex-col">
      <div className="flex gap-10">
        <SpeedInput />
        <QualityInput />
      </div>
      <RulesList />
    </div>
  );
};
