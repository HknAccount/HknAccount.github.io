import { Overview } from "@/components/sections/Overview";
import { Education } from "@/components/sections/Education";
import { Skills } from "@/components/sections/Skills";
import { Experience } from "@/components/sections/Experience";
import { Projects } from "@/components/sections/Projects";
import { Certifications } from "@/components/sections/Certifications";
import { Recommendations } from "@/components/sections/Recommendations";
import { FooterStats } from "@/components/FooterStats";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Overview />
      <Education />
      <Skills />
      <Experience />
      <Projects />
      <Certifications />
      <Recommendations />

      {/* Simple Footer directly in page */}
      <footer className="bg-white/40 backdrop-blur-md border-t border-gray-100 py-12 mt-12 w-full">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
          <FooterStats />
          <p className="text-gray-500 text-sm font-medium mt-6">
            © {new Date().getFullYear()} Harikeshwaran PALANI. Built with Next.js & Tailwind CSS.
          </p>
        </div>
      </footer>
    </main>
  );
}
