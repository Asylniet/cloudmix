export const getGoogleCredentials = () => {
  const googleClientId = process.env.GOOGLE_CLIENT_ID;
  const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;

  if (!googleClientId || googleClientId.length === 0) {
    throw new Error("Missing GOOGLE_CLIENT_ID");
  }

  if (!googleClientSecret || googleClientSecret.length === 0) {
    throw new Error("Missing GOOGLE_CLIENT_SECRET");
  }

  return {
    clientId: googleClientId,
    clientSecret: googleClientSecret,
  };
};
