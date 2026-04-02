export async function getEvents() {
  const res = await fetch("/api/events");
  const data = await res.json();

  return data.items ?? [];
}