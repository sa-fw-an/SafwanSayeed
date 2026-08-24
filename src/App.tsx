import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { ProgressBar } from "@/components/ProgressBar";
import { ParallaxField } from "@/components/ParallaxField";
import { PetDragon } from "@/components/PetDragon";
import { RouterProvider, useRouter } from "@/lib/router";
import { initGlobalSound } from "@/lib/sound";
import { useEffect } from "react";
import HomePage from "@/pages/HomePage";
import WorkPage from "@/pages/WorkPage";
import JourneyPage from "@/pages/JourneyPage";
import StudioPage from "@/pages/StudioPage";
import ContactPage from "@/pages/ContactPage";

const PAGES = {
  "/": HomePage,
  "/work": WorkPage,
  "/journey": JourneyPage,
  "/studio": StudioPage,
  "/contact": ContactPage,
} as const;

function Routed() {
  const { route } = useRouter();
  const Page = PAGES[route];
  return (
    <div key={route} className="page-enter">
      <main>
        <Page />
      </main>
    </div>
  );
}

export default function App() {
  useEffect(() => initGlobalSound(), []);

  return (
    <RouterProvider>
      <ParallaxField />
      <ProgressBar />
      <ThemeSwitcher />
      <Navbar />
      <Routed />
      <Footer />
      <PetDragon />
    </RouterProvider>
  );
}
