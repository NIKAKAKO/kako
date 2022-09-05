const sendButton = document.querySelector('.next');
const laptopImg = document.getElementById('laptop_image');
const laptopName = document.getElementById('laptop_name');
const laptopBrand = document.getElementById('laptop_brand_id');
const laptopCpu = document.getElementById('laptop_cpu');
const laptopCores = document.getElementById('laptop_cpu_cores');
const laptopThread = document.getElementById('laptop_cpu_threads');
const saleDate = document.getElementById('laptop_purchase_date');
const localData = JSON.parse(localStorage.getItem('data'));
const laptopRam = document.getElementById('laptop_ram');
const hardDrive = document.querySelector('.laptop_hard_drive_type');
const laptopPrice = document.getElementById('laptop_price');


const formData = new FormData();
let droppedImage = false;
let submitted = false;
let teamOptions = [];


if(localData?.laptop_name) {
    laptopName.value = localData.laptop_name;
}

if(localData?.laptop_cpu) {
    laptopCpu.value = localData.laptop_cpu;
}

if(localData?.laptop_cpu_cores) {
    laptopCores.value = localData.laptop_cpu_cores;
}

if(localData?.laptop_cpu_threads) {
    laptopThread.value = localData.laptop_cpu_threads;
}

if(localData?.laptop_ram) {
    laptopRam.value = localData.laptop_ram;
}

if(localData?.laptop_price) {
    laptopPrice.value = localData.laptop_price;
}

if(localData?.laptop_hard_drive_type){
    const hardDriveType = hardDrive.querySelector(`input[value="${localData.laptop_hard_drive_type}"]`);
    hardDriveType.checked = true;
}

if(localData?.laptop_state){
    const laptopState = document.querySelector(`input[value="${localData.laptop_state}"]`);
    laptopState.checked = true;
}

if(localData?.laptop_purchase_date){
    saleDate.value = localData.laptop_purchase_date;
    saleDate.type = 'date';
}

if(laptopImg.files[0]) {
    laptopImg.parentElement.classList.remove('error');
    laptopImg.parentElement.classList.add('success');
    laptopImg.parentElement.style.backgroundImage = `url(${URL.createObjectURL(laptopImg.files[0])})`;
}


saleDate.addEventListener('focus', () => {
    saleDate.type = 'date';
    let date = new Date();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let year = date.getFullYear();
    if(month < 10) {
        month = '0' + month;
    }
    if(day < 10) {
        day = '0' + day;
    }
    saleDate.value = `${year}-${month}-${day}`;
    
    
    })
    
    saleDate.addEventListener('blur', () => {
    if(saleDate.value === '') {
        saleDate.type = 'text';        
    }
    
    })

    saleDate.addEventListener('change', ()=> {
        localData.laptop_purchase_date = saleDate.value;
        localStorage.setItem('data', JSON.stringify(localData));
    })



fetch('https://pcfy.redberryinternship.ge/api/brands')
.then(response => response.json()).then(data => {
    let brands = data.data;
    for(let i = 0; i < brands.length; i++) {
        let option = document.createElement('option');
        option.value = brands[i].id;
        option.innerText = brands[i].name;
        laptopBrand.appendChild(option);

    }
    if(localData?.laptop_brand_id) {
        const laptopBrandId = Number(localData.laptop_brand_id);
        laptopBrand.querySelector(`option[value="${laptopBrandId}"]`).selected = true;
    }
}
)

fetch('https://pcfy.redberryinternship.ge/api/cpus')
.then(response => response.json()).then(data => {
    let cpus = data.data;
    for(let i = 0; i < cpus.length; i++) {
        let option = document.createElement('option');
        option.value = cpus[i].id;
        option.innerText = cpus[i].name;
        laptopCpu.appendChild(option);
    }
    if(localData?.laptop_cpu) {
        const laptopCpus = Number(localData.laptop_cpu);
        if(laptopCpu.querySelector(`option[value="${laptopCpus}"]`)){
            laptopCpu.querySelector(`option[value="${laptopCpus}"]`).selected = true;
        }
    }
}
)



document.querySelectorAll('input:not([type="radio"]):not(#laptop_purchase_date):not(#laptop_image)').forEach(input => input.addEventListener('input', (event) => {
    if(submitted){
        testForm();
    }
    localData[input.id] = input.value;
    localStorage.setItem('data', JSON.stringify(localData));
}))

document.querySelectorAll('select').forEach(select => select.addEventListener('input', (event) => {
    if(submitted){
        testForm();
    }
    localData[select.id] = select.value;
    localStorage.setItem('data', JSON.stringify(localData));
}))

document.querySelectorAll('input[type="radio"]').forEach(radio => radio.addEventListener('change', (event) => {
    if(submitted){
        testForm();
    }
    const name = radio.parentElement.id;
    console.log(radio.value);
    // localData[name] = radio.value;
    localStorage.setItem('data', JSON.stringify(localData));
}))


laptopImg.addEventListener('change', (event) => {
    laptopImg.parentElement.classList.remove('error');
    formData.set('laptop_image', event.target.files[0]);
    console.log(event.target.files[0]);
    laptopImg.parentElement.style.backgroundImage = `url(${URL.createObjectURL(event.target.files[0])})`;
    laptopImg.parentElement.classList.add('success');
    laptopImg.parentElement.querySelectorAll('p').forEach(p => p.style.display = 'none');
})

