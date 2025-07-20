import userModel from "../models/userModel.js";
import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import JWT from "jsonwebtoken";
import { Children } from "react";

export const registerController = async (req, res) =>{
    try {
        const { name, email, password, phone, address ,answer} = req.body;
        //validations
        if(!name){
           return res.send({message: 'Name is required'}); 
        }
        if(!email){
           return res.send({message: 'Email is required'});
        }
        if(!password){
           return res.send({message: 'Password is required'});
        }
        if(!phone){
           return res.send({message: 'Phone number is required'});
        }
        if(!address){
           return res.send({message: 'Address is required'});
        }
         if(!answer){
           return res.send({message: 'Answer  is required'});
        }

        //check user
        const existingUser = await userModel.findOne({ email})
        //existing user
        if(existingUser){
            return res.status(200).send({
                success: false,
                message: "Already registered, please login"
            })
        }
        //register user
        const hashedPassword = await hashPassword(password);
        //save
        const user = await new userModel({
            name,
            email,
            phone,
            address,
            password: hashedPassword,
            answer,
        }).save();

        res.status(201).send({
            success: true,
            message: "User registered successfully",
            user,
        });


    }catch(error){
        console.error("Error in registerController:", error);
        res.status(500).send({ message: "Internal server error" });
    }
};

//POST LOGIN
export const loginController = async(req, res) =>{
    try{
        const { email, password } = req.body;

        //validations
        if(!email || !password){
            return res.status(400).send({
                success: false,
                message: "Invalid email or password"
            });
        }

        //check user
        const user = await userModel.findOne({ email });
        if(!user){
            return res.status(404).send({
                success: false,
                message: "User not found, please register"
            });
        }

        //compare password
        const match = await comparePassword(password, user.password);
        if(!match){
            return res.status(200).send({
                success: false,
                message: "Invalid credentials"
            });
        }

        //create token
        const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '7d'
        });

        res.status(200).send({
            success: true,
            message: "Login successful",
            user: {
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address
            },
            token
        });
    }catch(error){
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in login",
            error
        });
    }
};
//forgetpasswordController

export const forgetPasswordController= async (req,res)=>{}
try{
    const{email,answer,newPassword}= req.body
    if(!email){
        res.status(400).send({message:'Email is required'})
    }
      if(!answer){
        res.status(400).send({message:'Answer is required'})
    }
      if(!newPassword){
        res.status(400).send({message:'New Password is required'})
    }

    //check
    const user=  await userModel.findOne({email,answer});
    //validation
    if(!user) {
        return res.status(404).send({
            success: false,
            message: "  Wrong Email or Answer",
        });
    }
    const hashed = await  hashPassword(newPassword);
    await userModel.findByIdAndUpdate(user._id,{ password: hashed});
    res.status(200).send({
        success:true,
        message: "Password Reset Sucessfully",
    });
}
     catch(error){
console.log(error)
res.status(500).send({
    success: false,
    message:'Something went wrong',
    error
})
    }



//test controller
export const testController = (req, res) => {
    try{
    res.send("protected route");
    }catch(error){
        console.log(error);
        res.send({error});
    }
    
};



