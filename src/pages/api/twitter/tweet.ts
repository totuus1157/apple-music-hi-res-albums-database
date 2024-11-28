import { NextApiRequest, NextApiResponse } from "next";
import { TwitterApi } from "twitter-api-v2";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Validate environment variables
  const {
    TWITTER_API_KEY,
    TWITTER_API_SECRET,
    TWITTER_ACCESS_TOKEN,
    TWITTER_ACCESS_SECRET,
  } = process.env;
  if (
    !TWITTER_API_KEY ||
    !TWITTER_API_SECRET ||
    !TWITTER_ACCESS_TOKEN ||
    !TWITTER_ACCESS_SECRET
  ) {
    return res.status(500).json({ error: "Server configuration error" });
  }

  const client = new TwitterApi({
    appKey: TWITTER_API_KEY,
    appSecret: TWITTER_API_SECRET,
    accessToken: TWITTER_ACCESS_TOKEN,
    accessSecret: TWITTER_ACCESS_SECRET,
  });

  try {
    const { tweetContent }: { tweetContent: string } = req.body;

    if (!tweetContent || typeof tweetContent !== "string") {
      return res
        .status(400)
        .json({ error: "Tweet content is required and must be a string" });
    }

    const twitterClient = client.readWrite;
    const tweet = await twitterClient.v2.tweet(tweetContent);

    res.status(200).json({
      message: "Tweet posted successfully",
      tweetId: tweet.data.id,
    });
  } catch (err) {
    console.error("Error posting tweet", err);
    res.status(500).json({ error: "Failed to post tweet" });
  }
}
