// pages/api/convertToMP3.js
import axios from 'axios';
import ytdl from 'ytdl-core';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { url } = req.body;
    try {
      // Use the ytdl-core library to convert YouTube video to MP3
      const mp3URL = await convertToMP3(url);
      res.status(200).json({ mp3URL });
    } catch (error) {
      console.error('Error converting YouTube video to MP3:', error);
      res.status(500).json({ error: 'Conversion failed' });
    }
  } else {
    res.status(405).end(); // Method not allowed
  }
}

// Function to convert YouTube video to MP3 using ytdl-core
async function convertToMP3(url) {
  try {
    const info = await ytdl.getInfo(url);
    const audioFormats = ytdl.filterFormats(info.formats, 'audioonly');
    if (audioFormats.length > 0) {
      const audioURL = audioFormats[0].url;
      return audioURL;
    } else {
      throw new Error('No audio formats available for the video.');
    }
  } catch (error) {
    throw new Error('Failed to convert to MP3: ' + error.message);
  }
}
