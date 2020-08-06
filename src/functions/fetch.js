import fetch from "node-fetch";

export async function handler(event, context) {
    return await fetch(process.env.URL)
    .then(res => res.json())
    .then(res => {
        console.log(context)
      return {
        statusCode: 200,
        body: JSON.stringify(res[0])
      };
    })
}
