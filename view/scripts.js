/**********************************************************/
/*                                                        */
/* File: controller.php                                   */
/* Authors: Richard Blazo <xblazo00@stud.fit.vutbr.cz>    */
/* Project: Project for the course ITU - OnlineBazar      */
/* Description: Controller from MVC architecture          */
/*                                                        */
/**********************************************************/

const msgSection = document.querySelector('.message-section');
const adSection = document.querySelector('.advertisement-section');
const adSubmit = document.querySelector('.advertisement-submit');
const adForm = document.querySelector('.advertisement-form');
const addAdvertisement = document.querySelector('.addAd');
const map = document.getElementById('test');
const pricefrom = document.getElementById('pricefrom');
const priceto = document.getElementById('priceto');
const searchbar = document.getElementById('search');
const refreshcheck = document.getElementById('autorefresh-results');
const showadvanced = document.getElementById('btn-showadvanced');
const advancedsearchbar = document.getElementById("advanced-search");
const regionnames = ["Moravskoslezský kraj", "Zlínský kraj", "Olomoucký kraj",
                      "Jihomoravský kraj", "Pardubický kraj", "Kraj Vysočina",
                      "Královéhradecký kraj", "Liberecký kraj", "Středočeský kraj",
                      "Praha", "Jihočeský kraj", "Ústecký kraj", "Plzeňský kraj", "Karlovarský kraj"];

const categoriesnames = ["motoristika", "zvirata", "elektronika", "sport",
                         "obleceni", "nemovitosti", "hudba", "zahradnictvi",
                         "knihy" , "nabytek", "sluzby", "detsky_bazar"];

var regions = [];
var categories = [];



function doSearch()
{
    let reg = regions.join(',');
    let cat = categories.join(',');
    const params = new URLSearchParams({});
    params.append("regions",reg);
    params.append("pricefrom", pricefrom.value);
    params.append("priceto", priceto.value);
    params.append("search", searchbar.value);
    params.append("filter", cat);
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
            <div id="results" class="container-fluid">
                <div id ="results-row" class="row">
                </div>
            </div>
            `;
            for(let i = 0; i < (data.length); i+=1)
            {
                let el2 = document.createElement('div');
                el2.className = "col-2 gridNBackground";
                el2.innerHTML =`<a href="viewAd.html?id=${data[i].id_inzeratu}"><div>${data[i].nadpis}</div>
                                <div>${data[i].cena} Kč</div>
                                <div><img style="max-height:100%; max-width:100%;" src='${data[i].hlavni_fotografie}'></div>
                                <div>${data[i].mesto}</div></a>
                               `;
                document.getElementById("results-row").append(el2.cloneNode(true));
            }
        }
    })
}

map.addEventListener('load', (e)=>{
    console.log("test");
    for(let i = 0; i < 14; i++)
    {
        let target = "R" + i;
        let element = document.getElementById('test').contentDocument.getElementById(target);
        element.addEventListener('click', function()
        {
            if (!regions.includes(regionnames[i]))
            {
                element.style.fill = 'darkgreen';
                regions.push(regionnames[i]);
                console.log("region: " + regionnames[i] + " " + regions.includes(i));
            } 
            else
            {
                element.style.fill = '#b3b3b3';
                regions = regions.filter( function(reg)
                {
                    return reg != regionnames[i];
                }
                );
            };
            if(refreshcheck.checked == true)
            {
                doSearch();
            }
        })
    }
    categoriesnames.forEach(category => {
        let element = document.getElementById(category);
        element.addEventListener('click', function()
        {
            if(!categories.includes(category))
            {
                element.style.backgroundColor = "darkgrey";
                categories.push(category);
                console.log("region: " + category + " added");
            }
            else
            {
                element.style.backgroundColor = "buttonface";
                categories = categories.filter( function(cat)
                {
                    return cat != category;
                });
            }
            if(refreshcheck.checked == true)
            {
                doSearch();
            }
        }
        )
        
    });
})

showadvanced.addEventListener('click', (e)=>{
    if(showadvanced.value == "show")
    {
        showadvanced.value = "hide";
        //document.getElementById("advanced-search").style.display = "none";
        advancedsearchbar.style.maxHeight = "0px";
        showadvanced.textContent = "Zobrazit rozšířené vyhledávání";
    }
    else
    {
        showadvanced.value = "show";
        //document.getElementById("advanced-search").style.display = "inline-flex";
        advancedsearchbar.style.maxHeight = advancedsearchbar.scrollHeight + "px";
        showadvanced.textContent = "Skrýt rozšířené vyhledávání";
    }
})

// GET method, show ads that arent sold out yet
adSubmit.addEventListener('click', (e)=>{
    e.preventDefault()
    doSearch();
    //let reg = regions.join(',');
    //let cat = categories.join(',');
    //const params = new URLSearchParams({});
    //params.append("regions",reg);
    //params.append("pricefrom", pricefrom.value);
    //params.append("priceto", priceto.value);
    //params.append("filter", cat);
    //fetch('../controller/controller.php?' + params.toString())
    //.then(res=>res.json())
    //.then(data=>{
    //    if(!data)
    //    {
    //        msgSection.innerHTML='';
    //        msgSection.display='none';
    //        console.log("NO.");
    //    }
    //    else
    //    {
    //        msgSection.style.display="block";
    //        msgSection.innerHTML=
    //        `
    //        <div id="results" class="container-fluid">
    //            <div id ="results-row" class="row">
    //            </div>
    //        </div>
    //        `;
    //        for(let i = 0; i < (data.length); i+=1)
    //        {
    //            let el2 = document.createElement('div');
    //            el2.className = "col-2 gridNBackground";
    //            el2.innerHTML =`<div>${data[i].nadpis}</div>
    //                            <div>${data[i].cena} Kč</div>
    //                            <div><img style="max-height:100%; max-width:100%;" src='${data[i].hlavni_fotografie}'></div>
    //                            <div>${data[i].mesto}</div>
    //                           `;
    //            document.getElementById("results-row").append(el2.cloneNode(true));
    //        }
    //    }
    //})
})