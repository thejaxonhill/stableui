import dbClient from "../../prisma/client"

export const registerUser = async (name: string, email: string, externalId: string) => {
    await dbClient.user.create({
        data: {
            name: name,
            email: email,
            externalIds: {
                create: {externalId: externalId}
            }
        }
    })
}