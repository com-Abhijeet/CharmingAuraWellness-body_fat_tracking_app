export interface User {
    userName: string;
    email: string;
    password: string;
    role: string;
    phoneNumber: string;
    address: string;
    createdAt?: Date;
    updatedAt?: Date;
  }