const pictureCircle = document.querySelector('.rounded-circle')
const picture = document.getElementById('test')
const addPicture = document.getElementById('profilePhoto')
const pictureForm = document.querySelector('.pictureForm')

// Add picture to db and show it
addPicture.addEventListener('change', (e)=>{
    e.preventDefault()
    /*pictureCircle.src = "../img/empty-profile.png"
    console.log(addPicture)*/
    fetch('../controller/controller.php', {
        method:'POST',
        body:new FormData(pictureForm)
    })
    .then(res=>res.json())
    .then(data=>{
        //loginDiv.style.display='none'
        //registerDiv.style.display="none"
        //pictureCircle.src = "../img/empty-profile.png"
        pictureCircle.src = data
        console.log(data)
    })   
})

function checkImage()
{
    console.log(getCookie("id"))
    fetch(`../controller/controller.php?id_uziv=${getCookie("id")}`)
    .then(res=>res.json())
    .then(data=>{
        pictureCircle.src = data
        console.log(data)
    })
}


/*function file_changed(file){
    console.log(file.value)
    pictureCircle.src = "../img/empty-profile.png"
}*/
