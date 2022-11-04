import { z } from 'zod'

export const loginAuthSchema = z.object({
    email: z.string().email(),
    password: z.string().min(4)
})

export const registerAuthSchema = z.object({
    name: z.string().min(4),
    email: z.string().email(),
    password: z.string().min(4)
})