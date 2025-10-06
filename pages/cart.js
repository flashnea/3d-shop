import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Cart(){
  const [cart, setCart] = useState([]);
  useEffect(()=>{ setCart(JSON.parse(localStorage.getItem('cart')||'[]')); },[]);
  const subtotal = cart.reduce((s,i)=>s + (i.price_cents*(i.quantity||1)),0);
  return (
    <div style={{maxWidth:900,margin:'36px auto',padding:20}}>
      <header style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:24}}>
        <h1>Panier</h1>
        <nav><Link href="/"><a>Retour boutique</a></Link></nav>
      </header>
      <div style={{background:'#fff',padding:18,borderRadius:12,boxShadow:'0 12px 40px rgba(2,6,23,0.06)'}}>
        {cart.length === 0 ? <div>Ton panier est vide.</div> : cart.map((it,idx)=>(
          <div key={idx} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:12,borderBottom:'1px solid #f1f5f9'}}>
            <div>
              <div style={{fontWeight:700}}>{it.title} ×{it.quantity}</div>
              <div style={{color:'#6b7280',fontSize:13}}>Options: {JSON.stringify(it.customization)}</div>
            </div>
            <div style={{fontWeight:800}}>{(it.price_cents/100).toFixed(2)} €</div>
          </div>
        ))}
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginTop:12,fontWeight:800}}>
          <div>Sous-total</div>
          <div>{(subtotal/100).toFixed(2)} €</div>
        </div>
        <div style={{marginTop:12}}><button onClick={()=>alert('Intègre Stripe / API create-checkout pour paiement réel')} style={{padding:'12px 16px',background:'#0ea5a4',color:'#fff',borderRadius:10,border:'none',fontWeight:700}}>Passer au paiement</button></div>
      </div>
    </div>
  );
}
