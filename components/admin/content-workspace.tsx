"use client";

import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowDown, ArrowUp, Check, Eye, FileText, HelpCircle, MessageCircle, PenLine, Phone, Plus, Search, Send, Sparkles, Star, Tag, Trash2, X } from "lucide-react";
import { SAMPLE_BLOGS, SAMPLE_REVIEWS } from "@/data";
import { Button } from "@/components/ui/button";
import { downloadCsv, showAdminToast } from "./admin-interactions";

type ContentTab = "pages" | "heroes" | "promotions" | "stories" | "faqs" | "faq-page" | "contact-page" | "messages" | "reviews";
type ContentRecord = { id: string; title: string; subtitle: string; content: string; status: string; updatedAt: string; imageUrl?: string; imageAltText?: string; ctaLabel?: string; ctaLink?: string; startsAt?: string; endsAt?: string };
type InboxRecord = { id: string; title: string; subtitle: string; content: string; status: "New" | "Replied" | "Resolved"; updatedAt: string };
type ReviewRecord = { id: string; title: string; subtitle: string; content: string; status: "Pending" | "Published"; updatedAt: string };

const contentTabs: { id: ContentTab; label: string; icon: typeof FileText }[] = [
  { id: "pages", label: "Store pages", icon: FileText },
  { id: "heroes", label: "Homepage hero", icon: Sparkles },
  { id: "promotions", label: "Promotions & ads", icon: Tag },
  { id: "stories", label: "Stories & blog", icon: Sparkles },
  { id: "faqs", label: "FAQs", icon: MessageCircle },
  { id: "faq-page", label: "FAQ page", icon: HelpCircle },
  { id: "contact-page", label: "Contact page", icon: Phone },
  { id: "messages", label: "Customer messages", icon: Send },
  { id: "reviews", label: "Product reviews", icon: Star },
];

const pageSeed: ContentRecord[] = [
  { id: "home", title: "Homepage", subtitle: "Hero, collections, featured products", content: "Redefine your glowing crown. Discover luxury raw hair, skin-loving cosmetics and everyday essentials made to help your beauty shine.", status: "Published", updatedAt: "Sep 28, 2026" },
  { id: "our-story", title: "Our Story", subtitle: "The Timeless Trends story", content: "Timeless Trends began with a simple belief: every person deserves to feel at home in their own beauty. We bring together thoughtful hair, cosmetics and care essentials made for your everyday ritual.", status: "Published", updatedAt: "Sep 26, 2026" },
  { id: "about", title: "About us", subtitle: "Brand values and craftsmanship", content: "We pair considered craftsmanship with honest ingredients and a personal touch, helping every customer find the products that feel like them.", status: "Published", updatedAt: "Sep 22, 2026" },
  { id: "contact", title: "Contact", subtitle: "Support details and contact form", content: "Our beauty-care team is here to help. Send a note and we will get back to you within one business day.", status: "Published", updatedAt: "Sep 19, 2026" },
  { id: "faq", title: "Frequently asked questions", subtitle: "Shipping, returns and product care", content: "Answers to the questions customers ask most about delivery, returns, wig care, ingredients and finding the right shade.", status: "Published", updatedAt: "Sep 18, 2026" },
  { id: "privacy", title: "Privacy policy", subtitle: "Customer data and privacy", content: "Learn what information is collected when you shop and how Timeless Trends protects and uses customer data.", status: "Published", updatedAt: "Sep 12, 2026" },
  { id: "terms", title: "Terms of service", subtitle: "Store terms and conditions", content: "The terms that apply when browsing and placing an order through the Timeless Trends online store.", status: "Draft", updatedAt: "Sep 08, 2026" },
];

const faqSeed: ContentRecord[] = [
  { id: "faq-shipping", title: "How long does shipping take?", subtitle: "Shipping · 18 helpful votes", content: "Orders are prepared within 1–2 business days. Domestic delivery typically takes 3–5 business days after dispatch.", status: "Published", updatedAt: "Sep 27, 2026" },
  { id: "faq-returns", title: "What is your return policy?", subtitle: "Returns · 12 helpful votes", content: "Unused products in original packaging can be returned within 30 days. Please contact support to start a return.", status: "Published", updatedAt: "Sep 24, 2026" },
  { id: "faq-hair", title: "How should I care for my human-hair wig?", subtitle: "Product care · 9 helpful votes", content: "Detangle gently before washing, use a sulfate-free shampoo and conditioner, and air dry on a wig stand.", status: "Draft", updatedAt: "Sep 21, 2026" },
];

