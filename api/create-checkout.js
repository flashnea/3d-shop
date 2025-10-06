import Stripe from 'stripe';
import { supabaseAdmin } from '../../lib/supabaseClient';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2024-11-15' });

export default async function handler(req, res){
  if(req.method !== 'POST') return res.status(405).json({error:'Method not allowed'});
  const { items, customer_email } = req.body || {};
  if(!items || !items.length) return res.status(400).json({error:'No items'});
  try {
    const line_items = items.map(item => ({
      price_data: {
        currency: 'eur',
        product_data: { name: item.title },
        unit_amount: item.price_cents
      },
      quantity: item.quantity || 1
    }));
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      customer_email,
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/cart`,
    });
    if(!supabaseAdmin) throw new Error('Supabase service role not configured');
    const total_cents = items.reduce((s,i)=>s + i.price_cents*(i.quantity||1), 0);
    await supabaseAdmin.from('orders').insert([{
      stripe_session_id: session.id,
      status: 'pending',
      customer_email,
      items,
      total_cents,
      currency: 'EUR'
    }]);
    return res.status(200).json({ url: session.url });
  } catch(err){
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
}
