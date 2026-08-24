import { Helmet } from "react-helmet-async";

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  canonical?: string;
  alternateLocale?: { locale: "en" | "hi"; url: string };
}

const SITE_NAME = "CyberWallah";
const DEFAULT_OG = "https://cyberwallah.in/og-image.png";

export default function SEO({
  title,
  description,
  keywords,
  ogImage,
  canonical,
  alternateLocale,
}: SEOProps) {
  const fullTitle = `${title} | ${SITE_NAME}`;
  const image = ogImage || DEFAULT_OG;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      {canonical && <link rel="canonical" href={canonical} />}
      {alternateLocale && (
        <link
          rel="alternate"
          hrefLang={alternateLocale.locale === "hi" ? "hi-IN" : "en"}
          href={alternateLocale.url}
        />
      )}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
}
