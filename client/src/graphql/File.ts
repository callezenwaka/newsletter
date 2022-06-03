import gql from 'graphql-tag';

export const ADD_FILE= gql`
  mutation addFile($file: Upload!) {
    addFile(file: $file,) {
      filename,
      photoURL,
    }
  }
`;