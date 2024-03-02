'use strict';
import websiteInfosStore from "../models/websiteinfos-store.js";

/*
CONTROLLER: handle the link between view and models.
 */
const start = {
    /*
    Create a view with data inside.
     */
    createView(request, response) {

        const viewData = {
            title: "Exploring the galaxy...",
            info: websiteInfosStore.getWebInfos()
        };

        response.render('start', viewData);
    },
};

/*
Export to use in routes.js
 */
export default start;