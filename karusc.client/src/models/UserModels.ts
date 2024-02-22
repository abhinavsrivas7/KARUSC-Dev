export type User = {
    email: string,
    profilePicture: string,
    name: string,
    role: Role
};

export type Token = {
    tokenType: string,
    tokenValue: string,
    tokenExpiryTime: string
};

export type StorableUser = {
    user: User,
    tokens: Token[]
};

export type LoginCommand = {
    email: string,
    password: string

};

export type SingupCommand = {
    email: string,
    name: string,
    password: string,
    profilePicture: string
};

export enum Role {
    Customer = 0,
    Administrator = 1
}