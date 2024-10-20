import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAttrContext, useRulesContext } from "./provider";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";

const RuleCard = ({
  id,
  rules,
}: {
  id: number;
  rules: {
    attr_id: number;
    value: string;
  }[];
}) => {
  const { value } = useAttrContext();
  return (
    <Card>
      <Collapsible>
        <CardHeader className="p-2 px-5">
          <CardTitle className="flex justify-between items-center">
            ID: {id}
            <CollapsibleTrigger asChild>
              <Button size="icon" variant="ghost">
                <CaretSortIcon />
              </Button>
            </CollapsibleTrigger>
          </CardTitle>
        </CardHeader>
        <CollapsibleContent>
          <CardContent>
            <div className="flex flex-col gap-0">
              <p>
                <b>ЕСЛИ</b> {value.find((el) => el.id === rules[0].attr_id)?.name} <b> РАВНО </b>
                {rules[0].value}
              </p>
              {rules.slice(1, -1).map((rule) => (
                <p key={rule.attr_id}>
                  <b>И</b> {value.find((el) => el.id === rule.attr_id)?.name} <b> РАВНО </b>
                  {rule.value}
                </p>
              ))}
              <p>
                <b>ТО</b> {value.find((el) => el.id === rules.at(-1)?.attr_id)?.name} <b> РАВНО </b>
                {rules[0].value}
              </p>
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};

export const RuleList = () => {
  const { rules } = useRulesContext();
  console.log(rules);
  const perfrormedRules = [...rules];
  return (
    <div className="flex flex-col flex-1 gap-5 mt-5">
      {perfrormedRules.map((rule) => (
        <RuleCard key={rule[0]} id={rule[0]} rules={rule[1]} />
      ))}
    </div>
  );
};
