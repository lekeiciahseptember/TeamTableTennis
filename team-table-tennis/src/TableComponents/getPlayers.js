const API_ENDPOINT = "http://100.115.92.205:8000/";

export async function getPlayers() {
  try {
    const res = await fetch(API_ENDPOINT);

    if (!res.ok) {
      throw new Error(
        `Failed to fetch players: ${res.status} ${res.statusText}`
      );
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching players:", error);
    throw error;
  }
}
