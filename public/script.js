//Get all buttons from the menu to apply a hover effect for each of them.
const menuButtons = document.querySelectorAll('.saberHover');
const fieldset = document.querySelector('#fieldset__side');
const radioButtons = document.querySelectorAll('.radio__side')
const selectSaberColor = document.querySelector('#lightsaber_select')
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
Function to change the fieldset border color when selected side.
────────────────────────────────────────────────────────────
 */
function changeFieldSetColor(evt){
    if(evt.target.value === "dark"){
        fieldset.style.border= "solid var(--dark_color)";
    }else{
        fieldset.style.border= "solid var(--light_color)";
    }
}

/*
────────────────────────────────────────────────────────────
Function to change the color of a target depending on its value.
────────────────────────────────────────────────────────────
 */
const arrayColors = {
    "":"grey",
    "blue":"#2a84ea",
    "green":"#2bc05a",
    "white":"#ffffff",
    "purple":"#7526cc",
    "red":"#c0392b",
    "orange":"#ee5643"
}
function changeTextColor(evt){
    evt.target.style.color = arrayColors[evt.target.value];
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

radioButtons.forEach(button => {
    button.addEventListener('change', changeFieldSetColor)
})

if(selectSaberColor){
    selectSaberColor.addEventListener('change', changeTextColor)
}

function t(){
    swal("Good job!", "You clicked the button!", "success");
}


//swal('Error 666 !','"+reason+"','error');
function findParameters(){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    const errorDesc = urlParams.get('e')
    const successDesc = urlParams.get('s')

    if(errorDesc){
        Swal.fire({
            title: "Error 666 !",
            text: errorDesc,
            icon: "error"
        });
    }else if(successDesc){
        Swal.fire({
            title: '"Chance have you" -Yoda',
            text: successDesc,
            icon: "success"
        });

    }

}
findParameters();