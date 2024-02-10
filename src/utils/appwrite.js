import { Client, Databases, ID } from "appwrite";

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('65c7569b7b6c68f7cedf');

const databases = new Databases(client);

export default async function createDoc(email) {
   const dbDoc=await databases.createDocument('65c756c6081825e5d5aa', '65c756e00fbaf00ba3dd', ID.unique(), { email })
   if(!dbDoc) throw new Error;
   console.log("DB : ",dbDoc)

}