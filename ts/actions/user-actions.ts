"use server"

import { auth } from "@/auth";
import { prisma } from "./shared"
import type { User } from '@prisma/client'

export const getUser = async (): Promise<User | null> => {
    const session = await auth();
    return session?.user?.email
    ? await prisma.user.findUnique({
        where: {
          email: session.user.email
        }
      })
    : null;
}

export const getUserAccounts = async (): Promise<User | null> => {
    const session = await auth();
    return session?.user?.email
    ? await prisma.account.findMany({
        where: {
          user: {
            email: session.user.email
        }
      }})
    : null;
}