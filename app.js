// https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=110059&date=09-08-2021

//Variables
const pin = document.getElementById('pincode');
const date = document.getElementById('date');
const cost= document.getElementById('cost');
const s = document.getElementById('search');
const r = document.getElementById('reset');
const input = document.getElementById('INPUT');
const ftr = document.getElementById('footer');


//Output
const container = document.getElementById('contents');

let cascade = "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?"
let select; //selected cost
let api = "";

//Output function
let output = (dataOut) => {

    container.innerHTML = "";
    for (data of dataOut) {
        if (select != "All")
            if(data.fee_type != select)
                continue;
    
//Creating Data Blocks
    let slot = document.createElement('div');
    let name = document.createElement('h2');
    let address = document.createElement('h5');
    let vaccine = document.createElement('h2');
    let min_age = document.createElement('div');
    let max_age = document.createElement('div');
    let d1 = document.createElement('p');
    let d2 = document.createElement('p');
    let from = document.createElement('span');
    let to = document.createElement('span');
    let price = document.createElement('p');

//Adding data
    name.innerText = data.name;
    address.innerText = data.address;
    vaccine.innerText = data.vaccine;
    if (data.max_age_limit == undefined) 
        max_age.innerHTML = `<b>Max Age:</b> ${data.min_age_limit} and Above`;
    else 
        max_age.innerHTML = `<b>Max Age:</b> ${data.max_age_limit}`
    min_age.innerHTML = `<b>Min Age:</b> ${data.min_age_limit}`;
    d1.innerHTML = `<b>Dose 1:</b> ${data.available_capacity_dose1}`;
    d2.innerHTML = `<b>Dose 1:</b> ${data.available_capacity_dose2}`;
    from.innerHTML = `<b>Timing:</b> ${data.from}` 
    to.innerHTML = ` <b>to</b> ${data.to}`
    if (parseInt(data.fee) == 0)
        price.innerHTML = "<b>Free</b>"
    else
        price.innerHTML = `<b>Fee:</b> ${data.fee}`;

//Styles
    if (parseInt(data.available_capacity_dose1) > 0)
    d1.style.backgroundColor = "#4AA96C";
    else
    d1.style.backgroundColor = "#F55C47"

    if (parseInt(data.available_capacity_dose2) > 0)
    d2.style.backgroundColor = "#4AA96C";
    else
    d2.style.backgroundColor = "#F55C47" 

    vaccine.style.color = "#3C8DAD"
    price.style.backgroundColor = "#DF711B"

//Appending Datablocks to container
    slot.append(name);
    slot.append(address);
    slot.append(vaccine);
    slot.append(min_age);
    slot.append(max_age);
    slot.append(d1);
    slot.append(d2);
    slot.append(from);
    slot.append(to);
    slot.append(price);
    container.append(slot);
    slot.classList.add("slot", "col", "p-1");

    }
}

//Reload
r.addEventListener('click', () => {
    window.location.reload();
    s.disabled = false;
    console.log('reset');

})

//search
s.addEventListener('click', () => {
    s.disabled = true;
    api = `${cascade}pincode=${pin.value}&date=${date.value}`;
    select = cost.value;
    fetch(api)
        .then((res) => res.json())
        .then((data) => {
            input.remove();
            ftr.style.position = "static";
            output(data.sessions);
        })
        .catch((err) => {
            console.log("Error!!!");
            console.log(err);
        })
})
