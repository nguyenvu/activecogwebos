import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const response = await fetch("https://de1.api.radio-browser.info/json/stations/search?language=english&limit=10");
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching radio stations:", error);
    res.status(500).json({ error: "Failed to fetch radio stations" });
  }
}
