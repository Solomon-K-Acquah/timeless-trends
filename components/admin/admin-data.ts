export const dashboardMetrics = [
  { label: "Gross sales", value: "$48,294.80", change: "+12.8%", icon: "sales" },
  { label: "Orders", value: "1,284", change: "+8.2%", icon: "orders" },
  { label: "Average order value", value: "$76.40", change: "+4.6%", icon: "basket" },
  { label: "Returning customers", value: "38.6%", change: "+2.4%", icon: "customers" },
] as const;

export const recentOrders = [
  { id: "#TT-10842", customer: "Olivia Rhye", email: "olivia.r@email.com", date: "Today, 10:42 AM", total: "$384.00", status: "Processing", initials: "OR", color: "bg-[#fce9df] text-[#a34826]" },
  { id: "#TT-10841", customer: "Phoenix Baker", email: "phoenix@email.com", date: "Today, 9:18 AM", total: "$128.50", status: "Shipped", initials: "PB", color: "bg-[#ece8fa] text-[#6552a3]" },
  { id: "#TT-10840", customer: "Lana Steiner", email: "lana@email.com", date: "Today, 8:56 AM", total: "$76.00", status: "Delivered", initials: "LS", color: "bg-[#e6f2eb] text-[#337552]" },
  { id: "#TT-10839", customer: "Demi Wilkinson", email: "demi@email.com", date: "Yesterday", total: "$212.00", status: "Processing", initials: "DW", color: "bg-[#f8e8ee] text-[#a44569]" },
  { id: "#TT-10838", customer: "Candice Wu", email: "candice@email.com", date: "Yesterday", total: "$54.00", status: "Delivered", initials: "CW", color: "bg-[#e5eff7] text-[#3f6e91]" },
] as const;

export const bestSellers = [
  { name: "Luxe HD Invisible Lace Front Wig", category: "Human Hair Wigs", sold: 128, revenue: "$40,960", image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&q=80&w=100" },
  { name: "Seamless Double Weft Clip-In Extensions", category: "Hair Extensions", sold: 96, revenue: "$14,400", image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=100" },
  { name: "Velvet Matte Lipstick Collection", category: "Cosmetics", sold: 84, revenue: "$3,696", image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&q=80&w=100" },
] as const;

export const orderVolume = [34, 42, 38, 57, 49, 67, 59, 74, 68, 85, 77, 98, 91, 112, 104, 125, 116, 138, 128, 150, 142, 168, 158, 184];

export const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);
