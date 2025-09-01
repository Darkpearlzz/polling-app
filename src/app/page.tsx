import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <div className="text-center flex flex-col items-center justify-center min-h-[70vh]">
      <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
        Welcome to the Polling App
      </h1>
      <p className="text-lg text-muted-foreground max-w-2xl mb-8">
        Create, share, and vote on polls in real-time. See what the world
        thinks.
      </p>
      <Link href="/polls">
        <Button size="lg">View All Polls</Button>
      </Link>
    </div>
  );
}
