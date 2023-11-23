import { Router } from 'express';
import * as userService from '../services/userService';
import { trimmer } from '../utils/trimmer';

const router = Router();

router.post('/login', async (req, res) => {
    const trimmedBody = trimmer(req.body);
    const { email, password } = trimmedBody;
    try {
        if (!email || !password) {
            throw new Error('All fields are required');
        }

        const user = await userService.login({ email: email.toLocaleLowerCase(), password });
        res.status(200).json(user);
        console.log('logged in')
    } catch (error: any) {
        res.status(400).json({message: error.message})
    }

    
})

router.post('/register', async (req, res) => {
    const trimmedBody = trimmer(req.body);
    const { email, username, password, confirmPass } = trimmedBody;
    
    try {
        if (!email || !username || !password || !confirmPass) {
            throw new Error('All fields are required');
        }

        if (password !== confirmPass) {
            throw new Error('Passwords must match');
        }

        const user = await userService.register({email: email.toLocaleLowerCase(), username, password});
        console.log(user);
        res.status(201).json(user);
    } catch (error: any) {
        res.status(400).json({message: error.message})
    }

})

router.post('/logout', (req, res) => {
    
})

export { router }