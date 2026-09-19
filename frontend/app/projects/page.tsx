import { getProjects } from "@/api/projects";
import ProjectCard from "./projects";

type ProjectItem = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  skills: string[];
  imageSrc: string;
  companyIcon: string;
};

export default async function Projects() {
  const projects = await getProjects();

  return (
    <section className="relative flex flex-col items-center overflow-hidden bg-[#040B14] px-6 pb-24 pt-20 text-center">
      <ul>
        {projects.map((p: ProjectItem) => (
          <li key={p.id}>
            <ProjectCard
              key={p.id}
              title={p.title}
              subtitle={p.subtitle}
              description={p.description}
              skills={p.skills}
              companyIcon={p.companyIcon}
              imageSrc={p.imageSrc}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
