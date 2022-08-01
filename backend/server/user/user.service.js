const BadRequestException = require("../utils/errors/BadRequestException");
const userRepository = require('./user.repository');
const bcrypt = require("bcrypt");

const registerStudent = async (registrationData) => {
    // check whether another student exists with same email
    const userWithSameEmail = await userRepository.countUserByEmail(registrationData.email);
    if (userWithSameEmail) {
        throw new BadRequestException('An user with same email already exists!');
    }

    // hash password to store
    const hashedPassword = await bcrypt.hash(registrationData.password, 10);
    registrationData.password = hashedPassword;

    // save this data in DB
    const newStudent = await userRepository.saveUser(registrationData);

    //generate and return jwt token
    const token = newStudent.generateToken();
    return token;
}

const loginUser = async(loginData) => {
    //get details of the reqistration number from DB
    const user = await userRepository.getUser(loginData.registrationNumber);
    if (!user) throw new BadRequestException('Invalid Registration number');

    //compare the password retrieved from DB with the entered password
    const validPassword = await bcrypt.compare(loginData.password, user.password);
    if (!validPassword) throw new BadRequestException('Invalid password');

    const token = user.generateToken();
    return token; 
};

module.exports = {
    registerStudent,
    loginUser,
};