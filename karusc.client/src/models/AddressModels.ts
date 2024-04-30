export type Address = {
    id: string,
    recipient: string,
    line1: string,
    line2: string,
    city: string,
    state: string,
    country: string,
    pincode: string,
    phone: string,
    userId: string
};

export type CreateAddressCommand = {
    recipient: string,
    line1: string,
    line2: string,
    city: string,
    state: string,
    country: string,
    pincode: string,
    phone: string
};

export type UpdateAddressCommand = {
    id: string,
    recipient: string,
    line1: string,
    line2: string,
    city: string,
    state: string,
    country: string,
    pincode: string,
    phone: string
};