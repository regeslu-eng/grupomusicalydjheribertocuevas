const header=document.getElementById('header');
const menu=document.getElementById('menu');
const nav=document.getElementById('navlinks');
if(header){addEventListener('scroll',()=>header.classList.toggle('scrolled',scrollY>24),{passive:true});}
if(menu&&nav){
  const closeMenu=()=>{nav.classList.remove('open');document.body.classList.remove('menu-open');menu.setAttribute('aria-expanded','false');menu.textContent='☰';};
  menu.addEventListener('click',()=>{
    const open=!nav.classList.contains('open');
    nav.classList.toggle('open',open);document.body.classList.toggle('menu-open',open);menu.setAttribute('aria-expanded',String(open));menu.textContent=open?'×':'☰';
  });
  nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
}
const year=document.getElementById('year');if(year)year.textContent=new Date().getFullYear();
const io='IntersectionObserver' in window?new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('in');io.unobserve(entry.target);}}),{threshold:.1}):null;
document.querySelectorAll('.reveal').forEach(el=>io?io.observe(el):el.classList.add('in'));

document.querySelectorAll('[data-service]').forEach(btn=>btn.addEventListener('click',()=>{
  const field=document.getElementById('service');
  if(field){field.value=btn.dataset.service;}
}));
document.querySelectorAll('[data-package]').forEach(btn=>btn.addEventListener('click',()=>{
  const field=document.getElementById('package');
  if(field){field.value=btn.dataset.package;} const service=document.getElementById('service'); if(service){service.value='Grupo musical';}
}));

const quoteForm=document.getElementById('quoteForm');
if(quoteForm){quoteForm.addEventListener('submit',e=>{
  e.preventDefault();
  const val=id=>document.getElementById(id)?.value.trim()||'';
  const lines=[
    'Hola, quiero cotizar un evento con Heriberto Cuevas Experience.',
    '',
    `*Nombre:* ${val('name')}`,
    `*Fecha:* ${val('date')||'Por definir'}`,
    `*Evento:* ${val('event')||'Por definir'}`,
    `*Servicio:* ${val('service')||'Quiero recomendación'}`,
    `*Formato musical:* ${val('package')||'Por definir'}`,
    `*Lugar:* ${val('place')||'Por definir'}`,
    `*Detalles:* ${val('message')||'Sin detalles adicionales'}`
  ];
  window.open(`https://wa.me/525536691020?text=${encodeURIComponent(lines.join('\n'))}`,'_blank','noopener');
});}

// En páginas con varios videos, pausa los demás al reproducir uno.
const videos=[...document.querySelectorAll('video')];
videos.forEach(video=>video.addEventListener('play',()=>videos.forEach(other=>{if(other!==video&&!other.paused)other.pause();})));

// Home sales flow: short request with event type, date and service.
const quickQuoteForm=document.getElementById('quickQuoteForm');
const quickDate=document.getElementById('quickDate');
if(quickDate){
  const now=new Date();
  const localToday=new Date(now.getTime()-now.getTimezoneOffset()*60000).toISOString().split('T')[0];
  quickDate.min=localToday;
}
if(quickQuoteForm){
  quickQuoteForm.addEventListener('submit',e=>{
    e.preventDefault();
    const eventType=document.getElementById('quickEvent')?.value||'Evento';
    const eventDate=document.getElementById('quickDate')?.value||'';
    const service=document.getElementById('quickService')?.value||'Quiero información';
    const formattedDate=eventDate?new Intl.DateTimeFormat('es-MX',{day:'2-digit',month:'long',year:'numeric',timeZone:'UTC'}).format(new Date(`${eventDate}T00:00:00Z`)):'Por definir';
    const message=[
      'Hola Heriberto, vi tu página y quiero información para mi evento.',
      '',
      `*Tipo de celebración:* ${eventType}`,
      `*Fecha del evento:* ${formattedDate}`,
      `*Servicio que me interesa:* ${service}`,
      '',
      '¿Me compartes disponibilidad e información para coordinar los detalles?'
    ].join('\n');
    window.open(`https://wa.me/525536691020?text=${encodeURIComponent(message)}`,'_blank','noopener');
  });
}
