import { Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { S3 } from "../../../../libs/s3/s3";
import { FileUploadPayloadType } from "../../../../types/fileUpload";
import { FILE } from "../../../../static/event/eventName";
export class FileController {
  public static async upload(
    socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>,
    data: FileUploadPayloadType
  ) {
    let { id } = socket.handshake.auth.decoded.user;
    let path = `${Date.now()}-${data.name}`;
    const uploadDetails = await S3.getSignedUrl(path, data.mineType);
    console.log("uploadDetails",uploadDetails,path);
    
    return socket.to(id).emit(FILE.FILEUPLOAD, uploadDetails);
  }
}
