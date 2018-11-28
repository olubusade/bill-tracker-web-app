module.exports = {
    getHomePage: (req, res) => {
        let query = "SELECT * FROM `bills` ORDER BY id ASC"; // query database to get all the bills

        // execute query
        db.query(query, (err, result) => {
            if (err) {
                res.redirect('/');
            }
            res.render('index.ejs', {
                title: "Welcome to Bill Tracker | View Bills"
                , bills: result
            });
        });
    },
};