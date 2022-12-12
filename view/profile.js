/**********************************************************/
/*                                                        */
/* File: profile.js                                       */
/* Authors: Martin Balaz <xbalaz15@stud.fit.vutbr.cz>     */
/* Project: Project for the course ITU - OnlineBazar      */
/* Description: View file with scripts for my profile,    */
/*              my advertisements and edit advertisements */
/*                                                        */
/**********************************************************/

// Const for my profile any my advertisements
const pictureCircle = document.querySelector('.rounded-circle')
const addPicture = document.getElementById('profilePhoto')
const pictureForm = document.querySelector('.pictureForm')
const myAdsSubmit = document.getElementById('myAds')
const myProfileSection = document.querySelector('.myProfile')
const myAdSection = document.querySelector('.myAdvertisements')
const editMyAdSection = document.querySelector('.editMyAdvertisement')
const backToProfile = document.getElementById('backToProfile')
const backToMyAds = document.getElementById('backToMyAds')
const unsoldAdsSection = document.querySelector('.unsold')
const soldAdsSection  = document.querySelector('.sold')
const editAdSubmit = document.getElementById('editAd')
const sellAdSubmit = document.getElementById('sellAd')
const deleteAdSubmit = document.getElementById('deleteAd')

// Consts for edit advertisements
const subcategoryDiv = document.querySelector('.subcategory')
const updateAdSubmit = document.getElementById("updateAd")
const advertisementForm = document.querySelector('.add-ad-form')
const createAdSection = document.querySelector('.createAdSection')
const currentImgSubmit = document.getElementById('mainPhoto')

const IDInzeratu = document.getElementById('id_inzeratu')
const categorySelect = document.getElementById("type")
const subcategorySelect = document.getElementById("subtype")
const headline = document.getElementById('headline')
const description = document.getElementById('descr')
const price = document.getElementById('price')
const tags = document.getElementById('tags')
const dateTo = document.getElementById('dateTo')
const currentImg = document.getElementById('currentImg')
const firstname = document.getElementById('name')
const lastname = document.getElementById('lastname')
const phone = document.getElementById('phone')
const shire = document.getElementById('shire')
const city = document.getElementById('city')
const remember = document.getElementById('remember')

const urlStore = [];

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
    })   
})

// Show user profile picture on page load
document.addEventListener("DOMContentLoaded", function(event) {
    fetch(`../controller/controller.php?id_uziv=${getCookie("id")}`)
    .then(res=>res.json())
    .then(data=>{
        if (data == null){
            pictureCircle.style.backgroundImage = "url('https://mdbootstrap.com/img/Photos/Others/placeholder-avatar.jpg')"
        } else {
            pictureCircle.style.backgroundImage = `url('${data}')`;
        }
    })
});

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

// Show my ads section (back button)
backToMyAds.addEventListener('click', (e)=>{
    e.preventDefault()
    myAdSection.style.display='block'
    myProfileSection.style.display='none'
    editMyAdSection.style.display='none'
})

// Show my sold and unsold advertisements  
function showMyAds(onEdit) 
{
    fetch(`../controller/controller.php?userAds=${getCookie("id")}`)
    .then(res=>res.json())
    .then(data=>{
        // TODO GUI (grid?)
        // After edit "refresh"
        if(onEdit){
            soldAdsSection.innerHTML = ``
            unsoldAdsSection.innerHTML = ``
        }
        for(var i = 0; i < data.length; i++){
            if(data[i].prodano == 1){
                soldAdsSection.innerHTML +=
                `<div>${data[i].nadpis}</div>
                <div>${data[i].cena} Kč</div>
                <div><img style="width: 200px;" src='${data[i].hlavni_fotografie}'></div>
                <div>${data[i].mesto}</div>`
            }else if(data[i].prodano == 0){
                //console.log(data[i].id_inzeratu)
                unsoldAdsSection.innerHTML +=
                `<div>${data[i].nadpis}</div>
                <div>${data[i].cena} Kč</div>
                <div><img style="width: 200px;" src='${data[i].hlavni_fotografie}'></div>
                <div>${data[i].mesto}</div>
                <button type="submit" class="btn btn-primary btn-block" name="editAd" id="editAd" onclick="showEdit(${data[i].id_inzeratu})">Editovat</button>
                <button type="submit" class="btn btn-primary btn-block" name="sellAd" id="sellAd">Prodat</button>
                <button type="submit" class="btn btn-primary btn-block" name="deleteAd" id="deleteAd">Odstranit</button>`
            }
        }
    })
    
}

