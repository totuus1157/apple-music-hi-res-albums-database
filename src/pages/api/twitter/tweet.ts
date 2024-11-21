import { errors } from "jose";
import { NextApiRequest, NextApiResponse } from "next";
import { TwitterApi } from "twitter-api-v2";

const client = new TwitterApi({
  appKey: process.env.TWITTER_API_KEY!,
  appSecret: process.env.TWITTER_API_SECRET!,
  accessToken: process.env.TWITTER_ACCESS_TOKEN!,
  accessSecret: process.env.TWITTER_ACCESS_SECRET!,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  console.log("req.body: ", req.body);

  const { tweetContent } = req.body;

  if (!tweetContent) {
    return res.status(400).json({ error: "Tweet content is required" });
  }

  try {
    const twitterClient = client.readWrite;
    const tweet = await twitterClient.v2.tweet(tweetContent);
    res.status(200).json({ message: "Tweet posted successfully", tweet });
  } catch (err) {
    console.error("Error posting tweet", err);
    res.status(500).json({ error: "Failed to post tweet" });
  }
}
