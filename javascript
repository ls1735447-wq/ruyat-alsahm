export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  
  const { symbols } = req.query;
  if (!symbols) return res.status(400).json({ error: 'No symbols' });
  
  const SAHMK_KEY = 'shmk_live_e59474b90187419549cf1a920307d3b0ae588c39ee94802a';
  
  try {
    const codes = symbols.split(',');
    const results = {};
    
    for (const code of codes.slice(0, 30)) {
      const r = await fetch(`https://app.sahmk.sa/api/v1/quote/${code}/`, {
        headers: { 'X-API-Key': SAHMK_KEY }
      });
      if (r.ok) {
        const d = await r.json();
        if (d.price > 0) {
          results[code] = {
            price: d.price,
            change: d.change_percent || 0,
            volume: d.volume || 0,
            high: d.high || d.price,
            low: d.low || d.price
          };
        }
      }
    }
    
    res.json({ quotes: results, updated: new Date().toISOString() });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
