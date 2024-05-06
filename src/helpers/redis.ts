import { getRedisCredentials } from "./getRedisCredentials";

type Command = "zrange" | "sismember" | "get" | "smembers" | "keys";

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
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Error executing command: ${response.statusText}`);
  }

  const data = await response.json();
  return data.result;
}
