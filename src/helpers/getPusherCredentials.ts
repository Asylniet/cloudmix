export const getPusherServerCredentials = () => {
  const pusherAppId = process.env.PUSHER_APP_ID;
  const pusherKey = process.env.NEXT_PUBLIC_PUSHER_APP_KEY;
  const pusherSecret = process.env.PUSHER_APP_SECRET;
  const pusherCluster = process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTER;

  if (!pusherAppId || pusherAppId.length === 0) {
    throw new Error("Missing PUSHER_APP_ID");
  }

  if (!pusherKey || pusherKey.length === 0) {
    throw new Error("Missing PUSHER_APP_KEY");
  }

  if (!pusherSecret || pusherSecret.length === 0) {
    throw new Error("Missing PUSHER_APP_SECRET");
  }

  if (!pusherCluster || pusherCluster.length === 0) {
    throw new Error("Missing PUSHER_APP_CLUSTER");
  }

  return {
    appId: pusherAppId,
    key: pusherKey,
    secret: pusherSecret,
    cluster: pusherCluster,
  };
};

export const getPusherClientCredentials = () => {
  const pusherKey = process.env.NEXT_PUBLIC_PUSHER_APP_KEY;
  const pusherCluster = process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTER;

  if (!pusherKey || pusherKey.length === 0) {
    throw new Error("Missing PUSHER_APP_KEY");
  }

  if (!pusherCluster || pusherCluster.length === 0) {
    throw new Error("Missing PUSHER_APP_CLUSTER");
  }

  return {
    key: pusherKey,
    cluster: pusherCluster,
  };
};
