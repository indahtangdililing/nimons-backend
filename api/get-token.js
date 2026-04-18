const { AccessToken } = require('livekit-server-sdk');

module.exports = async (req, res) => {
  const { room, identity } = req.query;

  if (!room || !identity) {
    return res.status(400).json({ error: 'Missing room or identity' });
  }

  const apiKey = process.env.LIVEKIT_API_KEY;
  const apiSecret = process.env.LIVEKIT_API_SECRET;

  if (!apiKey || !apiSecret) {
    return res.status(500).json({ error: 'Missing LIVEKIT_API_KEY or LIVEKIT_API_SECRET' });
  }

  const at = new AccessToken(apiKey, apiSecret, { identity });

  at.addGrant({
    roomJoin: true,      // WAJIB
    room,                // nama room (familyId)
    canPublish: true,
    canSubscribe: true,
  });

  const token = await at.toJwt();
  return res.status(200).json({ token });
};