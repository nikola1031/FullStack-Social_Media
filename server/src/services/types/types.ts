interface BaseProfileData {
    username?: string;  
    bio?: string;
}

interface EmailAndPassword {
    email: string; 
    password?: string;
}

export type ProfileData = BaseProfileData & EmailAndPassword

export interface Passwords {
    password: string;
    newPassword: string;
    confirmPass: string;
}