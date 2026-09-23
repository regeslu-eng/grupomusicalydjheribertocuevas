const lightbox=document.getElementById('lightbox');
const lbImg=document.getElementById('lbImg');
const lbCaption=document.getElementById('lbCaption');
const lbClose=document.getElementById('lbClose');
function closeLightbox(){if(!lightbox)return;lightbox.classList.remove('open');document.body.style.overflow='';lbImg.removeAttribute('src');}
document.querySelectorAll('.photo-item').forEach(item=>item.addEventListener('click',()=>{
  const img=item.querySelector('img');
  if(!img||!lightbox)return;
  lbImg.src=img.src;lbImg.alt=img.alt;lbCaption.textContent=item.dataset.caption||img.alt||'';lightbox.classList.add('open');document.body.style.overflow='hidden';
}));
if(lbClose)lbClose.addEventListener('click',closeLightbox);
if(lightbox)lightbox.addEventListener('click',e=>{if(e.target===lightbox)closeLightbox();});
addEventListener('keydown',e=>{if(e.key==='Escape')closeLightbox();});
