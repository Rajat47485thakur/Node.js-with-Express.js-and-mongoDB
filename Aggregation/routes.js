const controller = require('./controller')
const router = require('express').Router();


router.post('/addPerson', controller.addPerson);
router.put('/editPerson', controller.editPerson);
router.get('/getPerosn', controller.getAllPeople);
router.post('/aggregatePerson', controller.aggregatePerson);


// ============================POUPULATE ADDRESS=========================== 
router.get('/populateAddress', controller.populateAddress);


// ============================ LOOKUP ADDRESS=========================== 
router.get('/lookupAddress', controller.lookupAddress);


// ============================LET PIPELINE LOOKUP ADDRESS=========================== 
router.get('/letLookupAddress', controller.letLookupAddress);



// ============================$elemMatch ROUTES=========================== 
router.get('/getMarks', controller.getMarks);
router.get('/getMarks2', controller.getMarks2);

// ============================ADDRESS ROUTES=========================== 

router.post('/addAddress', controller.addAddress);
router.get('/getAddress', controller.getAddress);

module.exports = router;