laptopImg.parentElement.addEventListener('dragover', (event) => {
    event.stopPropagation();
    event.preventDefault();
    event.dataTransfer.dropEffect = 'copy';
    laptopImg.parentElement.classList.add('dragover');
 });

 laptopImg.parentElement.addEventListener('dragleave', (event) => {
    event.stopPropagation();
    event.preventDefault();
    laptopImg.parentElement.classList.remove('dragover');
 });

 laptopImg.parentElement.addEventListener('drop', (event) => {
    event.stopPropagation();
    event.preventDefault();
    droppedImage = true;
    laptopImg.parentElement.classList.remove('error');
    laptopImg.parentElement.classList.remove('dragover');
    laptopImg.parentElement.style.backgroundImage = `url(${URL.createObjectURL(event.dataTransfer.files[0])})`;
    formData.set('laptop_image', event.dataTransfer.files[0]);
    laptopImg.parentElement.classList.add('success');
    laptopImg.parentElement.querySelectorAll('span').forEach(span => span.style.display = 'none');
 });


 //reg-ex starts here 

 const testLatin = (input, object) => {
    let latinRegex = /^[a-zA-Z0-9_.-\s]+$/;
    if(latinRegex.test(input.value)) {
        object[input.id] = input.value;
        input.parentElement.classList.remove('error');
        input.parentElement.classList.add('success');
        console.log(input.parentElement);
    }else {
        input.parentElement.classList.add('error');
        input.parentElement.classList.remove('success');
    }
}

const testSelect = ( input, object, name ) => {
    if(input.value != 'laptop_brand' && input.value != 'cpu') {
        if(name) {
            object[input.id] = input.options[input.selectedIndex].text;
        }else {
            object[input.id] = +input.value;
        }
        input.classList.remove('error');
        input.classList.add('success');
    }else{
        input.classList.add('error');
        input.classList.remove('success');
    }
}

const testNumber = (input, object) => {
    const numberRegex = /^[0-9]+$/;
    if(numberRegex.test(input.value)) {
        object[input.id] = +input.value;
        input.parentElement.classList.remove('error');
        input.parentElement.classList.add('success');
    }else {
        input.parentElement.classList.add('error');
        input.parentElement.classList.remove('success');
    }
}


const testRadio = (parentElementName, object) => {
    console.log(document.querySelectorAll(`.${parentElementName} input`));
    const elements = document.querySelectorAll(`.${parentElementName} input`);
    elements.forEach(input => {

        if(input.checked) {
            const name = input.parentElement.classList[1];
            console.log(object);
            object[name] = input.value;

        }
        if(!elements[0].checked && !elements[1].checked){
            elements[0].parentElement.closest('.radio-buttons').classList.add('error');
            elements[0].parentElement.closest('.radio-buttons').classList.remove('success');
        }else {
            elements[0].parentElement.closest('.radio-buttons').classList.remove('error');
            elements[0].parentElement.closest('.radio-buttons').classList.add('success');
        }
    })
}

const testPhoto = (input, object) => {
    if(laptopImg.files[0] || droppedImage === true) {
        input.parentElement.classList.remove('error');
        input.parentElement.classList.add('success');
    }else {
        input.parentElement.classList.add('error');
        input.parentElement.classList.remove('success');
    }
}

const testForm = () => {
    testLatin(laptopName, localData);
    testSelect(laptopBrand, localData);
    testSelect(laptopCpu, localData, "name");
    testNumber(laptopCores, localData);
    testNumber(laptopThread, localData);
    testNumber(laptopRam, localData);
    testNumber(laptopPrice, localData);
    testRadio('laptop_state', localData);
    testRadio('laptop_hard_drive_type', localData);
    testPhoto(laptopImg, localData);

}



sendButton.addEventListener('click', (event) => {
    event.preventDefault();
    testForm();

    submitted = true;
    const errorClasses = document.querySelectorAll('.error');
    if(errorClasses.length === 0 && Object.keys(localData).length > 14) {
        formData.append('name', localData.name);
        formData.append('surname', localData.surname);
        formData.append('email', localData.email);
        formData.append('phone_number', localData.phone_number);
        formData.append('team_id', +localData.team_id);
        formData.append('position_id', +localData.position_id);
        formData.append('laptop_name', localData.laptop_name);
        formData.append('laptop_brand_id', +localData.laptop_brand_id);
        formData.append('laptop_cpu', localData.laptop_cpu);
        formData.append('laptop_cpu_cores', +localData.laptop_cpu_cores);
        formData.append('laptop_cpu_threads', +localData.laptop_cpu_threads);
        formData.append('laptop_ram', +localData.laptop_ram);
        formData.append('laptop_price', +localData.laptop_price);
        formData.append('laptop_hard_drive_type', localData.laptop_hard_drive_type);
        formData.append('laptop_state', localData.laptop_state);
        if(localData.laptop_purchase_date) {
            formData.append('laptop_purchase_date', localData.laptop_purchase_date);
        }
        formData.append('token', '4fce699b646a3b3e7bdc4c9b7dcd4658');
        fetch('https://pcfy.redberryinternship.ge/api/laptop/create', {
            method: 'POST',
            body: formData
        })
        console.log(localData.phone_number, )
        sendButton.disabled = true;
        setTimeout(()=> {
            localStorage.removeItem('data');
            
            window.location.href = '../src/success.html';
        }, 2000)
        
    }

})
