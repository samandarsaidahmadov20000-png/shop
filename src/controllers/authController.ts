import { Request, Response, NextFunction } from 'express';

import User from '../models/auth';

import bcrypt from "bcrypt"

import jwt from 'jsonwebtoken'

export const authRegister = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const { email, password } = req.body

        const passwordHash = bcrypt.hashSync(password, 10)


        const user = await User.create({
            email,
            password: passwordHash,
            role: 'user'
        })

        const token = jwt.sign({id: user._id, role: user.role}, process.env.KEY as string, {expiresIn: '4h'})

        res.status(201).json({token})


    } catch (err: any) {
        res.status(400).json({ message: err.message })
    }
}


export const authLogin = async (req: Request, res: Response, next: NextFunction) => {

    try {

        const {email, password} = req.body
        
        const user = await User.findOne({email});

        if(!user) return res.status(400).json({message: 'Invalid credentials'});

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch) return res.status(400).json({message: 'Invalid credentials'});

        const token = jwt.sign({id: user._id, role: user.role}, process.env.KEY as string, {expiresIn: '4h'});
        
        res.status(200).json({token,message: 'Logged in successfully'})
     

    } catch (err: any) {
        res.status(403).json({ message: err.message })
    }
}
