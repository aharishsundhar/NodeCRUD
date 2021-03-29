const express = require('express');
const route = express.Router();
const User = require('../models/users')


// async and await to use and unique entry
// route.post('/login', async(req, res) => {
//     const { firstname, lastname } = req.body;
//     try {
//         let user = new User({
//             firstname,
//             lastname
//         });
//         const userName = await User.findOne({ firstname });
//         if (userName) {
//             return res.status(400).json({ errors: [{ msg: 'Username already exists' }] });
//         }

//         await user.save().then((err,result)=>{
//             return res.json(result);
//         });
        
//     } catch (error) {
//         console.error(error.message);
//         return res.status(500).send('server Error');
//     }
// });

//promise using post user
route.post('/login', (req, res) => {
    let user = new Promise((resolve,reject) =>{
        const { firstname, lastname } = req.body;
        let useradd = new User({
            firstname,
            lastname
        });
        const userName = User.findOne({ firstname });
        if(userName){
            resolve(useradd.save());
        }
        else {
            reject({ msg : 'User already exists'});
        }
    });

    user.then((result) => {
        res.json(result);
    }).catch((err) => {
        return res.status(500).send(err);
    })
});
// async and awit method
// route.post('/login', async (req, res) => {
//     const { firstname, lastname } = req.body;
//     let user = new User({
//         firstname,
//         lastname
//     });
//     await User.findOne(user, callback => {
//         if(user == 200){
//             user.save().then((err, saved) => {
//                 return res.json(saved).then(res.json(err));
//             });
//         }
//         else {
//             callback(res.json(500).send('server error'));
//         }
//     })  
// });

//async and await
// route.get('/getAll', async(req, res) => {
//     try {
//         const allUsers = await User.find();
//         res.json(allUsers);
//     } catch (error) {
//         console.error(error.message);
//         return res.status(500).send('server Error');
//     }

// })

//promis method
route.get('/getAll', (req, res) => {
    let promises = new Promise((resolve, reject) => {
        if(req){
            resolve(User.find());
        }
        else {
            reject( new Error({ msg: 'server Error'}))
        }
    });

    promises.then((result)=>{
        res.json(result);
    });
})

//async and await
// route.get('/get/:id', async(req, res) => {
//     try {
//         const user = await User.findOne({ _id : req.params.id });
//         res.json(user);
//     } catch (error) {
//         console.log(error.message);
//         return res.status(400).send({ msg : 'User not found'});
//     }
// });

//promise
route.get('/get/:id', (req,res) => {
    const user = User.findOne({ _id: req.params.id });
    let id = new Promise( (resolve,reject) => {
        if(user){
            resolve(user);
        }
        else {
            reject({ msg : 'User not found'})
        }
    });

    id.then((result) => {
        return res.json(result)
    });
});

//async and await
// route.put('/update/:id', async(req, res) => {
//     try {
//         const updateReq = { firstname, lastname } = req.body;
//         //console.log(updateReq)
//         const newUpdate = { firstname, lastname }

//         const update = await User.findOneAndUpdate({ _id : req.params.id },newUpdate,{new : true});
        
//         res.json(update);
//     } catch (error) {
//         console.log(error.message);
//         return res.status(400).send({ msg : 'User not found'});
//     }
// });

//promise
route.put('/update/:id', (req, res) => {
    
    let update = new Promise((resolve, reject) => {
        const updateId = { firstname, lastname } = req.body;

        const newUpdate = User.findOneAndUpdate({ _id : req.params.id }, updateId, { new : true });

        if(newUpdate){
            resolve(newUpdate);
        }
        else {
            reject({ msg : 'User not found'});
        }
    });

    update.then((result) => {
        res.json(result);
    }).catch((err) => {
        return res.send(err.message)
    })
});

//async and await
// route.delete('/:id', async(req, res) => {
//     try {
//         const remove = await User.findOneAndDelete({ _id : req.params.id});
//         res.json({msg : 'User is Deleted'});
//     } catch (error) {
//         console.log(error.message);
//         return res.status(400).send({ msg : 'User not found'});
//     }
// });

//promise 
route.delete('/:id', (req,res) => {
    let deleteId = new Promise((resolve,reject) => {
        const remove = User.findOne({ _id : req.params.id });

        if(remove){
            resolve(User.findOneAndDelete(remove));
        }
        else{
            reject(new Error({ msg: 'server Error'}));
        }
    });

     deleteId.then((result) => {
         return res.json({ msg : result.firstname + ' is Deleted'});
     }).catch((err) => {
        return res.json({msg : 'User not found'});
     });
});


module.exports = route