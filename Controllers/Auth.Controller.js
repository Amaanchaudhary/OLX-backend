import UserModals from "../Modals/User.modals.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

export const Login = async (req, res) => {
    // res.send("Hello from login")
    try{
        const {email , password} = req.body.userData;
        if(!email || !password) return res.status(401).json({success : false , message : "All Fields are mandatory"})

        const user = await UserModals.findOne({email : email})

        // console.log(user, "User")

        if(!user) return res.status(401).json({success : false , message : "Email Not Found"})

        const isPasswordCorrect = await bcrypt.compare(password , user.password)

        // console.log(isPasswordCorrect , "check here");

        if(!isPasswordCorrect){
            return res.status(401).json({success : false ,message : "Password not matched"})
        }
        //generate token
        const token = await jwt.sign({id : user._id}, process.env.JWT_SECRET); 

        // console.log(token , "Token")

        return res.status(200).json({success : true , message : "Login Successfull", user : {name : user.name , id : user._id},token});

    }catch(error){
        return res.status(500).json({success : false , message : error.message})
    }



}
export const Register = async (req, res) => {
    // res.send("Hello from login") 
    try {
        // console.log(req.body, "Body");
        const { name, email, password} = req.body.userData;

        const hashedPassword = await bcrypt.hash(password , 10);

        // console.log(hashedPassword); 

        if (!name || !email || !password) return res.status(401).json({ success: false, message: "All Fields are mandatory." })

        const user = new UserModals({
            name: name,
            email,
            password : hashedPassword   
        })

        await user.save();

        return res.status(200).json({ success: true, message: "Registration Succesfull." })

    } catch (error) {
        return res.status(500).json({ sucess: false, message: error })
    }
}

export const getCurrentUser = async (req , res) => {
    try{
        const {token} = req.body
    
        if(!token) return res.status(401).json({success : false , message : "token is required"})

        const {id} = await jwt.verify(token , process.env.JWT_SECRET);

        // console.log(id , "id")

        const user = await UserModals.findById(id);

        // console.log(user, 'user');

        if(!user) return res.status(401).json({success : false , message : "User not Found"})

        return res.status(200).json({success : true , user : {name : user.name , id : user._id}})


    }catch(error){
        return res.status(500).json({success : false , message : error})
    }
}
