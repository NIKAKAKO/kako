const id = localStorage.getItem("id");

fetch(`https://pcfy.redberryinternship.ge/api/laptop/${id}?token=4fce699b646a3b3e7bdc4c9b7dcd4658`).then(response => response.json()).then(data => {
    const laptop = data.data.laptop;
    const user = data.data.user;
    console.log(laptop, user);

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


    
})

