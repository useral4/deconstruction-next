import type { Metadata } from "next";
import { HomePage } from "@/components/home-page";
import { JsonLd } from "@/components/json-ld";
import { faq } from "@/content/faq";
import { reviews } from "@/content/reviews";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Демонтажные работы роботами Brokk в СПб и Москве",
  description:
    "Демонтаж зданий, бетона, фундаментов и металлоконструкций роботами Brokk. Собственный парк, проект и смета, работа по всей России.",
  alternates: { canonical: "/" },
};

export default function Page() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faq.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: { "@type": "Answer", text: item.answer },
          })),
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Product",
          name: "Демонтажные работы роботами Brokk",
          brand: { "@type": "Brand", name: siteConfig.name },
          review: reviews.map((item) => ({
            "@type": "Review",
            author: { "@type": "Organization", name: item.author },
            reviewBody: item.text,
          })),
        }}
      />
      <HomePage />
    </>
  );
}
