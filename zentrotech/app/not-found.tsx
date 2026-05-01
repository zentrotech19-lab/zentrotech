import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="min-h-[60vh] flex items-center">
      <Container className="text-center">
        <p className="text-aurora font-mono text-sm">404</p>
        <h1 className="mt-4 text-5xl md:text-7xl font-black text-white">Lost in the future.</h1>
        <p className="mt-6 text-text-muted">This page doesn&apos;t exist — or hasn&apos;t been invented yet.</p>
        <div className="mt-10">
          <Button href="/">Take me home</Button>
        </div>
      </Container>
    </section>
  );
}
