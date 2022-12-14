/**********************************************************/
/*                                                        */
/* File: viewAdd.js                                       */
/* Authors: Richard Blazo <xblazo00@stud.fit.vutbr.cz>    */
/*          Petr Kolarik <xkolar13@stud.fit.vutbr.cz>     */
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
const evaluationSection = document.querySelector('.evaluateUser')

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
                                <div class="col-8" id="reviewspot">
                                    <div id="profileReview" style="background-color: rgb(187, 255, 187);">
                                        <div class="d-flex justify-content-center" id="stars">
                                            <label for="stars" style="margin-right: 1%;">Průměrné hodnocení:</label>
                                            <span class="fa fa-star fa-lg full"></span>
                                            <span class="fa fa-star fa-lg full"></span>
                                            <span class="fa fa-star fa-lg full"></span>
                                            <span class="fa fa-star fa-lg"></span>
                                            <span class="fa fa-star fa-lg"></span>
                                        </div>
                                        <div class="m-2 d-flex justify-content-center" id="num-of-revs">Počet hodnocení: 4</div>
                                        <div class="m-2 d-flex justify-content-center" id="reviews">
                                            <button type="submit" class="btn btn-primary" onclick="showReviews()">Zobrazit vše</button>
                                            <div class="modal" id="modal">
                                                <div class="modal-content">
                                                    <div>
                                                        <label for="filtr" style="margin: 1%;">Seřadit podle:</label>
                                                        <select name="hodnoceni" id="hodnoceni" style="margin: 1%;">
                                                            <option value="none" selected disabled hidden>hodnocení</option>
                                                            <option value="nejlepsi">od nejlepšího</option>
                                                            <option value="nejhorsi">od nejhoršího</option>
                                                        </select>
                                                        <select name="datum" id="datum" style="margin: 1%;">
                                                            <option value="none" selected disabled hidden>datum</option>
                                                            <option value="nejlepsi">od nejnovějšího</option>
                                                            <option value="nejhorsi">od nejstaršího</option>
                                                        </select>
                                                        <span class="close" id="close" onclick="closeReviews()">
                                                            <i class="fa fa-times" aria-hidden="true" style="color: #f00"></i>
                                                        </span>
                                                    </div>
                                                    <span id="block-content"></span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-4" id="ownerinfo">
                                    <div class="row inzowner" id="showUserInfoSubmit" >
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
                document.getElementById("showUserInfoSubmit").addEventListener('click', (e)=>{
                    showUserInfo(data.id_uzivatele, data.jmeno, data.prijmeni)
                })
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
        evaluationSection.innerHTML = `
        <div id="profileReview">
                <div class="d-flex justify-content-center" id="stars" style="margin-top: 1%">
                    <label for="stars" style="margin-right: 1%;">Průměrné hodnocení:</label>
                    <span class="fa fa-star fa-lg full"></span>
                    <span class="fa fa-star fa-lg full"></span>
                    <span class="fa fa-star fa-lg full"></span>
                    <span class="fa fa-star fa-lg"></span>
                    <span class="fa fa-star fa-lg"></span>
                </div>
                <div class="m-2 d-flex justify-content-center" id="num-of-revs">Počet hodnocení: 4</div>
                <div class="m-2 d-flex justify-content-center" id="reviews">
                <button type="submit" class="btn btn-primary" onclick="evaluateUser(${userID})">Ohodnotit</button>
                <div class="modal2" id="modal2">
                    <div class="modal-content">
                        <span class="close2" id="close2" onclick="closeReviews2()">
                            <i class="fa fa-times" aria-hidden="true" style="color: #f00"></i>
                        </span>
                        <form class="review-form" role="form">
                            <label for="adType"><h4>Hodnocení uživatele: <b>${name} ${lastname}</b></h4></label>
                            <select class="form-control" id="adType" name="adType" required>
                                    <option value="">Vyber Inzerát</option>
                            </select>
                            <center>
                                <div class="rate">
                                    <input type="radio" id="star5" name="rate" value="5" />
                                    <label for="star5" title="text">5 stars</label>
                                    <input type="radio" id="star4" name="rate" value="4" />
                                    <label for="star4" title="text">4 stars</label>
                                    <input type="radio" id="star3" name="rate" value="3" />
                                    <label for="star3" title="text">3 stars</label>
                                    <input type="radio" id="star2" name="rate" value="2" />
                                    <label for="star2" title="text">2 stars</label>
                                    <input type="radio" id="star1" name="rate" value="1" />
                                    <label for="star1" title="text">1 star</label>
                                </div>    
                            </center>       
                            <div class="form-group" id="spacing">
                                <label for="descrAd">Recenze</label>
                                <textarea class="form-control" id="descrAd" rows="6" name="descrAd" placeholder="Zadej zkušenosti s daným uživatelem" maxlength="2000" required></textarea>
                            </div>
                            <center>
                                <div id="spacing">
                                    <button type="submit" id="evaluteSubmit" name ="evaluteSubmit" class="btn btn-primary">Ohodnotit uživatele</button>
                                </div>
                            </center>
                            <input type="hidden" name="evalUser" value="${getCookie("id")}" />
                            <input type="hidden" name="review" value="review" />
                        </form>
                        <span id="block-content"></span>
                    </div>
                </div>
            </div>
        </div>`

        document.getElementById('evaluteSubmit').addEventListener('click', (e)=>{
            e.preventDefault()
            evaluateSubmit()
        })
        const adType = document.getElementById('adType')
        var soldString = `<div id="gridSold">`
        var unsoldString = `<div id="gridUnsold">`
        var hiddenOrSeen // Empty line, that i may or may not put to innerHTML, once its finished
        // Remove appended child, if user is changing options a lot, but do not remove "Vyber inzerát"
        /*while (adType.firstChild && adType.childElementCount > 1) {
            adType.removeChild(adType.lastChild);
        }*/
        for(var i = 0; i < data.length; i++){
            // Because of length, i want cards to have same height
            if(data[i].nadpis.length > 30) hiddenOrSeen = `"display: none;"`
            else hiddenOrSeen = `"display: block;"`
            // Show sold cards in sold section
            if(data[i].prodano == 1){
                soldString +=
                `<div class="gridBackground">
                    <a href="viewAd.html?id=${data[i].id_inzeratu}">
                        <div><img style="width: 250px; height:150px;" src='${data[i].hlavni_fotografie}'></div>
                        <div id="bold">${data[i].nadpis}</div>
                        <div style=${hiddenOrSeen}><br /></div>
                        <div id="gridInfo">
                            <div id="money">${data[i].cena} Kč</div>
                            <div id="place">${data[i].mesto}</div>
                        </div>
                    </a>
                </div>`
                if(data[i].ohodnoceno == 0){
                    var opt = document.createElement("option")
                    opt.value = data[i].id_inzeratu
                    opt.innerHTML = data[i].nadpis
                    adType.appendChild(opt)
                }
            // Show sold cards in unsold section
            }else if(data[i].prodano == 0){
                unsoldString +=
                `<div class="gridBackground">
                    <a href="viewAd.html?id=${data[i].id_inzeratu}">
                        <div><img style="width: 250px; height:150px;" src='${data[i].hlavni_fotografie}'></div>
                        <div id="bold">${data[i].nadpis}</div>
                        <div style=${hiddenOrSeen}><br /></div>
                        <div id="gridInfo">
                            <div id="money">${data[i].cena} Kč</div>
                            <div id="place">${data[i].mesto}</div>
                        </div>
                    </a>
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
 * Evaluate an user
 */
function evaluateSubmit()
{
    const evaluateForm = document.querySelector('.review-form')
    const modal = document.getElementById("modal2")
    fetch('../controller/controller.php', {
        method:'POST',
        body:new FormData(evaluateForm)
    })
    .then(res=>res.json())
    .then(data=>{
        console.log("dostal jsem se sem?")
        modal.style.display='none'        
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
    // TODO "refresh" select options
    //showUserInfo(userID, name, lastname)
    /*while (adType.firstChild && adType.childElementCount > 1) {
        adType.removeChild(adType.lastChild);
    }*/
})

/**
 * @author Petr Kolarik
 * Function to show popup window to evaluate user (if user is signed in, and if that user isn´t same person)
 */
function evaluateUser(userID)
{
    if(getCookie("id") != "") {
        if(userID == getCookie("id")) return;
    } else return;
    console.log("cauko")
    const modal = document.getElementById("modal2");
    modal.style.display = "block";
}

/**
 * @author Petr Kolarik
 * Close reviews after click cross
 */
function closeReviews()
{
    const modal = document.getElementById("modal");
    modal.style.display = "none";
}

/**
 * @author Petr Kolarik
 * Close reviews after click cross
 */
 function closeReviews2()
 {
     const modal = document.getElementById("modal2");
     modal.style.display = "none";
 }

/**
 * @author Petr Kolarik
 * Close reviews after clicking outside
 */
window.onclick = function(event) {
    const modal = document.getElementById("modal");
    const modal2 = document.getElementById("modal2")
    if (event.target == modal) {
        modal.style.display = "none";
    } else if (event.target == modal2) {
        modal2.style.display = "none";
    }

  }

  /**
 * @author Petr Kolarik
 * // !!!!! Review section !!!!!! \\
 */

// Function to show modal with user reviews
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
            for (let i = 0; i < review.pocet_hvezd; i++) {
                var star = document.createElement("span");
                star.setAttribute("class", "fa fa-star fa-1x full");
                td_pocet_hvezd.appendChild(star);
            }
            for (let i = 0; i < (5 - review.pocet_hvezd); i++) {
                var star = document.createElement("span");
                star.setAttribute("class", "fa fa-star fa-1x");
                td_pocet_hvezd.appendChild(star);
            }
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