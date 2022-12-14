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
const reviewForm = document.querySelector('.review-form')
const review = document.getElementById("review")
const modal = document.getElementById("modal");

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

// Function to show popup window with user reviews
function showReviews()
{
    modal.style.display = "block";

    const table = document.createElement("table");
    const tbody = document.createElement("tbody");
    const root = document.getElementById("block-content");

    table.setAttribute("class", "reviewTable");
    fetch(`../controller/controller.php?id_uziv_rec=${getCookie("id")}`)
    .then(res=>res.json())
    .then(data=>{
        if (!data) {
            return;
        }

        for (var review of data) {
            var div = document.createElement("div");
            div.setAttribute("class", "reviewDiv");
            var tr1 = document.createElement("tr");
            var td_jmeno = document.createElement("td");
            td_jmeno.setAttribute("class", "nameCell");
            td_jmeno.appendChild(document.createTextNode(review.jmeno + " "));
            td_jmeno.appendChild(document.createTextNode(review.prijmeni));
            tr1.appendChild(td_jmeno);
            var td_popis = document.createElement("td");
            td_popis.setAttribute("class", "descCell");
            td_popis.setAttribute("colspan", "2");
            td_popis.appendChild(document.createTextNode(review.popis));
            tr1.appendChild(td_popis);
            div.appendChild(tr1);
            tbody.appendChild(div);

            var tr2 = document.createElement("tr");
            var td_pocet_hvezd = document.createElement("td");
            td_pocet_hvezd.appendChild(document.createTextNode(review.pocet_hvezd));
            tr2.appendChild(td_pocet_hvezd);
            var td_datum = document.createElement("td");
            td_datum.appendChild(document.createTextNode(review.datum_vytvoreni));
            tr2.appendChild(td_datum);
            var td_nadpis = document.createElement("td");
            td_nadpis.setAttribute("class", "headlineCell");
            td_nadpis.appendChild(document.createTextNode("Inzerát: " + review.nadpis));
            tr2.appendChild(td_nadpis);
            div.appendChild(tr2);
            tbody.appendChild(div);
        };
        table.appendChild(tbody);
        root.appendChild(table);
    })
    root.replaceChildren('');
}

// Close reviews after click cross
function closeReviews()
{
    modal.style.display = "none";
}

// Close reviews after clicking outside
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
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
        // After edit "refresh"
        if(onEdit){
            soldAdsSection.innerHTML = ``
            unsoldAdsSection.innerHTML = ``
        }
        var soldString = `<div id="gridSold">`
        var unsoldString = `<div id="gridUnsold">`
        var hiddenOrSeen // String, that i will put to innerHTML, once its finished
        for(var i = 0; i < data.length; i++){
            // Because of length, i want cards to have same height
            if(data[i].nadpis.length > 30) hiddenOrSeen = `"display: none;"`
            else hiddenOrSeen = `"display: block;"`
            // Show sold cards in sold section
            if(data[i].prodano == 1){
                soldString +=
                `<div class="gridBackground">
                    <div><img style="width: 250px; height:150px;" src='${data[i].hlavni_fotografie}'></div>
                    <div id="bold">${data[i].nadpis}</div>
                    <div style=${hiddenOrSeen}><br /></div>
                    <div id="gridInfo">
                        <div id="money">${data[i].cena} Kč</div>
                        <div id="place">${data[i].mesto}</div>
                    </div>
                </div>`
            // Show sold cards in unsold section
            }else if(data[i].prodano == 0){
                unsoldString +=
                `<div class="gridBackground">
                    <div id="cont">
                        <img style="width: 250px; height:150px;" src='${data[i].hlavni_fotografie}'>
                        <input type="image" src="../img/trash.ico" name="deleteAd" id="deleteAd" onclick="destroyAd(${data[i].id_inzeratu})" />
                    </div>
                    <div id="bold">${data[i].nadpis}</div>
                    <div style=${hiddenOrSeen}><br /></div>
                    <div id="gridInfo">
                        <div id="money">${data[i].cena} Kč</div>
                        <div id="place">${data[i].mesto}</div>
                    </div>
                    <div id="gridButton">
                        <button type="submit" class="btn btn-primary btn-block" name="editAd" id="editAd" onclick="showEdit(${data[i].id_inzeratu})">Editovat</button>
                        <button type="submit" class="btn btn-primary btn-block" name="sellAd" id="sellAd" onclick="sellAd(${data[i].id_inzeratu})">Prodat</button>
                    </div>
                </div>`
            }
        }
        soldString += `</div>`
        unsoldString += `</div>`
        soldAdsSection.innerHTML = soldString
        unsoldAdsSection.innerHTML = unsoldString
    })
}

// Function that delete selected advertisement
function destroyAd(idInzeratu)
{
    fetch(`../controller/controller.php?deleteInzerat=${idInzeratu}`)
    .then(res=>res.json())
    .then(data=>{
        if(data) showMyAds(0);
    })
}

// Function that will put unsold advertisement to sold section
function sellAd(idInzeratu)
{
    fetch(`../controller/controller.php?moveInzerat=${idInzeratu}`)
    .then(res=>res.json())
    .then(data=>{
        if(data) showMyAds(0);
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
        }
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

/**
 * @author Martin Balaz
 * // !!!!! Edit advertisement section !!!!!! \\
 */

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