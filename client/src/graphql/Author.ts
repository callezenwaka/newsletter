import { gql } from "@apollo/client/core";
// import gql from 'graphql-tag';
export const ADD_AUTHOR = gql`
  mutation addAuthor ($displayName: String!, $email: String!, $phoneNumber: String!, $photoURL: String!, $role: String!, $isActive: Boolean!) {
    addAuthor (displayName: $displayName, email: $email, phoneNumber: $phoneNumber, photoURL: $photoURL, role: $role, isActive: $isActive) {
      id
      displayName
      email
      phoneNumber
      photoURL
      role
      isActive
    }
  }
`;

export const AUTHORS = gql`
  query Authors {
    Authors {
      id
      displayName
      email
      phoneNumber
      photoURL
      role
      isActive
    }
  }
`;

export const AUTHOR = (id: string) => gql`
  # query Author($id: ID!) {
    Author(id: ${id}) {
      id
      displayName
      email
      phoneNumber
      photoURL
      role
      isActive
    }
  # }
`;