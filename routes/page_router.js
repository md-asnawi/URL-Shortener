const express = require('express');
const router = express.Router();
const sql = require('sql-query');
const connectDB = require('../config/db');

router.get('/:urlCode/', async (req, res) => {
    const urlCode = req.params.urlCode;
    console.log("urlcode: " + urlCode);

    let sqlQuery = sql.Query()
                        .select()
                        .from('url')
                        .where({ url_code: urlCode })
                        .build();
    let con = connectDB();
    con.query(sqlQuery, function(error, result) {
        if (error) {
            console.log(error);
            res.status(500).json("Server Error");
        }
        else {
            if (result.length > 0) {
                console.log("Query using URL Code Successful");
                console.log(result);
                
                return res.redirect(result[0]["long_url"]);
            }
            else {
                console.log("Query went through URL Code does not exist");
                res.status(404).json("URL Code not found");
            }
        }
    })
})

module.exports = router;