import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAttrContext } from "./provider";
import { Button } from "@/components/ui/button";
import { TrashIcon } from "@radix-ui/react-icons";

export const AttrList = () => {
  const { value, removeValue } = useAttrContext();

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Название</TableHead>
          <TableHead>Тип</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {value.map((attr) => (
          <TableRow key={attr.id}>
            <TableCell>{attr.name}</TableCell>
            <TableCell>{attr.typeLabel}</TableCell>
            <TableCell className="w-[64px]">
              <Button onClick={() => removeValue(attr.id)} size="icon" variant="ghost">
                <TrashIcon />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
