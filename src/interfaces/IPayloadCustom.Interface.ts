import { JwtPayload } from "jsonwebtoken";

interface CustomJwtPayload extends JwtPayload {
    iatDate?: Date;
    expDate?: Date;
}


export default CustomJwtPayload;