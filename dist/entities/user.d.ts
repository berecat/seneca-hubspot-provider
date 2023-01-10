export declare class User {
    id: number;
    name: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    hashPassword(): Promise<void>;
    checkPassword(plainPassword: string): boolean;
}
