const router = require('express').Router()

const User =  require('../model/User')

const bcrypt = require('bcryptjs');

router.post('/', async (req,res)=>{
    
    const emailExit = await User.findOne({
        email: req.body.email
    })

    if (emailExit) return res.status(201).json({
        phone : emailExit.mobile.replace(/(\+?\d{4})(\d+)(\d{2})/g, function(match, start, middle, end) {
            return start + "*".repeat(middle.length) + end;
          }),
          currentmobile : emailExit.mobile
    })
    res.json({
        error : "Email not found"
    })
    
})

router.post('/rest',async(req,res)=>{
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    const mobile = await User.findOne({
        mobile : req.body.mobile
    })
    if(req.body.password.length<6) return res.json({
        error : "Password must be 6 character"
    })
    if(mobile){
        User.findOneAndUpdate({
            mobile : req.body.mobile
        },{
            password  :hashPassword
        }).then(result=>{
            res.status(200).json({
                "success" : "true"
            })
        })
    }
})


module.exports = router