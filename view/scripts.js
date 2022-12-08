const login = document.querySelector('.login')
const register = document.querySelector('.register')
const loginDiv = document.querySelector('.login-section')
const registerDiv = document.querySelector('.register-section')
const registerForm = document.querySelector('.register-form')
const loginForm = document.querySelector('.login-form')
const loginSubmit = document.querySelector('.login-submit')
const registerSubmit = document.querySelector('.register-submit')
const msgSection = document.querySelector('.message-section')
const adSection = document.querySelector('.advertisement-section')
const ad = document.querySelector('.advertisement')
const adSubmit = document.querySelector('.advertisement-submit')
const adForm = document.querySelector('.advertisement-form')

// Hide or Show, depend on clicked navigation bar
login.addEventListener('click', ()=>{
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
})

// Button events
registerSubmit.addEventListener('click', (e)=>{
    e.preventDefault()
    fetch('../controller/controller.php', {
        method:'POST',
        body:new FormData(registerForm)
    })
    .then(res=>res.json())
    .then(data=>{msgSection.style.display="block"
    loginDiv.style.display='none'
    registerDiv.style.display="none"
    adSection.style.display='none'
    msgSection.innerHTML=
    `<div>${data[1].jmeno}</div>`
    console.log(data)
    })   
})

// GET method, show ads that arent sold out yet
adSubmit.addEventListener('click', (e)=>{
    e.preventDefault()
    // TODO filter should be some variable, that stores clicked category
    fetch('../controller/controller.php?filter=auto')
    .then(res=>res.json())
    .then(data=>{msgSection.style.display="block"
    loginDiv.style.display='none'
    registerDiv.style.display="none"
    adSection.style.display='none'
    // TODO make some for cycle and GUI (grid?)
    msgSection.innerHTML=
    `<div>${data[0].nadpis}</div>
    <div>${data[0].cena} Kč</div>
    <div><img style="width: 200px;" src='${data[0].hlavni_fotografie}'></div>
    <div>${data[0].mesto}</div>
    <div>${data[1].nadpis}</div>
    <div>${data[1].cena} Kč</div>
    <div><img style="width: 200px;" src='${data[1].hlavni_fotografie}'></div>
    <div>${data[1].mesto}</div>`
    console.log(data)
})
})



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