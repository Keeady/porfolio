import { getProjects } from "@/api/projects";
import ProjectCard from "./projects";
import Image from "next/image";
import ErrorView from "../components/error-view";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

type ProjectItem = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  skills: string[];
  image_url: string;
  company: string;
};

export default async function Projects() {
  const projects: ProjectItem[] = await getProjects();

  if (!projects || projects.length === 0) {
    return (
      <ErrorView
        code="404"
        title="Page not found ..."
        message="The page you're looking for doesn't exist or has been moved."
      >
        <Link
          target="_blank"
          rel="noopener noreferrer"
          href="https://linkedin.com/in/camariabevavy"
          className="inline-flex gap-2 items-center justify-center rounded-full bg-sky-400 px-7 py-3 text-sm font-semibold text-[#040B14] transition-all hover:scale-[1.03] hover:bg-sky-300"
        >
          Checkout my projects on LinkedIn
          <ExternalLink className="h-4 w-4" />
        </Link>
      </ErrorView>
    );
  }

  return (
    <section className="relative flex flex-col items-center overflow-hidden bg-[#040B14] px-6 pb-24 pt-20 text-center">
      <div className="mx-auto flex max-w-2xl flex-col gap-8 px-6 py-12">
        {projects.map((p: ProjectItem) => (
          <ProjectCard
            key={p.id}
            title={p.title}
            subtitle={p.subtitle}
            description={p.description}
            skills={p.skills}
            companyIcon={getCompanyIcon(p.company)}
            image_url={p.image_url}
          />
        ))}
      </div>
    </section>
  );
}

function getCompanyIcon(company: string) {
  if (["outlook", "teams", "spotapaw"].includes(company)) {
    return (
      <Image
        src={`/${company}.png`}
        alt={`${company} icon`}
        width={40}
        height={40}
      />
    );
  }
  return null;
}
