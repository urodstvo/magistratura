import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useConfigurator } from "./provider";

export const RelationTable = () => {
  const events = useConfigurator();
  const relations: string[][] = new Array(5).fill(0).map(() => new Array(5).fill(""));

  for (const event1 of Object.keys(events)) {
    for (const event2 of Object.keys(events)) {
      const row = Number(event1.replace("event", "")) - 1;
      const col = Number(event2.replace("event", "")) - 1;
      let rel = "";
      if (row !== col) {
        const start1 = events[event1 as keyof typeof events][0];
        const end1 = events[event1 as keyof typeof events][1];
        const start2 = events[event2 as keyof typeof events][0];
        const end2 = events[event2 as keyof typeof events][1];

        const startDiff = start1 - start2;
        const endDiff = end1 - end2;

        if (startDiff === 0 || endDiff === 0) rel = startDiff === 0 ? "rtel" : "rter";
        else if (startDiff / endDiff < 0) rel = "rte";
        else if (end1 - start2 === 0 || end2 - start1 === 0) rel = "rtsn";
        else if (start1 > end2 || start2 > end1) rel = "rts";
        else if ((start1 < start2 && start2 < end1) || (start2 < start1 && start1 < end2))
          rel = "rtes";
      }
      relations[row][col] = rel;
      relations[col][row] = rel;
    }
  }

  return (
    <div>
      <h3>Таблица отношений:</h3>
      <Table className="border">
        <TableHeader>
          <TableRow>
            <TableHead className="border"></TableHead>
            <TableHead className="border">Событие 1</TableHead>
            <TableHead className="border">Событие 2</TableHead>
            <TableHead className="border">Событие 3</TableHead>
            <TableHead className="border">Событие 4</TableHead>
            <TableHead className="border">Событие 5</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {relations.map((data, index) => (
            <TableRow key={`row-${index}`}>
              <TableHead>Событие {index + 1}</TableHead>
              {data.map((rel, ind) => (
                <TableCell className="border" colSpan={1} key={`cell-${ind}`} align="center">
                  {rel}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
