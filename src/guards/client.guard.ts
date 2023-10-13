import { BadRequestException, CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Admin } from "../admin/models/admin.model";
import { Client } from "../client/models/client.model";

@Injectable()
export class ClientGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService) {}
    
    canActivate(context: ExecutionContext){
        const req = context.switchToHttp().getRequest();
        const authHeader = req.headers.authorization;
        if(!authHeader) {
            throw new UnauthorizedException('Client unauthorized')
        };

        const bearer = authHeader.split(' ')[0];
        const token = authHeader.split(' ')[1];
        if(bearer!= 'Bearer' || !token) {
            throw new UnauthorizedException('Client unauthorized')
        };

        async function verify(token:string, jwtService:JwtService) {
            const client: Partial<Client> = await jwtService.verify(token, {
                secret:process.env.ACCESS_TOKEN_KEY,
            });
            
            if(!client) {   
                throw new UnauthorizedException('Invalid token provided')
            }
            if(!client.is_active) {   
                throw new BadRequestException('admin is not active')
            }
            return true;
        }

        return verify(token, this.jwtService)
    }
}