const modal = document.getElementById('modal');
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


function MoreBtn(){
    loadData(false);
    moreBtn.classList.add('hide');
}

const loadData = async(limit)=>{
    url = `https://openapi.programming-hero.com/api/ai/tools`;
    const response = await fetch(url);
    const data = await response.json();
    
    showData(data.data.tools,limit);


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
                    <div class="modal-inside">
                        <div class="billing">
                            <p class="font-secondary green"> ${(data.pricing[0].price === '0' || data.pricing[0].price === 'No cost' || !data.pricing[0].price  ) ? 'Free of Cost/' : data.pricing[0].price} <br> Basic</p>
                        </div>
                        <div class="billing">
                            <p class="font-secondary orange">${(data.pricing[1].price === '0' || data.pricing[0].price === 'No cost' || !data.pricing[1].price) ? 'Free of Cost/' : data.pricing[1].price} <br> Pro</p>
                        </div>
                        <div class="billing">
                            <p class="font-secondary red">${(data.pricing[2].price === '0' || data.pricing[0].price === 'No cost' || !data.pricing[2].price ) ? 'Free Of Cost/': data.pricing[2].price}<br> Enterprise </p>
                        </div>
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

                <div class="modal-card">
                    <img src="${data.image_link[0]}" class="image-modal-fluid" alt="image">
                    <div class="text-center">
                        <h3 class="font-primary">${data.input_output_examples[0].input}</h3>
                        <p class="paragraph-text">${data.input_output_examples[0].output}</p>
                    </div>
                </div>
            </div>>
            <svg xmlns="http://www.w3.org/2000/svg" fill="#000000" width="55px" height="55px" class=" icon-cancel" onclick='CloseModal()' viewBox="0 0 24 24"><path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"/></svg>
    `;
    const ulElement = document.getElementById('integrationsList');
    
    data.integrations.forEach(integration => {
        const li = document.createElement('li');
        li.textContent = integration;
        ulElement.appendChild(li);
    });

}

function sortBtn(){
    // loadData(false,true);
}




const sortByDate = (array)=>{
    array.sort((a, b) => {
        return new Date(b.published_in) - new Date(a.published_in);
    });

    return array;
}


const showData = (data,limit)=>{
    console.log(data);
    console.log(limit);

    

    if(limit){
        data=data.slice(0,6);

    };
    
    

    // data = sortByDate(data);

    const grid = document.getElementById('grid');
    grid.innerHTML = ``;
    data.forEach(element => {
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
}

loadData(true);