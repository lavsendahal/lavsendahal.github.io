/* One real, silent breathing loop. Load/play only when the card is visible. */
(() => {
  const video=document.getElementById('project-motion');
  const button=document.getElementById('motion-pause');
  if(!video||!button)return;
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  let visible=false,paused=reduced.matches;
  function label(){button.textContent=video.paused?'Play':'Pause';button.setAttribute('aria-pressed',String(video.paused));}
  function update(){
    if(visible&&!document.hidden&&!paused){video.play().catch(label);}else video.pause();
    label();
  }
  new IntersectionObserver(entries=>{
    visible=entries[0].isIntersecting;
    if(visible&&!video.getAttribute('src')){video.src=video.dataset.src;video.load();}
    update();
  },{threshold:.15}).observe(video);
  video.addEventListener('loadeddata',()=>{button.disabled=false;update();});
  video.addEventListener('play',label);video.addEventListener('pause',label);
  video.addEventListener('error',()=>{button.disabled=true;button.textContent='Static view';});
  button.addEventListener('click',()=>{paused=!video.paused;update();});
  reduced.addEventListener('change',()=>{paused=reduced.matches;update();});
  document.addEventListener('visibilitychange',update);
})();
