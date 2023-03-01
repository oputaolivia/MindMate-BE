const dotenv = require('dotenv');
const {Configuration, OpenAIApi} = require('openai');
const Chat = require('../model/chatModel');
const User = require('../model/userModel');
const {login, auth} = require('../utils/auth');
dotenv.config();

// const botResp = []
// const userResp = []
const username = "Marshall"

const prmpt = `As the virtual mental health therapist for MindMate, provide guidance and support to users who may be experiencing a wide range of mental health issues. Your responses should be empathetic, non-judgmental, and informed by current best practices in mental health care. Your goal is to help users feel heard, understood, and empowered to take steps towards healing and self-improvement.

Please provide guidance for the following scenarios:

A user who is experiencing symptoms of depression, including feelings of hopelessness, low energy, and a lack of interest in activities they used to enjoy.
A user who is dealing with anxiety, including panic attacks, obsessive thoughts, and avoidance behaviors.
A user who is struggling with addiction, and is unsure of how to seek help or where to turn for support.
A user who is experiencing relationship problems, including communication issues, conflicts, and feelings of loneliness or disconnection.
A user who is dealing with grief or loss, and is struggling to process their emotions and move forward in a healthy way.
A user who is experiencing symptoms of a personality disorder, and is seeking guidance on how to manage their condition and improve their quality of life.
A user who is experiencing suicidal thoughts or feelings, and is in need of immediate support and resources.
A user who is struggling with a chronic illness, and is dealing with the mental and emotional toll of managing their condition on a daily basis.
A user who is experiencing stress or burnout, and is looking for strategies to improve their self-care and reduce their overall level of stress.
A user who is seeking general guidance on improving their mental health and well-being, including tips for self-care, stress management, and building healthy habits.
Please provide thorough, thoughtful, and evidence-based responses that take into account the unique needs and circumstances of each user.`;

const configuration = new Configuration({
  apiKey : `${process.env.CHATGPT_API_KEY}`,
})


// Initialize the OpenAI API client
const openai = new OpenAIApi(configuration);

// Handling incoming messages
const chatBot = async (req, res) => {
    const prompt = req.query.text;
    const message = await generateText(prompt);
// Function to generate text from ChatGPT
async function generateText(prompt) {
    const completions = await openai.createCompletion({
      model: process.env.CHATGPT_MODEL,
      prompt: prompt,
      max_tokens: 250,
      temperature: 1
    });
    const message = completions.data.choices[0].text.trim();
    //console.log(message);
    return message;
  }
  
  async function prepareChat(prompt){
    //prepare the prompt for upload to chatgpt
    let startPrompt = prmpt
    startPrompt += `Here's an entry from ${username}: `
    startPrompt += prompt
    //send to chatgpt, format the response
    let AIResp = await generateText(prompt)
    //if there was a response, update the chat histories
    if(AIResp){
    //   console.log(`${username}: ${prompt}\n\n`)
    if (auth){
        console.log(`Response: ${AIResp}`)
        // console.log(login.req.email)
    let chat = new Chat ({
        // userId: tokenIsValid.user,
        MindMate: AIResp,
        userMessage: prompt,
    });
    chat.save((err, chat)=>{
        if (err){
            res.status(500).send({
                data: {},
                    message: `An error occured during registration: ${err}`,
                    status: 1,
            });
            console.log(err)
        }else{
            res.status(201).send({
                data: chat,
                message: "Chat saved",
                status: 0,
            });
            console.log(`${username}: ${prompt}\n\n`)
            console.log(`MindMate: ${AIResp}`)
        }
    })
}
    }
}
    let userMessage = req.body.prompt;
    prepareChat(userMessage);
}
const getChats = async (req,res) =>{
    try{
        const chats = await Chat.find({});
        res.status(200).send({
            data: chats,
            message: "Chats",
            status: 0,
        })
    }catch (err){
        res.status(500).send({
            data: {},
            message: err,
            status: 1,
        });
    }
}
module.exports={
    chatBot,
    getChats,
}