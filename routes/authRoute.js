import express from 'express';
import { registerController, loginController,testController, forgetPasswordController} from '../controllers/authController.js';
import { requireSignIn, isAdmin } from '../middlewares/authMiddleware.js';

//router object
const router = express.Router(); 

//routing
//REGISTER || METHOD POST
router.post("/register", registerController);

//LOGIN || METHOD POST
router.post("/login", loginController);

// forgot password ||post 
router.post("/forgot-password", forgetPasswordController);

//test route
router.get("/test",requireSignIn, isAdmin ,testController);

//protected route auth
router.get("/user-auth" , requireSignIn,(req,res)=>{
    res.status(200).send({ok:true});
});

export default router;