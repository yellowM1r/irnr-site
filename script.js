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

  const rub=document.getElementById('rub'), rh=document.getElementById('rh');
  rub?.addEventListener('input',()=>{const v=Number(rub.value); if(rh) rh.value=Number.isFinite(v)?(v*100).toLocaleString('ru-RU'):''});
  rh?.addEventListener('input',()=>{const v=Number(rh.value.replace(/\s/g,'')); if(rub) rub.value=Number.isFinite(v)?(v/100).toFixed(2):''});
  const dubl=document.getElementById('dubl'), rhDubl=document.getElementById('rhDubl');
  dubl?.addEventListener('input',()=>{const v=Number(dubl.value); if(rhDubl) rhDubl.value=Number.isFinite(v)?(v/10).toLocaleString('ru-RU'):''});
  rhDubl?.addEventListener('input',()=>{const v=Number(rhDubl.value.replace(/\s/g,'')); if(dubl) dubl.value=Number.isFinite(v)?(v*10).toFixed(0):''});

  window.IRNR={
    accounts:{
      admin:{id:'kazakov',series:'0228',number:'169528',surname:'Казаков',name:'Мирослав',patronymic:'Михайлович',dob:'',role:'Верховный Господин / верховный правитель',citizenNo:'001',issuedBy:'Верховным Господином Казаковым Мирославом Михайловичем',education:false,health:false},
      bogdan:{id:'bogdan',series:'7355',number:'856370',surname:'Афоничев',name:'Богдан',patronymic:'Евгениевич',dob:'2012-09-06',role:'Посол Украины',citizenNo:'002',issuedBy:'Верховным Господином Казаковым Мирославом Михайловичем',education:false,health:false}
    },
    getAccount(series,number){return Object.values(this.accounts).find(a=>a.series===String(series).trim()&&a.number===String(number).trim())||null},
    setSession(a){localStorage.setItem('irnr-session',a.id)},
    session(){const id=localStorage.getItem('irnr-session');return id?this.accounts[id]||null:null},
    logout(){localStorage.removeItem('irnr-session')},
    addMessage(message){const list=JSON.parse(localStorage.getItem('irnr-mailbox')||'[]');list.unshift({...message,id:Date.now()});localStorage.setItem('irnr-mailbox',JSON.stringify(list))},
    messages(){return JSON.parse(localStorage.getItem('irnr-mailbox')||'[]')}
  };

  document.querySelectorAll('[data-logout]').forEach(b=>b.addEventListener('click',()=>{IRNR.logout();location.href='cabinet.html'}));
})();
