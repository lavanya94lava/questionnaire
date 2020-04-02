const Question = require('../models/option');
const Option = require('../models/option');

module.exports.delete = async function(req,res){

    try{
        const option = await Option.findById(req.params.id);
        let questionId = option.question;
        if(option.votes >0){
            res.json(400, {
                message:"Can't delete this option as it has votes!"
            });
        }
        option.remove();

        let question = await Question.findByIdAndUpdate(questionId, {$pull:{ options: req.params.id}});

        return res.json(200, {
            message:"option deleted successfully"
        });
    }
    catch(err){
        return res.json(500, {
            message:"bad request error"
        });
    }
}


module.exports.addVote = async function(req,res){
    try{
        // find the option using the ID
        let option = await Option.findById(req.params.id);
        if(!option){
            return res.json(400,{
                message:"Option not found, try again"
            });
        }
        // increment the vote count by 1
        option.votes = option.votes+1;
        option.save();
        res.json(200, {
            message:"congrats!! vote added"
        });
    }
    catch(err){
        return res.json(500, {
            message:"Bad request error"
        });
    }
}