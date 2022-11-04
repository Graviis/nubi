import { NextApiRequest, NextApiResponse } from "next"
import bcrypt from 'bcrypt'

import { registerAuthSchema } from "@/lib/validations/auth";
import prisma from "@/lib/db";

async function register(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(405).send("Method not allowed");
    }
    const { body } = req;
    const result = await registerAuthSchema.safeParseAsync(JSON.parse(body))

    if (!result.success) {
        return res.status(400).send(result.error.errors)
    }
    const { name, email, password } = result.data;
    try {

        const userInDb = await prisma.user.findFirst({
            where: {
                email: email
            },
            select: {
                email: true,
                password: true
            }
        })
        if (userInDb) {
            return res.status(403).send({ "email": "This email is already registered." })
        }

        const salt = await bcrypt.genSalt(10);
        const hashed_password = await bcrypt.hash(password, salt);
        await prisma.user.create({
            data: {
                name: name,
                email: email,
                password: hashed_password
            }
        })

        return res.status(201).send({})
    } catch (e) {
        return res.status(400).send({ 'message': "Something went wrong" })
    }
}

export default register