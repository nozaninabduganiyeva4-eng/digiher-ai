const { ElevenLabsClient } = require('@elevenlabs/elevenlabs-js');
const { Readable } = require('stream');

const client = new ElevenLabsClient();

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { text, voiceId, modelId } = req.body || {};
    if (!text) {
      return res.status(400).json({ error: 'Text is required' });
    }

    const cleanText = text
      .replace(/[*_#`[\]()]/g, ' ')
      .replace(/https?:\/\/\S+/g, '')
      .replace(/\s+/g, ' ')
      .trim()
      .substring(0, 500);

    const audioStream = await client.textToSpeech.convert(voiceId || 'EXAVITQu4vr4xnSDxMaL', {
      text: cleanText,
      modelId: modelId || 'eleven_multilingual_v2',
    });

    res.setHeader('Content-Type', 'audio/mpeg');
    res.setHeader('Cache-Control', 'no-cache');
    Readable.fromWeb(audioStream).pipe(res);
  } catch (err) {
    console.error('[ElevenLabs Vercel API Error]:', err);
    res.status(500).json({ error: err.message || 'Speech synthesis failed' });
  }
};
