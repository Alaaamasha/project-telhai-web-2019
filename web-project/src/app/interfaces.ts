export interface IUser {
    username: string;
    email: string;
    id?:string;
    imageUrl?:string;
    friendsList?:[];
    friendsRequestList?:[];
    posts?:[]
}
 
export interface IPost {
    text : string;
    username: string;
    imageUrl:string;    
}
export interface IFriendRequest {
    username: string;
    id:string;
    imageUrl:string;
}