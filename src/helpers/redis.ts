import { getRedisCredentials } from "./getRedisCredentials";

type Command = "zrange" | "sismember" | "get" | "smembers" | "keys";

/**
 * Fetches data from Redis using the specified command and arguments.
 * @param command - The Redis command to execute.
 * @param args - The arguments to pass to the Redis command.
 * @returns A Promise that resolves to the result of the Redis command.
 * @throws An error if the command execution fails.
 */
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
