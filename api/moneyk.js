const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();
const { authenticateToken } = require("../middleware/auth.js");
const { createUser, getUser, profile, addWallet,walletS, transfer, transfersHistory } = require("../database/queries/user.js");

// ===========
// create user
// ===========
router.post("/register", async (req, res) => {
    try {
        const { fullname, username, email } = req.body;
        console.log(fullname, username, email);

        // validate request body
        if (!(fullname && username && email)) {
            return res.status(400).send({ message: "Insufficient data" });
        }

        // check if username exist
        const username_already_exist = await getUser(username);
        if (username_already_exist) {
            return res.status(400).send({ message: "Username already exists" });
        }

        // create user
        const result = await createUser(fullname, username, email);
        // console.log(result)
        res.status(201).json(result);
    } catch (error) {
        return res.status(500).send(error);
    }
});

// =============
// sign-in user
// =============
router.post("/login", async (req, res) => {
    try {
        const { username } = req.body;

        // validate request body
        if (!username) {
            res.status(400).send({ message: "Username not provided" });
        }

        // check if user exist
        const user = await getUser(username);

        if (!user) {
            res.status(400).send({ message: "User not found" });
        }
        // generate token
        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET || "secret", { expiresIn: "2h" });
        res.status(200).send({ accessToken });
    } catch (error) {
        return res.status(500).send(error);
    }
});

//-------------//
//user profile //
//-------------//
router.get("/login", authenticateToken, async (req, res) => {
    try {
        const { username } = req.body;

        // validate request body
        if (!username) {
            res.status(400).send({ message: "Username not provided" });
        }

        const result = await profile(username);
        res.json(result);

    } catch (error) {
        return res.status(500).send(error);
    }

})

//--------------//
//adding wallet //
//--------------//

router.post('/addwallet', authenticateToken, async (req, res) => {
    const { username, name, balance, currency } = req.body;

    // validate request body
    if (!(username && name && balance && currency)) {
        return res.status(400).send({ message: "Insufficient data" });
    }
    const cardnumber=Math.floor(Math.random()*1E16);

    const wallet = await addWallet(name, balance, currency, cardnumber);
    res.status(201).json(wallet);

})

//--------------------//
//get list of wallets //
//--------------------//

router.post('/wallets', authenticateToken, async (req, res) => {
    
    const { cardnumber } = req.body;

    const wallet = await walletS(cardnumber);
    res.status(201).json(wallet);

})

//------------------//
//transferring
//------------------//

router.post('/transfer', authenticateToken, async (req, res) => {
    const { sender, reciever, amount } = req.body;

    const trans= await transfer(sender, reciever, amount);
    res.status(201).json(trans);

})


//---------------------//
// history of transfers//
//---------------------//

router.get('/transfer', authenticateToken, async (req, res) => {
    const { cardnumber } = req.body;

    const trans= await transfersHistory(cardnumber);
    res.status(201).json(trans);

})




module.exports = { router };
