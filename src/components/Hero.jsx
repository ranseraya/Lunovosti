"use client";
import { useRef, useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import ChinaVsRussia from "@/assets/RussiaChinaVsUSA.png";
import AutomotiveTesla from "@/assets/tesla.jpg";

const newsItems = [
  {
    title: "China vs Rusia",
    date: "Jul 27, 2025",
    tag: "Politics",
    description: "Latest Trend News, Good for Curiousity",
    image: ChinaVsRussia,
  },
  {
    title: "Tesla Join War",
    date: "Jul 28, 2025",
    tag: "Technology",
    description: "Another big leap for mankind",
    image: AutomotiveTesla,
  },
  {
    title: "AI Controls Battlefield",
    date: "Jul 29, 2025",
    tag: "AI",
    description: "Autonomous drones now decide outcomes.",
    image: AutomotiveTesla,
  },
];

const Hero = () => {
  const containerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const carouselItems = [
    newsItems[newsItems.length - 1],
    ...newsItems,
    newsItems[0],
  ];

  const scrollToIndex = (index) => {
    const container = containerRef.current;
    if (!container) return;

    const containerWidth = container.offsetWidth;
    container.scrollTo({
      left: index * containerWidth,
      behavior: "smooth",
    });

    setCurrentIndex(index);
    setIsTransitioning(true);
  };

  const handleNext = () => {
    if (isTransitioning) return;
    scrollToIndex(currentIndex + 1);
  };

  const handlePrev = () => {
    if (isTransitioning) return;
    scrollToIndex(currentIndex - 1);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleTransitionEnd = () => {
      const containerWidth = container.offsetWidth;

      if (currentIndex === 0) {
        setTimeout(() => {
          container.style.scrollBehavior = "auto";
          container.scrollTo({ left: newsItems.length * containerWidth });
          setCurrentIndex(newsItems.length);
          setTimeout(() => {
            container.style.scrollBehavior = "smooth";
          }, 50);
        }, 300);
      }

      if (currentIndex === newsItems.length + 1) {
        setTimeout(() => {
          container.style.scrollBehavior = "auto";
          container.scrollTo({ left: containerWidth });
          setCurrentIndex(1);
          setTimeout(() => {
            container.style.scrollBehavior = "smooth";
          }, 50);
        }, 300);
      }

      setIsTransitioning(false);
    };

    container.addEventListener("scrollend", handleTransitionEnd);
    return () =>
      container.removeEventListener("scrollend", handleTransitionEnd);
  }, [currentIndex]);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.scrollTo({
        left: container.offsetWidth,
        behavior: "auto",
      });
    }
  }, []);

  return (
    <section className="relative w-full overflow-hidden mt-6">
      <div
        ref={containerRef}
        className="flex overflow-x-scroll no-scrollbar scroll-smooth snap-x snap-mandatory"
      >
        {carouselItems.map((item, i) => (
          <div
            key={i}
            className="relative min-w-full h-[500px] bg-cover bg-center flex items-end p-6 text-white snap-start"
            style={{ backgroundImage: `url(${item.image.src})` }}
          >
            <div className="bg-black bg-opacity-50 p-4 rounded">
              <p className="text-sm text-gray-300">Featured</p>
              <h2 className="text-2xl font-bold">{item.title}</h2>
              <p className="text-sm">
                {item.date} | {item.tag}
              </p>
              <p className="mt-1 font-medium">{item.description}</p>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow"
      >
        <ArrowLeft className="w-5 h-5 text-black" />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow"
      >
        <ArrowRight className="w-5 h-5 text-black" />
      </button>

      <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex gap-2">
        {newsItems.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollToIndex(i + 1)}
            className={`w-3 h-3 rounded-full transition-all ${
              currentIndex === i + 1 ? "bg-white scale-110" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
