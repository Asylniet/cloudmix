This is a [Next.js](https://nextjs.org/) project built with Typescript.

## About the project

The project is not quite complete

**Implemented**:
- Realtime chat messaging
- Requesting and adding users as a friend
- Talk with ChatGPT
- Persisting data in DB
- Auth(made with Google oAuth)

**Not implemented**:
- Proper error handling
- Chat preview's(they are statis right now, always shows predetermined text, but should show the last message)
- Seen/unseen messages functionality
- Searching through messages
- Grouping messages by dates
- Sorting chats by the last message
- Online and last seen status of users
- User profiles as in telegram

## Getting Started

To run the app you will need:

- Create .env.local file and fill it with these props:

  - NEXTAUTH_SECRET: The secret key string used to encrypt the JWT

  - OPENAI_API_KEY: Your OpenAI API key to be able to talk to ChatGPT

  - REDIS_URL: The URL of the your Redis Database
  - REDIS_SECRET: Bearer authorization token used to access the Redis DB
    You can use any provider, I'm using [Upstash](https://upstash.com/)

  - GOOGLE_CLIENT_ID: Google's client id to be able to use google's auth system
  - GOOGLE_CLIENT_SECRET: Token given by Google
    Head to [Google Console](https://console.cloud.google.com/), create the project and grab the [credentials](https://console.cloud.google.com/apis/credentials/)

  - PUSHER_APP_ID: App Id that pusher gives you after creating a [project](https://dashboard.pusher.com/apps/)
  - NEXT_PUBLIC_PUSHER_APP_KEY: App key, made public to be able to use in client components
  - PUSHER_APP_SECRET: Token used to authenticate the pusher server
  - NEXT_PUBLIC_PUSHER_APP_CLUSTER: Cluster determines where is the pusher servers will be located. For Kazakhstan better to use ap2(Singapore), the closest option they provide

- Install all dependencies:

```bash
npm run install
# or
yarn install
# or
pnpm install
# or
bun install
```

- Then run command to run the development server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

- Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Build the project

Run

```bash
npm run build
# or
yarn build
# or
pnpm build
# or
bun build
```

and then

```bash
npm run start
# or
yarn start
# or
pnpm start
# or
bun start
```
