import Image from "next/image";

export default function CurrentWeather() {
  return (
    <article
      aria-label="Current weather conditions"
      className="relative pb-5 lg:pb-8"
    >
      <picture>
        <source
          srcSet="/images/bg-today-large.svg"
          media="(min-width: 768px)"
        />
        <Image
          src="/images/bg-today-small.svg"
          alt=""
          width={343}
          height={286}
          className="h-auto w-full"
          aria-hidden="true"
          priority
        />
      </picture>
      <div className="absolute inset-0 flex w-full flex-col items-center justify-center md:flex-row md:justify-between md:px-6">
        <div className="text-center md:text-left">
          <h2 className="text-[1.75rem] font-bold">Berlin, Germany</h2>
          <time dateTime="2025-08-05" className="text-lg font-medium">
            Tuesday, Aug 5, 2025
          </time>
        </div>
        <div className="flex items-center">
          <Image
            src="/images/icon-sunny.webp"
            alt="Sunny weather"
            width={120}
            height={120}
            className="h-auto w-auto"
            priority
          />
          <p
            className="text-8xl font-semibold"
            aria-label="Temperature 20 degrees"
          >
            20°
          </p>
        </div>
      </div>
    </article>
  );
}
