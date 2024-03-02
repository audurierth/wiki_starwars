import JsonStore from './json-store.js';

const websiteInfosStore = {

    store: new JsonStore('./models/websiteinfos.json', { info: {} }),
    collection: 'infos',

    /*
    Method to get all dynamic text from the websiteinfos json file.
     */
    getWebInfos() {
        return this.store.findAll(this.collection);
    },

};

/*
Export to use in controllers
 */
export default websiteInfosStore;