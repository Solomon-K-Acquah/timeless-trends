import { ContentWorkspace } from "@/components/admin/content-workspace";

export default async function ContentPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>;
}) {
  const { tab: requestedTab } = await searchParams;
  const supportedTabs = ["stories", "faqs", "messages", "heroes", "promotions", "faq-page", "contact-page"] as const;
  const initialTab = requestedTab === "help" ? "faqs" : supportedTabs.find((tab) => tab === requestedTab) ?? "pages";
  return <ContentWorkspace initialTab={initialTab} />;
}
