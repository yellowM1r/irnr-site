(() => {
  const root=document.body;
  const saved=localStorage.getItem('irnr-theme');
  if(saved==='dark') root.classList.add('dark');
  const toggle=document.getElementById('themeToggle');
  const sync=()=>{if(toggle) toggle.textContent=root.classList.contains('dark')?'☀':'☾'};
  sync();
  toggle?.addEventListener('click',()=>{root.classList.toggle('dark');localStorage.setItem('irnr-theme',root.classList.contains('dark')?'dark':'light');sync()});
  document.querySelector('.menu-btn')?.addEventListener('click',()=>document.querySelector('.top')?.classList.toggle('open'));
  document.querySelectorAll('nav a').forEach(a=>a.addEventListener('click',()=>document.querySelector('.top')?.classList.remove('open')));

  const usd=document.getElementById('usd'), usdDubl=document.getElementById('usdDubl');
  usd?.addEventListener('input',()=>{const v=Number(usd.value); if(usdDubl) usdDubl.value=Number.isFinite(v)?(v*850).toLocaleString('ru-RU'):''});
  usdDubl?.addEventListener('input',()=>{const v=Number(usdDubl.value.replace(/\s/g,'')); if(usd) usd.value=Number.isFinite(v)?(v/850).toFixed(2):''});
  const dubl=document.getElementById('dubl'), rhDubl=document.getElementById('rhDubl');
  dubl?.addEventListener('input',()=>{const v=Number(dubl.value); if(rhDubl) rhDubl.value=Number.isFinite(v)?(v/10).toLocaleString('ru-RU'):''});
  rhDubl?.addEventListener('input',()=>{const v=Number(rhDubl.value.replace(/\s/g,'')); if(dubl) dubl.value=Number.isFinite(v)?(v*10).toFixed(0):''});

  window.IRNR={
    accounts:{
      kazakov:{id:'kazakov',series:'0228',number:'169528',surname:'Казаков',name:'Мирослав',patronymic:'Михайлович',dob:'',role:'Верховный Господин / верховный правитель',citizenNo:'001',issuedBy:'Верховным Господином Казаковым Мирославом Михайловичем',education:false,health:false},
      bogdan:{id:'bogdan',series:'7355',number:'856370',surname:'Афоничев',name:'Богдан',patronymic:'Евгениевич',dob:'2012-09-06',role:'Посол Украины',citizenNo:'002',issuedBy:'Верховным Господином Казаковым Мирославом Михайловичем',education:false,health:false}
    },
    getAccount(series,number){const norm=v=>String(v??'').replace(/\s+/g,'').trim();return Object.values(this.accounts).find(a=>norm(a.series)===norm(series)&&norm(a.number)===norm(number))||null},
    setSession(a){localStorage.setItem('irnr-session',a.id);localStorage.setItem('irnr-session-series',a.series);localStorage.setItem('irnr-session-number',a.number)},
    session(){const id=localStorage.getItem('irnr-session');const a=id?this.accounts[id]||null:null;if(!a){this.logout();return null}return a},
    logout(){localStorage.removeItem('irnr-session');localStorage.removeItem('irnr-session-series');localStorage.removeItem('irnr-session-number')},
    addMessage(message){const list=JSON.parse(localStorage.getItem('irnr-mailbox')||'[]');list.unshift({...message,id:Date.now()});localStorage.setItem('irnr-mailbox',JSON.stringify(list))},
    messages(){return JSON.parse(localStorage.getItem('irnr-mailbox')||'[]')},
    bordersOpen(){return localStorage.getItem('irnr-borders')==='open'},
    setBorders(open){localStorage.setItem('irnr-borders',open?'open':'closed')},
    toggleBorders(){const open=!this.bordersOpen();this.setBorders(open);return open}
  };

  document.querySelectorAll('[data-logout]').forEach(b=>b.addEventListener('click',()=>{IRNR.logout();location.href='cabinet.html'}));
})();
