import Link from "next/link";
import { Container } from "@/components/site/Container";

type CallToActionProps = {
  eyebrow?: string;
  title?: string;
  text?: string;
  buttonText?: string;
  buttonHref?: string;
};

export function CallToAction({
  eyebrow = "Ready when you are",
  title = "Bring the problem. Recon Dev will help map the path.",
  text = "Send the goal, the blocker, and what you have already tried. From there, we can decide whether you need support, a plan, a build, or a deeper review.",
  buttonText = "Start a project",
  buttonHref = "/contact",
}: CallToActionProps) {
  return (
    <section className="border-y border-slate-200 bg-white py-20">
      <Container>
        <div className="grid gap-8 rounded-3xl bg-slate-950 p-8 text-white md:grid-cols-[1fr_0.7fr] md:items-center md:p-12">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-slate-400">
              {eyebrow}
            </p>

            <h2 className="text-3xl font-bold tracking-tight">{title}</h2>

            <p className="mt-4 max-w-3xl leading-7 text-slate-300">{text}</p>
          </div>

          <Link
            href={buttonHref}
            prefetch={false}
            className="inline-flex items-center justify-center rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-slate-950 shadow-sm transition hover:bg-slate-100"
          >
            {buttonText}
          </Link>
        </div>
      </Container>
    </section>
  );
}