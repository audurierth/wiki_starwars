'use strict';
/*
CONTROLLER: handle the link between view and models.
 */
import charactersStore from "../models/characters-store.js";
import { v4 as uuidv4 } from 'uuid';
import swal from 'sweetalert';
import accounts from "./accounts.js";
import logger from "../utils/logger.js";

const lightsabers_colors = [
    "blue",
    "green",
    "red",
    "white",
    "purple",
    "orange"
]

const characterSingleInfo = {
    /*
    Create a view with data inside.
     */
    createView(request, response) {
        const charId = request.params.id;
        const loggedInUser = accounts.getCurrentUser(request);
        if(loggedInUser){
            const viewData = {
                title: 'Exploring an holocron...',
                singleChar: charactersStore.getSingleChar(charId),
                fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
                picture: loggedInUser.picture,
                updateChar: false
            };
            response.render('characters', viewData);
        }else{
            response.redirect('/')
        }
    },

    addCharacter(request, response) {
        const loggedInUser = accounts.getCurrentUser(request);
        if(loggedInUser){
            const history = {
                "Rise of Cartell": request.body.history1,
                "Shadow of Revan": request.body.history2,
                "Fallen Empire": request.body.history3,
                "Eternal Throne": request.body.history4
            }
            const name = request.body.name;
            const planet = request.body.planet;
            const biography = request.body.biography;
            const lightsaber = request.body.lightsaber;
            const side = request.body.side;
            const picture = request.files.picture
            const newChar = {
                id: uuidv4(),
                userid: loggedInUser.id,
                name: name,
                main_planet: planet,
                biography: biography,
                lightsaber_color: lightsaber,
                side: side,
                history: history,
                picture: picture
            };

            /*
            SAFETY VERIFICATIONS.
             */
            let reason = "Please select a valid "
            if(side  !== "dark" && side !== "light" ){
                reason += "side."
            } else if (!lightsabers_colors.includes(lightsaber)){
                reason += "lightsaber color."

            } else if (name && name.length > 0
                && planet && planet.length > 0
                && biography && biography.length > 0
                && lightsaber && lightsaber.length > 0
                && side && side.length > 0
                && history && history.length > 0)
            {
                reason = "Please write valid information."
            } else {
                charactersStore.addChar(newChar, function(){
                        response.redirect('/holocron/' + newChar.id);
                    }
                );
                return;
            }

            /*
            Redirect if errors.
             */
            response.redirect('../wiki/?e='+reason)
        } else {
            response.redirect('/')
        }
    },

    deleteChar(request, response) {
        const charId = request.params.charid;
        const loggedInUser = accounts.getCurrentUser(request);
        const requestedChar = charactersStore.getSingleChar(charId)
        if(loggedInUser.id === requestedChar.userid){
            logger.info(`Deleting Char ${charId}`);
            charactersStore.removeChar(charId)
            response.redirect('/wiki/?s=The character has been successfully removed.');
        } else {
            response.redirect('/wiki/?e=You do not have the permission to delete this character.');
        }
    },
    drawUpdateChar(request, response){
        const charId = request.params.id;
        const loggedInUser = accounts.getCurrentUser(request);
        if(loggedInUser){
            const viewData = {
                title: 'Exploring an holocron...',
                singleChar: charactersStore.getSingleChar(charId),
                fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
                picture: loggedInUser.picture,
                updateChar: true
            };
            response.render('characters', viewData);
        }else{
            response.redirect('/')
        }
    },
    updateChar(request, response){
        const charId = request.params.id;
        const loggedInUser = accounts.getCurrentUser(request);
        const requestedChar = charactersStore.getSingleChar(charId)
        if(requestedChar == null){ //Check if existing.
            response.redirect('/wiki?e=The character is not existing.')
        } else if(loggedInUser.id !== requestedChar.userid) { //Check if the user can see.
            response.redirect('/wiki?e=You do not have the permission.')
        } else if (!lightsabers_colors.includes(request.body.lightsaber)) {
            response.redirect(`/holocron/update/${charId}?e=The lightsaber color is not correct.`)
        } else if (request.body.name && request.body.name.length > 0
            && request.body.planet && request.body.planet.length > 0
            && request.body.biography && request.body.biography.length > 0
            && request.body.lightsaber && request.body.lightsaber.length > 0
            && request.body.side && request.body.side.length > 0
            && request.body["Rise of Cartell"] && request.body["Rise of Cartell"].length > 0
            && request.body["Shadow of Revan"] && request.body["Shadow of Revan"].length > 0
            && request.body["Fallen Empire"] && request.body["Fallen Empire"].length > 0
            && request.body["Eternal Throne"] && request.body["Eternal Throne"].length > 0){

            const history = {
                "Rise of Cartell": request.body["Rise of Cartell"],
                "Shadow of Revan": request.body["Shadow of Revan"],
                "Fallen Empire": request.body["Fallen Empire"],
                "Eternal Throne": request.body["Eternal Throne"]
            }
            const infosToUpdate = {
                id: requestedChar.id,
                userid: loggedInUser.id,
                name: request.body.name,
                main_planet: request.body.planet,
                biography: request.body.biography,
                lightsaber_color: request.body.lightsaber,
                side: request.body.side,
                history : history,
                picture: requestedChar.picture
            }
            charactersStore.editChar(charId, infosToUpdate, function (){
                response.redirect(`/holocron/${charId}?s=All the information about the character has been updated.`)
            })

        } else {
            logger.info(request.body)
            response.redirect(`/holocron/update/${charId}?e=The information are not correct.`)
        }
    }
};

/*
Export to use in routes.js
 */
export default characterSingleInfo;