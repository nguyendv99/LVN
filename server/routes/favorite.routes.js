module.exports = app => {
    const Favorites = require("../controllers/favorite.controller.js");

    app.get("/Favorites/:UserId", Favorites.getOfUser);
    app.post("/AddFavorites", Favorites.add);
    app.post("/DeleteFavorites", Favorites.delete);
    app.post("/CheckFavorites",Favorites.checkSave)

};