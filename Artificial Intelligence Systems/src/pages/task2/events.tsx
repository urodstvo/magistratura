import { Actions, type Configurator, useActions, useConfigurator, useTimeline } from "./provider";

const EventInput = ({ number }: { number: number }) => {
  const eventName = `event${number}`;
  const eventActionName = `setEvent${number}`;

  const actions = useActions();
  const events = useConfigurator();

  return (
    <div className="flex gap-5">
      <p>Событие {number} от</p>
      <input
        className="border rounded-lg px-2 border-black"
        type="number"
        value={events[eventName as keyof Configurator][0]}
        min={0}
        max={events[eventName as keyof Configurator][1]}
        step={1}
        onChange={(e) =>
          actions[eventActionName as keyof Actions](
            (prev: [number, number]) => [+e.target.value, prev[1]] as [number, number]
          )
        }
      />
      <p>до</p>
      <input
        className="border rounded-lg px-2 border-black"
        type="number"
        value={events[eventName as keyof Configurator][1]}
        min={events[eventName as keyof Configurator][0] + 1}
        max={60}
        step={1}
        onChange={(e) =>
          actions[eventActionName as keyof Actions](
            (prev: [number, number]) => [prev[0], +e.target.value] as [number, number]
          )
        }
      />
    </div>
  );
};

export const EventsConfigurator = () => {
  const { timeline } = useTimeline();
  const events = useConfigurator();

  const out = new Array(5).fill("");

  Object.keys(events)
    .filter((el) => events[el as keyof Configurator][1] <= timeline)
    .forEach((el) => (out[+el.replace("event", "") - 1] = "Завершилсь"));

  Object.keys(events)
    .filter(
      (el) =>
        events[el as keyof Configurator][0] <= timeline &&
        events[el as keyof Configurator][1] > timeline
    )
    .forEach((el) => (out[+el.replace("event", "") - 1] = "Происходит"));

  Object.keys(events)
    .filter((el) => events[el as keyof Configurator][0] > timeline)
    .forEach((el) => (out[+el.replace("event", "") - 1] = "Будет позже"));

  return (
    <div className="flex flex-col gap-5">
      <div className="flex gap-5">
        <EventInput number={1} />
        <b>{out[0]}</b>
      </div>
      <div className="flex gap-5">
        <EventInput number={2} />
        <b>{out[1]}</b>
      </div>
      <div className="flex gap-5">
        <EventInput number={3} />
        <b>{out[2]}</b>
      </div>
      <div className="flex gap-5">
        <EventInput number={4} />
        <b>{out[3]}</b>
      </div>
      <div className="flex gap-5">
        <EventInput number={5} />
        <b>{out[4]}</b>
      </div>
    </div>
  );
};
