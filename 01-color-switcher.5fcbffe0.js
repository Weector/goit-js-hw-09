const e=document.querySelector("[data-start]"),t=document.querySelector("[data-stop]"),d=document.querySelector("body");let r;function a(){return`#${Math.floor(16777215*Math.random()).toString(16)}`}e.addEventListener("click",(function(e){t.disabled=!1,e.target.disabled=!0,d.style.backgroundColor=a(),r=setInterval((()=>{d.style.backgroundColor=a()}),1e3)})),t.addEventListener("click",(function(t){clearInterval(r),t.target.disabled=!0,e.disabled=!1})),t.disabled=!0;
//# sourceMappingURL=01-color-switcher.5fcbffe0.js.map