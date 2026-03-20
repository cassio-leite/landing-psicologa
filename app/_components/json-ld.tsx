import React from "react";

interface ArticleJsonLdProps {
  post: {
    title: string;
    description: string;
    date: string;
    author: string;
    image: string;
    slug: string;
  };
}

export function ArticleJsonLd({ post }: ArticleJsonLdProps) {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.description,
    "image": post.image,
    "datePublished": post.date,
    "dateModified": post.date, // If you have a modified date, use it here
    "author": {
      "@type": "Person",
      "name": post.author,
    },
    "publisher": {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Dra. Kailaine Leite - Psicóloga",
      "logo": {
        "@type": "ImageObject",
        "url": post.image.includes("ansiedade") || post.image.includes("tcc") || post.image.includes("terapia") 
          ? post.image.split("/blog/")[0] + "/images/logo.png" 
          : post.image, // Best effort for logo URL
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
}

interface PersonJsonLdProps {
  name: string;
  jobTitle: string;
  image: string;
  sameAs?: string[];
}

export function PersonJsonLd({ name, jobTitle, image, sameAs }: PersonJsonLdProps) {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": name,
    "jobTitle": jobTitle,
    "image": image,
    "sameAs": sameAs,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
}

interface OrganizationJsonLdProps {
  name: string;
  logo: string;
  url: string;
  contactPoint?: {
    telephone: string;
    contactType: string;
  };
}

export function OrganizationJsonLd({ name, logo, url, contactPoint }: OrganizationJsonLdProps) {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": name,
    "logo": logo,
    "url": url,
    "contactPoint": contactPoint
      ? {
          "@type": "ContactPoint",
          "telephone": contactPoint.telephone,
          "contactType": contactPoint.contactType,
        }
      : undefined,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
}

interface BreadcrumbJsonLdProps {
  items: {
    name: string;
    url: string;
  }[];
}

export function BreadcrumbJsonLd({ items }: BreadcrumbJsonLdProps) {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
}
