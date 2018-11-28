const fs = require('fs');

module.exports = {
    addBillPage: (req, res) => {
        res.render('add-bill.ejs', {
            title: "Welcome to Bill Tracker | Add a new bill"
            , message: ''
        });
    },
    addBill: (req, res) => {
        let message = '';
        let billname = req.body.billname;
        let username = req.body.username;
        let amount = req.body.amount;
        let category = req.body.category;
        let item = req.body.item;
        let saleconsultant = req.body.saleconsultant;
        let note = req.body.note;
        let occurs = req.body.occurs;
        let starttime = req.body.starttime;

        let usernameQuery = "SELECT * FROM `bills` WHERE username = '" + username + "'";

        db.query(usernameQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            if (result.length > 0) {
                message = 'Username already exists';
                res.render('add-bill.ejs', {
                    message,
                    title: "Welcome to Bill Tracker | Add a new bill"
                });
            } else {
                        // send the player's details to the database
                        let query = "INSERT INTO `bills` (billname, username, amount, category, item, salesconsultant, note, occurs, starttime) VALUES ('" +
                            billname + "', '" + username + "', '" + amount + "', '" + category + "', '" + item + "', '" + saleconsultant + "', '" + note + "', '" + occurs + "', '" + starttime + "')";
                        db.query(query, (err, result) => {
                            if (err) {
                                return res.status(500).send(err);
                            }
                            res.redirect('/');
                        });
                } 
                
        });
    },
    editBillPage: (req, res) => {
        let billId = req.params.id;
        let query = "SELECT * FROM `bills` WHERE billid = '" + billId + "' ";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.render('edit-bill.ejs', {
                title: "Edit Bill"
                , bill: result[0]
                , message: ''
            });
        });
    },
    editBill: (req, res) => {
        let message = '';
        let billname = req.body.billname;
        let username = req.body.username;
        let amount = req.body.amount;
        let category = req.body.category;
        let item = req.body.item;
        let saleconsultant = req.body.saleconsultant;
        let note = req.body.note;
        let occurs = req.body.occurs;
        let starttime = req.body.starttime;

        let query = "UPDATE `bills` SET `billname` = '" + billname + "', `username` = '" + username + "', `amount` = '" + amount + "', `category` = '" + category + "', `item` = '" + item + ", `saleconsultant` = '" + saleconsultant + "', `occurs` = '" + occurs + "', `starttime` = '" + starttime + "'' WHERE `bills`.`billid` = '" + billId + "'";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/');
        });
    },
    deleteBill: (req, res) => {
        let billId = req.params.id;
        let getImageQuery = 'SELECT image from `bills` WHERE billid = "' + billId + '"';
        let deleteUserQuery = 'DELETE FROM bills WHERE billid = "' + billId + '"';

        db.query(getImageQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }

            let image = result[0].image;

            fs.unlink(`public/assets/img/${image}`, (err) => {
                if (err) {
                    return res.status(500).send(err);
                }
                db.query(deleteUserQuery, (err, result) => {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    res.redirect('/');
                });
            });
        });
    }
};
