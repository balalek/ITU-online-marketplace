const msgSection = document.querySelector('.message-section');
const adSection = document.querySelector('.advertisement-section');
const adSubmit = document.querySelector('.advertisement-submit');
const adForm = document.querySelector('.advertisement-form');
const addAdvertisement = document.querySelector('.addAd');
const map = document.getElementById('test');
const pricefrom = document.getElementById('pricefrom');
const priceto = document.getElementById('priceto');
var regions = [];

map.addEventListener('load', (e)=>{
    console.log("test");
    for(let i = 0; i < 14; i++)
    {
        let target = "R" + i;
        let element = document.getElementById('test').contentDocument.getElementById(target);
        element.addEventListener('click', function()
        {
            if (!regions.includes(i))
            {
                element.style.fill = 'darkgreen'; regions.push(i); console.log("region: " + i + " " + regions.includes(i));
            } 
            else
            {
                element.style.fill = '#b3b3b3'; regions = regions.filter( function(member)
                {
                    return member != i;
                }
                );
            };
        })
    }
})

// GET method, show ads that arent sold out yet
adSubmit.addEventListener('click', (e)=>{
    e.preventDefault()
    let reg = regions.join(',');
    console.log(reg);
    const params = new URLSearchParams({});
    params.append("regions",reg);
    params.append("pricefrom", pricefrom.value);
    params.append("priceto", pricefrom.value);
    // todo: save category filter
    params.append("filter", "motoristika");
    console.log(params.toString());
    fetch('../controller/controller.php?' + params.toString())
    .then(res=>res.json())
    .then(data=>{
        if(!data)
        {
            msgSection.innerHTML='';
            msgSection.display='none';
            console.log("NO.");
        }
        else
        {
        msgSection.style.display="block";
        msgSection.innerHTML=
        `
        <div id="results" class="container-fluid"></div>
        `;
        for(let i = 0; i < (data.length/5+1); i+=1)
        {
            let el = document.createElement('div');
            el.className = "row"
            for(let j = 0; j < 5; j+=1)
            {
                if(data[i*5 + j] == null)
                {
                    break;
                }
                let el2 = document.createElement('div');
                el2.className = "col w-25";
                el2.innerHTML =`<div>${data[i*5 + j].nadpis}</div>
                               <div>${data[i*5 + j].cena} Kč</div>
                               <div><img style="width: 200px;" src='${data[i*5 + j].hlavni_fotografie}'></div>
                               <div>${data[i*5 + j].mesto}</div>
                               `;
                el.append(el2.cloneNode(true));
            }
            document.getElementById("results").append(el.cloneNode(true));
        }
        //adSection.style.display='none'
        // TODO make some for cycle and GUI (grid?)
        //msgSection.innerHTML=
        //`<div>${data[0].nadpis}</div>
        //<div>${data[0].cena} Kč</div>
        //<div><img style="width: 200px;" src='${data[0].hlavni_fotografie}'></div>
        //<div>${data[0].mesto}</div>
        //<div>${data[1].nadpis}</div>
        //<div>${data[1].cena} Kč</div>
        //<div><img style="width: 200px;" src='${data[1].hlavni_fotografie}'></div>
        //<div>${data[1].mesto}</div>`
        //console.log(data)
        }
    })
})








// TODO delete this

// Hide or Show, depend on clicked navigation bar
/*login.addEventListener('click', ()=>{
adSection.style.display='none'
loginDiv.style.display='block'
registerDiv.style.display="none"
msgSection.style.display="none"
})
register.addEventListener('click', ()=>{
    adSection.style.display='none'
    loginDiv.style.display='none'
    registerDiv.style.display="block"
    msgSection.style.display="none"
})
ad.addEventListener('click', ()=>{
    adSection.style.display='block'
    loginDiv.style.display='none'
    registerDiv.style.display="none"
    msgSection.style.display="none"
})*/

// Button events
/*registerSubmit.addEventListener('click', (e)=>{
    e.preventDefault()
    fetch('../controller/controller.php', {
        method:'POST',
        body:new FormData(registerForm)
    })
    .then(res=>res.json())
    .then(data=>{
        msgSection.style.display="block"
        //loginDiv.style.display='none'
        //registerDiv.style.display="none"
        adSection.style.display='none'
        msgSection.innerHTML=
        `<div>${data[1].jmeno}</div>`
        console.log(data)
    })   
})*/



/*loginSubmit.addEventListener('click', (e)=>{
    e.preventDefault()
    const formData = new FormData(loginForm)
// for(let [name, value] of formData) {
//     alert(`${name} = ${value}`); // key1 = value1, then key2 = value2
//   }
    fetch('../controller/controller.php', {
        method:'POST',
        body:formData
    })
    .then(res=>res.json())
    .then(data=>{
        msgSection.style.display="block"
        loginDiv.style.display='none'
    registerDiv.style.display="none"
        msgSection.innerHTML=`<div>${data.status}</div>`
    })
})*/

/*var arr = JSON.parse(request.responseText);
var text = "";

var i;
for (i in arr) {
    if (lastProcMsgID < arr[i].id)
    {
        document.getElementById("status").innerHTML = "New message: " + arr[i].id.toString();                                                
        text = arr[i].id + ' (' + arr[i].dts + '): ' + arr[i].login + ': ' + arr[i].cnt + '<br>';
        document.getElementById("chatArea").innerHTML += text;
    }
}

lastProcMsgID = arr[i].id;*/