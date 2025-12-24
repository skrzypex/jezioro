// api/vote.js

let votes = {}; // w pamięci serwera

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { participant, category } = req.body;

    if (!participant || !category) {
      return res.status(400).json({ error: 'Brakuje danych' });
    }

    if (!votes[category]) votes[category] = {};
    if (!votes[category][participant]) votes[category][participant] = 0;

    votes[category][participant]++;

    return res.status(200).json({ message: `Twój głos na ${participant} został zapisany!` });
  } else if (req.method === 'GET') {
    // zwróć wszystkie głosy
    return res.status(200).json(votes);
  } else {
    return res.status(405).json({ error: 'Metoda niedozwolona' });
  }
}
