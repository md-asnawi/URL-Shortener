const express = require('express');
const router = express.Router();
const config = require('config');

const validUrl = require('valid-url');
const { nanoid } = require('nanoid');
const sql = require('sql-query');
const connectDB = require('../config/db');

// GET endpoint to retrieve 1 URL record using long URL if record exists
router.get('/', async (req, res) => {
    const baseUrl = config.get('baseUrl'); 

    // Check base URL using validUrl
    if (!validUrl.isUri(baseUrl)) {
        res.status(401).json('Invalid Base URL');
    }

    // Retrieve from request query
    const longUrl = req.query.longUrl;
    console.log(longUrl);

    // Check long URL
    if (validUrl.isUri(longUrl)) {
        let sqlQuery = sql.Query()
                        .select()
                        .from('url')
                        .where({ long_url: longUrl })
                        .build();
        let con = await connectDB();
        con.query(sqlQuery, function(error, result) {
            if (error) {
                console.log(error);
                res.status(500).json("Server Error");
            }
            else {
                if (result.length > 0) {
                    console.log("Query using Long URL Successful");
                    console.log(result);
                    res.status(200).json(result[0]);
                }
                else {
                    console.log("Query went through But Long URL does not exist");
                    res.status(404).json({ "Message": "Long URL not found" });
                }
            }
        })
    }
    else {
        res.status(400).json("Invalid Long URL");
    }
})

// POST method is used to create new URL record
router.post('/', async (req, res) => {
    const baseUrl = config.get('baseUrl'); 
    const longUrl = req.body.longUrl; 
    console.log(longUrl);      

    // Check base URL using validUrl
    if (!validUrl.isUri(baseUrl)) {
        return res.status(401).json('Invalid Base URL');
    }

    // Generate URL Code using nanoid
    const urlCode = nanoid();
    const shortUrl = baseUrl + "/" + urlCode;

    // Check long URL
    if (validUrl.isUri(longUrl)) {
        let sqlInsert = sql.Query()
                        .insert()
                        .into('url')
                        .set({ 
                            url_code: urlCode, 
                            short_url: shortUrl,
                            long_url: longUrl
                        })
                        .build();
        let con = await connectDB();
        con.query(sqlInsert, function(error, result) {
            if (error) {
                console.log(error);
                res.status(500).json("Server Error");
            }
            else {
                if (Number(result.affectedRows) == 1) {
                    console.log(`New shortUrl ${shortUrl} created`);
                    res.status(201).json({ "shortUrl": shortUrl });  
                }
                else {
                    console.log('Query went through but no new URL created');
                    res.status(500).json("Server Error: No Rows Added");
                }
            }
        })
    }
    else {
        res.status(400).json("Invalid Long URL");
    }
})

module.exports = router;