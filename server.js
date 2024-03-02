'use strict';

import express from 'express';
import routes from './routes.js';
import logger from "./utils/logger.js";
import { create } from 'express-handlebars';



const app = express();
const port = 3000;
const handlebars = create({
    extname: '.hbs',
    /**
     ────────────────────────────────────────────────────────────
     Handlebars helpers: here, we need a helper to compare if a character is on the dark side or in the light side.
         Thus, we can change the color depending on the character's side.
     ────────────────────────────────────────────────────────────
     **/
    helpers: {
        ifCond: function (v1, operator, v2, options) {

            switch (operator) {
                case '==':
                    return (v1 == v2) ? options.fn(this) : options.inverse(this);
                case '===':
                    return (v1 === v2) ? options.fn(this) : options.inverse(this);
                case '!=':
                    return (v1 != v2) ? options.fn(this) : options.inverse(this);
                case '!==':
                    return (v1 !== v2) ? options.fn(this) : options.inverse(this);
                case '<':
                    return (v1 < v2) ? options.fn(this) : options.inverse(this);
                case '<=':
                    return (v1 <= v2) ? options.fn(this) : options.inverse(this);
                case '>':
                    return (v1 > v2) ? options.fn(this) : options.inverse(this);
                case '>=':
                    return (v1 >= v2) ? options.fn(this) : options.inverse(this);
                case '&&':
                    return (v1 && v2) ? options.fn(this) : options.inverse(this);
                case '||':
                    return (v1 || v2) ? options.fn(this) : options.inverse(this);
                default:
                    return options.inverse(this);
            }
        }
    }
});

/*
Tell express to use custom CSS file.
 */
app.use(express.static("public"));


app.engine(".hbs", handlebars.engine);
app.set("view engine", ".hbs");

app.use("/", routes);


app.listen(port, () =>logger.info("SWTOR Wiki is listening on the port " + port));