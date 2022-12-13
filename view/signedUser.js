/**********************************************************/
/*                                                        */
/* File: signedUser.js                                    */
/* Authors: Martin Balaz <xbalaz15@stud.fit.vutbr.cz>     */
/* Project: Project for the course ITU - OnlineBazar      */
/* Description: View file with scripts for navigation bar */
/*              for unsigned/signed users                 */
/*                                                        */
/**********************************************************/

const loginSubmit = document.getElementById('login-submit')
const loginForm = document.querySelector('.login-form')
const login = document.querySelector('.login')
const logout = document.querySelector('.logout')
const logoutSubmit = document.getElementById('logout-submit')
const profile = document.querySelector('.profile')
const profileSubmit = document.getElementById('profile-submit')
const addAdSubmit = document.getElementById('addAd')

// POST method, login 
loginSubmit.addEventListener('click', (e)=>{
    e.preventDefault()
    const formData = new FormData(loginForm)
    fetch('../controller/controller.php', {
        method:'POST',
        body:formData
    })
    .then(res=>res.json())
    .then(data=>{
        if(data.id_uzivatele > 0) {
            setCookie("id", data.id_uzivatele, 30)
            login.style.display="none"
            logout.style.display="block"
            profile.style.display="block"
        } else {
            alert("Špatný email nebo heslo")
        }
    })
})

// Expire cookie on purpose
logoutSubmit.addEventListener('click', (e)=>{
    e.preventDefault()
    // Make cookie already expired one using -5
    setCookie("id", getCookie("id"), -5)
    login.style.display="block"
    logout.style.display="none"
    profile.style.display="none"
    // Wherever you are, after clicking logout, you will go to index.html
    var path = window.location.pathname;
    var page = path.split("/").pop();
    if(page != "index.html"){
        location.href = "index.html"
    }
})

// Relocate to addAd page
addAdSubmit.addEventListener('click', (e) =>{
    e.preventDefault()
    if(getCookie("id") > 0) {
        location.href = "addAdvertisement.html"
    }
    else alert("Vytvořit inzerát lze až po přihlášení")
})

// Relocate to profile page
profileSubmit.addEventListener('click', (e)=>{
    e.preventDefault()
    if(getCookie("id") > 0) {
        location.href = "profile.html"
    }
    else alert("Vytvořit inzerát lze až po přihlášení")
})