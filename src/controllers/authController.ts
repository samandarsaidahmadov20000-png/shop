import { Request, Response, NextFunction } from 'express';

import User from '../models/auth';

import bcrypt from "bcrypt"


export const authRegister = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const { email, password } = req.body

        const passwordHash = bcrypt.hashSync(password, 10)


        const user = await User.create({
            email,
            password: passwordHash,
            role: 'user'
        })

        res.status(201).json({ message: 'User registered successfully' })


    } catch (err: any) {
        res.status(400).json({ message: err.message })
    }
}


export const authLogin = async (req: Request, res: Response, next: NextFunction) => {

    try {


        

    } catch (err: any) {
        res.status(403).json({ message: err.message })
    }
}
