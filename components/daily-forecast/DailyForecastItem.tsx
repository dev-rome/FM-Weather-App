import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import type { DailyForecastItemProps } from "@/types/components";

export default function DailyForecastItem({
  day,
  icon,
  iconAlt,
  highTemp,
  lowTemp,
}: DailyForecastItemProps) {
  return (
    <article aria-label={`${day} forecast`}>
      <Card className="border-neutral-600 bg-neutral-800">
        <CardContent className="flex flex-col items-center gap-3 px-2.5 py-4">
          <p className="text-sm font-medium">{day}</p>
          <Image
            src={icon}
            alt={iconAlt}
            width={48}
            height={48}
            className="h-auto w-auto"
            loading="lazy"
          />
          <div className="flex w-full items-center justify-center gap-3">
            <span className="text-sm font-medium">{highTemp}</span>
            <span className="text-sm font-medium text-neutral-300">
              {lowTemp}
            </span>
          </div>
        </CardContent>
      </Card>
    </article>
  );
}
