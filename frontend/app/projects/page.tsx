import { getProjects } from "@/api/projects";
import ProjectCard from "./projects";
import Image from "next/image";

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
  const projects = await getProjects();

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
