const path = require('path');

const Sib = require('sib-api-v3-sdk');
const dotenv = require('dotenv').config();

const client = Sib.ApiClient.instance;
const apiKey = client.authentications['api-key'];
apiKey.apiKey = process.env.API_KEY; console.log(process.env.API_KEY);

exports.getForgotPassword = (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'password.html'));
}

exports.postForgotPassword = (req, res) => {
    const ReceiverEmail = req.body.email;
    if(!ReceiverEmail){
        res.status(400).json({msg: 'Email is required'});
        return;
    }

    const tranEmailApi = new Sib.TransactionalEmailsApi();

    const sender = {
        email: 'shivanshsanoria1@gmail.com'
    };
    const receivers = [
        {
            email: ReceiverEmail
        }
    ];

    tranEmailApi.sendTransacEmail({
        sender: sender,
        to: receivers,
        subject: 'Password reset link',
        textContent: '!! test password link !!'
    })
    .then((result) => {
        console.log(result);
        res.status(200).json({msg: 'Password reset link sent to email'});
    })
    .catch((err) => {
        console.log('POST FORGOT PASSWORD ERROR');
        res.status(500).json({error: err, msg: 'Could not send password reset link'});
    });
}