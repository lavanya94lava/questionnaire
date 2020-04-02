const Question = require('../models/option');
const Option = require('../models/option');

module.exports.delete = async function(req,res){

    try{
        const option = await Option.findById(req.params.id);
        let questionId = option.question;
        option.remove();

        let question = Question.findByIdAndUpdate(questionId, {$pull:{ options: req.params.id}});

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