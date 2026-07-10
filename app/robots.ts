import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/submit",
          "/edit",
          "/view",
          "/profile",
          "/dashboard",
          "/messages",
          "/audit-reviews",
          "/manuscripts",
          "/issuing",
          "/admin",
          "/edit-manuscript",
          "/send-archive",
          "/users",
          "/invite",
        ],
      },
    ],
    sitemap: "https://dsdhj.ng/sitemap.xml",
  };
}
