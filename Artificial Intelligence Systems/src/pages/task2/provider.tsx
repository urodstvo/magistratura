import { createContext, useContext, useState } from "react";

export type Actions = {
  setEvent1: React.Dispatch<React.SetStateAction<[number, number]>>;
  setEvent2: React.Dispatch<React.SetStateAction<[number, number]>>;
  setEvent3: React.Dispatch<React.SetStateAction<[number, number]>>;
  setEvent4: React.Dispatch<React.SetStateAction<[number, number]>>;
  setEvent5: React.Dispatch<React.SetStateAction<[number, number]>>;
};

export type Configurator = {
  event1: [number, number];
  event2: [number, number];
  event3: [number, number];
  event4: [number, number];
  event5: [number, number];
};

const TimelineActionsContext = createContext<Actions>({
  setEvent1: () => {},
  setEvent2: () => {},
  setEvent3: () => {},
  setEvent4: () => {},
  setEvent5: () => {},
});

const EventsConfiguratorContext = createContext<Configurator>({
  event1: [0, 0],
  event2: [0, 0],
  event3: [0, 0],
  event4: [0, 0],
  event5: [0, 0],
});

const TimelineConfiguratorContext = createContext<{
  timeline: number;
  setTimeline: React.Dispatch<React.SetStateAction<number>>;
}>({
  timeline: 0,
  setTimeline: () => {},
});

export const Provider = ({ children }: { children: React.ReactNode }) => {
  const [event1, setEvent1] = useState([0, 10] as [number, number]);
  const [event2, setEvent2] = useState([10, 30] as [number, number]);
  const [event3, setEvent3] = useState([20, 50] as [number, number]);
  const [event4, setEvent4] = useState([30, 60] as [number, number]);
  const [event5, setEvent5] = useState([30, 50] as [number, number]);

  const [timeline, setTimeline] = useState(30);
  return (
    <TimelineActionsContext.Provider
      value={{
        setEvent1,
        setEvent2,
        setEvent3,
        setEvent4,
        setEvent5,
      }}
    >
      <EventsConfiguratorContext.Provider
        value={{
          event1,
          event2,
          event3,
          event4,
          event5,
        }}
      >
        <TimelineConfiguratorContext.Provider
          value={{
            timeline,
            setTimeline,
          }}
        >
          {children}
        </TimelineConfiguratorContext.Provider>
      </EventsConfiguratorContext.Provider>
    </TimelineActionsContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useActions = () => {
  return useContext(TimelineActionsContext);
};
// eslint-disable-next-line react-refresh/only-export-components
export const useConfigurator = () => {
  return useContext(EventsConfiguratorContext);
};
// eslint-disable-next-line react-refresh/only-export-components
export const useTimeline = () => {
  return useContext(TimelineConfiguratorContext);
};
