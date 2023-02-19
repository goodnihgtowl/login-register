import User from "../../Schema/User";
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import connectDB from "../../lib/connectDB";

const registerHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      const { user: _regiUser } = req.body;
      console.log(_regiUser)
      //Check if user exists
      await connectDB()
      const existingUser = await User.findOne({ email: _regiUser.email }).exec();
      console.log("existingUser", existingUser);

      //Throw error when email is already in use
      if (existingUser) {
        throw new Error("Email already used");
      }
      //Password encrypted
      const hashedPassword: string = await bcrypt.hashSync( _regiUser.password, 10 );
      console.log("_regiUser.password", _regiUser.password, hashedPassword)
      console.log(hashedPassword)

      //Replace text password with encrypted password
      _regiUser.password = hashedPassword;
      console.log(_regiUser)
      
      //Add user on database
      await User.create(_regiUser)
      res.end()
    } catch (e: any) {
        console.log(e.message)
    }
  }
};

export default registerHandler;