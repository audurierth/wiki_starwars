'use strict';

/*
CONTROLLER: handle the link between view and models.
 */
import charactersStore from '../models/characters-store.js';

const wiki = {
    /*
    Create a view with data inside.
     */
    createView(request, response) {
        const viewData = {
            title: "Exploring the galaxy",
            characters: charactersStore.getAllCharacters()

        };

        response.render('wiki', viewData);
    },
};

/*
Export to use in routes.js
 */
export default wiki;