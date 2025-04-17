export default async function handler(req, res) {
    const apiKey =  "AIzaSyD9FQwpxlsVSF53Ofc5eBp1Vn-Rb49vsUM";
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`;
  
    const body = {
      contents: [
        {
          parts: [{ text: "Say hello!" }]
        }
      ]
    };
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
  
      const data = await response.json();
      return res.status(200).json(data);
    } catch (err) {
      console.error('Gemini call failed:', err);
      return res.status(500).json({ error: 'Connection failed', details: err.message || err });
    }
  }
  