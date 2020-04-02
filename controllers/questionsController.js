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
            title:req.body.title
        });
    }
    catch(err){
        if(err){
            res.json(500, {
                message: "bad request"
            })
        }
    }
}

module.exports.createOption = async function(req,res){
    if(!req.body.text||!req.body.link_to_vote){
        return res.json(200,{
            message:"Please fill all the madantory fields"
        });
    }

    try{
        // fi nd question by id
        const question =  await Question.findById(req.params.id);

        //if question is found
        if(question){
            let newOption = await Option.create({
                text:req.body.text,
                link_to_vote:req.body.link
            });
    
            question.options.push(newOption);
            question.save();

            return res.json(200, {
                message:"option created successfully"
            });
        }
        //if question is not found
        else{
            return res.json(400,{
                message:"Please check your question ID"
            })
        }
    }
    catch(err){
        if(err){
            res.json(500, {
                message:"Bad Request Error"
            })
        }
    }
}

module.exports.delete = async function(req,res){

    try{
        // find question by params 
        let question = Question.findById(req.params.id);
        // delete options associated with the question
        await Option.deleteMany({question:req.params.id});
        question.remove();

        return res.json(200,{
            message:"Question deleted successfully"
        });
    }
    catch(err){
        if(err){
            res.json(500, "bad request");
        }
    }
}