import bcrypt from 'bcrypt';

const saltRounds = 10;

export const hashPassword = async (password: string) => await bcrypt.hash(password, saltRounds);
export const comparePasswords = async (password: string, hash: string) => await bcrypt.compare(password, hash);