const heroSeed: ContentRecord[] = [
  { id: "homepage-hero", title: "The glowing crown hero", subtitle: "Luxury Quality Certified", content: "Indulge in 100% raw virgin HD Lace Wigs and skin-loving serum cosmetics designed by master trichologists and elite cosmetic chemists. Built for your supreme everyday glamour.", imageUrl: "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&q=80&w=1200", imageAltText: "Model wearing a styled lace-front wig", ctaLabel: "Shop Luxury Wigs", ctaLink: "/shop?category=Human%20Hair%20Wigs", status: "Published", updatedAt: "Sep 28, 2026" },
  { id: "hero-cosmetics", title: "Explore cosmetics feature", subtitle: "Beauty that feels like you", content: "Find skin-loving formulas, expressive shades, and everyday finishing touches in the Timeless Trends cosmetics collection.", imageUrl: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&q=80&w=1200", imageAltText: "A curated assortment of color cosmetics", ctaLabel: "Explore Cosmetics", ctaLink: "/shop?category=Cosmetics", status: "Draft", updatedAt: "Sep 25, 2026" },
];

const promotionSeed: ContentRecord[] = [
  { id: "announcement-bar", title: "Announcement bar", subtitle: "Complimentary shipping on orders over $100", content: "Promote your current store-wide offer. Keep the message concise and link customers to the relevant collection or discount.", ctaLabel: "Shop now", ctaLink: "/shop", status: "Published", updatedAt: "Sep 29, 2026" },
  { id: "wig-spotlight", title: "Lace Front Spotlight", subtitle: "A flawless fit, made for your moment", content: "Feature this week's most-loved lace front styles and invite shoppers to discover the collection.", imageUrl: "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&q=80&w=900", imageAltText: "Lace-front wig collection campaign image", ctaLabel: "Discover the collection", ctaLink: "/shop?category=Human%20Hair%20Wigs", status: "Published", updatedAt: "Sep 27, 2026" },
  { id: "autumn-glow", title: "Autumn glow promotion", subtitle: "15% off your seasonal beauty edit", content: "Seasonal campaign creative for the homepage promotional banner.", imageUrl: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=900", imageAltText: "Skincare products arranged for the autumn campaign", ctaLabel: "Shop the edit", ctaLink: "/shop", status: "Draft", updatedAt: "Sep 24, 2026" },
];

const faqPageSeed: ContentRecord[] = [
  { id: "faq-page", title: "Support Center FAQ", subtitle: "Frequently Asked Questions", content: "Get near-instant answers about lace melting thresholds, shipping parcel routes, and wholesale stylist accounts. Still have a question? Our luxury styling concierge is available to help.", ctaLabel: "Email Concierge Desk", ctaLink: "mailto:concierge@timelesstrends.com", status: "Published", updatedAt: "Sep 28, 2026" },
];

const contactPageSeed: ContentRecord[] = [
  { id: "contact-page", title: "Store Concierge", subtitle: "Get In Touch", content: "Flagship HQ Salon\nLocated directly within the historic fashion district. Pop by for professional lace wig mapping, weft matching, and customized cosmetics shade testing.\n\nAddress: 128 Luxury Boulevard, Suite 500, San Francisco, CA 94107\nPhone: +1 (800) Luxury-Hair\nEmail: concierge@timelesstrends.com\nHours: Monday–Saturday, 9:00 AM–8:00 PM; Sunday, 11:00 AM–6:00 PM PST\n\nConsultations: Virtual hair consultations are available by appointment.", ctaLabel: "Book Skype Consultation", ctaLink: "mailto:concierge@timelesstrends.com", status: "Published", updatedAt: "Sep 27, 2026" },
];

const messageSeed: InboxRecord[] = [
  { id: "msg-1", title: "Question about wig sizing", subtitle: "Olivia Rhye · olivia.r@email.com", content: "I am between sizes and would love to know if the Luxe HD wig has an adjustable cap. Thank you!", status: "New", updatedAt: "Today, 10:42 AM" },
  { id: "msg-2", title: "Tracking my recent order", subtitle: "Phoenix Baker · phoenix@email.com", content: "My order shipped yesterday. Could you please help me find the latest tracking update?", status: "New", updatedAt: "Today, 9:18 AM" },
  { id: "msg-3", title: "Ingredient question", subtitle: "Lana Steiner · lana@email.com", content: "Is the White Caviar shampoo suitable for color-treated hair?", status: "Replied", updatedAt: "Yesterday" },
];

const schema = z.object({
  title: z.string().trim().min(3, "Use at least 3 characters for the title."),
  subtitle: z.string().trim().min(3, "Add a short description."),
  content: z.string().trim().min(10, "Add at least 10 characters of page content."),
  status: z.enum(["Draft", "Published", "New", "Replied", "Resolved", "Pending"]),
  imageUrl: z.string().trim().refine((value) => !value || /^https?:\/\/\S+$/i.test(value), "Enter an image URL beginning with http:// or https://.").or(z.literal("")),
  imageAltText: z.string().trim(),
  ctaLabel: z.string().trim(),
  ctaLink: z.string().trim(),
  startsAt: z.string().refine((value) => !value || /^\d{4}-\d{2}-\d{2}$/.test(value), "Choose a valid start date."),
  endsAt: z.string().refine((value) => !value || /^\d{4}-\d{2}-\d{2}$/.test(value), "Choose a valid end date."),
}).refine((values) => !values.startsAt || !values.endsAt || values.endsAt >= values.startsAt, {
  message: "End date must be on or after the start date.",
  path: ["endsAt"],
}).refine((values) => !values.imageUrl || values.imageAltText.length > 0, {
  message: "Add descriptive alt text for the campaign image.",
  path: ["imageAltText"],
});
type ContentValues = z.infer<typeof schema>;

const inputClass = "mt-1.5 h-10 w-full rounded-lg border border-[#e9e4df] bg-white px-3 text-xs text-[#332d29] outline-none focus:border-[#c07b61] focus:ring-2 focus:ring-[#c07b61]/10";

export function ContentWorkspace({ initialTab = "pages" }: { initialTab?: ContentTab }) {
  const [tab, setTab] = useState<ContentTab>(initialTab);
  const [pages, setPages] = useState(pageSeed);
  const [heroes, setHeroes] = useState(heroSeed);
  const [promotions, setPromotions] = useState(promotionSeed);
  const [stories, setStories] = useState<ContentRecord[]>(SAMPLE_BLOGS.map((story) => ({
    id: story.id,
    title: story.title,
    subtitle: `${story.category} · ${story.readTime} read`,
    content: story.content.join("\n\n"),
    status: "Published",
    updatedAt: story.date,
  })));
  const [faqs, setFaqs] = useState(faqSeed);
  const [faqPage, setFaqPage] = useState(faqPageSeed);
  const [contactPage, setContactPage] = useState(contactPageSeed);
  const [messages, setMessages] = useState(messageSeed);
  const [reviews, setReviews] = useState<ReviewRecord[]>([
    ...SAMPLE_REVIEWS.map((review) => ({
      id: review.id,
      title: review.title,
      subtitle: `${review.author} · ${review.rating}/5${review.verified ? " · Verified purchase" : ""}`,
      content: review.text,
      status: review.verified ? "Published" as const : "Pending" as const,
      updatedAt: review.date,
    })),
    { id: "rev-pending", title: "A little too much fragrance", subtitle: "Janelle P. · 3/5 · New review", content: "The moisturizer feels lovely and keeps my skin soft, but I would prefer a lighter fragrance. The packaging was beautiful and delivery was quick.", status: "Pending", updatedAt: "Today, 8:24 AM" },
  ]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [editing, setEditing] = useState<ContentRecord | null>(null);
  const [previewing, setPreviewing] = useState<ContentRecord | null>(null);
  const [pendingDelete, setPendingDelete] = useState<ContentRecord | null>(null);
  const [createOpen, setCreateOpen] = useState(false);
  const [replying, setReplying] = useState<InboxRecord | null>(null);
  const [replyText, setReplyText] = useState("");
  const form = useForm<ContentValues>({ resolver: zodResolver(schema), defaultValues: { title: "", subtitle: "", content: "", status: "Draft", imageUrl: "", imageAltText: "", ctaLabel: "", ctaLink: "", startsAt: "", endsAt: "" } });

  const records = tab === "pages" ? pages : tab === "heroes" ? heroes : tab === "promotions" ? promotions : tab === "stories" ? stories : tab === "faqs" ? faqs : tab === "faq-page" ? faqPage : tab === "contact-page" ? contactPage : tab === "messages" ? messages : reviews;
  const filtered = useMemo(() => records.filter((item) => {
    const matchesText = `${item.title} ${item.subtitle} ${item.content}`.toLocaleLowerCase().includes(search.trim().toLocaleLowerCase());
    return matchesText && (statusFilter === "All" || item.status === statusFilter);
  }), [records, search, statusFilter]);
  const statuses = tab === "messages" ? ["New", "Replied", "Resolved"] : tab === "reviews" ? ["Pending", "Published"] : ["Draft", "Published"];
  const listTitle = tab === "pages" ? "Storefront pages" : tab === "heroes" ? "Homepage hero sections" : tab === "promotions" ? "Promotions and advertising" : tab === "stories" ? "Stories and articles" : tab === "faqs" ? "FAQ questions and answers" : tab === "faq-page" ? "FAQ page content" : tab === "contact-page" ? "Contact page details" : tab === "messages" ? "Customer inbox" : "Product reviews";
  const singletonTab = tab === "faq-page" || tab === "contact-page";
  const addLabel = singletonTab ? `${records.length ? "Edit" : "Create"} ${tab === "faq-page" ? "FAQ" : "contact"} page` : tab === "stories" ? "Add story" : tab === "faqs" ? "Add FAQ" : tab === "heroes" ? "Add hero section" : tab === "promotions" ? "Add promotion" : "Add page";
  const setContentRecords = tab === "pages" ? setPages : tab === "heroes" ? setHeroes : tab === "promotions" ? setPromotions : tab === "stories" ? setStories : tab === "faq-page" ? setFaqPage : tab === "contact-page" ? setContactPage : setFaqs;

  const openEdit = (record: ContentRecord) => {
    setEditing(record);
    form.reset({ title: record.title, subtitle: record.subtitle, content: record.content, status: record.status as ContentValues["status"], imageUrl: record.imageUrl ?? "", imageAltText: record.imageAltText ?? "", ctaLabel: record.ctaLabel ?? "", ctaLink: record.ctaLink ?? "", startsAt: record.startsAt ?? "", endsAt: record.endsAt ?? "" });
  };
  const openCreate = () => {
    setEditing(null);
    form.reset({ title: "", subtitle: "", content: "", status: "Draft", imageUrl: "", imageAltText: "", ctaLabel: "", ctaLink: "", startsAt: "", endsAt: "" });
    setCreateOpen(true);
  };
  const saveRecord = form.handleSubmit((values) => {
    const next: ContentRecord = { id: editing?.id ?? `${tab}-${records.length + 1}-${values.title.toLocaleLowerCase().replaceAll(" ", "-")}`, ...values, updatedAt: "Just now" };
    if (tab === "messages") {
      setMessages((current) => editing ? current.map((item) => item.id === editing.id ? { ...item, ...next, status: values.status as InboxRecord["status"] } : item) : current);
    } else if (tab === "reviews") {
      setReviews((current) => editing ? current.map((item) => item.id === editing.id ? { ...item, ...next, status: values.status as ReviewRecord["status"] } : item) : current);
    } else {
      setContentRecords((current) => editing ? current.map((item) => item.id === editing.id ? next : item) : [next, ...current]);
    }
    setEditing(null);
    setCreateOpen(false);
    showAdminToast(`${next.title} ${editing ? "saved" : "added"} in demo content.`);
  });
  const deleteRecord = () => {
    if (!pendingDelete) return;
    if (tab === "messages") setMessages((current) => current.filter((item) => item.id !== pendingDelete.id));
    else if (tab === "reviews") setReviews((current) => current.filter((item) => item.id !== pendingDelete.id));
    else setContentRecords((current) => current.filter((item) => item.id !== pendingDelete.id));
    showAdminToast(`${pendingDelete.title} deleted from demo content.`);
    setPendingDelete(null);
  };
  const togglePublish = (record: ContentRecord) => {
    const updated = { ...record, status: record.status === "Published" ? "Draft" : "Published", updatedAt: "Just now" };
    setContentRecords((current) => current.map((item) => item.id === record.id ? updated : item));
    showAdminToast(`${record.title} is now ${updated.status.toLowerCase()}.`);
  };
  const moveRecord = (record: ContentRecord, direction: -1 | 1) => {
    const index = records.findIndex((item) => item.id === record.id);
    const nextIndex = index + direction;
    if (index < 0 || nextIndex < 0 || nextIndex >= records.length) return;
    const reordered = [...records];
    [reordered[index], reordered[nextIndex]] = [reordered[nextIndex], reordered[index]];
    setContentRecords(reordered);
    showAdminToast(`${record.title} moved ${direction < 0 ? "up" : "down"} in the placement order.`);
  };
  const exportRecords = () => downloadCsv(`timeless-${tab}.csv`, filtered.map(({ title, subtitle, status, updatedAt }) => ({ title, details: subtitle, status, updatedAt })));

  const markMessage = (record: InboxRecord, status: InboxRecord["status"]) => {
    setMessages((current) => current.map((message) => message.id === record.id ? { ...message, status } : message));
    showAdminToast(`${record.title}: marked ${status.toLowerCase()}.`);
  };
  const sendReply = () => {
    if (!replying || replyText.trim().length < 3) return;
    setMessages((current) => current.map((message) => message.id === replying.id ? { ...message, status: "Replied" } : message));
    showAdminToast(`Reply to ${replying.subtitle.split(" · ")[0]} saved as sent in demo mode.`);
    setReplying(null);
    setReplyText("");
  };
  const toggleReview = (record: ReviewRecord) => {
    const status = record.status === "Published" ? "Pending" : "Published";
    setReviews((current) => current.map((review) => review.id === record.id ? { ...review, status } : review));
    showAdminToast(`Review ${status === "Published" ? "published" : "hidden"} in demo mode.`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div><p className="mb-1 text-[11px] font-semibold uppercase tracking-[.14em] text-[#b75b3a]">Storefront</p><h1 className="text-[30px] font-semibold tracking-[-.04em]">Content studio</h1><p className="mt-1 text-sm text-[#8b837d]">Shape your pages, share your story, and care for your community.</p></div>
        {tab !== "messages" && tab !== "reviews" && <Button type="button" onClick={singletonTab && records[0] ? () => openEdit(records[0] as ContentRecord) : openCreate} className="h-9 w-fit rounded-lg bg-[#292321] px-3.5 text-xs text-white hover:bg-[#463a35]">{singletonTab && records[0] ? <PenLine size={14} /> : <Plus size={14} />} {addLabel}</Button>}
      </div>
      <div className="flex flex-wrap gap-1 rounded-xl border border-[#eeebe8] bg-white p-1.5">
        {contentTabs.map(({ id, label, icon: Icon }) => <button key={id} type="button" onClick={() => { setTab(id); setSearch(""); setStatusFilter("All"); window.history.replaceState(null, "", `/admin/content?tab=${id}`); }} className={`flex items-center gap-2 rounded-lg px-3 py-2 text-[11px] font-medium transition ${tab === id ? "bg-[#f6ede8] text-[#9b4527]" : "text-[#77706b] hover:bg-[#faf8f6]"}`}><Icon size={14} />{label}{id === "messages" && <span className="rounded-full bg-[#fff0e7] px-1.5 text-[9px] text-[#a75537]">{messages.filter((message) => message.status === "New").length}</span>}</button>)}
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        {[[listTitle, String(records.length), "Items in this workspace"], ["Published", String(records.filter((item) => item.status === "Published").length), "Visible on the storefront"], ["Needs attention", String(records.filter((item) => ["Draft", "New", "Pending"].includes(item.status)).length), "Drafts and new activity"]].map(([label, value, note]) => <article key={label} className="rounded-xl border border-[#eeebe8] bg-white p-4"><p className="text-[11px] text-[#8a827d]">{label}</p><p className="mt-2 text-2xl font-semibold tracking-[-.04em]">{value}</p><p className="mt-1 text-[10px] text-[#9a928c]">{note}</p></article>)}
      </div>
      <section className="overflow-hidden rounded-xl border border-[#eeebe8] bg-white">
        <div className="flex flex-col justify-between gap-3 border-b border-[#f1eeeb] p-4 sm:flex-row sm:items-center"><div><h2 className="text-sm font-semibold">{listTitle}</h2><p className="mt-1 text-[10px] text-[#9a928c]">Changes are kept in this workspace for the current demo session.</p></div><div className="flex flex-wrap gap-2"><label className="flex h-8 min-w-[190px] items-center gap-2 rounded-lg border border-[#eeebe8] px-2.5"><Search size={13} className="text-[#aaa29d]" /><input aria-label="Search content" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search this workspace..." className="w-full bg-transparent text-[11px] outline-none placeholder:text-[#aaa29d]" /></label><select aria-label="Filter content by status" value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)} className="h-8 rounded-lg border border-[#eeebe8] bg-white px-2 text-[10px] text-[#665e59]"><option>All</option>{statuses.map((status) => <option key={status}>{status}</option>)}</select><Button type="button" variant="outline" onClick={exportRecords} className="h-8 rounded-lg border-[#eeebe8] px-2.5 text-[10px] text-[#665e59]">Export</Button></div></div>
        <div className="divide-y divide-[#f3f0ed]">
          {filtered.map((record) => <article key={record.id} className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:px-5"><span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${record.status === "Published" || record.status === "Resolved" ? "bg-[#edf5ef] text-[#4e865f]" : "bg-[#fbf2ed] text-[#a75537]"}`}>{tab === "stories" ? <Sparkles size={17} /> : tab === "messages" ? <MessageCircle size={17} /> : tab === "reviews" ? <Star size={17} /> : <FileText size={17} />}</span><div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-2"><h3 className="text-xs font-semibold">{record.title}</h3><span className={`rounded-full px-2 py-0.5 text-[9px] font-semibold ${record.status === "Published" || record.status === "Resolved" ? "bg-[#e9f5ed] text-[#3d7952]" : record.status === "New" || record.status === "Pending" ? "bg-[#fff3e8] text-[#a65b1e]" : "bg-[#f2f0ee] text-[#6f6863]"}`}>{record.status}</span></div><p className="mt-1 text-[10px] text-[#8e8680]">{record.subtitle} · Updated {record.updatedAt}</p><p className="mt-1 line-clamp-2 text-[11px] leading-relaxed text-[#77706b]">{record.content}</p></div><div className="flex shrink-0 flex-wrap gap-2">
            {tab === "messages" && <Button type="button" variant="outline" onClick={() => { setReplying(record as InboxRecord); setReplyText(""); }} className="h-8 rounded-lg border-[#eeebe8] px-2.5 text-[10px]"><Send size={12} /> Reply</Button>}
            {tab === "messages" && <Button type="button" onClick={() => markMessage(record as InboxRecord, record.status === "Resolved" ? "New" : "Resolved")} className="h-8 rounded-lg bg-[#292321] px-2.5 text-[10px] text-white hover:bg-[#463a35]">{record.status === "Resolved" ? "Reopen" : <><Check size={12} /> Resolve</>}</Button>}
            {tab === "reviews" && <Button type="button" onClick={() => toggleReview(record as ReviewRecord)} className="h-8 rounded-lg bg-[#292321] px-2.5 text-[10px] text-white hover:bg-[#463a35]">{record.status === "Published" ? "Hide review" : <><Check size={12} /> Publish</>}</Button>}
            {(tab === "heroes" || tab === "promotions") && <><Button type="button" aria-label={`Move ${record.title} up`} disabled={records[0]?.id === record.id} variant="outline" onClick={() => moveRecord(record as ContentRecord, -1)} className="h-8 w-8 rounded-lg border-[#eeebe8] p-0 disabled:opacity-40"><ArrowUp size={13} /></Button><Button type="button" aria-label={`Move ${record.title} down`} disabled={records[records.length - 1]?.id === record.id} variant="outline" onClick={() => moveRecord(record as ContentRecord, 1)} className="h-8 w-8 rounded-lg border-[#eeebe8] p-0 disabled:opacity-40"><ArrowDown size={13} /></Button></>}
            <Button type="button" variant="outline" onClick={() => setPreviewing(record as ContentRecord)} className="h-8 rounded-lg border-[#eeebe8] px-2.5 text-[10px]"><Eye size={12} /> View</Button>
            <Button type="button" variant="outline" onClick={() => openEdit(record as ContentRecord)} className="h-8 rounded-lg border-[#eeebe8] px-2.5 text-[10px]"><PenLine size={12} /> Edit</Button>
            {(tab !== "messages" && tab !== "reviews") && <Button type="button" onClick={() => togglePublish(record as ContentRecord)} className="h-8 rounded-lg bg-[#292321] px-2.5 text-[10px] text-white hover:bg-[#463a35]">{record.status === "Published" ? "Unpublish" : <><Send size={12} /> Publish</>}</Button>}
            <Button type="button" variant="ghost" aria-label={`Delete ${record.title}`} onClick={() => setPendingDelete(record as ContentRecord)} className="h-8 w-8 p-0 text-[#a64f41]"><Trash2 size={14} /></Button>
          </div></article>)}
          {filtered.length === 0 && <p className="px-5 py-12 text-center text-xs text-[#8f8781]">No content matches this search and status filter.</p>}
        </div>
      </section>

      {previewing && <div className="fixed inset-0 z-[70] flex items-center justify-center bg-[#211a17]/40 p-4" onMouseDown={(event) => { if (event.target === event.currentTarget) setPreviewing(null); }}><section role="dialog" aria-modal="true" aria-labelledby="content-preview-title" className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-[#eeebe8] bg-white p-5 shadow-2xl sm:p-6"><div className="mb-4 flex items-start justify-between"><div><p className="text-[10px] font-semibold uppercase tracking-[.12em] text-[#a75537]">Storefront preview · {previewing.status}</p><h2 id="content-preview-title" className="mt-1 text-lg font-semibold">{previewing.title}</h2></div><button type="button" aria-label="Close preview" onClick={() => setPreviewing(null)} className="rounded-lg p-1.5 text-[#8f8781] hover:bg-[#f5f2ef]"><X size={17} /></button></div>{previewing.imageUrl && <div role="img" aria-label={previewing.imageAltText || `${previewing.title} image preview`} className="mb-4 h-44 rounded-xl bg-cover bg-center sm:h-56" style={{ backgroundImage: `url("${previewing.imageUrl}")` }} />}<p className="text-sm font-medium text-[#a75537]">{previewing.subtitle}</p><p className="mt-3 whitespace-pre-line text-xs leading-relaxed text-[#77706b]">{previewing.content}</p>{previewing.ctaLabel && <div className="mt-5"><span className="inline-flex items-center rounded-lg bg-[#292321] px-4 py-2.5 text-xs font-medium text-white">{previewing.ctaLabel}</span><p className="mt-2 text-[10px] text-[#9a928c]">Link: {previewing.ctaLink || "Not set"}</p></div>}{previewing.startsAt || previewing.endsAt ? <p className="mt-4 border-t border-[#f1eeeb] pt-3 text-[10px] text-[#8f8781]">Campaign schedule: {previewing.startsAt || "No start date"} – {previewing.endsAt || "No end date"}</p> : null}</section></div>}

      {(createOpen || editing) && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-[#211a17]/40 p-4" onMouseDown={(event) => { if (event.target === event.currentTarget) { setCreateOpen(false); setEditing(null); } }}>
          <section role="dialog" aria-modal="true" aria-labelledby="content-editor-title" className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl border border-[#eeebe8] bg-white p-5 shadow-2xl sm:p-6">
            <div className="mb-5 flex items-start justify-between">
              <div>
                <h2 id="content-editor-title" className="text-base font-semibold">{editing ? "Edit content" : `Create ${tab === "stories" ? "a story" : tab === "faqs" ? "an FAQ" : tab === "heroes" ? "a hero section" : tab === "promotions" ? "a promotion" : "a page section"}`}</h2>
                <p className="mt-1 text-[11px] text-[#9a928c]">Manage the copy, creative, links, and visibility for this storefront placement.</p>
              </div>
              <button type="button" aria-label="Close editor" onClick={() => { setCreateOpen(false); setEditing(null); }} className="rounded-lg p-1.5 text-[#8f8781] hover:bg-[#f5f2ef]"><X size={17} /></button>
            </div>
            <form onSubmit={saveRecord} className="space-y-4">
              <label className="block text-[11px] font-medium text-[#5e5651]">Title<input {...form.register("title")} className={inputClass} />{form.formState.errors.title && <span className="mt-1 block text-[10px] text-[#b34235]">{form.formState.errors.title.message}</span>}</label>
              <label className="block text-[11px] font-medium text-[#5e5651]">Eyebrow / short description<input {...form.register("subtitle")} className={inputClass} />{form.formState.errors.subtitle && <span className="mt-1 block text-[10px] text-[#b34235]">{form.formState.errors.subtitle.message}</span>}</label>
              <label className="block text-[11px] font-medium text-[#5e5651]">Body / supporting copy<textarea {...form.register("content")} rows={6} className="mt-1.5 w-full rounded-lg border border-[#e9e4df] px-3 py-2.5 text-xs leading-relaxed outline-none focus:border-[#c07b61]" />{form.formState.errors.content && <span className="mt-1 block text-[10px] text-[#b34235]">{form.formState.errors.content.message}</span>}</label>
              <div className="grid gap-3 sm:grid-cols-2">
                <label className="block text-[11px] font-medium text-[#5e5651] sm:col-span-2">Image URL<input {...form.register("imageUrl")} placeholder="https://…" className={inputClass} />{form.formState.errors.imageUrl && <span className="mt-1 block text-[10px] text-[#b34235]">{form.formState.errors.imageUrl.message}</span>}</label>
                <label className="block text-[11px] font-medium text-[#5e5651] sm:col-span-2">Image alt text<input {...form.register("imageAltText")} placeholder="Describe the image for screen readers" className={inputClass} />{form.formState.errors.imageAltText && <span className="mt-1 block text-[10px] text-[#b34235]">{form.formState.errors.imageAltText.message}</span>}</label>
                <label className="block text-[11px] font-medium text-[#5e5651]">CTA label<input {...form.register("ctaLabel")} placeholder="Shop the collection" className={inputClass} /></label>
                <label className="block text-[11px] font-medium text-[#5e5651]">CTA link<input {...form.register("ctaLink")} placeholder="/shop or https://…" className={inputClass} /></label>
              </div>
              {tab === "promotions" && <div className="grid gap-3 sm:grid-cols-2">
                <label className="block text-[11px] font-medium text-[#5e5651]">Starts on<input type="date" {...form.register("startsAt")} className={inputClass} />{form.formState.errors.startsAt && <span className="mt-1 block text-[10px] text-[#b34235]">{form.formState.errors.startsAt.message}</span>}</label>
                <label className="block text-[11px] font-medium text-[#5e5651]">Ends on<input type="date" {...form.register("endsAt")} className={inputClass} />{form.formState.errors.endsAt && <span className="mt-1 block text-[10px] text-[#b34235]">{form.formState.errors.endsAt.message}</span>}</label>
              </div>}
              <label className="block text-[11px] font-medium text-[#5e5651]">Status<select {...form.register("status")} className={inputClass}>{statuses.map((status) => <option key={status}>{status}</option>)}</select>{form.formState.errors.status && <span className="mt-1 block text-[10px] text-[#b34235]">{form.formState.errors.status.message}</span>}</label>
              <div className="flex justify-end gap-2 border-t border-[#f1eeeb] pt-4">
                <Button type="button" variant="outline" onClick={() => { setCreateOpen(false); setEditing(null); }} className="h-9 rounded-lg border-[#e9e4df] px-3 text-xs">Cancel</Button>
                <Button type="submit" className="h-9 rounded-lg bg-[#292321] px-3.5 text-xs text-white hover:bg-[#463a35]">{editing ? "Save changes" : "Create draft"}</Button>
              </div>
            </form>
          </section>
        </div>
      )}
      {pendingDelete && <div className="fixed inset-0 z-[80] flex items-center justify-center bg-[#211a17]/40 p-4"><section role="alertdialog" aria-modal="true" aria-labelledby="content-delete-title" className="w-full max-w-sm rounded-2xl bg-white p-5 shadow-2xl"><h2 id="content-delete-title" className="text-sm font-semibold">Delete “{pendingDelete.title}”?</h2><p className="mt-2 text-xs leading-relaxed text-[#77706b]">This removes the record from this demo workspace. This action cannot be undone.</p><div className="mt-5 flex justify-end gap-2"><Button type="button" variant="outline" onClick={() => setPendingDelete(null)} className="h-9 rounded-lg border-[#e9e4df] px-3 text-xs">Cancel</Button><Button type="button" onClick={deleteRecord} className="h-9 rounded-lg bg-[#a64f41] px-3.5 text-xs text-white hover:bg-[#8f4035]"><Trash2 size={13} /> Delete</Button></div></section></div>}
      {replying && <div className="fixed inset-0 z-[70] flex items-center justify-center bg-[#211a17]/40 p-4" onMouseDown={(event) => { if (event.target === event.currentTarget) setReplying(null); }}><section role="dialog" aria-modal="true" aria-labelledby="reply-title" className="w-full max-w-lg rounded-2xl bg-white p-5 shadow-2xl"><div className="mb-4 flex items-start justify-between"><div><h2 id="reply-title" className="text-sm font-semibold">Reply to {replying.subtitle.split(" · ")[0]}</h2><p className="mt-1 text-[10px] text-[#9a928c]">{replying.subtitle.split(" · ")[1]}</p></div><button type="button" aria-label="Close reply" onClick={() => setReplying(null)} className="rounded-lg p-1.5 text-[#8f8781] hover:bg-[#f5f2ef]"><X size={17} /></button></div><blockquote className="rounded-lg bg-[#fbf8f6] p-3 text-[11px] leading-relaxed text-[#716963]">{replying.content}</blockquote><label className="mt-4 block text-[11px] font-medium">Your reply<textarea value={replyText} onChange={(event) => setReplyText(event.target.value)} rows={4} placeholder="Write a thoughtful response..." className="mt-1.5 w-full rounded-lg border border-[#e9e4df] px-3 py-2.5 text-xs outline-none focus:border-[#c07b61]" /></label><div className="mt-4 flex justify-end gap-2"><Button type="button" variant="outline" onClick={() => setReplying(null)} className="h-9 rounded-lg border-[#e9e4df] px-3 text-xs">Cancel</Button><Button type="button" disabled={replyText.trim().length < 3} onClick={sendReply} className="h-9 rounded-lg bg-[#292321] px-3.5 text-xs text-white hover:bg-[#463a35]"><Send size={13} /> Send reply</Button></div></section></div>}
    </div>
  );
}
