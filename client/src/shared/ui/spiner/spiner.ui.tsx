import { Spinner } from "@heroui/spinner";

export function Spiner() {
  return (
    <div className="flex flex-wrap items-end gap-8">
      <Spinner classNames={{ label: "text-foreground mt-4" }} variant="wave" />
    </div>
  );
}
