import { createContext, useCallback, useContext, useEffect, useState } from "react";

type Attr = {
  value: {
    id: number;
    name: string;
    type: string;
    typeLabel: string;
  }[];
  addValue: (name: string, type: string) => void;
  removeValue: (id: number) => void;
};

const AttrContext = createContext<Attr>({ value: [], addValue: () => {}, removeValue: () => {} });

const RulesContext = createContext<{
  rules: Map<number, { attr_id: number; value: string }[]>;
  setRules: React.Dispatch<React.SetStateAction<Map<number, { attr_id: number; value: string }[]>>>;
}>({ rules: new Map(), setRules: () => {} });

const stored_attrs = JSON.parse(localStorage.getItem("attr") || "[]") as {
  id: number;
  name: string;
  type: string;
  typeLabel: string;
}[];
const stored_rules = new Map(
  JSON.parse(localStorage.getItem("rules") || "[]") as Map<
    number,
    { attr_id: number; value: string }[]
  >
);

export const Provider = ({ children }: { children: React.ReactNode }) => {
  const [attr, setAttr] = useState(stored_attrs);
  const [rules, setRules] = useState(stored_rules);

  useEffect(() => {
    localStorage.setItem("attr", JSON.stringify(attr));
  }, [attr]);

  useEffect(() => {
    localStorage.setItem("rules", JSON.stringify(Array.from(rules.entries())));
  }, [rules]);

  const addValue = useCallback(
    (name: string, type: string) => {
      let typeLabel: string;
      switch (type) {
        case "string":
          typeLabel = "Символьный";
          break;
        case "number":
          typeLabel = "Числовой";
          break;
        case "bool":
          typeLabel = "Логический";
          break;
        case "date":
          typeLabel = "Дата";
          break;
        case "fuzzy":
          typeLabel = "Нечеткий";
          break;
        default:
          typeLabel = "Неизвестный";
          break;
      }
      if (!attr.some((el) => el.name === name))
        setAttr((prev) => [...prev, { id: Date.now(), name, type, typeLabel }]);
    },
    [attr]
  );

  const removeValue = useCallback((id: number) => {
    setAttr((prev) => prev.filter((el) => el.id !== id));
  }, []);

  return (
    <AttrContext.Provider value={{ value: attr, addValue, removeValue }}>
      <RulesContext.Provider value={{ rules, setRules }}>{children}</RulesContext.Provider>
    </AttrContext.Provider>
  );
};

export const useAttrContext = () => {
  return useContext(AttrContext);
};

export const useRulesContext = () => {
  return useContext(RulesContext);
};
