"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ArrowLeft, ImagePlus, Info, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const productFormSchema = z.object({
  name: z.string().trim().min(3, "Add a product name with at least 3 characters."),
  sku: z.string().trim().min(3, "Add a SKU with at least 3 characters."),
  category: z.string().min(1, "Choose a collection."),
  price: z.string().regex(/^\d+(\.\d{1,2})?$/, "Enter a valid price, such as 48.00."),
  quantity: z.string().regex(/^\d+$/, "Enter a whole-number stock quantity."),
  description: z.string().trim().min(10, "Add a short description with at least 10 characters."),
});

type ProductFormValues = z.infer<typeof productFormSchema>;

const fields = "mt-1.5 h-10 w-full rounded-lg border border-[#e9e4df] bg-white px-3 text-xs text-[#332d29] outline-none transition placeholder:text-[#b0a8a2] focus:border-[#c07b61] focus:ring-2 focus:ring-[#c07b61]/10";

export function ProductForm() {
  const [previewReady, setPreviewReady] = useState(false);
  const [mediaName, setMediaName] = useState("");
  const [mediaError, setMediaError] = useState("");
  const uploadRef = useRef<HTMLInputElement>(null);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues: { name: "", sku: "", category: "", price: "", quantity: "0", description: "" },
  });

  const onSubmit = handleSubmit(() => setPreviewReady(true));
  const onUpload = (file?: File) => {
    if (!file) return;
    if (!["image/png", "image/jpeg", "image/webp"].includes(file.type)) {
      setMediaError("Choose a PNG, JPG, or WEBP image.");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setMediaError("Choose an image smaller than 10 MB.");
      return;
    }
    setMediaName(file.name);
    setMediaError("");
  };

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-4">
      <section className="rounded-xl border border-[#eeebe8] bg-white p-5 sm:p-6">
        <div className="mb-5"><h2 className="text-sm font-semibold">Product details</h2><p className="mt-1 text-[11px] text-[#9a928c]">The essentials customers need to fall in love.</p></div>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="text-[11px] font-medium text-[#5e5651] sm:col-span-2">Product name<input {...register("name")} placeholder="e.g. Luxe HD Invisible Lace Front Wig" className={fields} />{errors.name && <span className="mt-1 block text-[10px] text-[#b34235]">{errors.name.message}</span>}</label>
          <label className="text-[11px] font-medium text-[#5e5651]">SKU<input {...register("sku")} placeholder="TT-WIG-001" className={fields} />{errors.sku && <span className="mt-1 block text-[10px] text-[#b34235]">{errors.sku.message}</span>}</label>
          <label className="text-[11px] font-medium text-[#5e5651]">Collection<select {...register("category")} className={fields}><option value="">Choose a collection</option><option>Human Hair Wigs</option><option>Hair Extensions</option><option>Hair Care</option><option>Cosmetics</option><option>Beauty Accessories</option></select>{errors.category && <span className="mt-1 block text-[10px] text-[#b34235]">{errors.category.message}</span>}</label>
          <label className="text-[11px] font-medium text-[#5e5651]">Price (USD)<div className="relative"><span className="absolute left-3 top-3 text-xs text-[#aaa29d]">$</span><input {...register("price")} inputMode="decimal" placeholder="0.00" className={`${fields} pl-7`} /></div>{errors.price && <span className="mt-1 block text-[10px] text-[#b34235]">{errors.price.message}</span>}</label>
          <label className="text-[11px] font-medium text-[#5e5651]">Available quantity<input {...register("quantity")} inputMode="numeric" className={fields} />{errors.quantity && <span className="mt-1 block text-[10px] text-[#b34235]">{errors.quantity.message}</span>}</label>
          <label className="text-[11px] font-medium text-[#5e5651] sm:col-span-2">Description<textarea {...register("description")} rows={4} placeholder="Tell customers what makes this product special..." className="mt-1.5 w-full resize-y rounded-lg border border-[#e9e4df] bg-white px-3 py-2.5 text-xs text-[#332d29] outline-none transition placeholder:text-[#b0a8a2] focus:border-[#c07b61] focus:ring-2 focus:ring-[#c07b61]/10" />{errors.description && <span className="mt-1 block text-[10px] text-[#b34235]">{errors.description.message}</span>}</label>
        </div>
      </section>

      <section className="rounded-xl border border-[#eeebe8] bg-white p-5 sm:p-6">
        <div className="mb-4"><h2 className="text-sm font-semibold">Product media</h2><p className="mt-1 text-[11px] text-[#9a928c]">Add beautiful, true-to-life product photography.</p></div>
        <input ref={uploadRef} type="file" accept="image/png,image/jpeg,image/webp" className="hidden" aria-label="Upload product image" onChange={(event) => onUpload(event.target.files?.[0])} />
        <button type="button" onClick={() => uploadRef.current?.click()} onDragOver={(event) => event.preventDefault()} onDrop={(event) => { event.preventDefault(); onUpload(event.dataTransfer.files[0]); }} className="flex min-h-[150px] w-full flex-col items-center justify-center rounded-xl border border-dashed border-[#ddd4cd] bg-[#fdfbf9] text-center transition hover:border-[#c07b61] hover:bg-[#fbf6f2]"><span className="mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#a75a3b] shadow-sm"><ImagePlus size={19} /></span><span className="text-xs font-semibold text-[#4c4540]">{mediaName || "Click to upload or drag and drop"}</span><span className="mt-1 text-[10px] text-[#aaa29d]">PNG, JPG or WEBP · up to 10 MB</span></button>
        {mediaError && <p role="alert" className="mt-2 text-[10px] text-[#b34235]">{mediaError}</p>}
      </section>

      <div className="flex flex-col justify-between gap-3 rounded-xl border border-[#eeebe8] bg-white p-4 sm:flex-row sm:items-center sm:px-5">
        <div className="flex items-center gap-2 text-[10px] text-[#8f8781]"><Info size={14} className="shrink-0 text-[#b75b3a]" />This is a front-end template. Connect save and media upload to your own services.</div>
        <div className="flex gap-2 sm:shrink-0"><Button asChild type="button" variant="outline" className="h-9 rounded-lg border-[#e9e4df] px-3 text-xs"><Link href="/admin/products"><ArrowLeft size={14} /> Cancel</Link></Button><Button type="submit" disabled={isSubmitting} className="h-9 rounded-lg bg-[#292321] px-3.5 text-xs text-white hover:bg-[#463a35]"><Sparkles size={14} /> Preview product</Button></div>
      </div>
      {previewReady && <p role="status" className="rounded-lg border border-[#dcebdd] bg-[#f0f8f1] px-4 py-3 text-xs text-[#3d7952]">Your product details passed validation. Connect this form to your product creation flow when you&apos;re ready.</p>}
    </form>
  );
}
