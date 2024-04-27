'use strict';
import websiteInfosStore from "../models/websiteinfos-store.js";
import charactersStore from "../models/characters-store.js";
import logger from "../utils/logger.js";
import accounts from "./accounts.js";
import about from "./about.js"

/*
CONTROLLER: handle the link between view and models.
 */
const start = {
    /*
    Create a view with data inside.
     */
    createView(request, response) {
        const loggedInUser = accounts.getCurrentUser(request);
        if(loggedInUser){
            let viewData = {
                title: "Exploring the galaxy...",
                info: websiteInfosStore.getWebInfos(),
                nbrDarkPeople: 0,
                nbrLightPeople: 0,
                lowestBiography: "None",
                largestBiography: "None",
                averageBiography: 0,
                fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
                picture: loggedInUser.picture
            };

            const charactersList = charactersStore.getAllCharacters()
            about.statsFromCollection(charactersList, viewData)

            response.render('start', viewData);
        }else{
            response.redirect('/')
        }

    },
};

/*
Export to use in routes.js
 */
export default start;