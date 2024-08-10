'use server'

import { CreateUserParams, UpdateUserParams } from "@/types"
import { handleError } from "../utils";
import { connectToDatabase } from "../database";
import User from "../database/models/user.model";
import Order from "../database/models/user.model";
import Event from "../database/models/user.model";
import { revalidatePath } from "next/cache";

export async function getUserById(userId: string) {
    try {
      await connectToDatabase()
  
      const user = await User.findById(userId)
  
      if (!user) throw new Error('User not found')
      return JSON.parse(JSON.stringify(user))
    } catch (error) {
      handleError(error)
    }
}

export async function createUser(user: CreateUserParams) {
    try {
        await connectToDatabase();

        const newUser = await User.create(user);

        return JSON.parse(JSON.stringify(newUser));
    } catch (error) {
        handleError(error);
    }
}

export async function updateUser(clerkId: string, user: UpdateUserParams) {
    try {
        await connectToDatabase();

        const updatedUser = await User.findOneAndUpdate({ clerkId }, user, { new: true }) 

        if(!updatedUser) throw new Error("User update failed.");
        return JSON.parse(JSON.stringify(updateUser));

    } catch(error) {
        handleError(error);
    }
}

export async function deleteUser(clerkId: string) {
    try {
        await connectToDatabase();

        const userToDelete = await User.findOne({ clerkId });

        if(!userToDelete) {
            throw new Error("User not found.");
        }

        //REGULACIJA REFERENCI!
        await Promise.all([
            // Azuriranje 'events' collection da obrise ref na user
            Event.updateMany(
              { _id: { $in: userToDelete.events } },
              { $pull: { organizer: userToDelete._id } }
            ),
      
            // Azuriranje 'orders' collection da obrise ref na user
            Order.updateMany(
                { _id: { $in: userToDelete.orders } },
                { $unset: { buyer: 1 } }
            ),
        ])

        const deletedUser = await User.findByIdAndDelete(userToDelete._id);
        revalidatePath('/');

        return deletedUser ? JSON.parse(JSON.stringify(deletedUser)) : null;
    } catch(error) {
        handleError(error);
    }
}