const pictureCircle = document.querySelector('.rounded-circle')
const picture = document.getElementById('test')
const addPicture = document.getElementById('profilePhoto')
const pictureForm = document.querySelector('.pictureForm')

// Add picture to db and show it
addPicture.addEventListener('change', (e)=>{
    e.preventDefault()
    fetch('../controller/controller.php', {
        method:'POST',
        body:new FormData(pictureForm)
    })
    .then(res=>res.json())
    .then(data=>{
        pictureCircle.style.backgroundImage = `url('${data}')`;
        console.log(data)
    })   
})

// Show user profile picture on page load
document.addEventListener("DOMContentLoaded", function(event) {
    console.log(getCookie("id"))
    fetch(`../controller/controller.php?id_uziv=${getCookie("id")}`)
    .then(res=>res.json())
    .then(data=>{
        if (data == null){
            pictureCircle.style.backgroundImage = "url('https://mdbootstrap.com/img/Photos/Others/placeholder-avatar.jpg')"
        } else {
            pictureCircle.style.backgroundImage = `url('${data}')`;
        }
        console.log(data)
    })
});