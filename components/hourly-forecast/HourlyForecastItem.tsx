import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

type HourlyForecastItemProps = {
  time: string;
  icon: string;
  iconAlt: string;
  temperature: string;
};

export default function HourlyForecastItem({
  time,
  icon,
  iconAlt,
  temperature,
}: HourlyForecastItemProps) {
  return (
    <article aria-label={`${time} forecast`}>
      <Card className="border-neutral-600 bg-neutral-700">
        <CardContent className="flex items-center justify-between gap-4 px-3 py-2.5">
          <Image
            src={icon}
            alt={iconAlt}
            width={40}
            height={40}
            className="h-auto w-auto"
            preload={true}
            fetchPriority="high"
          />
          <p className="flex-1 font-medium">{time}</p>
          <p className="text-base font-medium">{temperature}</p>
        </CardContent>
      </Card>
    </article>
  );
}
