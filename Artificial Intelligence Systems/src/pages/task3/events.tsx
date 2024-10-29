import { useEffect, useMemo, useState } from "react";
import { Actions, useMaxValue, useProvider } from "./provider";

const EventInput = ({ number }: { number: number }) => {
  const { actions, setState } = useProvider();
  const { value } = useMaxValue();
  const action = actions[number];
  const isFirst = useMemo(() => number === 0, [number]);
  const isLast = useMemo(
    () => number === actions.length - 1,
    [number, actions]
  );

  useEffect(() => {
    if (isLast)
      setState((prev) =>
        prev.map((el, ind) =>
          ind === prev.length - 1
            ? { event: [el.event[0], el.event[1], value, value] }
            : el
        )
      );
  }, [isLast, value]);

  return (
    <div className="flex gap-5">
      <p>Терм {number}:</p>
      <div className="flex gap-0">
        <input
          defaultValue={isFirst ? 0 : action?.event?.[0]}
          className="border px-2 border-black w-[100px]"
          type="number"
          placeholder="Left zero"
          disabled={isFirst}
          onChange={(e) =>
            setState((prev) =>
              prev.map((act, ind) =>
                ind === number
                  ? {
                      event: [
                        +e.target.value,
                        act.event[1],
                        act.event[2],
                        act.event[3],
                      ],
                    }
                  : act
              )
            )
          }
        />
        <input
          defaultValue={isFirst ? 0 : action?.event?.[1]}
          disabled={isFirst}
          className="border px-2 border-black w-[100px]"
          type="number"
          placeholder="Left one"
          onChange={(e) =>
            setState((prev) =>
              prev.map((act, ind) =>
                ind === number
                  ? {
                      event: [
                        act.event[0],
                        +e.target.value,
                        act.event[2],
                        act.event[3],
                      ],
                    }
                  : act
              )
            )
          }
        />
        <input
          value={isLast ? value : action?.event?.[2]}
          onChange={(e) =>
            setState((prev) =>
              prev.map((act, ind) =>
                ind === number
                  ? {
                      event: [
                        act.event[0],
                        act.event[1],
                        +e.target.value,
                        act.event[3],
                      ],
                    }
                  : act
              )
            )
          }
          disabled={isLast}
          className="border px-2 border-black w-[100px]"
          type="number"
          placeholder="Right one"
        />
        <input
          value={isLast ? value : action?.event?.[3]}
          disabled={isLast}
          className="border px-2 border-black w-[100px]"
          type="number"
          placeholder="Right zero"
          onChange={(e) =>
            setState((prev) =>
              prev.map((act, ind) =>
                ind === number
                  ? {
                      event: [
                        act.event[0],
                        act.event[1],
                        act.event[2],
                        +e.target.value,
                      ],
                    }
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
  const [count, setCount] = useState(1);
  const { setState } = useProvider();

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
      {new Array(count).fill(0).map((_, index) => (
        <EventInput key={`input${index}`} number={index} />
      ))}
      <button
        className="rounded-lg px-2 border-black bg-zinc-500 text-white py-2"
        onClick={() => {
          setCount((prev) => prev + 1);
          setState(
            (prev) => [...prev, { event: [0, 0, value, value] }] as Actions
          );
        }}
      >
        Добавить терм
      </button>
      <button
        className="rounded-lg px-2 border-black bg-zinc-400 py-2"
        onClick={() => {
          setCount((prev) => prev - 1);
          setState((prev) => prev.slice(0, count - 1));
        }}
      >
        Удалить терм
      </button>
    </div>
  );
};
