"use server";
import { redirect } from "next/navigation";
import {revalidatePath} from "next/cache";
import { prisma } from "@/lib/prisma";

export const saveSnippet = async (id: number, code: string) => {
  await prisma.snippet.update({
    where: {
      id,
    },
    data: {
      code,
    },
  });
  revalidatePath(`/snippet/${id}`); //to refresh the cache data after eny change in the data
  redirect(`/snippet/${id}`);
};

export const deleteSnippet = async (id: number) => {
  await prisma.snippet.delete({
    where: {
      id,
    },
  });
    revalidatePath(`/`); //to refresh the cache data on the home page on deletion
  redirect(`/`);
};
export async function createSnippet(
  prevState: { message: string },
  formData: FormData
) {
  try {
    const title = formData.get("title");
    const code = formData.get("code");
    if (typeof title !== "string" || title.length < 3) {
      return {
        message: "Title is required and must be length of 3 or more characters",
      };
    }
    if (typeof code !== "string" || code.length < 6) {
      return {
        message: "Code is required and must be length of 6 or more characters",
      };
    }

    await prisma.snippet.create({
      data: {
        title,
        code,
      },
    });
    // throw new Error("Oops!, Something went wrong");
    revalidatePath(`/`); //to refresh the cache data on the home page on creattio
  } catch (error:unknown) {
    if(error instanceof Error){
        return {message: error.message};
    }else{
        return {message:"Some internal server error"}
    }
  }

  redirect("/");
}
