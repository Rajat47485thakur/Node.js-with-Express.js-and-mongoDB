const mongoose = require('mongoose');
const Person = require('./models/person');
const Address = require('./models/address');


module.exports.addPerson = async (req, res) => {
    const { username, name, age, gender, place, marks } = req.body;
    try {
        if (!username || !age || !gender) throw new Error("Missing fields");
        const person = await Person.findOne({ username });
        if (person) throw new Error(`${username} is already in the database`);
        const createPerson = await Person.create({
            username,
            name,
            age,
            gender,
            place,
            marks: marks || []
        });
        return res.status(200).json({ message: "User added successfully", data: createPerson });
    } catch (err) {
        return res.status(500).json(`Facing error while adding the ${name}, ${err}`)
    }
};

// EDIT PEOPLE 
module.exports.editPerson = async (req, res) => {
    try {
        const { username, address } = req.body;
        const editedPerson = await Person.findOneAndUpdate({ username },

            {
                $set: {
                    address
                }
            },
            { new: true });
        console.log(editedPerson, '==================')
        return res.status(200).json({ message: "Person details get updated successfully", data: editedPerson });
    } catch (err) {
        return res.status(500).json({ message: "Internal Error", err })
    }
};

// GET ALL PEOPLE  
module.exports.getAllPeople = async (req, res) => {
    try {
        const people = await Person.find({});
        return res.status(200).json({ messaeg: "List of the persons are => ", data: people })
    } catch (err) {
        return res.Error("Unable to find the Persons", err)
    }
};



// Here Use Aggregation 
// module.exports.aggregatePerson = async (req, res) => {
//     try {
//         const myData = await Person.aggregate([
//             { $group: { _id: "$place", count: { $sum: 1 } } }
//         ])
//         console.log(myData);
//         return res.status(200).json({ message: "This the data based on Place", data: myData });
//     } catch (err) {
//         console.log(err);
//         return res.status(500).json({ error: "Oopps!!! error occurred", details: err })
//     }
// };

// module.exports.aggregatePerson = async (req, res) => {
//     try {
//         const myData = await Person.aggregate([
//             { $group: { _id: { gender: "$gender" , place: "$place"}, person_In_Each_Country_Gender: { $sum: 1 } } }
//         ])
//         console.log(myData);
//         return res.status(200).json({ message: "This the data based on Place", data: myData });
//     } catch (err) {
//         console.log(err);
//         return res.status(500).json({ error: "Oopps!!! error occurred", details: err })
//     }
// };


// module.exports.aggregatePerson = async (req, res) => {
//     try {
//         const myData = await Person.aggregate([
//             { $group: { _id: { place: "$place" }, avgAge: { $avg: "$age" } } }
//         ])

//         myData.forEach(ram => {
//             ram.avgAge = Math.round(ram.avgAge);
//         });

//         console.log(myData);
//         return res.status(200).json({ message: "This the data based on Place", data: myData });
//     } catch (err) {
//         console.log(err);
//         return res.status(500).json({ error: "Oopps!!! error occurred", details: err })
//     }
// };


module.exports.aggregatePerson = async (req, res) => {
    try {
        const presonFromIndia = await Person.aggregate([
            {
                $match: { place: 'India' }
            }
        ]);
        console.log(presonFromIndia);
        return res.status(200).json({ messaeg: "These are the Preson from India", data: presonFromIndia });
    } catch (err) {
        return res.status(500).json({ messaeg: "Internal Server Error!", detail: err });
    }
};


// ============================POPULATE ADDRESS ===========================

module.exports.populateAddress = async (req, res) => {
    try {
        const perosnWithAddress = await Person.find({ Address: req.params.id }).populate("address");
        // console.log(perosnWithAddress)
        return res.status(200).json({ messaeg: "", data: perosnWithAddress })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: "Internal Server Error", err })
    }
};

//============================LOOKUP ADDRESS ===========================

module.exports.lookupAddress = async (req, res) => {
    try {
        const getAddress = await Person.aggregate([
            {
                $lookup: {
                    from: "addresses",
                    localField: "address",
                    foreignField: "_id",
                    as: "Person_Address"
                }
            }
        ])
        // console.log(getAddress)
        return res.status(200).json({ message: "These are addresses", data: getAddress });
    } catch (err) {
        return res.status(500).json({ message: "Internal Error", err })
    }
};
//============================LOOKUP LET PIPELINE ADDRESS ===========================

module.exports.letLookupAddress = async (req, res) => {
    try {
        const letPipeline = await Person.aggregate([
            {
                $lookup: {
                    from: "addresses",
                    let: { userId: "$address" },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $eq: ["$_id", "$$userId"]
                                }
                            }
                        },

                    ],

                    as: "With_Address"

                },

            },
            {
                $project: {
                    _id: 1,
                    username: 1,
                    name: 1,
                    age: 1,
                    gender: 1,
                    place: 1,
                    With_Address: 1

                }
            }
        ]);

        // console.log("---=-=-=-==-=-=-=-=-=-=-=-==--=")
        return res.status(200).json({ message: "Person With the address is Here", data: letPipeline });
    } catch (err) {
        return res.status(500).json({ message: "Internal server Error", err });
    }
};


// ============================$elemMatch CONTROLLER=========================== 
module.exports.getMarks = async (req, res) => {
    try {
        const myMarks = await Person.find({ marks: { $elemMatch: { subject: "English", marks: { $gt: 70 } } } },
            { "marks.$": 1 }
        );
        if (!myMarks || myMarks.length === 0) {
            return res.status(400).json({ message: "No Marks Found Greater then Your marks check for less marks" });
        }
        return res.status(200).json({ messaeg: "Yes, Marks Greater then Your marks found", data: myMarks })
    } catch (err) {
        return res.status(500).json({ messaeg: "Internal Server Error", err });
    }
};


module.exports.getMarks2 = async (req, res) => {
    try {
        const myMarks2 = await Person.find({ marks: { $elemMatch: { subject: "Math", marks: { $gt: 80 } } } },
            { "marks.$": 1 }
        );
        if (!myMarks2 || myMarks2.length === 0) {
            return res.status(400).json({ message: "No Marks Found Greater then Your marks check for less marks" });
        }
        return res.status(200).json({ messaeg: "This is your data", data: myMarks2 });
    } catch (err) {
        return res.status(500).json({ message: "Internal Server error" }, err)
    }
};


// ============================ADDRESS CONTROLLER=========================== 

module.exports.addAddress = async (req, res) => {
    try {
        const { street,
            city,
            state,
            zipCode } = req.body;
        if (!street || !city || !zipCode) {
            return res.state(400).json({ messaeg: " Require Fields are empty", error: error })
        };
        const address = await Address.create({
            street,
            city,
            state,
            zipCode
        })
        return res.status(200).json({ message: "Your address added successfully.", data: address });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ messaeg: " Internal Error", err })
    }
};




module.exports.getAddress = async (req, res) => {
    try {
        const getAddress = await Address.find({});
        return res.status(200).json({ message: "These are addresses", data: getAddress });
    } catch (err) {
        return res.status(500).json({ message: "Internal Error", err })
    }
};



