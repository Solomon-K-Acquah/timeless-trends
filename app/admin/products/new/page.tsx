import { ProductForm } from "@/components/admin/product-form";

export default function NewProductPage() {
  return (
    <div className="mx-auto max-w-[980px] space-y-6">
      <div><p className="mb-1 text-[11px] font-semibold uppercase tracking-[.14em] text-[#b75b3a]">Catalog / Products</p><h1 className="text-[30px] font-semibold tracking-[-.04em]">Add a product</h1><p className="mt-1 text-sm text-[#8b837d]">Give your next beauty essential a place in the collection.</p></div>
      <ProductForm />
    </div>
  );
}
