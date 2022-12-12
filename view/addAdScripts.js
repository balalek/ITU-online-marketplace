/**********************************************************/
/*                                                        */
/* File: addAdScripts.js                                  */
/* Authors: Martin Balaz <xbalaz15@stud.fit.vutbr.cz>     */
/* Project: Project for the course ITU - OnlineBazar      */
/* Description: View file with scripts for Ad add         */
/*                                                        */
/**********************************************************/

const categorySelect = document.getElementById("type")
const subcategoryDiv = document.querySelector('.subcategory')
const subcategorySelect = document.getElementById("subtype")
const createAdSubmit = document.getElementById("createAd")
const advertisementForm = document.querySelector('.add-ad-form')
const createAdSection = document.querySelector('.createAdSection')
const createdAdSection = document.querySelector('.createdAdSection')
const backToIndexSubmit = document.getElementById('backToIndex')
const currentImg = document.getElementById('currentImg')
const currentImgSubmit = document.getElementById('mainPhoto')
const firstname = document.getElementById('name')
const lastname = document.getElementById('lastname')
const phone = document.getElementById('phone')
const shire = document.getElementById('shire')
const city = document.getElementById('city')
const remember = document.getElementById('remember')

const urlStore = [];

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

// Store advertisement to database a show if it completed succesfully
createAdSubmit.addEventListener('click', (e)=>{
    e.preventDefault()
    fetch('../controller/controller.php', {
        method:'POST',
        body:new FormData(advertisementForm)
    })
    .then(res=>res.json())
    .then(data=>{
        createAdSection.style.display='none'
        createdAdSection.style.display='block'
        //msgSection.innerHTML=
        //`<div>${data[1].jmeno}</div>`
        console.log(data)
    })   
})

// Go back to main page after creating an advertisement
backToIndexSubmit.addEventListener('click', (e) =>{
    e.preventDefault()
    if(getCookie("id") > 0) {
        location.href = "index.html"
    }
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

// Show selected picture
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

// If remember was previously checked, then fill contacts
function checkContacts(){
    fetch(`../controller/controller.php?id_uzivatele=${getCookie("id")}`)
    .then(res=>res.json())
    .then(data=>{
        if (data[0].pamatovat != 0){
            firstname.value = data[0].jmeno
            lastname.value = data[0].prijmeni
            phone.value = data[0].tel_cislo
            shire.value = data[0].kraj
            city.value = data[0].mesto
            remember.checked = data[0].pamatovat
        }
        
    })
}