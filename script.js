const RATE=800000,usd=document.getElementById('usd'),rh=document.getElementById('rh');
usd.addEventListener('input',()=>{const v=Number(usd.value);rh.value=Number.isFinite(v)?(v*RATE).toFixed(2).replace(/\\.00$/,''):''});
rh.addEventListener('input',()=>{const v=Number(rh.value);usd.value=Number.isFinite(v)?(v/RATE).toFixed(8).replace(/0+$/,'').replace(/\\.$/,''):''});
document.querySelector('.menu-btn').onclick=()=>document.querySelector('.top').classList.toggle('open');
document.querySelectorAll('nav a').forEach(a=>a.onclick=()=>document.querySelector('.top').classList.remove('open'));