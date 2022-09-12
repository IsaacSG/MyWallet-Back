import db from "../DB/MongoDB.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import { authSignInSchema, authSignUpSchema } from "../Schemas/authSchema.js";

export async function signIn (req, res) {
    try {
        const user = req.body;
        const validate = authSignInSchema.validate(user);

        if(validate.error) {
            return res.status(422).send("Preencha todos os campos");
        }
        
        const verifyUser = await db.collection('users').findOne({ email: user.email});

        if(!verifyUser) {
            return res.status(422).send("Email ou senha inválidos");
        }

        const hashPassword = bcrypt.compareSync(user.password, verifyUser.password);

        if(hashPassword) {
            const token = uuid();

            await db.collection('security').insertOne({token, userId: verifyUser._id});

            return  res.status(200).send({token, name: verifyUser.name});
        }

        return res.sendStatus(200);
    }

    catch(error) {
        console.log(error)
        return res.sendStatus(500);

    }
}

export async function signUp (req, res) {
    try {
        const user = req.body;

        const validate = authSignUpSchema.validate(user);

        if(validate.error) {
            return res.status(422).send("Preencha todos os campos");
        }
        const hashPassword = bcrypt.hashSync(user.password, 10);
        console.log(user);

        await db.collection('users').insertOne({
            name: user.name,
            email: user.email,
            password: hashPassword
        });

        return res.sendStatus(201);
    }

    catch(error) {
        console.log(error);
        return res.sendStatus(500);
    }
}