// Function that show data for selected advertisement
function showEdit(idInzeratu){
    console.log(idInzeratu)
    fetch(`../controller/controller.php?idInzeratu=${idInzeratu}`)
    .then(res=>res.json())
    .then(data=>{
        // TODO subcategory show
        myAdSection.style.display='none'
        myProfileSection.style.display='none'
        editMyAdSection.style.display='block'
        subcategoryDiv.style.display = 'block'
        console.log(idInzeratu)
        IDInzeratu.value = idInzeratu
        categorySelect.value = data[0].kategorie
        console.log(data[0].podkategorie)
        subcategorySelect.value = data[0].podkategorie
        headline.value = data[0].nadpis
        description.value = data[0].popis
        price.value = data[0].cena
        tags.value = data[0].tagy
        dateTo.value = data[0].platnost_do
        currentImg.src = data[0].hlavni_fotografie
        firstname.value = data[0].jmeno
        lastname.value = data[0].prijmeni
        phone.value = data[0].tel_cislo
        shire.value = data[0].kraj
        city.value = data[0].mesto
        remember.checked = data[0].pamatovat
        
    })   
}

// !!!!! Edit advertisement section !!!!!! \\

// Hide or Show, depend on changed category select
categorySelect.addEventListener('change', ()=>{
    if(categorySelect.value != "") {
        subcategoryDiv.style.display='block'
        if(categorySelect.value == "motoristika"){
            // subcategories for "motoristika" category
            const langArray = ["auta", "motorky", "zemědělské stroje", "kola,disky,pneu", "příslušenství"]
            // Append options to subcategory select
            index = 0
            for(element in langArray){
                var opt = document.createElement("option")
                opt.value = langArray[element]
                opt.innerHTML = langArray[element]

                subcategorySelect.appendChild(opt)
                index++
            } 
        // TODO else if, add subcategories to more categories
        } else {
            // Remove appended child, if user is changing options a lot, but do not remove "Vyber podkategorii"
            while (subcategorySelect.firstChild && subcategorySelect.childElementCount > 1) {
                subcategorySelect.removeChild(subcategorySelect.lastChild);
            }
        }
    } else {
        while (subcategorySelect.firstChild && subcategorySelect.childElementCount > 1) {
            subcategorySelect.removeChild(subcategorySelect.lastChild);
        }
        subcategoryDiv.style.display='none'
    }
})

// Update advertisement in database and go back to my ads section
updateAdSubmit.addEventListener('click', (e)=>{
    e.preventDefault()
    fetch('../controller/controller.php', {
        method:'POST',
        body:new FormData(advertisementForm)
    })
    .then(res=>res.json())
    .then(data=>{
        myAdSection.style.display='block'
        myProfileSection.style.display='none'
        editMyAdSection.style.display='none'
        showMyAds(1)
        window.scrollTo(0, 0);
    })   
})

// Cancel picture view
$(document).ready(function() {
    document.getElementById('pro-image').addEventListener('change', readImage, false);
    //$( ".preview-images-zone" ).sortable();
    $(document).on('click', '.image-cancel', function() {
        let no = $(this).data('no');
        $(".preview-image.preview-show-"+no).remove();
    });
});

var num = 1;
// Show multiple images
function readImage() {
    if (window.File && window.FileList && window.FileReader) {
        var files = event.target.files; //FileList object
        var output = $(".preview-images-zone");

        for (let i = 0; i < files.length; i++) {
            var file = files[i];
            if (!file.type.match('image')) continue;
            
            var picReader = new FileReader();
            
            picReader.addEventListener('load', function (event) {
                var picFile = event.target;
                var html =  '<div class="preview-image preview-show-' + num + '">' +
                            '<div class="image-cancel" data-no="' + num + '">x</div>' +
                            '<div class="image-zone"><img id="pro-img-' + num + '" src="' + picFile.result + '"></div>' +
                            '</div>';

                output.append(html);
                urlStore[num-1] = picFile.result;
                console.log(urlStore[0]);
                num = num + 1;
                
            });

            picReader.readAsDataURL(file);
        }
        $("#pro-image").val('');
    } else {
        console.log('Browser not support');
    }
}

// Show selected pictures
currentImgSubmit.addEventListener('change', (e)=>{
    e.preventDefault()
    var picReader = new FileReader();
    var files = event.target.files; //FileList object

    for (let i = 0; i < files.length; i++) {
        var file = files[i];
        picReader.addEventListener('load', function (event) {
            var picFile = event.target;
            currentImg.src = picFile.result;
        });
        picReader.readAsDataURL(file);
    }
})