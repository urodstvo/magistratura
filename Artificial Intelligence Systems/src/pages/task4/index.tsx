import { useEffect } from "react";
import { AttributeCreator } from "./attr";
import { AttrList } from "./list";
import { Provider } from "./provider";
import { RuleEditor } from "./editor";
import { RuleList } from "./rule-list";
import { Button } from "@/components/ui/button";

export const TaskPage = () => {
  useEffect(() => {
    document.title = "Задание 4";
  }, []);

  return (
    <Provider>
      <div className="flex p-10 gap-10 flex-col lg:flex-row">
        <div className="flex flex-col gap-10 lg:w-1/2">
          <Button
            className="w-1/3"
            variant="outline"
            onClick={() => {
              localStorage.removeItem("rules");
              localStorage.removeItem("attr");
              window.location.reload();
            }}
          >
            Создать новый проект
          </Button>
          <AttributeCreator />
          <AttrList />
        </div>
        <div className="flex-1">
          <RuleEditor />
          <RuleList />
        </div>
      </div>
    </Provider>
  );
};
