const zzz = document.querySelectorAll(".letra-grandes span");
const starLeft = document.querySelector(".star-left");
const stars = document.querySelectorAll(".star-container div");

const banners = document.querySelectorAll(".caja-aside div")


let currentIndex = 0;
const regexStar = /url\("src\/stars\/(.+)\.(gif)"\)/;
const regexBanner = /url\("src\/(.+)\.(png)"\)/;
function zAnimation() {
   if (currentIndex < zzz.length) {
      zzz[currentIndex].classList.toggle("hiden");
      if (currentIndex > 0) {
         zzz[currentIndex - 1].classList.toggle("hiden");
      }
      currentIndex++;
      setTimeout(zAnimation, 1000);
   } else {
      // Reinicia la animación
      if (currentIndex > 0) {
         zzz[currentIndex - 1].classList.toggle("hiden"); // Oculta el último elemento
      }
      currentIndex = 0; // Reinicia a 0 para comenzar desde el principio
      zAnimation(); // Llama a la función nuevamente
   }
}

// Inicia la animación
zAnimation();

setInterval(() => {
   const star = document.createElement("div");
   starLeft.appendChild(star);
   star.classList.add("star");
   const x = randomX();
   const y = randomY();
   star.style.top = `${y}px`;
   star.style.right = `${x}px`;
   setTimeout(() => {
      star.remove();
   }, 3500);
}, 1000);

const randomX = () => {
   return Math.floor(Math.random() * starLeft.offsetWidth);
};

const randomY = () => {
   return Math.floor(Math.random() * starLeft.offsetHeight - 100);
};

// TOOLTIP
stars.forEach((star) => {
   handlerClickOriginal(star,regexStar)
   star.addEventListener("mouseover", (e) => {
      e.stopPropagation()
      const rect = e.currentTarget.getBoundingClientRect();
      const name = e.currentTarget.dataset.tooltip;
      const existingTooltip = document.querySelector('.tooltip');
      const x = rect.x;
      const y = rect.y - 40;
      
      // Solo crear si no hay uno o si el texto es diferente
      if (!existingTooltip || existingTooltip.textContent !== name) {
         if (existingTooltip) existingTooltip.remove(); // elimina anterior
         tooltip(name, y, x);
      }
   });

    star.addEventListener("mouseout", (e) => {
      e.stopPropagation()
      const name = e.currentTarget.dataset.tooltip;
      const existingTooltip = document.querySelector('.tooltip');

      // Solo eliminar si el texto coincide
      if (existingTooltip && existingTooltip.textContent === name) {
         existingTooltip.animate([
  // fotogramas clave
  { opacity: 0, transform: 'scale(1)' },
  { opacity: 1, transform: 'scale(0)' }
], {
  // opciones de temporización
  duration: 500,
  easing: 'ease-in-out',
  fill: 'forwards'
});
         tooltipDelete(existingTooltip);

      }
   }); 
});

const tooltip = (nombre, y, x) => {
   const tip = document.createElement("div");
   tip.classList.add("tooltip");
   tip.style.top = `${y}px`;
   tip.style.left = `${x}px`;
   tip.style.position = "absolute";
   tip.style.zIndex = "1000";
   tip.style.pointerEvents = "none";
   tip.textContent = nombre;
   document.body.appendChild(tip);
};

const tooltipDelete = (element) => {
   setTimeout(() => {
      element.remove(); // elimina el nodo directamente
   }, 3000);
};

banners.forEach((banner) => {
   handlerClickOriginal(banner,regexBanner)
})

   function handlerClickOriginal(div,regex) {
       div.addEventListener("click", (e) => {
    const urlname =  window.getComputedStyle(e.currentTarget).getPropertyValue("background")
    .match(regex)
    if(urlname) {
      const myModal = document.createElement("div");
    myModal.classList.add("myModal");
    document.body.appendChild(myModal);
      myModal.innerHTML += `<img  class="image-modal" src="originales/${urlname[1]}-original.${urlname[2]}"/>
      <h1>${e.currentTarget.dataset.desc}</h1>`;
      
      myModal.addEventListener("click", (e) => {
         
         myModal.remove();
      });
      const img = document.querySelector('[class="image-modal"]');
      img.addEventListener("click", (e) => e.stopPropagation())
  
   }
    

      
   });
   }


