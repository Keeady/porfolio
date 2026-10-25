export async function getProjects() {
  const url = process.env.API_HOST;
  if (!url) {
    console.log("getProjects " + url);
    return;
  }

  try {
    const res = await fetch(`${url}/projects`);
    if (!res.ok) {
      throw new Error("Failed to fetch projects");
    }
    return res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getProjectById(id: string) {
  const url = process.env.API_HOST;
  if (!url) {
    console.log("getProjects " + url);
    return;
  }

  try {
    const res = await fetch(`${url}/projects/${id}`);
    if (!res.ok) {
      throw new Error("Failed to fetch projects");
    }
    return res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}
