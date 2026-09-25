export async function getWritings() {
  const url = process.env.API_HOST;
  if (!url) {
    return;
  }

  try {
    const res = await fetch(`${url}/writings`);
    if (!res.ok) {
      throw new Error("Failed to fetch writings");
    }
    return res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getWritingById(id: string) {
  const url = process.env.API_HOST;
  if (!url) {
    return;
  }

  try {
    const res = await fetch(`${url}/writings/${id}`);
    if (!res.ok) {
      throw new Error("Failed to fetch writing by id");
    }
    return res.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}
