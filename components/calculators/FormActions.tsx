import { Button } from "@/components/ui";

type Props = {
  onReset: () => void;
  submitLabel?: string;
};

export function FormActions({
  onReset,
  submitLabel = "Calculate",
}: Props) {
  return (
    <div className="flex flex-wrap gap-3">
      <Button type="submit" variant="primary">
        {submitLabel}
      </Button>
      <Button type="button" variant="secondary" onClick={onReset}>
        Reset
      </Button>
    </div>
  );
}
