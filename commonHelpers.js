import"./assets/modulepreload-polyfill-3cfb730f.js";/* empty css                      */import{f as C,i as F}from"./assets/vendor-77e16229.js";const p=document.querySelector("input#datetime-picker"),c=document.querySelector('button[type="button"]'),l=document.querySelector("[data-days]"),u=document.querySelector("[data-hours]"),m=document.querySelector("[data-minutes]"),f=document.querySelector("[data-seconds]"),n={timerInterval:null,selectedDate:null};function o(t,e="0"){return String(t).padStart(2,e)}const D=t=>{const s=o(Math.floor(t/864e5)),a=o(Math.floor(t%864e5/36e5)),h=o(Math.floor(t%864e5%36e5/6e4)),y=o(Math.floor(t%864e5%36e5%6e4/1e3));return{days:s,hours:a,minutes:h,seconds:y}},S=t=>()=>{const{timerInterval:e}=n,r=t-new Date;if(r<=0){e&&clearInterval(e),l.textContent="00",u.textContent="00",m.textContent="00",f.textContent="00";return}const{days:i,hours:d,minutes:s,seconds:a}=D(r);l.textContent=i,u.textContent=d,m.textContent=s,f.textContent=a},v=t=>{const e=new Date;n.selectedDate=t[0],n.selectedDate<=e?(F.show({message:"Please choose a date in the future",backgroundColor:"#EF4040",messageColor:"#FFFFFF",title:"Error",titleColor:"#FFFFFF",messageSize:"16px",titleSize:"16px",position:"topRight"}),c.disabled=!0):c.disabled=!1};C(p,{enableTime:!0,time_24hr:!0,defaultDate:new Date,minuteIncrement:1,onClose:v});c.addEventListener("click",function(){n.timerInterval&&clearInterval(n.timerInterval),n.timerInterval=setInterval(S(n.selectedDate),1e3),this.disabled=!0});
//# sourceMappingURL=commonHelpers.js.map
