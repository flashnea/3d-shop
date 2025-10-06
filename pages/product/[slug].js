import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function ProductPage(){
  const router = useRouter();
  const { slug } = router.query;
  const [product, setProduct] = useState(null);
  useEffect(()=>{
    if(!slug) return;
    const items = {
      'piece-cheval': { id:'cheval', title:"Cheval d'échecs — édition premium", price_cents:2500, img:'/product.png' },
      'badge-personnalise': { id:'badge', title:'Badge personnalisé', price_cents:900, img:'/product.png' },
      'figurine-deco': { id:'figurine', title:'figurine', price_cents:1800, img:'/product.png' }
    };
    setProduct(items[slug] || items['piece-cheval']);
  },[slug]);

  if(!product) return <div style={{padding:20}}>Chargement...</div>;

  function addToCart(){
    const qty = 1;
    const item = { product_id: product.id, slug: slug, title: product.title, price_cents: product.price_cents, quantity: qty, customization: {} };
    const cart = JSON.parse(localStorage.getItem('cart')||'[]');
    cart.push(item);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Ajouté au panier');
    router.push('/cart');
  }

  return (
    <div style={{maxWidth:1100,margin:'36px auto',padding:20}}>
      <header style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:24}}>
        <h1>Atelier 3D</h1>
        <nav><Link href="/cart"><a>Panier</a></Link></nav>
      </header>

      <div style={{display:'grid',gridTemplateColumns:'1fr 420px',gap:28}}>
        <div style={{background:'#fff',padding:18,borderRadius:12,boxShadow:'0 12px 40px rgba(2,6,23,0.06)'}}>
          <img src={product.img} style={{width:'100%',height:520,objectFit:'contain'}} />
        </div>

        <aside style={{background:'#fff',padding:20,borderRadius:12,boxShadow:'0 12px 40px rgba(2,6,23,0.06)'}}>
          <h2 style={{fontSize:24,margin:0}}>{product.title}</h2>
          <div style={{fontWeight:800,fontSize:18,marginTop:8}}>{(product.price_cents/100).toFixed(2)} €</div>
          <div style={{marginTop:12}}>
            <label style={{display:'block',marginBottom:6}}>Couleur</label>
            <select id="color" style={{width:'100%',padding:10,borderRadius:8}}><option>Noir</option><option>Blanc</option><option>Bleu</option></select>
          </div>
          <div style={{marginTop:12}}>
            <label style={{display:'block',marginBottom:6}}>Taille</label>
            <select id="size" style={{width:'100%',padding:10,borderRadius:8}}><option>Petit</option><option>Moyen</option><option>Grand</option></select>
          </div>
          <div style={{marginTop:14,display:'flex',gap:10}}>
            <button onClick={addToCart} style={{background:'#0ea5a4',color:'#fff',padding:'12px 16px',borderRadius:10,border:'none',fontWeight:700}}>Ajouter au panier</button>
            <button style={{background:'#111827',color:'#fff',padding:'12px 16px',borderRadius:10,border:'none'}}>Acheter maintenant</button>
          </div>
        </aside>
      </div>
    </div>
  );
}
