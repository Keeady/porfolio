export async function getProjects() {
  const url = process.env.API_HOST;
  if (!url) {
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
  }
}
