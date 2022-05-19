const { GraphQLUpload, } = require('graphql-upload');

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
      const { createReadStream, filename, mimetype, encoding } = await file;
      console.info(filename);

      try {
        // Invoking the `createReadStream` will return a Readable Stream.
        // See https://nodejs.org/api/stream.html#stream_readable_streams
        // const stream = createReadStream();

        // This is purely for demonstration purposes and will overwrite the
        // local-file-output.txt in the current working directory on EACH upload.
        // const out = require('fs').createWriteStream('local-file-output.txt');
        // stream.pipe(out);
        // await finished(out);

        return { filename, mimetype, encoding };
      } catch (error) {
        console.log(error)
      }
    },
  },
};

module.exports = resolvers