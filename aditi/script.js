(function(){
  var nav=document.getElementById('nav'),toggle=document.querySelector('.nav-toggle')
  function scroll(){nav.classList.toggle('scrolled',scrollY>60);nav.style.setProperty('--sp',(scrollY/(document.documentElement.scrollHeight-innerHeight)*100)+'%')}
  addEventListener('scroll',scroll,{passive:true});scroll()
  if(toggle) toggle.addEventListener('click',function(){this.classList.toggle('active');document.querySelector('.nav-links').classList.toggle('open')})
  document.querySelectorAll('.nav-links a').forEach(function(a){a.addEventListener('click',function(){document.querySelector('.nav-links').classList.remove('open');if(toggle)toggle.classList.remove('active')})})

  var r=document.querySelectorAll('.sec-title,.label,.about-text p,.about-card,.edu-card,.skill-g,.achiev-card,.dream,.interests-wrap,.contact-inner,.hero-stats,.acad-int')
  r.forEach(function(e){e.classList.add('reveal')})
  var io=new IntersectionObserver(function(e){e.forEach(function(e){if(e.isIntersecting){e.target.classList.add('show');io.unobserve(e.target)}})},{threshold:.1})
  r.forEach(function(e){io.observe(e)})

  var tl=document.querySelectorAll('.tl-item')
  var tlo=new IntersectionObserver(function(e){e.forEach(function(e){if(e.isIntersecting){e.target.classList.add('show');tlo.unobserve(e.target)}})},{threshold:.15})
  tl.forEach(function(e){tlo.observe(e)})

  var mf=document.querySelectorAll('.mr-f')
  var mfo=new IntersectionObserver(function(e){e.forEach(function(e){if(e.isIntersecting){e.target.classList.add('show');mfo.unobserve(e.target)}})},{threshold:.3})
  mf.forEach(function(e){mfo.observe(e)})

  var rings=document.querySelectorAll('.cuet circle:last-child')
  rings.forEach(function(r){
    var pct=parseFloat(r.style.getPropertyValue('--p')),off=326.73-326.73*pct/100
    var ro=new IntersectionObserver(function(e){e.forEach(function(e){if(e.isIntersecting){r.style.strokeDashoffset=off.toString();ro.unobserve(e.target)}})},{threshold:.3})
    ro.observe(r)
  })

  var nums=document.querySelectorAll('.stat-num')
  var nio=new IntersectionObserver(function(e){e.forEach(function(e){if(e.isIntersecting){var t=parseFloat(e.target.dataset.target),d=(''+t).includes('.'),dec=d?(''+t).split('.')[1].length:0,s='',c=0,st=null;function step(ts){if(!st)st=ts;var p=Math.min((ts-st)/1800,1),v=1-Math.pow(1-p,3),cur=0+(t-0)*v;e.target.textContent=(d?cur.toFixed(dec):Math.round(cur))+'';if(p<1)requestAnimationFrame(step)}requestAnimationFrame(step);nio.unobserve(e.target)}})},{threshold:.5})
  nums.forEach(function(e){nio.observe(e)})

  var ac=document.querySelector('.about-card')
  if(ac){ac.addEventListener('mousemove',function(e){var r=ac.getBoundingClientRect(),x=e.clientX-r.left,y=e.clientY-r.top,rx=(y-r.height/2)/r.height/2*-3,ry=(x-r.width/2)/r.width/2*3;ac.style.transform='perspective(600px) rotateX('+rx+'deg) rotateY('+ry+'deg)'});ac.addEventListener('mouseleave',function(){ac.style.transform='';ac.style.transition='transform .5s cubic-bezier(.22,1,.36,1)'});ac.addEventListener('mouseenter',function(){ac.style.transition='transform .1s'})}
})()
