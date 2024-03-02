'use strict';
/*
CONTROLLER: handle the link between view and models.
 */
import charactersStore from "../models/characters-store.js";

const characterSingleInfo = {
    /*
    Create a view with data inside.
     */
    createView(request, response) {
        const charId = request.params.id;
        const viewData = {
            title: 'Exploring an holocron...',
            singleChar: charactersStore.getSingleChar(charId)

        };
        response.render('characters', viewData);
    },
};

/*
Export to use in routes.js
 */
export default characterSingleInfo;