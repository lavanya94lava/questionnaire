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

        return res,json(200, {
            message:"question created successfully"
        })
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
        // find question by id
        const question =  await Question.findById(req.params.id);

        //if question is found
        if(question){
            let newOption = await Option.create({
                text:req.body.text,
                question:req.params.id
            });

            newOption.link_to_vote = "http://"+req.headers.host+'/options'+ '/'+ newOption._id + "/add_vote";
            
            // push the option into the specific question
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
        let question = await Question
                            .findById(req.params.id)
                            .populate({path:'options'});
        
        //if question is not present
        if(!question){
            return res.json(400, {
                message:"question is not present please do check ID"
            });
        }

        // if any option has more than 0 votes you cant delete that question
        if(question.options.votes >0){
            return res.json(400, {
                message: "options of this question contain votes , so can't delete"
            })
        }
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

module.exports.getQuestion = async function(req,res){
    try{
        // simple, get the question using params 
        let question = await Question
                       .findById(req.params.id)
                       .populate({
                           path:'options'
                       });

        if(!question){
            return res.json(400, "please check your ID");
        }
        
        // return question along with its options
        return res.json(200, question);
    }
    catch(err){
        return res.json(500, {
            message:"bad request error"
        })
    }
}