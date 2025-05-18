import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function HeaderCorusel() {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: false }),
  );

  const slides = [
    {
      img: "/Header_1_img.png",
      txt: "Temuriylar davri adabiyoti",
    },
    {
      img: "/Jadidlar_tarixi.jpg",
      txt: "Jadidlarimiz tarixi",
    },
    {
      img: "/temuriylar_davri.jpg",
      txt: "Temuriylar hukumronligi",
    },
    {
      img: "/sovet_ittifoqi_tarixi.jpg",
      txt: "Sovet ittifoqi davri",
    },
  ];

  return (
    <Carousel
      plugins={[plugin.current]}
      className="mt-[54px] w-full overflow-x-hidden px-20"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {slides.map((slide, index) => (
          <CarouselItem key={index}>
            <div className="relative">
              <Card>
                <CardContent className="relative flex flex-col items-center justify-center p-0">
                  {/* Rasm */}
                  <img
                    src={slide.img}
                    alt={slide.txt}
                    className="h-[346px] w-full rounded-xl object-cover"
                  />

                  {/* Matn joylashuvi */}
                  <div className="absolute left-10 top-10 text-left font-serif text-[#333333]">
                    <h2 className="font-dancing w-[400px] rounded-md bg-white/50 p-1 text-[68px] uppercase leading-tight backdrop-blur-sm">
                      {slide.txt}
                    </h2>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
