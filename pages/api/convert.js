// pages/api/convert.js
import youtubeDlExec from "youtube-dl-exec";

export default async function handler(req, res) {
  const { url } = req.body;

  try {
    // Perform YouTube to MP3 conversion using youtube-dl-exec
    const mp3URL = await youtubeDlExec(url, ["-x", "--audio-format", "mp3"]);
    res.status(200).json({ mp3URL });
  } catch (error) {
    console.error("Error converting YouTube video to MP3:", error);
    res.status(500).json({ error: "Conversion failed" });
  }
}
