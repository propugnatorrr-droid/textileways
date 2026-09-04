import { Container, Section } from "@/components/ui";

/** Page level loading state. Reserves layout space to avoid a shift on load. */
export default function Loading() {
  return (
    <Section>
      <Container>
        <div className="animate-pulse space-y-6" aria-hidden="true">
          <div className="h-3 w-32 bg-mist" />
          <div className="h-14 w-full max-w-[38ch] bg-mist" />
          <div className="h-4 w-full max-w-[58ch] bg-mist" />
          <div className="h-4 w-full max-w-[52ch] bg-mist" />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="aspect-[4/3] bg-mist" />
            <div className="aspect-[4/3] bg-mist" />
            <div className="aspect-[4/3] bg-mist" />
          </div>
        </div>
        <p className="sr-only" role="status">
          Loading page content
        </p>
      </Container>
    </Section>
  );
}
