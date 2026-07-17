import { notFound } from "next/navigation";

import { EngineeringRecordLayout } from "@/components/labs/EngineeringRecordLayout";
import { CallToAction } from "@/components/site/CallToAction";
import { PageHero } from "@/components/site/PageHero";
import { PageShell } from "@/components/site/PageShell";
import { labProjects } from "@/data/labs";
import { createPageMetadata } from "@/lib/metadata";

type LabsDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

function getLabProject(slug: string) {
  return labProjects.find((project) => project.slug === slug);
}

export function generateStaticParams() {
  return labProjects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: LabsDetailPageProps) {
  const { slug } = await params;
  const project = getLabProject(slug);

  if (!project) {
    return createPageMetadata({
      title: "Lab Project Not Found",
      description: "The requested Recon Dev Labs project could not be found.",
      path: "/labs",
    });
  }

  return createPageMetadata({
    title: project.title,
    description: project.summary,
    path: `/labs/${project.slug}`,
  });
}

export default async function LabsDetailPage({ params }: LabsDetailPageProps) {
  const { slug } = await params;
  const project = getLabProject(slug);

  if (!project) {
    notFound();
  }

  return (
    <PageShell>
      <PageHero eyebrow="Recon Dev Labs" title={project.title}>
        {project.summary}
      </PageHero>

      <EngineeringRecordLayout project={project} />

      <CallToAction
        eyebrow="Interested in similar work?"
        title="Labs projects often start as rough ideas."
        text="If you have a technical concept, prototype, internal tool, workflow problem, or unfinished system, Recon Dev can help explore the path forward."
        buttonText="Start a project inquiry"
        buttonHref="/contact"
      />
    </PageShell>
  );
}
