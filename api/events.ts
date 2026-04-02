import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const SITE_ID = process.env.WEBFLOW_SITE_ID;
  const COLLECTION_ID = process.env.WEBFLOW_COLLECTION_ID;
  const TOKEN = process.env.WEBFLOW_TOKEN;

  const url = `https://api.webflow.com/v2/sites/${SITE_ID}/collections/${COLLECTION_ID}/items`;

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "accept-version": "2.0.0",
      },
    });

    const data = await response.json(); // ✅ parse directly

    return res.status(200).json(data); // ✅ return clean data only
  } catch (err: any) {
    console.error(err);

    return res.status(500).json({
      error: "Failed to fetch Webflow data",
    });
  }
}