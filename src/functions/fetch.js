import fetch from "node-fetch";

export async function handler(event, context) {
    return await fetch("https://official-joke-api.appspot.com/jokes/programming/random")
    .then(res => res.json())
    .then(res => {
        console.log(context)
      return {
        statusCode: 200,
        body: JSON.stringify(res[0])
      };
    })
}
