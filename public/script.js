//Get all buttons from the menu to apply a hover effect for each of them.
const menuButtons = document.querySelectorAll('.saberHover');

/*
────────────────────────────────────────────────────────────
To make a hover effect, I used an image. By default, this image is always shown at size 0.
This allows us to not recreate an image each time the user hover a menu button.
────────────────────────────────────────────────────────────
 */
const img = document.createElement("img");
img.src = "../assets/saber_selected.webp";
img.style.position = "absolute";
img.style.width="0";
img.style.height="0";
img.style.opacity="0.7";
img.style.zIndex="-1";
//We add the image to the body of the page.
document.body.appendChild(img);

/*
────────────────────────────────────────────────────────────
Function created to redirect the user to the selected character's information.
This function will be call everytime a "see more" image button is pressed
────────────────────────────────────────────────────────────
 */
function loadChar(id){
    window.location.href = "/holocron/" + id;
}

/*
────────────────────────────────────────────────────────────
Function to show the image hover effect
────────────────────────────────────────────────────────────
 */
function showSaberToButton(evt){
    img.style.left = evt.target.offsetLeft-50;
    img.style.top = evt.target.offsetTop;
    img.style.width="10%";
    img.style.height="3%";
}

/*
────────────────────────────────────────────────────────────
Function to hide the image hover effect.
────────────────────────────────────────────────────────────
 */
function removeSaberToButton(){
    img.style.width="0%";
    img.style.height="0%";
}

/*
────────────────────────────────────────────────────────────
For each menu button, we apply a hover listener.
────────────────────────────────────────────────────────────
 */
menuButtons.forEach(button => {
    button.addEventListener('mouseenter', showSaberToButton)
    button.addEventListener('mouseout', removeSaberToButton)
});