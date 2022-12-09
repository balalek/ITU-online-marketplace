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







/*<label for="subcategory"></label>
<select class="form-control form-control-sm" id="typ" name="typ" required>
</select>*/