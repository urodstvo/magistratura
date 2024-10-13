import { useEffect, useState } from "react";
import { useMaxValue, useProvider } from "./provider";

const EventInput = ({ number }: { number: number }) => {
  const { actions, setState } = useProvider();
  const { value } = useMaxValue();
  const action = actions[number - 1];
  const isFirst = number === 1;
  const isLast = number === actions.length;

  const [event, setEvent] = useState<[number, number, number, number]>([0, 0, 0, 0]);

  useEffect(() => {
    let ev = event;
    if (isLast) ev = [0, 0, value, value];
    setState((prev) => [...prev, { event: ev, setEvent }]);

    return () => {
      setState((prev) => prev.filter((_, ind) => ind !== prev.length - 1));
    };
  }, [event, setEvent, setState, isLast, value]);

  return (
    <div className="flex gap-5">
      <p>Терм {number}:</p>
      <div className="flex gap-0">
        <input
          defaultValue={isFirst ? 0 : action?.event[0]}
          className="border px-2 border-black w-[100px]"
          type="number"
          placeholder="Left zero"
          disabled={isFirst}
          onChange={(e) =>
            setState((prev) =>
              prev.map((act, ind) =>
                ind === number - 1
                  ? { ...act, event: [+e.target.value, act.event[1], act.event[2], act.event[3]] }
                  : act
              )
            )
          }
        />
        <input
          defaultValue={isFirst ? 0 : action?.event[1]}
          disabled={isFirst}
          className="border px-2 border-black w-[100px]"
          type="number"
          placeholder="Left one"
          onChange={(e) =>
            setState((prev) =>
              prev.map((act, ind) =>
                ind === number - 1
                  ? { ...act, event: [act.event[0], +e.target.value, act.event[2], act.event[3]] }
                  : act
              )
            )
          }
        />
        <input
          onChange={(e) =>
            setState((prev) =>
              prev.map((act, ind) =>
                ind === number - 1
                  ? { ...act, event: [act.event[0], act.event[1], +e.target.value, act.event[3]] }
                  : act
              )
            )
          }
          defaultValue={isLast ? value : action?.event[2]}
          disabled={isLast}
          className="border px-2 border-black w-[100px]"
          type="number"
          placeholder="Right one"
        />
        <input
          defaultValue={isLast ? value : action?.event[3]}
          disabled={isLast}
          className="border px-2 border-black w-[100px]"
          type="number"
          placeholder="Right zero"
          onChange={(e) =>
            setState((prev) =>
              prev.map((act, ind) =>
                ind === number - 1
                  ? { ...act, event: [act.event[0], act.event[1], act.event[2], +e.target.value] }
                  : act
              )
            )
          }
        />
      </div>
    </div>
  );
};

export const EventsConfigurator = () => {
  const { value, setValue } = useMaxValue();
  const [count, setCount] = useState(3);

  const inputs = new Array(count)
    .fill(0)
    .map((_, index) => <EventInput key={index} number={index + 1} />);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex gap-5">
        <input
          defaultValue={value}
          onChange={(e) => setValue(+e.target.value)}
          className="border rounded-lg px-2 border-black"
          type="number"
          placeholder="Max. value"
        />
      </div>
      {inputs.map((input, index) => (
        <div key={index}>{input}</div>
      ))}
      <button
        className=" rounded-lg px-2 border-black bg-zinc-500 text-white py-2"
        onClick={() => setCount((prev) => prev + 1)}
      >
        Добавить терм
      </button>
      <button
        className=" rounded-lg px-2 border-black bg-zinc-400 py-2"
        onClick={() => setCount((prev) => prev - 1)}
      >
        Удалить терм
      </button>
    </div>
  );
};