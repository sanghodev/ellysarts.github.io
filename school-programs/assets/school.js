const toggle=document.querySelector('.menu-toggle'),nav=document.getElementById('school-nav');function closeMenu(){toggle.setAttribute('aria-expanded','false');nav.classList.remove('open')}toggle.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')!=='true';toggle.setAttribute('aria-expanded',String(open));nav.classList.toggle('open',open)});document.addEventListener('keydown',e=>{if(e.key==='Escape'&&toggle.getAttribute('aria-expanded')==='true'){closeMenu();toggle.focus()}});nav.addEventListener('click',e=>{if(e.target.closest('a'))closeMenu()});


// Place a new photographic print on top; retire the oldest underneath.
(()=>{
 const gallery=document.querySelector('.photo-gallery');if(!gallery)return;
 const stack=gallery.querySelector('.photo-stack');stack.classList.add('paper-stack');
 const photos=[{"src": "/school-programs/assets/gallery/img_01-Bv6lAMro.jpg", "alt": "Hand-painted ceramics from Elly’s Arts & Crafts gallery"}, {"src": "/school-programs/assets/gallery/img_02-CwNhotIx.jpg", "alt": "Hand-painted ceramics from Elly’s Arts & Crafts gallery"}, {"src": "/school-programs/assets/gallery/img_03-DbnQU6av.jpg", "alt": "Hand-painted ceramics from Elly’s Arts & Crafts gallery"}, {"src": "/school-programs/assets/gallery/img_04-ComBMPLi.jpg", "alt": "Hand-painted ceramics from Elly’s Arts & Crafts gallery"}, {"src": "/school-programs/assets/gallery/img_05-BfLILgWY.jpg", "alt": "Hand-painted ceramics from Elly’s Arts & Crafts gallery"}, {"src": "/school-programs/assets/gallery/img_06-DSvchgcA.jpg", "alt": "Hand-painted ceramics from Elly’s Arts & Crafts gallery"}, {"src": "/school-programs/assets/gallery/img_07-r-7s5-ax.jpg", "alt": "Hand-painted ceramics from Elly’s Arts & Crafts gallery"}, {"src": "/school-programs/assets/gallery/img_08-Bb_LqDlM.jpg", "alt": "Hand-painted ceramics from Elly’s Arts & Crafts gallery"}, {"src": "/school-programs/assets/gallery/img_09-Cacxs8SU.jpg", "alt": "Hand-painted ceramics from Elly’s Arts & Crafts gallery"}, {"src": "/school-programs/assets/gallery/img_10-DQU8dOMT.jpg", "alt": "Hand-painted ceramics from Elly’s Arts & Crafts gallery"}, {"src": "/school-programs/assets/gallery/img_11-xCf8tHob.jpg", "alt": "Hand-painted ceramics from Elly’s Arts & Crafts gallery"}, {"src": "/school-programs/assets/gallery/img_12-Bb8dexqo.jpg", "alt": "Hand-painted ceramics from Elly’s Arts & Crafts gallery"}, {"src": "/school-programs/assets/gallery/img_13-Cl-Yh_2k.jpg", "alt": "Hand-painted ceramics from Elly’s Arts & Crafts gallery"}, {"src": "/school-programs/assets/gallery/img_14-pQPICLpr.jpg", "alt": "Hand-painted ceramics from Elly’s Arts & Crafts gallery"}, {"src": "/school-programs/assets/gallery/img_0000_1-B9iGfQGI.jpg", "alt": "Hand-painted ceramics from Elly’s Arts & Crafts gallery"}, {"src": "/school-programs/assets/gallery/img_0001_2-TRxBVrfm.jpg", "alt": "Hand-painted ceramics from Elly’s Arts & Crafts gallery"}, {"src": "/school-programs/assets/gallery/img_0002_3-CDutJzb1.jpg", "alt": "Hand-painted ceramics from Elly’s Arts & Crafts gallery"}, {"src": "/school-programs/assets/gallery/img_0004_5-BLa4mqLn.jpg", "alt": "Hand-painted ceramics from Elly’s Arts & Crafts gallery"}, {"src": "/school-programs/assets/gallery/img_0016_17-PaMbZ6_L.jpg", "alt": "Hand-painted ceramics from Elly’s Arts & Crafts gallery"}, {"src": "/school-programs/assets/gallery/class4-Gd_ozlhJ.jpg", "alt": "Hand-painted ceramics from Elly’s Arts & Crafts gallery"}];
 const motion=matchMedia('(prefers-reduced-motion: reduce)');
 let cards=[...stack.querySelectorAll('.photo-print')],next=0,placement=3,timer=null,busy=false;
 const captions=['Every piece, a little personality.','Their ideas, brought to life.','A keepsake to make their own.'];
 const anchors=[{x:10,y:5,r:-9},{x:31,y:3,r:8},{x:22,y:36,r:-3}];
 const random=(a,b)=>a+Math.random()*(b-a);
 function place(card,index){
  const a=anchors[index%anchors.length];
  card.className='photo-print paper-print';
  card.style.setProperty('--paper-x',(a.x+random(-3,3))+'%');
  card.style.setProperty('--paper-y',(a.y+random(-3,3))+'%');
  card.style.setProperty('--paper-angle',(a.r+random(-4,4))+'deg');
  card.style.setProperty('--entry-x',random(25,65)+'px');
  card.style.setProperty('--entry-y',random(-90,-45)+'px');
 }
 function layers(){cards.forEach((card,i)=>card.style.zIndex=String(i+1));}
 cards.forEach((card,i)=>{place(card,i);if(!motion.matches){card.classList.add('is-placing');card.style.animationDelay=(i*.45)+'s';card.addEventListener('animationend',()=>{card.classList.remove('is-placing');card.style.animationDelay='';},{once:true});}});layers();
 function schedule(){clearTimeout(timer);if(!document.hidden&&!motion.matches)timer=setTimeout(addPhoto,4200);}
 async function addPhoto(){
  if(busy||document.hidden||motion.matches)return;busy=true;
  let card;
  try{
   let photo;
   for(let i=0;i<photos.length;i++){const candidate=photos[next++%photos.length];if(!cards.some(p=>p.querySelector('img').getAttribute('src')===candidate.src)){photo=candidate;break;}}
   const img=new Image();img.src=photo.src;img.alt=photo.alt;await img.decode();
   if(document.hidden||motion.matches)return;
   card=document.createElement('div');place(card,placement++);
   img.width=400;img.height=400;card.append(img);
   const caption=document.createElement('span');caption.textContent=captions[next%captions.length];card.append(caption);
   const oldest=cards[0];cards.push(card);layers();stack.append(card);card.classList.add('is-placing');
   // A fourth print lands above the third while the oldest quietly disappears.
   await new Promise(resolve=>setTimeout(resolve,350));oldest.classList.add('is-retiring');
   await new Promise(resolve=>setTimeout(resolve,1100));oldest.remove();cards.shift();card.classList.remove('is-placing');layers();
  }catch(error){if(card){card.remove();cards=cards.filter(p=>p!==card);layers();}}
  finally{busy=false;schedule();}
 }
 document.addEventListener('visibilitychange',schedule);motion.addEventListener('change',schedule);schedule();
})();

const schoolHeader=document.querySelector('header');if(schoolHeader){const syncHeader=()=>document.documentElement.style.setProperty('--school-header-height',Math.ceil(schoolHeader.getBoundingClientRect().height)+'px');syncHeader();new ResizeObserver(syncHeader).observe(schoolHeader);}

document.querySelectorAll('[data-print-summary]').forEach(button=>button.addEventListener('click',()=>window.print()));
