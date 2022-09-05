

fetch('https://pcfy.redberryinternship.ge/api/laptops?token=4fce699b646a3b3e7bdc4c9b7dcd4658').then(response => response.json()).then(data => {
    const laptops = data.data;
    laptops.forEach(laptop => {
        const laptopImageSrc = 'https://pcfy.redberryinternship.ge/' + laptop.laptop.image;
       const laptopInfo = addLaptopINfo(laptop.user.name, laptop.user.surname, laptop.laptop.name, laptop.laptop.id, laptopImageSrc)
       const mainContainer = document.querySelector('main');
       mainContainer.innerHTML+= laptopInfo;
    })
    console.log(laptops);
})



function addLaptopINfo(name, surname, laptopName, laptopId, laptopImg) {
    const laptopTemplate = `<div id="${laptopId}" class="card-container">
    <div class="img-container">
        <img src="${laptopImg}" alt="computer-photo">
    </div>
    <div class="text-cont">
        <p class="header-text-info">
            ${name} ${surname}
        </p>
        <span class="description-text">
            ${laptopName}
        </span>
        <a onclick="getId(this)" href="./laptop-full-info.html">
            მეტის ნახვა
        </a>
    </div>
</div>`

return laptopTemplate;

}

window.getId = (element)=> {
  const getElement = element.parentElement.closest(".card-container");
  localStorage.setItem('id', getElement.id);
  console.log(getElement.id);
    
}