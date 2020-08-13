const User = require('../models/user').User;
const s3 = require('./s3');
const dotenv = require('dotenv');

dotenv.config({ path: '.env' });

const uploadImageFromAmazon = async uploadingParams => {
    const s3Client = s3.s3Client;
    await s3Client.upload(uploadingParams, function (err, data) {
        if (err) {
            console.log('err');
            return {
                error: true,
                Message: err
            }
        }
    });
};

const initParams = (userParams, reqImage) => {
    userParams.Key = reqImage.originalname;
    userParams.Body = reqImage.buffer;
    userParams.ContentType = reqImage.mimetype;
    userParams.ACL = process.env.ACL;
};

const deleteImageFromAmazon = (params, s3Bucket) => {
    s3Bucket.deleteObject(params, (err, data) => {
        if (err) {
            return {
                error: true,
                Message: err
            }
        }
    });
};

module.exports = {
    createUser: async (userDetails, userImage) => {
        const {
            firstname,
            lastname,
            kind,
            phone
        } = userDetails;

        const image = userImage;
        const params = s3.uploadParams;
        const s3ImageUrl = process.env.AWS_Uploaded_File_URL_LINK;

        initParams(params, image);
        await uploadImageFromAmazon(params);

        const newUserImage = {
            imageUrl: `${s3ImageUrl}${image.originalname}`,
            s3_key: params.Key
        };
        const { imageUrl, s3_key } = newUserImage;
        const newUser = new User({
            firstname,
            lastname,
            kind,
            phone,
            imageUrl,
            s3_key
        });

        await newUser.save();
        return newUser;
    },
    checkIfUserAlreadyExist: async user => {
        const { phone } = user;
        const isUserExist = await User.findOne({
            phone: `${phone}`
        });

        return isUserExist ?
            {
                message: "User already exist",
                userAlreadyExist: true
            }
            :
            {
                userAlreadyExist: false
            }
    },
    getAllUsers: async () => {
        const users = await User.find();
        if (users.length === 0) {
            return {
                users,
                message: 'There are no users Yet'
            }
        }
        return users;
    },
    getUserById: async id => {
        user = await User.findById(id);
        return user;
    },
    deleteUserById: async id => {
        const user = await User.findByIdAndDelete(id);
        const s3Bucket = s3.s3Client;
        const params = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: user.s3_key
        };

        deleteImageFromAmazon(params, s3Bucket);
        return user;
    },
    findUpdatingUserById: async id => {
        const user = await User.findByIdAndUpdate(id);
        return user;
    },
    saveUpdatingUser: async user => {
        await user.save();
    },
    checkIfIsValidUpdating: userRequestBody => {
        updates = Object.keys(userRequestBody);
        const allowedUpdates = ['phone'];

        const isValidUpdating = updates.every(updateUser =>
            allowedUpdates.includes(updateUser));

        return {
            isValidUpdating,
            updates: isValidUpdating === true ? updates : null
        }
    }
}