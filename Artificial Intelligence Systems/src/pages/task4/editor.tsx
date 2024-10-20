import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { useAttrContext, useRulesContext } from "./provider";
import { Input } from "@/components/ui/input";

const AdditionalRule = ({
  rule,
  setRule,
  index,
}: {
  index: number;
  rule: {
    attr_id: number;
    value: string;
  };
  setRule: React.Dispatch<
    React.SetStateAction<
      {
        attr_id: number;
        value: string;
      }[]
    >
  >;
}) => {
  const { value } = useAttrContext();
  const [attr, setAttr] = useState<(typeof value)[number] | undefined>(
    rule?.attr_id && rule.attr_id !== 0 ? value.find((item) => item.id === rule.attr_id) : undefined
  );
  const [v, setValue] = useState<string>(rule.value);

  useEffect(() => {
    if (attr && v)
      setRule((prev) =>
        prev.map((el, ind) => (ind === index ? { attr_id: attr.id, value: v } : el))
      );
  }, [attr, index, setRule, v]);

  return (
    <div className="flex items-center gap-5">
      <b>И</b>
      <Select
        onValueChange={(v) => setAttr(value.find((item) => item.name === v))}
        defaultValue={attr?.name}
      >
        <SelectTrigger className="flex-1">
          <SelectValue placeholder="Выберите атрибут" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {value.map((item) => (
              <SelectItem key={item.name} value={item.name}>
                {item.name}
              </SelectItem>
            ))}
          </SelectGroup>
          {value.length === 0 && (
            <p className="px-5 text-sm">Список пуст, добавьте новый атрибут</p>
          )}
        </SelectContent>
      </Select>
      {attr?.id && <b>РАВНО</b>}
      {attr?.type === "date" && (
        <Input
          type="date"
          placeholder="Значение"
          className="flex-1"
          onChange={(e) => setValue(e.target.value)}
        />
      )}
      {attr?.type === "string" && (
        <Input
          type="text"
          placeholder="Значение"
          className="flex-1"
          onChange={(e) => setValue(e.target.value)}
        />
      )}
      {attr?.type === "number" && (
        <Input
          type="number"
          placeholder="Значение"
          className="flex-1"
          onChange={(e) => setValue(e.target.value)}
        />
      )}
      {attr?.type === "bool" && (
        <Select onValueChange={(v) => setValue(v)} defaultValue={v}>
          <SelectTrigger className="flex-1">
            <SelectValue placeholder="Значение" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="true">true</SelectItem>
              <SelectItem value="false">false</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      )}
    </div>
  );
};

