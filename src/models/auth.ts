import mongoose, { Schema, Document } from "mongoose";



interface IUser extends Document {
    email: string;
    password: string,
    role: 'user' | 'admin',
}




const userSchema = new Schema<IUser>(
    {
        email: {
            type: String,
            required: true,
            match: /.+\@.+\..+/,
        },

        password: {
            type: String,
            required: true,
        },
        role: { type: String, enum: ["user", "admin"], default: "user" },

    }
)



const User = mongoose.model<IUser>("User", userSchema);

export default User;