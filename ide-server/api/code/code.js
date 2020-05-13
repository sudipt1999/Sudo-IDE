const router = require('express').Router()
const fs = require('fs')
const path = require('path')

router.get('/test',(req,res)=>{
    res.json({msg: "code route"})
})


const deleteFile = (filename) => {
    fs.unlink(filename, function (err) {
        if (err) {
            console.log("SORRY NOT DELETED")
        };
        // if no error, file has been deleted successfully
        console.log('File deleted!');
    }); 
}

const execute = require('../../compile/compile')
router.post('/submit', (req,res)=>{
    console.log(req.body)
    const code = req.body.code
    const input = req.body.input
    const lang = req.body.lang
    switch(lang) {
        case "cpp" : return execute.cPlusPlusExecute(code, input)
        .then(data=>{
            console.log("SUCCESSFULL PROMISE " + data)
            console.log("SENDING " + data)
            res.json(data)
            deleteFile(path.join(__dirname, '../../input.txt'))
            deleteFile(path.join(__dirname, '../../test.cpp'))
        })
        .catch(err => {
            console.log("ERROR PROMISE " + err)
            deleteFile(path.join(__dirname, '../../input.txt'))
            deleteFile(path.join(__dirname, '../../test.cpp'))
        })
        case "c" : return execute.cExecute(code, input)
                    .then(data=>{
                        console.log("SUCCESSFULL PROMISE " + data)
                        console.log("SENDING " + data)
                        res.json(data)
                        deleteFile(path.join(__dirname, '../../input.txt'))
                        deleteFile(path.join(__dirname, '../../test.c'))
                        deleteFile(path.join(__dirname, '../../a.exe'))

                    })
                    .catch(err => {
                        console.log("ERROR PROMISE " + err)
                        deleteFile(path.join(__dirname, '../../input.txt'))
                        deleteFile(path.join(__dirname, '../../test.c'))
                        deleteFile(path.join(__dirname, '../../a.exe'))
                    })

        case "java" : return execute.javaExecute(code, input)
                        .then(data=>{
                            console.log("SUCCESSFULL PROMISE " + data)
                            console.log("SENDING " + data)
                            res.json(data)
                            deleteFile(path.join(__dirname, '../../input.txt'))
                            deleteFile(path.join(__dirname, '../../test.java'))
                            deleteFile(path.join(__dirname, '../../test.class'))
                        })
                        .catch(err => {
                            console.log("ERROR PROMISE " + err)
                            deleteFile(path.join(__dirname, '../../input.txt'))
                            deleteFile(path.join(__dirname, '../../test.java'))
                            deleteFile(path.join(__dirname, '../../test.class'))
                        })

        case "python" : return execute.pythonExecute(code, input)
                        .then(data=>{
                            console.log("SUCCESSFULL PROMISE " + data)
                            console.log("SENDING " + data)
                            res.json(data)
                            deleteFile(path.join(__dirname, '../../input.txt'))
                            deleteFile(path.join(__dirname, '../../test.py'))
                            deleteFile(path.join(__dirname, '../../a.exe'))
                        })
                        .catch(err => {
                            console.log("ERROR PROMISE " + err)
                            deleteFile(path.join(__dirname, '../../input.txt'))
                            deleteFile(path.join(__dirname, '../../test.py'))
                            deleteFile(path.join(__dirname, '../../a.exe'))


                        })
    } // switch     

})


module.exports =  router