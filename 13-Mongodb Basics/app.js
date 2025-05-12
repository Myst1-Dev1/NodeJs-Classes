const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://danteopzz1:7VMkSQ9UFYVsZg3Q@cluster0.wf7ubmv.mongodb.net/'
).then(() => console.log('Database connected successfully')).catch(e => console.log(e));

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    age: Number,
    isActive:Boolean,
    tags: [String],
    createdAt: { type : Date, default : Date.now },
});

//create user model

const User = mongoose.model('User', userSchema);

async function runQueryExamples() {
    try {
        
        //create new document
        const newUser = await User.create({
            name: 'Updated doe',
            email: 'updated@gmail.com',
            age: '25',
            isActive: true,
            tags: ['developer'],
        });

        // const newUser = new User({
        //     name: 'Peter',
        //     email: 'Pete@gmail.com',
        //     age: '25',
        //     isActive:true,
        //     tags: ['developer', 'front end', 'designer'],
        // });

        // await newUser.save();

        console.log('Created new user', newUser);

        // const allUsers = await User.find({});

        // console.log(allUsers);

        // const getUsersOfActiveFalse = await User.find({
        //     isActive : false
        // })

        // console.log(getUsersOfActiveFalse);

        // const getJohnUser = await User.find({name: 'John doe'});

        // console.log(getJohnUser);

        // const getLastCreateUserByUserId = await User.findById(newUser._id);
        // console.log(getLastCreateUserByUserId);

        // const selectedFields = await User.find().select('name email -_id');
        // console.log(selectedFields);

        // const limitedUsers = await User.find().limit(5).skip(1);
        // console.log(limitedUsers);

        // const sortedUsers = await User.find().sort({age: 1});
        // console.log(sortedUsers);

        // const countDocuments = await User.countDocuments({isActive : false});
        // console.log(countDocuments);

        // const deletedUser = await User.findByIdAndDelete(newUser._id);
        // console.log(deletedUser);

        const updatedUser = await User.findByIdAndUpdate(newUser._id, {
            $set : { age: 100 }, $push: { tags: 'updated' }
        }, { new: true });
        console.log('updated user', updatedUser);

    } catch (error) {
        console.log('Error ->',error);
    } finally {
        await mongoose.connection.close();
    }
}

runQueryExamples();