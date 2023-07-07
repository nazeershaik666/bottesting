const express = require('express');
const app = express();
const axios = require('axios');
const bodyParser = require('body-parser');
const port = 4040;
const url = 'https://api.telegram.org/bot';
const apiToken = '5914147662:AAEazL9O444TNO4dm-VxVWul4W-fqGsnHZM'
// Configurations
app.use(bodyParser.json());// Endpoints
app.post('/', (req, res) => {
 console.log(req.body);
 let chatId , sentMessage , messageId , edited = false
  if(req.body.message.document){
     chatId = req.body.message.chat.id;
     sentMessage = req.body.message.document.file_name;
     messageId = req.body.message.message_id;
     console.log(1)
     console.log(1,chatId,sentMessage,messageId)
  }else if(req.body.edited_message) {
    chatId = req.body.edited_message.chat.id 
    sentMessage = req.body.edited_message.text;
    messageId = req.body.edited_message.message_id;
    edited = true
    console.log(2)
    console.log(2,chatId,sentMessage,messageId)
  }else{
  chatId = req.body.message.chat.id;
  messageId = req.body.message.message_id,
  sentMessage = req.body.message.text;
  console.log(3)
  }
     if (sentMessage.match(/hello/gi)) {
          axios.post(`${url}${apiToken}/sendMessage`,
               {
                    chat_id: chatId,
                    text: '👋',
                    reply_to_message_id : messageId
               })
               .then((response) => { 
                    res.status(200).send(response);
               }).catch((error) => {
                    res.send(error);
               });
     } else {
          // if no hello present, just respond with 200 
          axios.post(`${url}${apiToken}/sendMessage`,
               {
                    chat_id: chatId,
                    text: sentMessage,
                    reply_to_message_id : messageId
               })
               .then((response) => { 
                    res.status(200).send(response);
               }).catch((error) => {
                    res.send(error);
               });
        
     }
});// Listening

app.get('/',(req,res) => {
    res.status(200).send("Hellooo berok")
})
app.listen(port, () => {
     console.log(`Listening on port ${port}`);
});
