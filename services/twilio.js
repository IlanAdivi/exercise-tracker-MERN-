const dotenv = require('dotenv');
dotenv.config({ path: '.env' });

const {
    TWILIO_ACCOUNT_SID,
    TWILIO_AUTH_TOKEN,
    TWILIO_PHONE_NUMBER
}
    = process.env;

const client = require('twilio')(
    TWILIO_ACCOUNT_SID,
    TWILIO_AUTH_TOKEN,
    TWILIO_PHONE_NUMBER
);

module.exports = {
    sendingSMSToClient: (phoneNumber, message) => {
        client.messages
            .create({
                from: TWILIO_PHONE_NUMBER,
                to: `+972${phoneNumber}`,
                body: message
            })
            .then(() =>
                console.log('Message sented successfully')
            )
            .catch(err =>
                console.log(err));


        // client.calls
        // .create({
        //    url: 'http://demo.twilio.com/docs/voice.xml',
        //    to: '+972...',
        //    from: TWILIO_PHONE_NUMBER
        //  })
        // .then(call => console.log(call.sid));
    },
    createWelcomeMessageToClient: (user, exercise) => {
        const { firstname, lastname } = user;
        const { course, date, startTime, endTime } = exercise;
        const welcomeMessageToClient = `Hello ${firstname}
        ${lastname},
       Congratulations on registering for an exam
       in an ${course} course on ${date} from ${startTime}-${endTime}, good luck
       in the exam!`;

        return welcomeMessageToClient;
    },
    updateMessageToClient: exercise => {
        const { firstname, lastname } = exercise.user;
        const { course, date, startTime, endTime } = exercise;
        const updateMessageToClient = `Hello ${firstname}
        ${lastname},
        We would like to inform you that the exam
       in an ${course} course has passed to ${date} from ${startTime}-${endTime}, good luck
       in the exam!`;

       return updateMessageToClient;
    }
};