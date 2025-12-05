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
        <CardContent className="flex flex-col items-center gap-4 px-2.5 py-6">
          <p className="text-lg font-medium">{day}</p>
          <Image
            src={icon}
            alt={iconAlt}
            width={60}
            height={60}
            className="h-auto w-auto"
            loading="lazy"
          />
          <div className="flex w-full justify-between">
            <span className="text-xl font-medium">{highTemp}</span>
            <span className="text-xl font-medium text-neutral-200">
              {lowTemp}
            </span>
          </div>
        </CardContent>
      </Card>
    </article>
  );
}
