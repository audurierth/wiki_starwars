'use strict';

/*
CONTROLLER: handle the link between view and models.
 */
import charactersStore from '../models/characters-store.js';
import accounts from "./accounts.js";

const wiki = {
    /*
    Create a view with data inside.
     */
    createView(request, response) {
        const loggedInUser = accounts.getCurrentUser(request);
        if(loggedInUser){
            const viewData = {
                title: "Exploring the galaxy",
                characters: charactersStore.getUserCharacters(loggedInUser.id),
                fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
                picture: loggedInUser.picture
            };

            response.render('wiki', viewData);
        }else{
            response.redirect('/')
        }

    },
};

/*
Export to use in routes.js
 */
export default wiki;