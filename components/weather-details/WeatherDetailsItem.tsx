import { Card, CardContent } from "@/components/ui/card";

type WeatherDetailsItemProps = {
  label: string;
  value: string;
};

export default function WeatherDetailsItem({
  label,
  value,
}: WeatherDetailsItemProps) {
  return (
    <article aria-label={label}>
      <Card className="border-neutral-600 bg-neutral-800 p-5">
        <CardContent className="flex flex-col">
          <dl className="flex flex-col gap-5">
            <dt className="text-lg font-medium">{label}</dt>
            <dd className="text-2xl">{value}</dd>
          </dl>
        </CardContent>
      </Card>
    </article>
  );
}
