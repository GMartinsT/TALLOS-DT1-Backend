import { Injectable } from "@nestjs/common";
import { OnGatewayInit, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from 'socket.io';
import { User } from "src/users/models/user.model";

@Injectable()
@WebSocketGateway(
    3001,

    {
        cors: {
            origin: '*',
        },
    },
)
export class SocketGateway implements OnGatewayInit {
    @WebSocketServer()
    server: Server;

    afterInit(server: Server) {
        server.on('connect', (socket: Socket) => {
            console.log('connected: ', socket.id);
        });

        server.on('disconnect', (socket: Socket) => {
            console.log('disconnected: ', socket.id)
        })
    }

    emitUpdateUser(id: string) {
        this.server.emit('update', id);
        console.log('updated');
    }

    emitRemoveUser(id: string) {
        this.server.emit('removed-user', id);
        console.log('removed');
    }
    emitNewUser(User: User) {
        this.server.emit('new-user', User);
        console.log('created', User);
    }
    emitUserLogged(User: User) {
        this.server.emit('is-logged', User.email);
        console.log(`user logado ${User.email}`);
    }
}