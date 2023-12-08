"use client";
import { WeatherContextProvider } from "@/lib/contexts/weather-context";

export default function PageLayout({ children }) {
  return (
    <div
      className="p-4 antialiased grayscale-0"
      style={{
        backgroundImage: "url('bg.jpg')",
        backgroundSize: "cover",
        height: "100vh",
        width: "100vw",
      }}
    >
      <WeatherContextProvider>{children}</WeatherContextProvider>
    </div>
  );
}
