export async function submitForm(data: any, type: string) {
  const url = process.env.API_HOST;
  if (!url) {
    return;
  }

  try {
    const res = await fetch(`${url}/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, type }),
    });
    if (!res.ok) {
      throw new Error("Failed to fetch bio");
    }
    return res.json();
  } catch (error) {
    console.error(error);
    return false;
  }
}
