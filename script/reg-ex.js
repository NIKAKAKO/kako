
const nextFormElement = document.getElementById("nextButton");
console.log(nextFormElement);
const firstName = document.getElementById('first-name');
console.log(firstName);
nextFormElement.addEventListener('click', (event)=> {
    let data = {};
    
    testGeorgian(firstName, data);
    console.log(data);
    event.preventDefault();
})

firstName.addEventListener('keyup', ()=> {
    const georgianRegEx = /^[ა-ჰ]{2,}$/;

})


const checkGeorgian = ( input, object ) => {
    const georgianRegEx = /^[ა-ჰ]{2,}$/;
    if(georgianRegEx.test(input.value)) {
        input.parentElement.classList.remove('error');
        input.parentElement.classList.add('success');  
    }
    else {
        input.parentElement.classList.add('error');
        input.parentElement.classList.remove('success');
    }
}
console.log(checkGeorgian);