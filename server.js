require("dotenv").config();
const app = require("./app");
const { db } = require("./database/config");
const initModel = require('./models/initModels');

db.authenticate()
    .then(() => console.log("Database Authenticated 🍖🥘🥓"))
    .catch((err) => console.log(err));

initModel();

db.sync()
    .then(() => console.log("Database Synced 🍗🥑"))
    .catch((err) => console.log(err));

const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`App runnig on pot ${port}... 🥠🍗🍖💍🥑🥩 `);
});
