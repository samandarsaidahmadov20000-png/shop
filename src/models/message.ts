import mongoose, { Schema } from "mongoose";


interface IMessage {
    conversationId: mongoose.Types.ObjectId
    sender: mongoose.Types.ObjectId
    text: string
    isFromAdmin: boolean,
}



const messageSchema = new Schema<IMessage>({
   conversationId: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
   sender: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
   text: {type: String, required: true},
   isFromAdmin: {type: Boolean, default: false}
},{timestamps: true})



const Message = mongoose.model<IMessage>("Message", messageSchema);


export default Message;