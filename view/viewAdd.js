/**********************************************************/
/*                                                        */
/* File: viewAdd.js                                       */
/* Authors: Richard Blazo <xblazo00@stud.fit.vutbr.cz>    */
/*          Martin Balaz <xbalaz15@stud.fit.vutbr.cz>     */
/* Project: Project for the course ITU - OnlineBazar      */
/* Description: View file with scripts for advertisement  */
/*              information, and also info about his user */
/*                                                        */
/**********************************************************/

const params = new URLSearchParams(window.location.search);
const adcontents = document.getElementById("ad-contents");
const body = document.body;
const userSection = document.querySelector('.user-content')
const userName = document.getElementById('userName')
const backSubmit = document.getElementById('backToAd')
const unsoldAdsSection = document.querySelector('.unsold')
const soldAdsSection  = document.querySelector('.sold')

/**
 * @author Richard Blazo
 * Passes the GET parameter ID to controller, which returns content for the page.
 */
if(params != null)
{
    let id = null;
    id = params.get('id');
    if(id === null)
    {
        //TODO: Searching for no ad error.
        adcontents.innerHTML=
                `
                <div class="container-fluid justify-content-center" id="addisplay">
                    <div class="row justify-content-center">
                        <div class="col-8 inztitle">Chyba: 'id' parametr nebyl odeslán.</div>
                    </div>
                </div>
                `
        console.log("FAIL ID");
        
    }
    else
    {
        fetch('../controller/controller.php?id_ad=' + id)
        .then(res=>res.json())
        .then(data=>{
            if(!data)
            {
                adcontents.innerHTML=
                `
                <div class="container-fluid justify-content-center" id="addisplay">
                    <div class="row justify-content-center">
                        <div class="col-8 inztitle">Požadovaný inzerát nebyl nalezen.</div>
                    </div>
                </div>
                `
                console.log("FAIL DATA");
            }
            else
            {
                adcontents.innerHTML=
                `
                <div class="container-fluid justify-content-center" id="addisplay">
                    <div class="row justify-content-center">
                        <div class="col-8 inztitle" id="inztitle">test</div>
                        <div class="col-8 inzbody" style="text-align:center; height:fit-content;" id="inzimage"></div>
                        <div class="col-8 inzbody">
                            <div class="row">
                                <div class="col-2" style="padding-right:0px; text-align: right;" id="inzdesc1"><b>Popis:</b></div>
                                <div class="col" id="inzdesc2">testaa</div>
                            </div>
                            <div class="row">
                                <div class="col-2" style="padding-right:0px; text-align: right;" id="inzprice1"><b>Cena:</b></div>
                                <div class="col" id="inzprice2">testaa</div>
                            </div>
                            <div class="row">
                                <div class="col-2" style="padding-right:0px; text-align: right;" id="inzdatecreated1"><b>Datum vytvoření:</b></div>
                                <div class="col" id="inzdatecreated2">testaa</div>
                            </div>
                            <div class="row">
                                <div class="col-2" style="padding-right:0px; text-align: right;" id="inzdatevalid1"><b>Platný do:</b></div>
                                <div class="col" id="inzdatevalid2">testaa</div>
                            </div>
                        </div>
                        <div class="col-8 inzbody"></br></div>
                        <div class="col-8 inzfooter">
                            <div class="row">
                                <div class="col-8" id="reviewspot"></div>
                                <div class="col-4" id="ownerinfo">
                                    <div class="row inzowner" onclick=showUserInfo(${data.id_uzivatele},"${data.jmeno}","${data.prijmeni}")>
                                        <div class="col-7">
                                            <div class="row" style="justify-content: flex-end;" id="realname"></div>
                                            <div class="row" style="justify-content: flex-end;" id="email"></div>
                                            <div class="row" style="justify-content: flex-end;" id="phonenr"></div>
                                            <div class="row" style="justify-content: flex-end;" id="location"></div>
                                        </div>
                                        <div class="col-5" id="useravatar"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                `;
                console.log(data);
                document.getElementById("inztitle").textContent = data.nadpis;
                var inzimg = document.createElement('img');
                inzimg.src = data.hlavni_fotografie;
                inzimg.style.height = "75%";
                inzimg.style.width = "75%";
                inzimg.className = "img-thumbnail";
                document.getElementById("inzimage").appendChild(inzimg);
                document.getElementById("inzdesc2").textContent = data.popis;
                document.getElementById("inzprice2").textContent = data.cena + " Kč";
                document.getElementById("inzdatecreated2").textContent = data.datum_vytvoreni;
                document.getElementById("inzdatevalid2").textContent = data.platnost_do;
                document.getElementById("realname").textContent = data.jmeno + " " + data.prijmeni;
                document.getElementById("email").textContent = data.email;
                document.getElementById("phonenr").textContent = data.tel_cislo;
                document.getElementById("location").textContent = data.kraj + ", " + data.mesto;
                var useravatar = document.createElement('img');
                useravatar.src = data.profilovka;
                useravatar.style.height = "100%";
                useravatar.style.width = "100%";
                useravatar.className = "img-thumbnail";
                document.getElementById("useravatar").appendChild(useravatar);

                adcontents.style.maxHeight = adcontents.scrollHeight;
            }
        })
        
    }
    console.log("DONE");
}

/**
 * @author Petr Kolarik
 * Show info about user - page with his Ads, and review him
 */
function showUserInfo(userID, name, lastname)
{
    adcontents.style.display = 'none';
    userSection.style.display = 'block';
    fetch('../controller/controller.php?userAds=' + userID)
    .then(res=>res.json())
    .then(data=>{
        userName.innerHTML = `${name} ${lastname}`

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
                    <div><img style="width: 250px; height:150px;" src='${data[i].hlavni_fotografie}'></div>
                    <div id="bold">${data[i].nadpis}</div>
                    <div style=${hiddenOrSeen}><br /></div>
                    <div id="gridInfo">
                        <div id="money">${data[i].cena} Kč</div>
                        <div id="place">${data[i].mesto}</div>
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

/**
 * @author Petr Kolarik
 * Back button to ad info
 */
backSubmit.addEventListener('click', (e)=>{
    e.preventDefault()
    adcontents.style.display = 'block';
    userSection.style.display = 'none';
})
