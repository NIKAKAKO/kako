const laptopId = localStorage.getItem('id');

const laptopPhoto = document.querySelector('.laptop__photo');
const firstName = document.querySelector('#name');
const team = document.querySelector('#team');
const position = document.querySelector('#position');
const email = document.querySelector('#email');
const number = document.querySelector('#number');
const cpu = document.querySelector('#cpu');
const cpuCore = document.querySelector('#cpuCore');
const cpuThread = document.querySelector('#cpuThread');
const condition = document.querySelector('#condition');
const price = document.querySelector('#price');
const date = document.querySelector('#date');
const laptopName = document.querySelector('#laptopName');
const laptopBrand = document.querySelector('#laptopBrand'); 
const ram = document.querySelector('#ram');
const memoryType = document.querySelector('#memoryType');

fetch(`https://pcfy.redberryinternship.ge/api/laptop/${laptopId}?token=4fce699b646a3b3e7bdc4c9b7dcd4658`).then(response => response.json()).then(data => {
    const laptop = data.data.laptop;
    const user = data.data.user;

    fetch('https://pcfy.redberryinternship.ge/api/teams')
    .then(response => response.json()).then(data => {
        let teams = data.data;
        for(let i = 0; i < teams.length; i++) {
            if(teams[i].id === user.team_id) {
                team.innerText = teams[i].name;
            }
        }

    }
    )

    fetch('https://pcfy.redberryinternship.ge/api/positions')
    .then(response => response.json()).then(data => {
        let positions = data.data;
        for(let i = 0; i < positions.length; i++) {
            if(positions[i].id === user.position_id) {
                position.innerText = positions[i].name;
            }
        }

    }
    )

    fetch('https://pcfy.redberryinternship.ge/api/brands')
    .then(response => response.json()).then(data => {
        let brands = data.data;
        for(let i = 0; i < brands.length; i++) {
            if(brands[i].id === laptop.brand_id) {
                laptopBrand.innerText = brands[i].name;
            }
        }

    }
    )

    laptopPhoto.src = 'https://pcfy.redberryinternship.ge/' + laptop.image;
    firstName.innerText = user.name;
    email.innerText = user.email;
    number.innerText = user.phone_number;
    cpu.innerText = laptop.cpu.name;
    cpuCore.innerText = laptop.cpu.cores;
    cpuThread.innerText = laptop.cpu.threads;
    condition.innerText = laptop.state;
    price.innerText = laptop.price + ' ₾';
    if(laptop.purchase_date) {
        date.innerText = laptop.purchase_date.split('-').join(' / ');
    }else {
        date.innerText = 'no date';
    }
    laptopName.innerText = laptop.name;
    ram.innerText = laptop.ram;
    memoryType.innerText = laptop.hard_drive_type;

})