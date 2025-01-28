"use client";

import { Button } from "@heroui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareXTwitter } from "@fortawesome/free-brands-svg-icons";

type Props = { tweetContent: string };

const TweetButton = (props: Props) => {
  const { tweetContent } = props;

  const handleTweet = async (): Promise<void> => {
    try {
      const response = await fetch("api/twitter/tweet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tweetContent }),
      });

      if (!response.ok) {
        const error = await response.json();
        console.error("Error posting tweet:", error);
        alert("Failed to post the tweet.");
        return;
      }

      alert("Tweet posted successfully!");
    } catch (err) {
      console.error("Error", err);
      alert("An unexpected error occurred.");
    }
  };

  return (
    <Button
      size="lg"
      className="bg-transparent text-black shadow-none hover:bg-transparent hover:shadow-none"
      onPress={handleTweet}
    >
      <FontAwesomeIcon icon={faSquareXTwitter} size="2xl" />
    </Button>
  );
};

export default TweetButton;
