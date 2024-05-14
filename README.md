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

## Self reflecting

I know this shouldn't be in README file, but since it is the testing project and I completely failed it with deadlines, I couldn't help but add this section.
**What went well**:

- Learned a lot by making this project
- I had experience working with OpenAI API, which I hadn't had before
- Understood my possibilities and limits
- I was eager to finish the project and it was really funny to make
- Really took time, more than 25 hours I guess. This is good, because good things take time
- This was one of the rare cases when I was sitting whole nights and coding, usually I consider coding as job, this was like a funny quest in a game
  **What went wrong**:
- I got sick
- Since I got sick, I started later, which resulted in deadlines queueing to one tough week
- I physically didn't manage to finish the project on time
- I overestimated my possibilities and therfore had some serius consequences
- As I was going to delve into the project, life opened unexpected side quests and it was extremely hard to handle
- I lacked communication, again. I had a fear that I missed the deadline, so I will not be considered as candidate anymore

Even though this hesitation, I just continued working on the project, not to submit it to you, but just out of curiosity and even planned to add it as a pet project to my portfolio. Then my friend ecnouraged me to submit the work anyway, so here I am. Thank you in advance!
