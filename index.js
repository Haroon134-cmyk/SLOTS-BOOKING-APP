function slotsGenerator() {
    var hour = 0;
    var minutes = 1;
    var ar = [];
    while (hour < 24 && minutes <= 46) {
        let hr, mt;
        if (hour < 10) {
            hr = "0" + hour;
        } else {
            hr = hour;
        }
        if (minutes < 10) {
            mt = "0" + minutes;
        } else {
            mt = minutes;
        }
        let st = hr + " : " + mt;
        minutes += 14;
        let et = hr + " : " + minutes;
        minutes++;
        console.log(st + " : " + et);
        console.log(minutes);
        if (minutes == 61) {

            hour++;
            minutes = 1;
        }
        ar.push({
            status: 'ub',
            st: st,
            et: et,
            name: '',
            email: '',
            phone: ''
        })
    }
    const arString = JSON.stringify(ar);
    localStorage.setItem("slot", arString);

}

if (localStorage.getItem('slot') == null) {
    slotsGenerator();
    console.log("Slots Generated");
}

function displaySlots() {
    var ax = JSON.parse(localStorage.getItem('slot'));
    var html = "";
    ax.forEach((element) => {
        if (element.status == "ub") {
            html += `<div class="col-md-4 mb-3">\
        <div class="b d-flex justify-content-around align-self-center">\
            <h3>${element.st} to ${element.et}</h3>\
        <button class="btn btn-primary" onclick = "bookSlot('${element.st}', '${element.et}')">Book</button>\
        </div>\
    </div>`;
            document.getElementById('slots').innerHTML = html;
        }
    });
}
displaySlots();

function bookSlot(st, et) {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0;
    document.getElementById('overlay').style.display = 'flex';
    localStorage.setItem('st', st);
    localStorage.setItem('et', et);
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('phone').value = '';


}
function formSubmit(){
    let check  = true;
    let name = document.getElementById('name').value;
    document.getElementById('nameHelp').classList.add("d-none");
    document.getElementById('emailHelp').classList.add("d-none");
    document.getElementById('phoneHelp').classList.add("d-none");
    if(name.length < 5){
        document.getElementById('nameHelp').innerText = 'Name Required';
        document.getElementById('nameHelp').classList.remove("d-none");
        check = false;

    }
    let email = document.getElementById('email').value;
    let regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if(!(email.match(regex))){
        document.getElementById('emailHelp').innerText = 'Provide a valid email';
        document.getElementById('emailHelp').classList.remove("d-none");
        check = false;
    }
    let phone = document.getElementById('phone').value;
    if(phone.length < 11){
        document.getElementById('phoneHelp').innerText = 'Phone Number Required';
        document.getElementById('phoneHelp').classList.remove("d-none");
        check = false;

    }
    if(check == true){
        let st = localStorage.getItem('st');
    let et = localStorage.getItem('et');
    let arx = JSON.parse(localStorage.getItem('slot'));
    const ary = arx.map((item) => {
        if(item.st == st){
            item.status = "b";
            item.name = name;
            item.email = email;
            item.phone = phone;
        }
        return item;
    });
    let s = JSON.stringify(ary);
    localStorage.setItem('slot', s);
    displaySlots();
    alert("Your appointment is succesfully booked");
    document.getElementById('overlay').style.display = "none";
    }
}

function disnone() {
    document.getElementById('overlay').style.display = 'none';
}