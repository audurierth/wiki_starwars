'use strict';

/**
────────────────────────────────────────────────────────────
We use express to be able to use some common web-dev task that can't be supported by NodeJS.
A router will handle GET request and send a view to render.
────────────────────────────────────────────────────────────
**/
import express from 'express';
const router = express.Router();

/**
────────────────────────────────────────────────────────────
Controllers handle the link between view and models.
────────────────────────────────────────────────────────────**/
import start from './controllers/start.js';
import wiki from './controllers/wiki.js';
import about from './controllers/about.js';
import characterSingleInfo from './controllers/characters.js';
import swtor from './controllers/swtor.js';
import accounts from './controllers/accounts.js';
import characters from "./controllers/characters.js";



/**
────────────────────────────────────────────────────────────
Send a view when a user request access to a path.
────────────────────────────────────────────────────────────
 **/
router.get('/', accounts.index);
router.get('/login', accounts.login);
router.get('/signup', accounts.signup);
router.get('/logout', accounts.logout);
router.post('/register', accounts.register);
router.post('/authenticate', accounts.authenticate);
router.get('/wiki', wiki.createView);
router.get('/about', about.createView);
router.get('/holocron/:id', characterSingleInfo.createView)
router.get('/swtor', swtor.createView)
router.post('/wiki/addchar', characterSingleInfo.addCharacter);
router.get('/start', start.createView);
router.get('/wiki/deletechar/:charid', characters.deleteChar);
router.get('/holocron/update/:id', characterSingleInfo.drawUpdateChar)
router.post('/holocron/updatechar/:id', characterSingleInfo.updateChar)

export default router;