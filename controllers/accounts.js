'use strict';

import logger from '../utils/logger.js';
import userStore from '../models/user-store.js';
import {v4 as uuidv4} from 'uuid';
import {createHash} from 'node:crypto'
import {validate} from "isemail";


const encrypt = (password) => {
    logger.info("Test encryption")
    return createHash('sha256').update(password).digest('hex')
}

const comparePassword = (password, hashedPassword) => {
    const encryptAttemptPassword = encrypt(password)
    const result = encryptAttemptPassword === hashedPassword
    logger.info(result)
    return result
}



function authentification(body, response){
    logger.info("Authentification function called.")
    const user = userStore.getUserByEmail(body.email);
    if (user && (comparePassword(body.password, user.password))) {
        response.cookie('oldempire', user.email);
        logger.info('logging in' + user.email);
        response.redirect('/start');
    } else {
        response.redirect('/login?e=Invalid user or password.');
    }
}

//create an accounts object
const accounts = {

    //index function to render index page
    index(request, response) {
        const viewData = {
            title: 'Login or Signup',
        };
        response.render('index', viewData);
    },

    //login function to render login page
    login(request, response) {
        const viewData = {
            title: 'Login to the Service',
        };
        response.render('login', viewData);
    },

    //logout function to render logout page
    logout(request, response) {
        response.cookie('oldempire', '');
        response.redirect('/');
    },

    //signup function to render signup page
    signup(request, response) {
        const viewData = {
            title: 'Login to the Service',
        };
        response.render('signup', viewData);
    },

    //register function to render the registration page for adding a new user
    register(request, response) {
        const user = request.body;

        /*
        SAFETY VERIFICATIONS.
         */
        let reason = "Please select a valid "
        logger.info(userStore.getUserByEmail(user.email))
        if(!validate(user.email)) { //Valid email?
            reason += "email"
        } else if(request.files.picture == null){
            reason += "picture."
        } else if(userStore.getUserByEmail(user.email) != null){ //User already existing ?
            reason = "The user already exist."
        } else if(user.firstName == null || user.lastName == null ){ //User forgot to specify a name
            reason += "name."

        } else { //All tests passed.

            const newBody = {
                firstName: user.firstName,
                lastName: user.lastName,
                id: uuidv4(),
                email: user.email,
                password: encrypt(user.password),
                picture: request.files.picture,
            };
            logger.info('registering ' + user.email);
            userStore.addUser(newBody, function(user) {
                const isRegistered = userStore.getUserByEmail(user.email) != null;
                if (isRegistered) {
                    response.cookie('oldempire', user.email);
                    response.redirect('/start');
                } else {
                    response.redirect('/login');
                }
            });
            return

        }
        //There is an error so we redirect.
        response.redirect('../signup/?e='+reason)

    },

    //authenticate function to check user credentials and either render the login page again or the start page.
    authenticate(request, response) {
        authentification(request.body,response);
    },

    //utility function getCurrentUser to check who is currently logged in
    getCurrentUser (request) {
        const userEmail = request.cookies.oldempire;
        return userStore.getUserByEmail(userEmail);
    }
}

export default accounts;