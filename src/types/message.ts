import { MessageType } from "@prisma/client";

export type MessagePayloadType = {
  receiverId: string;
  messageType: string;
  image: {
    url: string;
    name: string;
    compressedUrl: string;
  }[];
  type:MessageType;
  user:{
    firstName: string;
} | null
  message: string;
};

export type NewChannelType = {
  name: string;
  users: string[];
  image: string;
};

export type ChannelMessagePayloadType = {
  id: string;
  messageType: string;
  message: string;
  date: Date;
};

export type ChannelPayloadType = {
  sortType: "asc" | "desc";
};

export type GetUserByIdType = {
  id: string;
  type :MessageType
};


export type AddToFavouriteType = {
  favouriteId: string;
  type: MessageType;
};


export type PaginationType = {
  userId?:string
};


export type GetChatByUserId = {
  id: string;
  userId:string;
  page:number,
  limit:number,
  type:MessageType,
  message:string
};



export type MessageReadType = {
  ids:string[]
}


export type TypingType = {
  id:string
}


