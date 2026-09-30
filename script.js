const RATE=800000,usd=document.getElementById('usd'),rh=document.getElementById('rh');
usd.addEventListener('input',()=>{const v=Number(usd.value);rh.value=Number.isFinite(v)?(v*RATE).toFixed(2).replace(/\\.00$/,''):''});
rh.addEventListener('input',()=>{const v=Number(rh.value);usd.value=Number.isFinite(v)?(v/RATE).toFixed(8).replace(/0+$/,'').replace(/\\.$/,''):''});
document.querySelector('.menu-btn').onclick=()=>document.querySelector('.top').classList.toggle('open');
document.querySelectorAll('nav a').forEach(a=>a.onclick=()=>document.querySelector('.top').classList.remove('open'));
// Маленькая пасхалка: нажмите на герб/флаг ИРНР пять раз.
(() => {
  const flag = document.getElementById('flagLogo');
  const egg = document.getElementById('easterEgg');
  if (!flag || !egg) return;
  let clicks = 0;
  let timer;
  flag.addEventListener('click', () => {
    clicks++;
    clearTimeout(timer);
    timer = setTimeout(() => { clicks = 0; }, 1200);
    if (clicks >= 5) { egg.classList.add('show'); clicks = 0; }
  });
})();
