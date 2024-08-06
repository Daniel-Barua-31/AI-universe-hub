const modal = document.getElementById('modal');
let sort = false;
let limit = false;
//const openModal = document.querySelector('.open-modal');
// const closeModal = document.querySelector('.close-modal');

// openModal.addEventListener('click', ()=>{
//     modal.showModal();
// });

const moreBtn = document.getElementById('more-btn');

function OpenModal(id){
    modal.showModal();
    if(id.toString().length<2){
        id = '0'+id;
    }
    else{
        id = id.toString();
    }
    loadModalDetails(id);
}

function CloseModal(){
    modal.close();
}

function isArrayAndNotNull(value) {
  return value !== null && Array.isArray(value);
}


function MoreBtn(){
    limit = true;
    loading(true);
    loadData();
    moreBtn.classList.add('hide');
}

const loadData = async()=>{
    url = `https://openapi.programming-hero.com/api/ai/tools`;
    const response = await fetch(url);
    const data = await response.json();
    const dataArray = data.data.tools;
    showData(dataArray);
}



const checkData = async (url) => {
    try {
        const response = await fetch(url);
        if (!response.ok) {  
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.indexOf('application/json') !== -1) {
            const data = await response.json();
            console.log('JSON data:', data);
        } else {
            console.warn('Response is not JSON:', contentType);
        }
    } catch (error) {
        console.error('Fetch error:', error);
    }
}



const loadModalDetails = async(id)=>{
    url=`https://openapi.programming-hero.com/api/ai/tool/${id}`;
    const response = await fetch(url);
    const data = await response.json();
    showModalDetails(data.data);
}

const showModalDetails = (data)=>{
    console.log(data);
    
    const modal = document.getElementById('modal');



    modal.innerHTML = `
            <div class="flex-row">
                <div class="modal-card">
                    <h2 class="font-primary">${data.description}</h2>
                    <div class="modal-inside" id='modal-inside'>
                        
                    </div>
                    <div class="flex-between-row">
                        <div class="">
                            <h3 class="font-primary">Features</h3>
                            <ul class="order-list">
                                <li>${data.features[1].feature_name}</li>
                                <li>${data.features[2].feature_name}</li>
                                <li>${data.features[3].feature_name}</li>
                            </ul>
                        </div> 
                        <div class="">
                            <h3 class="font-primary">Integrations</h3>

                            <ul class="order-list" id='integrationsList'>
                                
                            </ul>


                        </div>
                    </div>
                </div>

                <div class="modal-card" id='modal-card'>
                    
                    <img src="${data.image_link[0]}" class="image-modal-fluid" alt="image">
                    <div class="text-center">
                        
                    </div>
                </div>
            </div>>
            <svg xmlns="http://www.w3.org/2000/svg" fill="#000000" width="55px" height="55px" class=" icon-cancel" onclick='CloseModal()' viewBox="0 0 24 24"><path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"/></svg>
    `;
    const ulElement = document.getElementById('integrationsList');

    const divElement = document.getElementById('modal-inside');

    const modalCard = document.getElementById('modal-card');

    if(isArrayAndNotNull(data.pricing)){
        data.pricing.forEach(priceElement=>{
            const div = document.createElement('div');
            console.log(priceElement.price);
            div.classList.add('billing');
            div.innerHTML = `
            <p class="font-secondary green"> ${(priceElement.price === '0' || priceElement.price === 'No cost' ) ? 'Free of Cost/' : priceElement.price} <br> ${priceElement.plan} </p>
            `;
            divElement.appendChild(div);
        });
    }

    if(isArrayAndNotNull(data.integrations)){
        data.integrations.forEach(integration => {
            const li = document.createElement('li');
            li.textContent = integration;
            ulElement.appendChild(li);
        });
    }
    else{
        const li = document.createElement('li');
        li.textContent = 'No Data Found';
        ulElement.appendChild(li);
    }

    // data.input_output_examples.forEach(element=>{
    //     const div = document.createElement('div');
    //     console.log(element);
    //     div.classList.add('text-center');
    //     div.innerHTML = `
    //     <h3 class="font-primary">${element[0].input}</h3>
    //     <p class="paragraph-text">${element[0].output}</p>
    //     `;

    //     modalCard.appendChild(div);
    // });

    if(isArrayAndNotNull(data.input_output_examples)){
        for (let i = 0; i < 1; i++) {
            const div = document.createElement('div');
            console.log(data.input_output_examples[i]);
            div.classList.add('text-center');
            div.innerHTML = `
            <h3 class="font-primary">${data.input_output_examples[i].input}</h3>
            <p class="paragraph-text">${data.input_output_examples[i].output}</p>
            `;
            modalCard.appendChild(div);
        }
    }

    else{
        const div = document.createElement('div');
        div.classList.add('text-center');
        div.innerHTML = `
            <h3 class="font-primary">Can you give me an example</h3>
            <p class="paragraph-text">No.Not Yet. Take a break!!</p>
        `;
        modalCard.appendChild(div);
    }
}

function sortBtn(){
    sort = true;
    loading(true);
    loadData();
}

// const sortBtn = ()=>{
//     sort = true;
//     loadData();
// }

const sortByDate = (array)=>{
    array.sort((a, b) => {
        return new Date(b.published_in) - new Date(a.published_in);
    });
    return array;
}


const showData = (data)=>{
    console.log(data);
    console.log(limit);
    console.log(sort);
    if(sort){
        data = sortByDate(data);
    }
    if(!limit){
        data=data.slice(0,6);
    };
    
    // data = sortByDate(data);


    const grid = document.getElementById('grid');
    grid.innerHTML = ``;
    data.forEach(element => {

        // (checkData(`${element.image}`));
        
        const div = document.createElement('div');
        div.classList.add('col');

        div.innerHTML = `
        <div class='card'>
            <img src=${element.image} class="img-fluid" alt="image">
            <div class="card-body">
                <h3 class="font-primary">Features</h3>
                <ol class="order-list">
                    <li>${element.features[0]}</li>
                    <li>${element.features[1]}</li>
                    <li>${element.features[2]}</li>
                </ol>
            </div>
            <hr>
            <div class="card-footer">
                <div>
                    <h3 class="font-primary">${element.name}</h3>
                    <div class="flex-row">
                        <img src="image/calendar.png" style="width: 16px;height: 16px;" alt="">
                        <p class="paragraph-text">${element.published_in}</p>
                    </div>
                    
                </div>
                <div>
                    <img src="image/arrow.png" onclick='OpenModal(${element.id})'  class="icon-image open-modal" alt="more">
                </div> 
            </div>
        </div>
        `;
        grid.appendChild(div);
    });

    loading(false)
}

function loading(isLoading){
    const spinner = document.getElementById('spinner'); 
    if(isLoading){
        spinner.classList.remove('loader--hidden');
    }
    else{
        spinner.classList.add('loader--hidden');
    }
}

loadData();

// window.addEventListener("load", () => {
//   const loader = document.querySelector(".loader");

//   loader.classList.add("loader--hidden");

//   loader.addEventListener("transitionend", () => {
//     document.body.removeChild(loader);
//   });
// });