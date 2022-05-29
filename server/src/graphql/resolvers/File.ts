import { GraphQLList } from "graphql";
import { UploadType, FileType } from '../types/index';
import path from "path";
import  fs from "fs";

export const Files = {
  type: new GraphQLList(FileType),
  resolve(root: any, args: any, context: any) {
    return [];
  },
};

export const addFile = {
  type: FileType,
  args: { file: { type: UploadType } },
  async resolve(parent: any, { file }: any, context: any) {
    const os = require("os");

// check the available memory
const userHomeDir = os.homedir();
    const { createReadStream, filename } = await file.file;
    const stream = createReadStream();
    const name = Date.now()+'_'+filename;
    const pathName = path.join(dirname, `/public/images/${name}`);
    await stream.pipe(fs.createWriteStream(pathName));
    // console.info(pathName);
    // console.info(await file.file);

    return { 
      photoURL: `http://localhost:4000/images/${name}`,
      filename: filename,
    }
  }
}