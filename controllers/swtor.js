'use strict';

/*
CONTROLLER: handle the link between view and models.
 */
const swtor = {

    /*
    Create a view with the name of the page inside the data.
     */
    createView(request, response) {
        const viewData = {
            title: "Exploring the galaxy",
        };

        response.render('swtor', viewData);
    },
};

/*
Export to use in routes.js
 */
export default swtor;