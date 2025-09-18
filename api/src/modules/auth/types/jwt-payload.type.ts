export class JwtPayload {
    tokenType: "access" | "refresh";
    id: string;
}