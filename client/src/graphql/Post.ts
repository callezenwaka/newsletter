// import { gql } from "@apollo/client/core";
import gql from 'graphql-tag';

export const ADD_POST = gql`
  mutation addPost ($title: String!, $content: String!, $date: DateType!, $photoURL: String!, $authorId: String!, $isPublished: Boolean!) {
    addPost (title: $title, content: $content, date: $date, photoURL: $photoURL, authorId: $authorId, isPublished: $isPublished) {
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
      }
    }
  }
`;

export const UPDATE_POST = gql`
  mutation updatePost ($id: ID!, $title: String!, $content: String!, $date: DateType!, $photoURL: String!, $authorId: String!, $isPublished: Boolean!) {
    updatePost (id: $id, title: $title, content: $content, date: $date, photoURL: $photoURL, authorId: $authorId, isPublished: $isPublished) {
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
      }
    }
  }
`;

export const DELETE_POST = gql`
  mutation deletePost ($id: ID!) {
    deletePost (id: $id) {
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
      }
    }
  }
`;

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
      }
    }
  }
`;