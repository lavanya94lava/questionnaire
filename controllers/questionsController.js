const Question = require('../models/question');
const Option = require('../models/option');

module.exports.create = function(req,res){
    if(!req.body.title){
        return res.json(200,{
            message:"please fill in the title"
        });
    }
    try{
        Question.create({
            title:req.body.title,
        });
    }
    catch(err){

    }
}