const Editor = ({
  rule_id,
  setIsCreating,
}: {
  rule_id: number;
  setIsCreating: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { rules, setRules } = useRulesContext();
  const { value } = useAttrContext();

  //first rule
  const [mainAttr, setMainAttr] = useState<(typeof value)[number] | undefined>(
    value.find((item) => item.id === rules.get(rule_id)?.[0].attr_id)
  );
  const [mainValue, setMainValue] = useState<string>(rules.get(rule_id)?.[0].value || "");

  //last rule
  const [outAttr, setOutAttr] = useState<(typeof value)[number] | undefined>(
    value.find((item) => item.id === rules.get(rule_id)?.[rules.get(rule_id)!.length - 1].attr_id)
  );
  const [outValue, setOutValue] = useState<string>(
    rules.get(rule_id)?.[rules.get(rule_id)!.length - 1].value || ""
  );

  const [additionalRules, setAdditionalRules] = useState<{ attr_id: number; value: string }[]>(
    rules.get(rule_id)?.slice(1, -1) || []
  );

  useEffect(() => {
    if (mainAttr && mainValue && outAttr && outValue) {
      const r = {
        attr_id: mainAttr.id,
        value: mainValue,
      };

      const e = {
        attr_id: outAttr.id,
        value: outValue,
      };

      setRules((prev) =>
        prev.set(rule_id, [r, ...additionalRules.filter((item) => item.attr_id !== 0), e])
      );
    }
  }, [additionalRules, mainAttr, mainValue, outAttr, outValue, rule_id, setRules]);

  useEffect(() => {}, []);

  return (
    <div className="grid grid-cols-1 gap-5">
      <div className="flex items-center gap-5">
        <b>ЕСЛИ</b>
        <Select onValueChange={(v) => setMainAttr(value.find((item) => item.name === v))}>
          <SelectTrigger className="flex-1">
            <SelectValue placeholder="Выберите атрибут" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {value.map((item) => (
                <SelectItem key={item.name} value={item.name}>
                  {item.name}
                </SelectItem>
              ))}
              {}
            </SelectGroup>
            {value.length === 0 && (
              <p className="px-5 text-sm">Список пуст, добавьте новый атрибут</p>
            )}
          </SelectContent>
        </Select>
        {mainAttr?.id && <b>РАВНО</b>}
        {mainAttr?.type === "date" && (
          <Input
            type="date"
            placeholder="Значение"
            className="flex-1"
            onChange={(e) => setMainValue(e.target.value)}
          />
        )}
        {mainAttr?.type === "string" && (
          <Input
            type="text"
            placeholder="Значение"
            className="flex-1"
            onChange={(e) => setMainValue(e.target.value)}
          />
        )}
        {mainAttr?.type === "number" && (
          <Input
            type="number"
            placeholder="Значение"
            className="flex-1"
            onChange={(e) => setMainValue(e.target.value)}
          />
        )}
        {mainAttr?.type === "bool" && (
          <Select onValueChange={(v) => setMainValue(v)}>
            <SelectTrigger className="flex-1">
              <SelectValue placeholder="Значение" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="true">true</SelectItem>
                <SelectItem value="false">false</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        )}
      </div>
      {new Array(additionalRules.length).fill(0).map((rule, index) => (
        <AdditionalRule key={index} index={index} rule={rule} setRule={setAdditionalRules} />
      ))}
      <div className="flex gap-5">
        <Button
          className="flex-1"
          size="sm"
          onClick={() => setAdditionalRules((prev) => [...prev, { attr_id: 0, value: "" }])}
        >
          Добавить условие
        </Button>
        <Button
          className="flex-1"
          size="sm"
          disabled={additionalRules.length === 0}
          onClick={() => setAdditionalRules((prev) => prev.slice(0, -1))}
        >
          Убрать условие
        </Button>
      </div>
      <div className="flex items-center gap-5">
        <b>ТО</b>
        <Select onValueChange={(v) => setOutAttr(value.find((item) => item.name === v))}>
          <SelectTrigger className="flex-1">
            <SelectValue placeholder="Выберите атрибут" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {value.map((item) => (
                <SelectItem key={item.name} value={item.name}>
                  {item.name}
                </SelectItem>
              ))}
              {}
            </SelectGroup>
            {value.length === 0 && (
              <p className="px-5 text-sm">Список пуст, добавьте новый атрибут</p>
            )}
          </SelectContent>
        </Select>
        {outAttr?.id && <b>РАВНО</b>}
        {outAttr?.type === "date" && (
          <Input
            type="date"
            placeholder="Значение"
            className="flex-1"
            onChange={(e) => setOutValue(e.target.value)}
          />
        )}
        {outAttr?.type === "string" && (
          <Input
            type="text"
            placeholder="Значение"
            className="flex-1"
            onChange={(e) => setOutValue(e.target.value)}
          />
        )}
        {outAttr?.type === "number" && (
          <Input
            type="number"
            placeholder="Значение"
            className="flex-1"
            onChange={(e) => setOutValue(e.target.value)}
          />
        )}
        {outAttr?.type === "bool" && (
          <Select onValueChange={(v) => setOutValue(v)}>
            <SelectTrigger className="flex-1">
              <SelectValue placeholder="Значение" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="true">true</SelectItem>
                <SelectItem value="false">false</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        )}
      </div>
      <Button
        onClick={() => {
          setRules(new Map(rules));
          setIsCreating(false);
        }}
      >
        Подтвердить
      </Button>
    </div>
  );
};

export const RuleEditor = () => {
  const { rules } = useRulesContext();
  const [isCreating, setIsCreating] = useState(false);

  return (
    <div className="flex flex-col flex-1 gap-5">
      <div className="flex justify-between w-full items-start">
        <h1 className="text-2xl">Редактор продукционных правил</h1>
        {!isCreating && <Button onClick={() => setIsCreating(true)}>Создать правило</Button>}
      </div>
      {isCreating && <Editor rule_id={rules.size} setIsCreating={setIsCreating} />}
    </div>
  );
};
