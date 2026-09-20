export async function getBio() {
  const url = process.env.API_HOST;
  if (!url) {
    return;
  }

  try {
    const res = await fetch(`${url}/bio`);
    if (!res.ok) {
      throw new Error("Failed to fetch bio");
    }
    return res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}
