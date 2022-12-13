const pictureCircle = document.querySelector('.rounded-circle')
const addPicture = document.getElementById('profilePhoto')
const pictureForm = document.querySelector('.pictureForm')
const reviewForm = document.querySelector('.review-form')
const review = document.getElementById("review")
const myAdsSubmit = document.getElementById('myAds')
const myProfileSection = document.querySelector('.myProfile')
const myAdSection = document.querySelector('.myAdvertisements')
const editMyAdSection = document.querySelector('.editMyAdvertisement')
const backToProfile = document.getElementById('backToProfile')

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

function showReviews()
{
    var modal = document.getElementById("modal");
    modal.style.display = "block";
    fetch(`../controller/controller.php?id_uziv_rec=${getCookie("id")}`, {
        method:'POST',
        body:new FormData(reviewForm)
    })
    .then(res=>res.json())
    .then(data=>{
        console.log(data)
    })
}

function closeReviews()
{
    var modal = document.getElementById("modal");
    modal.style.display = "none";
}

// Show my Ads section
myAdsSubmit.addEventListener('click', (e)=>{
    e.preventDefault()
    myAdSection.style.display='block'
    myProfileSection.style.display='none'
    editMyAdSection.style.display='none'
})

// Show my profile section (back button)
backToProfile.addEventListener('click', (e)=>{
    e.preventDefault()
    myAdSection.style.display='none'
    myProfileSection.style.display='block'
    editMyAdSection.style.display='none'
})