import { Helmet } from "react-helmet";

const BASE_URL = "https://www.dsdhj.ng";

const SEO = ({ title, path = "", description }) => {
  const fullUrl = `${BASE_URL}${path}`;

  return (
    <Helmet>
      <title>{title}</title>
      <link rel="canonical" href={fullUrl} />
      {description && <meta name="description" content={description} />}
    </Helmet>
  );
};

export default SEO;
