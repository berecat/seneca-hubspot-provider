export type RegisterUser = {
    name: string;
    email: string;
    password: string;
};
export declare const registerUser: import("joi").ObjectSchema<RegisterUser>;
export type LoginUser = {
    email: string;
    password: string;
};
export declare const loginUser: import("joi").ObjectSchema<LoginUser>;
export type UserJSON = {
    id: number;
    name: string;
    email: string;
};
export declare const user: import("joi").ObjectSchema<any>;
export type AuthResponse = {
    user: UserJSON;
    token: string;
};
export declare const authResponse: import("joi").ObjectSchema<any>;
export declare const withAuthenticationHeader: import("joi").ObjectSchema<any>;
export type UpdateUser = {
    name: string;
    password: string;
    newPassword: string;
};
export declare const updateUser: import("joi").ObjectSchema<UpdateUser>;
