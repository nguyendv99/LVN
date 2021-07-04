const sql = require('./db.js')

const Favorite = function (Favorite) {
    this.UserId = Favorite.UserId;
    this.CoursesId = Favorite.CoursesId;
}

Favorite.getOfUser = (UserId, result) => {
    sql.query(` SELECT favorites.FavoriteId, user.UserId, user.Username, courses.CoursesId, courses.CoursesTitle
                FROM
                favorites 
                INNER JOIN user ON favorites.UserId = user.UserId
                INNER JOIN courses ON favorites.CoursesId = courses.CoursesId
                WHERE user.UserId = ${UserId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        result(null, res);
        return;
    });
};

Favorite.checkSave = (UserId, CoursesId, result) => {
    sql.query("SELECT * FROM Favorites WHERE UserId = ? AND CoursesId = ?", [UserId, CoursesId], (err, res) =>{
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("Favorite: ", res);
        if(res.length > 0){
            result(null, true);
        } else {
            result(null, false);
        }
        
    })
}

Favorite.add = (newFavorite, result) => {
    sql.query("INSERT INTO Favorites SET ?", newFavorite, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created Favorites: ", { FavoriteId: res.insertId, ...newFavorite });
        result(null, { FavoriteId: res.insertId, ...newFavorite });
    });
};


Favorite.delete = (UserId, CoursesId, result) => {
    sql.query("DELETE FROM Favorites WHERE UserId = ? AND CoursesId = ?", [UserId, CoursesId], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found Favorite with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted Favorite");
        result(null, res);
    });
};

module.exports = Favorite;