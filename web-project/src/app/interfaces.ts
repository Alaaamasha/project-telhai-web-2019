export interface IUser {
    username: string;
    email: string;
    id?:string;
    imageUrl?:string;
    friendsList?:[];
    friendsRequestList?:[];
    posts?:[]
}   