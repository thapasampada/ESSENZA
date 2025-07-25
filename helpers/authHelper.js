import bcrypt from 'bcrypt';

export const hashPassword = async (password) => {
    try{
        const saltRounds = 10; // Number of salt rounds
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    }
    catch(error){
        console.error("Error hashing password:", error);
    }
};

export const comparePassword = async (password, hashedPassword) => {
    return bcrypt.compare(password, hashedPassword);
};