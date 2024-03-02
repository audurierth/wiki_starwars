'use strict';
/*
CONTROLLER: handle the link between view and models.
 */
import websiteInfosStore from "../models/websiteinfos-store.js";

const about = {
    /*
    Create a view with data inside.
     */
    createView(request, response) {
        const viewData = {
            title: "Exploring information...",
            info: websiteInfosStore.getWebInfos()
        };

        response.render('about', viewData);
    },
};

/*
Export to use in routes.js
 */
export default about;