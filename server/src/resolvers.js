const { create } = require('ipfs-http-client');
const { GraphQLUpload, } = require('graphql-upload');
const { createReadStream, ReadStream } = ('fs');

const photos = [];

const resolvers = {
  // This maps the `Upload` scalar to the implementation provided
  // by the `graphql-upload` package.
  Upload: GraphQLUpload,

  Query: {
    collections () {
      return photos
    }
  },

  Mutation: {
    singleUpload: async (parent, { file }) => {
      // console.info(file);
      const { createReadStream, filename, mimetype, encoding, buffer } = await file;
      // console.info(createReadStream);

      try {
        // let buffer = '';


        // var readStream = createReadStream();
        // const chunks = [];

        // readStream.on('data', chunk => {
        //   // data += chunk;
        //   // console.log(chunk);
        //   chunks.push(chunk);
        // }
         
        // //   chunk => {
        // //   console.log('---------------------------------');
        // //   console.log(chunk);
        // //   console.log('---------------------------------');
        // // }
        // );

        // // readStream.on('open', () => {
        // //   console.log('Stream opened...');
        // // });

        // readStream.on('end', () => {
        //   buffer = Buffer.concat(chunks);
        //   // console.log(buffer);
        //   console.log('Stream Closed...');
        // });

        // Invoking the `createReadStream` will return a Readable Stream.
        // See https://nodejs.org/api/stream.html#stream_readable_streams
        // const stream = createReadStream();

        // This is purely for demonstration purposes and will overwrite the
        // local-file-output.txt in the current working directory on EACH upload.
        // const out = require('fs').createWriteStream('local-file-output.txt');
        // stream.pipe(out);
        // await finished(out);


        // const stream = createReadStream();
        // const chunks = [];

        // await new Promise((resolve, reject) => {
        //   let buffer;

        //   stream.on('data', function (chunk) {
        //     chunks.push(chunk);
        //   });

        //   stream.on('end', function () {
        //     buffer = Buffer.concat(chunks);
        //     resolve(buffer);
        //   });

        //   stream.on('error', reject);
        // });

        // const buffer = Buffer.concat(chunks);
        // console.info(buffer);

        // const stream = createReadStream();
        // // stream.setEncoding("utf8");

        // const buffer = await new Promise((resolve, reject) => {
        //   let data = "";
          
        //   stream.on("data", chunk => data += chunk);
        //   stream.on("end", () => resolve(data));
        //   stream.on("error", error => reject(error));
        // });
        // // console.info(buffer);
        // // let buffer = Buffer.from(file, 'base64');
        console.info("buffer: ", buffer);

        // console.info(file);


        // const buffer = Buffer.from(file);
        // console.info(await file);

        // const client = create({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });
        // // const result = await client.add(Buffer.from(buffer));
        // const result = await client.add(buffer);
        // const fileURL = `https://ipfs.infura.io/ipfs/${result.path}`;
        // console.info(fileURL);

        // return { fileURL };
        return {filename, mimetype, encoding};
      } catch (error) {
        console.log(error)
      }
    },
  },
};

module.exports = resolvers