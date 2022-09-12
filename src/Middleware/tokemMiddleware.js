import db from "../DB/MongoDB.js";

export async function tokenMiddleware (req, res, next) {
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer", "").trim();

    if(!token) {
        return res.status(401);
    }

    try {
        const securityToken = await db
        .collection('security')
        .findOne({ token });

        if(!securityToken) {
            return res.status(401).send("Token inválido");
        }

        const user = await db
        .collection('users')
        .findOne({ _id: securityToken.userId});

        if(!user) {
            return res.status(401).send("Usuário inválido");
        }

        res.locals.user = user;
        next();
    }

    catch(error) {
        console.log(error);
        return res.status(500);
    }
}