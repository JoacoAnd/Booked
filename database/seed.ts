import dummyBooks from "@/dummybooks.json";
import ImageKit from "imagekit";
import { books } from "./schema";
import { config } from "dotenv";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

config({path: ".env.local"});
const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle({client: sql})

const imagekit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
  urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!,
});

const uploadToImageKit = async (url: string, fileName: string, folder: string) => {
  try {
    const response = await imagekit.upload({
        file: url,
        fileName,
        folder,
    })
    return response.filePath
  } catch (error) {
    console.log(error)
  }
};

const seed = async () => {
  try {
    for (const book of dummyBooks) {
      const coverUrl = await uploadToImageKit(book.coverUrl, `${book.title}.jpg`, "/books/covers") as string;
        await db.insert(books).values({
            ...book,
            coverUrl
        })
    }
  } catch (error) {
    console.log("Error seeding data: ", error);
  }
  };

  seed()