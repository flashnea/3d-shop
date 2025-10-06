import { buffer } from 'micro';
import Stripe from 'stripe';
import { supabaseAdmin } from '../../lib/supabaseClient';
export const config = { api: { bodyParser: false } };
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2024-11-15' });

export default async function handler(req, res){
  const sig = req.headers['stripe-signature'];
  const raw = await buffer(req);
  let event;
  try {
    event = stripe.webhooks.constructEvent(raw, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error('Webhook signature error', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }
  try {
    if(event.type === 'checkout.session.completed'){
      const session = event.data.object;
      if(!supabaseAdmin) throw new Error('Supabase service role not configured');
      await supabaseAdmin.from('orders').update({ status:'paid', stripe_payment_intent: session.payment_intent }).eq('stripe_session_id', session.id);
    }
    res.json({received:true});
  } catch(err){
    console.error('Webhook handler error', err);
    res.status(500).end();
  }
}
