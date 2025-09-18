import { $Enums, User as PrismaUser } from 'generated/prisma';

export class User implements PrismaUser {
    name: string | null;
    id: string;
    email: string;
    passwordHash: string;
    role: $Enums.Role;
    createdAt: Date;
    updatedAt: Date;
}
