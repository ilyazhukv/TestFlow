import { Spinner } from "@heroui/spinner";

export function CustomSpinner() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background">
      <div className="relative flex items-center justify-center">
        <div className="absolute inset-0 rounded-full bg-primary/20 blur-2xl animate-pulse" />
        <Spinner
          classNames={{
            wrapper: "w-16 h-16",
            label: "text-primary font-semibold text-lg tracking-tight mt-6",
          }}
          color="primary"
          label="Loading..."
          size="lg"
          variant="wave"
        />
      </div>
    </div>
  );
}
