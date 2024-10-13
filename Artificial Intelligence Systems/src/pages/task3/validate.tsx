import { useEffect, useState } from "react";
import { useMaxValue, useProvider } from "./provider";

export const Errors = () => {
  const { actions } = useProvider();
  const { value } = useMaxValue();

  const [isIntersection, setIsIntersection] = useState(false);
  const [isCovering, setIsCovering] = useState(false);

  useEffect(() => {
    setIsIntersection(false);
    setIsCovering(false);

    let range = 0;
    for (let i = 0; i < actions.length; i++) {
      const action = actions[i].event;
      if (action[0] <= range && action[3] > range) range = action[3];
      for (let j = 1; j < actions.length; j++) {
        const another = actions[j].event;

        if (
          (action[1] < another[1] && another[1] < action[2]) ||
          (action[1] < another[2] && another[2] < action[2])
        )
          setIsIntersection(true);
      }
    }

    if (range !== value) setIsCovering(true);
  }, [actions, setIsIntersection, value, setIsCovering]);

  return (
    <ul>
      <li>{isIntersection ? "Нарушено требование к разграничению понятий" : ""}</li>
      <li>
        {isCovering
          ? "Нарушено требование к полноте покрытия предметной области областями определения функций принадлежности лингвистической переменной"
          : ""}
      </li>
    </ul>
  );
};
