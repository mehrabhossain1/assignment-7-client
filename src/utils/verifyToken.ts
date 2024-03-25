import { JwtPayload, jwtDecode } from "jwt-decode";

interface CustomJwtPayload extends JwtPayload {
  email: string;
}

export const verifyToken = (token: string) => {
  return jwtDecode(token) as CustomJwtPayload;
};
