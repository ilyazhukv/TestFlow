import { Clock } from "@gravity-ui/icons";
import { Chip } from "@heroui/react";

interface TestTimerProps {
  seconds: number;
}

export function Timer({ seconds }: TestTimerProps) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;

  return (
    <Chip size="sm" startContent={<Clock />} variant="light">
      {mins}:{secs < 10 ? `0${secs}` : secs}
    </Chip>
  );
}
