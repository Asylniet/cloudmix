import { getRedisCredentials } from "./getRedisCredentials";

type Command = "zrange" | "sismember" | "get" | "smembers";

export async function fetchRedis(
  command: Command,
  ...args: (string | number)[]
) {
  const { url, token } = getRedisCredentials();
  const commandUrl = `${url}/${command}/${args.join("/")}`;
  const response = await fetch(commandUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-cache",
  });

  if (!response.ok) {
    throw new Error(`Error executing command: ${response.statusText}`);
  }

  const data = await response.json();
  return data.result;
}
