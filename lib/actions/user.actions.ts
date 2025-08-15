"use server";

import { revalidatePath } from "next/cache";

import prismadb from "@/lib/prismadb";

// CREATE

export async function createUser(user: any) {
  try {
    const newUser = await prismadb.user.create({
      data: user,
    });

    return newUser;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create user");
  }
}

// READ
export async function getUserById(userId: string){
  try {
    const user = await prismadb.user.findUnique({
      where: { clerkId: userId },
    });

    if (!user) throw new Error("User not found");

    return user;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to get user");
  }
}


// UPDATE
export async function updateUser(clerkId: string, user: any){
  try {
    const updatedUser = await prismadb.user.update({
      where: { clerkId },
      data: user,
    });

    if (!updatedUser) throw new Error("User update failed");

    return updatedUser;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to update user");
  }
}

// DELETE
export async function deleteUser(clerkId: string) {
  try {
    // Find user to delete
    const userToDelete = await prismadb.user.findUnique({
      where: { clerkId },
    });

    if (!userToDelete) {
      throw new Error("User not found");
    }

    // Delete user
    const deletedUser = await prismadb.user.delete({
      where: { id: userToDelete.id },
    });

    revalidatePath("/");

    return deletedUser;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to delete user");
  }
}

// USE CREDITS
export async function updateCredits(userId: string, creditFee: number) {
  try {
    const updatedUserCredits = await prismadb.user.update({
      where: { id: userId },
      data: {
        generations: {
          decrement: creditFee,
        },
      },
    });

    if (!updatedUserCredits) throw new Error("User credits update failed");

    return updatedUserCredits;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to update credits");
  }
}

// CHECK CREDITS
export async function checkUserCredits(userId: string, price: number){
  try {
    const user = await prismadb.user.findUnique({
      where: { clerkId: userId },
    });

    if (!user) {
      throw new Error("User not found");
    }

    if(price>user.generations){
      return false;
    }
    else{
      return true;
    }
  } catch (error) {
    console.error(error);
    throw new Error("Failed to check user credits");
  }
}

export const decreaseCredits = async (userId: string, price:number) => {
  try {

    const user = await prismadb.user.findUnique({
      where: { clerkId: userId },
    });

    if (!user) {
      throw new Error("User not found");
    }

    if (user) {
      await prismadb.user.update({
        where: { clerkId: userId },
        data: { generations: user.generations - price },
      });
    }
    
  } catch (error) {
    console.error(error);
    throw new Error("Failed to decrease credits");
  }
};