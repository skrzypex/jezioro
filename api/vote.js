import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { category, participant } = req.body;

    const { data, error } = await supabase
      .from('votes')
      .update({ votes: supabase.raw('votes + 1') })
      .eq('category', category)
      .eq('participant', participant);

    if (error) return res.status(500).json({ error: error.message });
    res.status(200).json({ success: true });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
