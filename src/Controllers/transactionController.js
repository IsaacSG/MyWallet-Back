import db from "../DB/MongoDB.js";
import dayjs from "dayjs";
import { transSchema } from "../Schemas/transactionSchema.js";

export async function getTransactions (req, res) {
    const { user } = res.locals;

    try {
        const transactions = await db
        .collection('transactions')
        .find({ userId: user._id})
        .toArray();

        return res.status(200).send(transactions);
    }

    catch(error) {
        console.log(error);
        return res.sendStatus(500);
    }
}

export async function postTransactions (req, res ) {
    const { value, description, type } = req.body;
    const validate = transSchema.validate({ value, description, type });

    if(validate.error) {
        return res.sendStatus(422);
    }

    try {
        const { user } = res.locals;
        await db
        .collection('transactions')
        .insertOne({
            value,
            description,
            type,
            userId: user._id,
            creatAt: dayjs().format("DD/MM")
        });

        return res.sendStatus(201);
    }

    catch(error) {
        console.log(error);
        return res.sendStatus(500);
    }
}