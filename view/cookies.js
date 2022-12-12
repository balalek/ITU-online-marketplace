/**********************************************************/
/*                                                        */
/* File: cookies.js                                       */
/* Authors: Martin Balaz <xbalaz15@stud.fit.vutbr.cz>     */
/* From: https://www.w3schools.com/js/js_cookies.asp      */
/* Project: Project for the course ITU - OnlineBazar      */
/* Description: View file with functions for manipulation */
/*              with cookies                              */
/*                                                        */
/**********************************************************/

/**
 * Function for Setting a cookie
 * @param {String} cname name of cookie 
 * @param {Int} cvalue cookie value
 * @param {Int} exdays how many days it takes for cookie to expire
 */
function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

/**
 * Function for Getting a cookie
 * @param {String} cname 
 * @returns id_uzivatele or an empty string
 */
function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}
  
/**
 * Function for Checking if cookie exist
 */
function checkCookie() {
    let user = getCookie("id");
    if (user != "") {
        login.style.display="none"
        logout.style.display="block"
        profile.style.display="block"
    } else {
        if (user != "" && user != null) {
            setCookie("id", user, 30);
        }
    }
}