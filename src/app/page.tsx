import { Overview } from "@/components/sections/Overview";
import { Education } from "@/components/sections/Education";
import { Skills } from "@/components/sections/Skills";
import { Experience } from "@/components/sections/Experience";
import { Projects } from "@/components/sections/Projects";
import { Certifications } from "@/components/sections/Certifications";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Overview />
      <Education />
      <Skills />
      <Experience />
      <Projects />
      <Certifications />

      {/* Simple Footer directly in page */}
      <footer className="bg-white border-t border-gray-100 py-12 mt-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
          <p className="text-gray-500 text-sm font-medium">
            © {new Date().getFullYear()} Alex Doe. Built with Next.js & Tailwind CSS.
          </p>
        </div>
      </footer>
    </main>
  );
}
