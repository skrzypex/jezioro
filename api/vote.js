import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({error:'Method not allowed'});
  const { participant, category } = req.body;
  const filePath = path.join(process.cwd(), 'votes.json');
  let votes = {};

  if (fs.existsSync(filePath)) votes = JSON.parse(fs.readFileSync(filePath));

  if (!votes[category]) votes[category] = {};
  if (!votes[category][participant]) votes[category][participant] = 0;

  votes[category][participant] += 1;

  fs.writeFileSync(filePath, JSON.stringify(votes,null,2));
  res.status(200).json({message:`Twój głos na ${participant} został zapisany!`});
}
