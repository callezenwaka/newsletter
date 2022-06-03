import axios from "axios";
export const HOSTNAME = 'http://localhost:4001/graphql';
// export const HOSTNAME = `https://fullstack-graphql-ucl.herokuapp.com/graphql`;

// export const client = () => {
//   return {
//     method: "POST",
//     url: `${HOSTNAME}`,
//     headers: {
//       'content-type': 'application/json',
//       'Accept': 'application/json',
//     }
//   };
// }

export const client = async (data: string) => {
  const res = await axios({
    method: "POST",
    url: `${HOSTNAME}`,
    data: data,
    headers: {
      'content-type': 'application/json',
      'Accept': 'application/json',
    }
  });

  return res.data;
}