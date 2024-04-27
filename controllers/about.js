'use strict';
/*
CONTROLLER: handle the link between view and models.
 */
import websiteInfosStore from "../models/websiteinfos-store.js";
import accounts from "./accounts.js";
import charactersStore from "../models/characters-store.js";


const about = {

    statsFromCollection(charactersList, viewData){
        if(charactersList.length > 0 ){
            let smallestBioLen = charactersList[0].biography.length;
            let largestBioLen = smallestBioLen;
            viewData.lowestBiography = charactersList[0].name;
            viewData.largestBiography = charactersList[0].name;

            for(let item of charactersList){
                if (item.side === "dark"){
                    viewData.nbrDarkPeople++;
                } else {
                    viewData.nbrLightPeople++;
                }
                const itemBio =  item.biography.length;
                if(itemBio < smallestBioLen){
                    viewData.largestBiography = item.name;
                    largestBioLen = itemBio
                }
                if(itemBio > largestBioLen){
                    viewData.lowestBiography = item.name;
                    smallestBioLen = itemBio;
                }
                viewData.averageBiography = itemBio
            }
            viewData.averageBiography /= charactersList.length
        }
    },
    /*
    Create a view with data inside.
     */
    createView(request, response) {
        const loggedInUser = accounts.getCurrentUser(request);
        if (loggedInUser) {
            const viewData = {
                title: "Exploring information...",
                info: websiteInfosStore.getWebInfos(),
                fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
                picture: loggedInUser.picture,
                nbrDarkPeople: 0,
                nbrLightPeople: 0,
                lowestBiography: "None",
                largestBiography: "None",
                averageBiography: 0,
            };

            const charactersList = charactersStore.getUserCharacters(loggedInUser.id)
            about.statsFromCollection(charactersList, viewData)

            response.render('about', viewData);
        } else {
            response.redirect('/')
        }
    },
};

/*
Export to use in routes.js
 */
export default about;