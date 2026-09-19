export async function getProjects() {
  const res = await fetch(`${process.env.API_HOST}/projects`);
  if (!res.ok) throw new Error("Failed to fetch projects");
  return res.json();
}
