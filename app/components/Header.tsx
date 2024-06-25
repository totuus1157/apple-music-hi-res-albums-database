import Head from "next/head";

type Props = {
  title: string;
  description: string;
  keywords: string;
  author: string;
  ogTitle?: string;
  ogDescription?: string;
  ogType?: string;
  ogUrl?: string;
  ogImage?: string;
  twitterCard?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
};

export default function Header(props: Props): JSX.Element {
  const {
    title,
    description,
    keywords,
    author,
    ogTitle,
    ogDescription,
    ogType,
    ogUrl,
    ogImage,
    twitterCard,
    twitterTitle,
    twitterDescription,
    twitterImage,
  } = props;

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <link rel="icon" href="/favicon.ico" />

      {/* Open Graph tags */}
      <meta property="og:title" content={ogTitle || title} />
      <meta property="og:description" content={ogDescription || description} />
      <meta property="og:type" content={ogType || "website"} />
      <meta
        property="og:url"
        content={ogUrl || "https://www.applemusichiresalbumsdb.com"}
      />
      <meta property="og:image" content={ogImage || "/default-og-image.jpg"} />

      {/* Twitter Card tags */}
      <meta
        name="twitter:card"
        content={twitterCard || "summary_large_image"}
      />
      <meta name="twitter:title" content={twitterTitle || title} />
      <meta
        name="twitter:description"
        content={twitterDescription || description}
      />
      <meta
        name="twitter:image"
        content={twitterImage || "/default-twitter-image.jpg"}
      />
    </Head>
  );
}
