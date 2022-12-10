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
        //msgSection.style.display="block"
        //loginDiv.style.display='none'
        //registerDiv.style.display="none"
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