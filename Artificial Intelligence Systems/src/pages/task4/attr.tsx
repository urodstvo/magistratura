import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAttrContext } from "./provider";
import { useState } from "react";

export const AttributeCreator = () => {
  const { addValue } = useAttrContext();

  const [name, setName] = useState("");
  const [type, setType] = useState("");

  const handleClick = () => {
    if (!name || !type) return;
    addValue(name, type);
  };

  return (
    <div className="flex gap-5">
      <Input
        type="text"
        placeholder="Название атрибута"
        className="max-w-[300px]"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Select onValueChange={setType}>
        <SelectTrigger className="max-w-[300px]">
          <SelectValue placeholder="Тип атрибута" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="string">Символьный</SelectItem>
            <SelectItem value="number">Числовой</SelectItem>
            <SelectItem value="bool">Логический</SelectItem>
            <SelectItem value="date">Дата</SelectItem>
            <SelectItem value="fuzzy">Нечеткий</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <Button className="max-w-[300px]" onClick={handleClick}>
        Добавить
      </Button>
    </div>
  );
};
