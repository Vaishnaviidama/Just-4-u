const express = require("express");
const path = require("path");
const app = express();

require("./db/conn");
const Register = require("./models/registers");

const port = process.env.PORT || 3000;

const static_path = path.join(__dirname, "../public");


app.use(express.json())
app.use(express.urlencoded({extended:false}));
app.use(express.static(static_path));
console.log()

app.get("/", (req, res) => {
    res.render("index")
});

app.get("/register", (req, res) => {
    res.render("register")
});

//create a new user in our db
app.post("/register", async (req, res) => {
    try {
    
        const password = req.body.password;
        const cpassword = req.body.confirmPassword;

        if(password === cpassword ){
            const registerUser = new Register({
                usn : req.body.usn,
                password : password,
                confirmPassword : cpassword

            })
           const registered = await registerUser.save();
           res.status(201).render(index);

        }else{
            res.send("passwords are not matching")
        }
    } 
    catch (error){
        res.status(400).send(error);
    }
});



app.listen(port, () =>{
    console.log(`server is running at port no ${port}`);
})
