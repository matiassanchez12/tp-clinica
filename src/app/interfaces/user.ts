export interface IUser {
  id?: string;
  name: string;
  email: string;
  password: string;
  lastName: string;
  age: number;
  dni: number;
  profession?: string;
  socialWorks?: string;
  isAproved: boolean;
  images: string[];
  type: UserType;
}

export type UserType = 'patient' | 'specialist' | 'admin';

export interface IProfession {
  id?: string;
  profession: string;
}
