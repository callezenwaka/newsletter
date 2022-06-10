// import { gql } from "@apollo/client/core";
import gql from 'graphql-tag';
import { useQuery } from '@vue/apollo-composable';


export const POSTS = gql`
  query Posts {
    Posts {
      id
      title
      content
      date
      photoURL
      isPublished
      author {
        id
        displayName
        email
        phoneNumber
        photoURL
        role
        isActive
      }
    }
  }
`;

export const POST = gql`
  query Post($id: ID!) {
    Post(id: $id) {
      id
      title
      content
      date
      photoURL
      isPublished
      author {
        id
        displayName
        email
        phoneNumber
        photoURL
        role
        isActive
      }
    }
  }
`;