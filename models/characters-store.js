'use strict';

import JsonStore from "./json-store.js";

/*
MODELS: handle the data.
 */

/*
https://chat.openai.com/share/f6ccbdd4-5089-4754-8567-71b601a30ab8

JSON structure for a collection of characters lists.

Each character contains:
  - id: the id
  - name: name of the character
  - main_planet: the player where the character mainly live
  - biography: the biography of the character
  - history: a collection of history done by the SWTOR extensions
    - rise_cartell: the history of the character in the Rise of the Hutt Cartel extension
    - shadow_revan: the history of the character in the Shadow of Revan extension
    - fallen_empire: the history of the character in the Knights of the Fallen Empire extension
    - eternal_throne: the history of the character in the Knights of the Eternal Throne extension
  - image_credits: The alt text for the character's image.
  - lightsaber_color: the color of his labersaber.
  - side: His side
*/

import cloudinary from 'cloudinary';

import { createRequire } from "module";
import logger from "../utils/logger.js";
const require = createRequire(import.meta.url);

try {
    const env = require("../.data/.env.json");
    cloudinary.config(env.cloudinary);
}
catch(e) {
    logger.info('You must provide a Cloudinary credentials file - see README.md');
    process.exit(1);
}

const charactersStore = {

    store: new JsonStore('./models/characters.json', { charactersCollection: [] }),
    collection: 'characters',
    array: 'history',

    /*
    Method to return the characters array from the json file.
     */
    getAllCharacters() {
        return this.store.findAll(this.collection);
    },
    getUserCharacters(userid){
        return this.store.findBy(this.collection, (character => character.userid === userid));

    },

    /*
    Method to a specified character from the json file.
     */
    getSingleChar(id) {
        return this.store.findOneBy(this.collection, (character => character.id === id));
    },
    async addChar(infos, response) {
        if(infos.picture != null){
            function uploader(){
                return new Promise(function(resolve, _) {
                    cloudinary.uploader.upload(infos.picture.tempFilePath,function(result,err){
                        if(err){console.log(err);}
                        resolve(result);
                    });
                });
            }
            let result = await uploader();
            logger.info('cloudinary result', result);
            infos.picture = result.url;

            this.store.addCollection(this.collection, infos);
            response();
        } else {
            this.store.addCollection(this.collection, infos);
        }

    },

    removeChar(id) {
        const char = this.getSingleChar(id);
        this.store.removeCollection(this.collection, char);
    },

    editChar(id, updatedInfos, response) {
        this.store.editCollection(this.collection, id, updatedInfos).then(_ => response());
    }

};

/*
Export to use in controllers
 */
export default charactersStore;