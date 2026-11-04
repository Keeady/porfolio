export async function submitForm(data: any, type: string) {
  const url = process.env.NEXT_PUBLIC_API_HOST;
  if (!url) {
    throw new Error("Invalid api");
  }

  try {
    const res = await fetch(`${url}/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, type }),
    });
    if (!res.ok) {
      throw new Error("Failed to send contact");
    }
    return res.json();
  } catch (error) {
    console.error(error);
    return false;
  }
}
