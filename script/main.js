const catchTeam = document.getElementById('team');



fetch('https://pcfy.redberryinternship.ge/api/teams')
    .then(response => response.json()).then(answer => {
        let teams = answer.data;
        
        for(let i = 0; i < teams.length; i++) {
            let option = document.createElement('option');
            option.value = teams[i].id;
            option.innerText = teams[i].name;
            team.appendChild(option);
        }
    }
)

catchTeam.addEventListener('change', () => {
    position.disabled = false;
   
    position.innerHTML = '<option value="position" disabled selected>პოზიცია</option>';
    const teamValue = catchTeam.value;

    fetch('https://pcfy.redberryinternship.ge/api/positions') 
    .then(response => response.json()).then( answer => {
        let positions = answer.data;
        for(let i = 0; i < positions.length; i++) {
            let option = document.createElement('option');
            option.value = positions[i].id;
            option.innerText = positions[i].name;
            if(positions[i].team_id == teamValue) {
                position.appendChild(option);
            }
        }
    }
)
})

