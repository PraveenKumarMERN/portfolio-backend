import { Server, Socket } from "socket.io"
import { DefaultEventsMap } from "socket.io/dist/typed-events"
import updateConnection from "./updateConnection"
import dbConnection from "../providers/db"

const initializeConnection = async(io:Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>, socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>) => {
    let { id } = socket.handshake.auth.decoded.user
    const channelData =  await dbConnection.channel.findMany({
        where:{
            users:{
                has:id
            }
        }
    })
    socket.join(id)
    for(let channel of channelData){
        console.log("============channel",channel);
        
        socket.join(channel.id)
    }
    
    return updateConnection(io, socket.handshake.auth.decoded.device.user, true);
}

export default initializeConnection