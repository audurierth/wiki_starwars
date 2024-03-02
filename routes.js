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


/**
────────────────────────────────────────────────────────────
Send a view when a user request access to a path.
────────────────────────────────────────────────────────────
 **/
router.get('/', start.createView);
router.get('/wiki', wiki.createView);
router.get('/about', about.createView);
router.get('/holocron/:id', characterSingleInfo.createView)
router.get('/swtor', swtor.createView)

export default router;