import { FadeIn } from "@/components/fade-in";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
      <FadeIn>
        <h1 className="text-5xl font-semibold tracking-tight">Arte e Cor</h1>
      </FadeIn>
      <FadeIn delay={0.2}>
        <p className="text-lg text-zinc-600 dark:text-zinc-400">
          Next.js + Tailwind CSS + Motion
        </p>
      </FadeIn>
    </main>
  );
}
