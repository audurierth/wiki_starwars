'use strict';

/*
CONTROLLER: handle the link between view and models.
 */
import accounts from "./accounts.js";

const swtor = {

    /*
    Create a view with the name of the page inside the data.
     */
    createView(request, response) {
        const loggedInUser = accounts.getCurrentUser(request);
        if(loggedInUser){
            const viewData = {
                title: "Exploring the galaxy",
                fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
                picture: loggedInUser.picture
            };
            response.render('swtor', viewData);
        } else {
            response.redirect('/')
        }

    },
};

/*
Export to use in routes.js
 */
export default swtor;