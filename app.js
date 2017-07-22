let express = require('express')
let bodyParser = require('body-parser')
let request = require('request')
let app = express()

const CHANNEL_ACCESS_TOKEN = 'NN2NGtz3RLkAZ9iERFCkXSIw3KOgFZPoLYUioNmytThDq0GS6UEZCFfMl5fZp0Jckx2n09rbfhY3eNHJbk9ur60RwHOcC6aybey3J0x0yOyVXml83o6shDQDb0/+Mypv2mX4KyUzwx7eX71L7ax9LAdB04t89/1O/w1cDnyilFU='
const PORT = process.env.PORT || 3000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.listen(PORT, function () {
    console.log(`App listening on port ${PORT}!`)
})

// handler receiving messages
app.post('/', function (req, res) {

    let body = req.body
    let text = body.events[0].message.text
    let replyToken = body.events[0].replyToken
    sendMessage(replyToken, text)  
    console.log(JSON.stringify(body, null, 2))
    res.send('')

})

// generic function sending messages
function sendMessage(replyToken, text) {
    let body = {
        replyToken,
        messages: [{
            type: 'text',
            text,
        }],
    };

    let options = {
        url: 'https://api.line.me/v2/bot/message/reply',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${CHANNEL_ACCESS_TOKEN}`,
        },
        body,
        json: true,
    };

    request(options, function (error, response, body) {
        if (error) {
            console.log('Error sending message: ', error);
        }
        else if (response.body.error) {
            console.log('Error: ', response.body.error);
        }
    })
}
