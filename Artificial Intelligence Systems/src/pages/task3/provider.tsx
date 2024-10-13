import { createContext, useContext, useState } from "react";

export type Actions = {
  event: [number, number, number, number];
  setEvent: React.Dispatch<React.SetStateAction<[number, number, number, number]>>;
}[];

const MaxValueContext = createContext<{
  value: number;
  setValue: React.Dispatch<React.SetStateAction<number>>;
}>({
  value: 100,
  setValue: () => {},
});

const ConfiguratorContext = createContext<{
  actions: Actions;
  setState: React.Dispatch<React.SetStateAction<Actions>>;
}>({
  actions: [],
  setState: () => {},
});

export const Provider = ({ children }: { children: React.ReactNode }) => {
  const [actions, setState] = useState([] as Actions);
  const [value, setValue] = useState(100);
  return (
    <MaxValueContext.Provider value={{ value, setValue }}>
      <ConfiguratorContext.Provider
        value={{
          actions,
          setState,
        }}
      >
        {children}
      </ConfiguratorContext.Provider>
    </MaxValueContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useProvider = () => {
  return useContext(ConfiguratorContext);
};
// eslint-disable-next-line react-refresh/only-export-components
export const useMaxValue = () => {
  return useContext(MaxValueContext);
};
