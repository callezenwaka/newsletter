import axios from "axios";
export const HOSTNAME = 'http://localhost:4000/graphql';
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

export const handleBlur = (event: Event) => {
  const target = event.target as HTMLInputElement;
  target.style.borderColor = target.value
    ? "rgba(229,231,235, 1)"
    : "rgba(255, 0, 0, 1)";
};