import Link from 'next/link';
export default function Home(){
  const products = [
    { id:'cheval', slug:'piece-cheval', title:"Cheval d'échecs (Grand)", price:2800, img:'/product.png' },
    { id:'badge', slug:'badge-personnalise', title:'Badge personnalisé', price:900, img:'/product.png' },
    { id:'figurine', slug:'figurine-deco', title:'Figurine décorative', price:1800, img:'/product.png' },
  ];
  return (
    <div style={{maxWidth:1100, margin:'36px auto', padding:20}}>
      <header style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:24}}>
        <h1 style={{margin:0}}>Atelier 3D</h1>
        <nav><Link href="/cart"><a>Panier</a></Link></nav>
      </header>
      <main style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:20}}>
        {products.map(p=>(
          <article key={p.id} style={{background:'#fff',borderRadius:12,overflow:'hidden',boxShadow:'0 8px 24px rgba(2,6,23,0.06)'}}>
            <img src={p.img} style={{width:'100%',height:220,objectFit:'cover'}} />
            <div style={{padding:14}}>
              <div style={{fontWeight:700}}>{p.title}</div>
              <div style={{marginTop:8,fontWeight:800}}>{(p.price/100).toFixed(2)} €</div>
              <div style={{marginTop:10}}><Link href={'/product/'+p.slug}><a style={{padding:'8px 12px',background:'#111827',color:'#fff',borderRadius:8}}>Voir</a></Link></div>
            </div>
          </article>
        ))}
      </main>
    </div>
  );
}
