import { Product, BlogPost, Review, Order } from "./types";

export const SAMPLE_PRODUCTS: Product[] = [
  // --- 1. HUMAN HAIR WIGS ---
  {
    id: "wig-lux-hd-lace",
    name: "Luxe HD Invisible Lace Front Wig",
    category: "Human Hair Wigs",
    subcategory: "HD Lace Wigs",
    description:
      "Crafted from 100% Brazilian Virgin and raw donor hair with an ultra-thin, invisible premium HD Lace. Easily blends with all skin complexions, styled ready with perfectly bleached, pre-plucked baby hairs.",
    price: 380,
    salePrice: 320,
    rating: 4.9,
    reviewsCount: 148,
    isNew: true,
    isFeatured: true,
    mainImage:
      "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&q=80&w=600",
    images: [
      "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1488161628813-04466f872be2?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1595959183075-c1d0a161b03d?auto=format&fit=crop&q=80&w=600",
    ],
    features: [
      "100% Unprocessed Brazilian Virgin Raw Hair",
      "Upgraded Ultra-Thin HD Invisible Lace (Pre-Bleached knots)",
      "High density: 180% fullness for rich volumes",
      "Heat-resistant styling up to 400°F (can be dyed, bleached or curled)",
      "Glueless secure band system with inner micro-combs",
    ],
    variants: [
      { name: "Length", options: ["18 inch", "22 inch", "26 inch"] },
      {
        name: "Color",
        options: ["Natural Black", "Honey Blonde (#27)", "Chocolate Ombre"],
      },
      { name: "Texture", options: ["Straight", "Body Wave", "Deep Curly"] },
    ],
  },
  {
    id: "wig-glueless-bob",
    name: "Classic Glueless Blunt Cut Bob",
    category: "Human Hair Wigs",
    subcategory: "Glueless Wigs",
    description:
      "The ultimate ready-to-wear chic statement Bob. Created using dense virgin donor locks with a glueless adjustable cap and comfortable velvet padded security tabs.",
    price: 240,
    rating: 4.8,
    reviewsCount: 89,
    mainImage:
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&q=80&w=600",
    images: [
      "https://images.unsplash.com/photo-1595959183075-c1d0a161b03d?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1605497746445-97d1b0a94a28?auto=format&fit=crop&q=80&w=600",
    ],
    features: [
      "True length blunt-cut symmetry bob",
      "Zero glue needed - perfect for easy protective styles",
      "Breathable sweat-wicking elastic canopy cap",
      "Pre-plucked natural hair contouring hairline",
    ],
    variants: [
      { name: "Length", options: ["10 inch", "12 inch", "14 inch"] },
      {
        name: "Color",
        options: ["Natural Black", "Rich Jet Black #1", "Plum Burgundy"],
      },
    ],
  },
  {
    id: "wig-copper-curls",
    name: "Autumn Copper Tinted Deep Curly Wig",
    category: "Human Hair Wigs",
    subcategory: "Colored Wigs",
    description:
      "Flaunted with premium sunset-inspired copper ginger pigments. This stunning deep curl features double wefting layout to retain bounciness and long-lasting curl pattern retention.",
    price: 390,
    salePrice: 345,
    rating: 4.9,
    reviewsCount: 65,
    isSale: true,
    mainImage:
      "https://images.unsplash.com/photo-1488161628813-04466f872be2?auto=format&fit=crop&q=80&w=600",
    images: [
      "https://images.unsplash.com/photo-1605497746445-97d1b0a94a28?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&q=80&w=600",
    ],
    features: [
      "Rare pre-dyed ginger copper hue that maintains radiance",
      "High density 150%",
      "Special double-drawn strands ensuring thick tips",
      "Shed-proof locks with minimal tangle lock-in technology",
    ],
    variants: [
      { name: "Length", options: ["20 inch", "24 inch"] },
      { name: "Texture", options: ["Deep Wave", "Kinky Curly"] },
    ],
  },
  {
    id: "wig-blonde-balayage",
    name: "Victoria Blonde Highlights Balayage",
    category: "Human Hair Wigs",
    subcategory: "Colored Wigs",
    description:
      "Luxurious ash-blonde highlight blend structured dynamically. Melt-in lace, pre-bleached hair strands, and adjustable stretch fit.",
    price: 450,
    rating: 5.0,
    reviewsCount: 42,
    isFeatured: true,
    mainImage:
      "https://images.unsplash.com/photo-1488161628813-04466f872be2?auto=format&fit=crop&q=80&w=600",
    images: [
      "https://images.unsplash.com/photo-1488161628813-04466f872be2?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1595959183075-c1d0a161b03d?auto=format&fit=crop&q=80&w=600",
    ],
    features: [
      "Remy human-hair graded premium selection",
      "Pre-styled ash blonde to champagne fade balayage",
      "13x4 ear-to-ear hand tied Swiss lace front",
      "Inner premium security clips",
    ],
    variants: [
      { name: "Length", options: ["22 inch", "26 inch"] },
      { name: "Texture", options: ["Silk Straight", "Body Wave"] },
    ],
  },

  // --- 2. HAIR EXTENSIONS ---
  {
    id: "ext-clip-in-remy",
    name: "Seamless Double Weft Clip-In Extensions",
    category: "Hair Extensions",
    subcategory: "Clip-Ins",
    description:
      "Instant luxury length and majestic thickness. Features ultra-flat silicone tracks that stay completely hidden and lay flush against the scalp.",
    price: 180,
    salePrice: 150,
    rating: 4.7,
    reviewsCount: 220,
    isSale: true,
    mainImage:
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=600",
    images: [
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&q=80&w=600",
    ],
    features: [
      "100% Remy human hair of superior strand structure",
      "Seamless flat silicone base prevents bulging lines",
      "Staged package of 7 durable, pressure-sensitive clips",
    ],
    variants: [
      { name: "Length", options: ["16 inch", "20 inch", "24 inch"] },
      {
        name: "Color",
        options: ["Natural Black", "Chestnut Brown", "Platinum Blonde"],
      },
    ],
  },
  {
    id: "ext-tape-in-silk",
    name: "Luxury Grade Tape-In Silk Straight Extensions",
    category: "Hair Extensions",
    subcategory: "Tape-Ins",
    description:
      "Premium hair extension method preferred by stylist salons. Utilizes medically safe hypoallergenic adhesives for robust hold up to 8-10 weeks.",
    price: 210,
    rating: 4.8,
    reviewsCount: 114,
    mainImage:
      "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&q=80&w=600",
    images: [
      "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&q=80&w=600",
    ],
    features: [
      "Double-sided medical grade adhesive strip",
      "Thick and lustrous hair strands",
      "Can be re-used by replacing the tape bands",
    ],
    variants: [
      { name: "Length", options: ["18 inch", "22 inch"] },
      {
        name: "Color",
        options: ["Dark Chocolate Brown", "Golden Highlights #18", "Off Black"],
      },
    ],
  },

  // --- 3. HAIR CARE ---
  {
    id: "hc-shampoo-caviar",
    name: "Hydrating White Caviar Shampoo & Mask Set",
    category: "Hair Care",
    subcategory: "Shampoo Sets",
    description:
      "Breathe majestic life into thirsty, dry, color-treated hair. Blended with exquisite white caviar liposomes and marine peptides to deeply nourish follicles and repair cuticle bonds.",
    price: 85,
    rating: 4.8,
    reviewsCount: 310,
    isFeatured: true,
    mainImage:
      "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&q=80&w=600",
    images: [
      "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format&fit=crop&q=80&w=600",
    ],
    features: [
      "Re-hydrates damaged or keratin-treated cuticle shaft",
      "100% Free of harsh sulfates, clean parabens-free formula",
      "Anti-frizz humidity shield barrier with glossy shine active",
    ],
    ingredients: [
      "Aqua (Purified Water)",
      "White Caviar Extract Liposomes",
      "Hydrolyzed Keratin Proteins",
      "Argania Spinosa (Argan) Kernel Oil",
      "Biotin & Vitamin B5",
    ],
    variants: [{ name: "Size", options: ["250ml Kit", "500ml Salon Size"] }],
  },
  {
    id: "hc-elixir-oil",
    name: "Pure Argan Gold Scalp & Hair Repair Elixir",
    category: "Hair Care",
    subcategory: "Hair Oils",
    description:
      "Premium, cold-pressed lightweight oil that penetrates thick or fine locks. Instantly tames static flyaways, hydrates dehydrated ends, and restores brilliant radiant finish.",
    price: 48,
    salePrice: 38,
    rating: 4.9,
    reviewsCount: 412,
    isSale: true,
    mainImage:
      "https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format&fit=crop&q=80&w=600",
    images: [
      "https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format&fit=crop&q=80&w=600",
    ],
    features: [
      "Cold-pressed organic Moroccan Argan Oil",
      "Absorbs instantly without greasy heavy residues",
      "Reduces heat damage styling drying time by 40%",
    ],
    ingredients: [
      "Organic Moroccan Argan Oil",
      "Macadamia Ternifolia Seed Oil",
      "Tocopherol (Pure Vitamin E)",
      "Essential Sweet Jasmine Extract",
    ],
    variants: [{ name: "Size", options: ["50ml Travel", "120ml Full Luxury"] }],
  },

  // --- 4. COSMETICS / MAKEUP ---
  {
    id: "cos-matte-lipstick",
    name: "Velvet Suede Ultra-Matte Liquid Lipstick",
    category: "Cosmetics",
    subcategory: "Makeup",
    description:
      "Introducing your ultimate high-pigment, kiss-proof companion. One simple swipe delivers transfer-proof vibrant color with a luxurious plush velvet comfort finish that never cracks or dries out.",
    price: 28,
    rating: 4.7,
    reviewsCount: 524,
    isFeatured: true,
    mainImage:
      "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&q=80&w=600",
    images: [
      "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1625093742435-6fa192b6fb10?auto=format&fit=crop&q=80&w=600",
    ],
    features: [
      "Up to 16 Hours comfort matte pigment survival",
      "Enriched with active Moisture Hydro-Spheres",
      "Smudge-proof, waterproof, transfer-proof shield",
      "Fitted with precise droplet tip applicator",
    ],
    ingredients: [
      "Isododecane",
      "Trimethylsiloxysilicate",
      "Hyaluronic Acid Co-polymers",
      "Organic Shea Butter Oil Extracts",
      "Silica Dimethetic Liposome Base",
    ],
    variants: [
      {
        name: "Shade",
        options: [
          "Petal Nude",
          "Sultry Crimson",
          "Rosé Mauve",
          "Vintage Brick",
        ],
      },
    ],
  },
  {
    id: "cos-foundation-glow",
    name: "Luminous Hydra-Glow Serum Foundation",
    category: "Cosmetics",
    subcategory: "Foundations",
    description:
      "An incredibly radiant foundation that doubles as a nourishing skincare serum. Weightless breathable formula is loaded with pure Hyaluronic Acid and natural antioxidants to build a healthy dew glow.",
    price: 52,
    salePrice: 42,
    rating: 4.8,
    reviewsCount: 391,
    isNew: true,
    mainImage:
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&q=80&w=600",
    images: [
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=600",
    ],
    features: [
      "Super-breathable light to medium buildable coverage",
      "Active 72-hour moisture lock barrier nutrition",
      "Blurs pores, dark spots, blemishes automatically",
      "SPF 20 physical UV barrier protection",
    ],
    ingredients: [
      "Hyaluronic Acid (Triple Dense Form)",
      "Prunus Cerasus (Cherry) Active Water",
      "Niacinamide (Vitamin B3 2% Active)",
      "Titanium Dioxide physical blockers",
    ],
    variants: [
      {
        name: "Shade",
        options: [
          "110 Alabaster",
          "220 Honey Sand",
          "340 Soft Amber",
          "450 Deep Mocha",
        ],
      },
    ],
  },
  {
    id: "cos-palette-sunset",
    name: "Horizon Gilt 12-Shade Eyeshadow Palette",
    category: "Cosmetics",
    subcategory: "Makeup",
    description:
      "A breathtaking curation of sunsets: from sparkling coppers and buttery nudes to bold, deep bronze glitters. Pure pigments that glide on fingers like velvet cream.",
    price: 64,
    rating: 4.9,
    reviewsCount: 184,
    mainImage:
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=600",
    images: [
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&q=80&w=600",
    ],
    features: [
      "12 highly-saturated buttery-milled shades",
      "Includes 6 rich mattes, 4 pressed metallics, 2 wet-foil pigments",
      "Zero-fallout, all-day creaseproof durability",
    ],
    variants: [
      { name: "Palette Style", options: ["Sunset Horizon", "Nude Serenade"] },
    ],
  },
  {
    id: "cos-skincare-serum",
    name: "Multi-Peptide Youth Elixir Radiance Serum",
    category: "Cosmetics",
    subcategory: "Skincare",
    description:
      "Revitalize mature or fatigued skin. Concentrated with 5 clinical anti-aging peptides and botanical collagen to dramatically boost elastin production and iron out skin texture.",
    price: 78,
    rating: 4.9,
    reviewsCount: 205,
    isNew: true,
    mainImage:
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&q=80&w=600",
    images: [
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=600",
    ],
    features: [
      "Clinically reduces appearance of fine lines/wrinkles by 34% in 4 weeks",
      "Boosts youthful natural plumpness and smooth moisture level",
      "Silky lightweight formulation designed for morning & night prep",
    ],
    ingredients: [
      "Pure Botanical Vegan Collagen",
      "Oligopeptide-1 Complex",
      "Centella Asiatica (Cica) Plant Extract",
      "Organic Rosewater essence",
    ],
    variants: [
      { name: "Size", options: ["30ml Dropper", "60ml Value Shield"] },
    ],
  },
  {
    id: "cos-skincare-cream",
    name: "Enriched Ceramide Barrier Restoration Cream",
    category: "Cosmetics",
    subcategory: "Skincare",
    description:
      "The ultimate skin barrier rescue. A thick, comforting whipped cream base packed with fatty lipid ceramides and colloidal oat to quench flakiness and severe dryness.",
    price: 58,
    salePrice: 48,
    rating: 4.8,
    reviewsCount: 334,
    isSale: true,
    mainImage:
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=600",
    images: [
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=600",
    ],
    features: [
      "Fortifies the moisture barrier against pollution and dryness",
      "Formulated for sensitive, eczema-prone skin types",
      "Provides rich deep hydration with a soft matte finish",
    ],
    variants: [{ name: "Size", options: ["50ml Jar", "100ml Value Pump"] }],
  },

  // --- 5. BEAUTY ACCESSORIES ---
  {
    id: "acc-gold-wand",
    name: "24k Gold Ionic Heated Eyelash Curler",
    category: "Beauty Accessories",
    subcategory: "Electronics",
    description:
      "Ditch traditional pinching curlers. This ionic heated wand applies uniform warmth to safely sculpt and lift lashes, locking them in high-glam posture for up to 36 hours.",
    price: 45,
    rating: 4.6,
    reviewsCount: 78,
    mainImage:
      "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=600",
    images: [
      "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=600",
    ],
    features: [
      "Dual heat levels optimized for natural or mink extension lashes",
      "Rechargeable USB-C with safety auto-shutoff sensor",
      "Gentle heat protection guards standard cuticle scales",
    ],
    variants: [
      { name: "Color", options: ["Champagne Gold", "Rose Quartz Black"] },
    ],
  },
  {
    id: "acc-brush-set",
    name: "Elite Silk-Fiber Luxury Brush Set (10pc)",
    category: "Beauty Accessories",
    subcategory: "Brushes",
    description:
      "An exceptional lineup of 10 handcrafted cosmetics brushes. Features premium vegan silk fibers that grab powder seamlessly and heavy sleek metallic wood handles.",
    price: 110,
    salePrice: 89,
    rating: 4.9,
    reviewsCount: 165,
    isSale: true,
    mainImage:
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=600",
    images: [
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=600",
    ],
    features: [
      "Ultra-soft vegan antimicrobial silk-threads",
      "High density bristle clusters prevent shedding",
      "Presented in a stunning faux-leather roll-up travel clutch",
    ],
    variants: [
      {
        name: "Pouch Style",
        options: ["Sleek Midnight Black", "Blush Pink Gold"],
      },
    ],
  },

  // --- 6. ADDITIONAL PRODUCTS TO HIT THE REQUESTED AT LEAST 20 PRODUCTS ON SHOP ---
  {
    id: "wig-curly-headband",
    name: "Kinky Curly Glueless Headband Wig",
    category: "Human Hair Wigs",
    subcategory: "Glueless Wigs",
    description:
      "Pop on and conquer. No glue, no gel, no margins to hide. Ideal for beginners or workout routines. Breathable net with luxury velcro strap adjustments.",
    price: 215,
    rating: 4.7,
    reviewsCount: 95,
    mainImage:
      "https://images.unsplash.com/photo-1605497746445-97d1b0a94a28?auto=format&fit=crop&q=80&w=600",
    images: [
      "https://images.unsplash.com/photo-1605497746445-97d1b0a94a28?auto=format&fit=crop&q=80&w=600",
    ],
    features: [
      "Takes 2 minutes to install - pure convenience",
      "High-grade pre-plucked curly hair look",
      "Presented with 3 complimentary trendy headbands",
    ],
    variants: [{ name: "Length", options: ["14 inch", "18 inch"] }],
  },
  {
    id: "wig-silk-press-vpart",
    name: "Sleek Silk Press V-Part Minimal Wig",
    category: "Human Hair Wigs",
    subcategory: "Glueless Wigs",
    description:
      "Leave out your own crown hair part with a natural skin look. The tiny V-shape cutout needs zero lace and matches your exact natural scalp part.",
    price: 285,
    rating: 4.8,
    reviewsCount: 57,
    isNew: true,
    mainImage:
      "https://images.unsplash.com/photo-1595959183075-c1d0a161b03d?auto=format&fit=crop&q=80&w=600",
    images: [
      "https://images.unsplash.com/photo-1595959183075-c1d0a161b03d?auto=format&fit=crop&q=80&w=600",
    ],
    features: [
      "Allows organic crown blend leafout styling",
      "Zero hair tension or scalp irritation",
      "Made of dense, premium double-wefted Remy hair",
    ],
    variants: [{ name: "Length", options: ["20 inch", "24 inch"] }],
  },
  {
    id: "ext-halo-blonde",
    name: "Luxury Halo Hair Weft Miracle Wire",
    category: "Hair Extensions",
    subcategory: "Halo Wires",
    description:
      "Secure, non-damaging temporary length. Hangs on a hidden strong micro-wire that fits like a delicate crown under your own hair. Added in 10 seconds flat.",
    price: 160,
    rating: 4.7,
    reviewsCount: 122,
    mainImage:
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=600",
    images: [
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=600",
    ],
    features: [
      "Adjustable transparent nylon active fishing wire",
      "Spicely placed clips to hold safe against gusty winds",
      "No chemical stress, no pulling, no damage to your natural hair roots",
    ],
    variants: [
      { name: "Length", options: ["18 inch", "22 inch"] },
      { name: "Color", options: ["Honey Ash Blonde", "Chocolate Brown"] },
    ],
  },
  {
    id: "hc-growth-serum",
    name: "Follicle Revival Caffeine Growth Treatment",
    category: "Hair Care",
    subcategory: "Hair Oils",
    description:
      "Energize thinning roots. Infused with potent coffee seed extract, rosemary oil, and biotin to jumpstart baby strands in sparse temples and hairline.",
    price: 36,
    rating: 4.8,
    reviewsCount: 295,
    mainImage:
      "https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format&fit=crop&q=80&w=600",
    images: [
      "https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format&fit=crop&q=80&w=600",
    ],
    features: [
      "Active caffeine and cellular biotin stimulants",
      "Deeply conditions the scalp skin layer",
      "Smells beautifully of garden rosemary and fresh lavender",
    ],
    variants: [
      { name: "Bottle Option", options: ["Single Bottle", "Value Twin Pack"] },
    ],
  },
  {
    id: "cos-eyeliner-ink",
    name: "Precision Liquid Ink Eyeliner Pen",
    category: "Cosmetics",
    subcategory: "Makeup",
    description:
      "Carve out razor-sharp cat eyes with our hyper-pigmented carbon black ink felt tip. Flow control cartridge feeds intense pigment continuously.",
    price: 22,
    rating: 4.6,
    reviewsCount: 104,
    mainImage:
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&q=80&w=600",
    images: [
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&q=80&w=600",
    ],
    features: [
      "0.1mm micro-fine Japanese felt applicator tip",
      "Quick-dry polymer smudgeproof matrix",
      "Rich calligraphy depth ink flow",
    ],
    variants: [
      {
        name: "Shade Code",
        options: ["Midnight Carbon Black", "Smokey Espresso Brown"],
      },
    ],
  },
  {
    id: "cos-blush-cream",
    name: "Silk Cushion Radiance Velvet Cream Blush",
    category: "Cosmetics",
    subcategory: "Makeup",
    description:
      "Flatter your skin with a healthy wash of color. Whipped liquid cream blush blends beautifully with fingers for a natural radiant finish.",
    price: 32,
    salePrice: 28,
    rating: 4.8,
    reviewsCount: 147,
    isSale: true,
    mainImage:
      "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&q=80&w=600",
    images: [
      "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&q=80&w=600",
    ],
    features: [
      "Non-comedogenic hydrating cheek formula",
      "Provides natural dewy flush from within",
      "Long-lasting up to 12 hours",
    ],
    variants: [
      { name: "Shade", options: ["Soft Peach", "Plum Berry", "Petal Pink"] },
    ],
  },
  {
    id: "cos-mascara-fiber",
    name: "High-Heel Volume Lash Extension Mascara",
    category: "Cosmetics",
    subcategory: "Makeup",
    description:
      "A dual-phase fiber formula that acts like temporary lash extensions. Lengthens up to 300% and holds a clean, non-clumping curl curves all day.",
    price: 29,
    rating: 4.7,
    reviewsCount: 310,
    mainImage:
      "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=600",
    images: [
      "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=600",
    ],
    features: [
      "Infused with tiny silk extension micro-fibers",
      "Hourly dynamic non-smudging waterproof coating",
      "Easily dissolves under warm water makeup-remover cloth",
    ],
    variants: [{ name: "Type", options: ["Waterproof", "Classic Washable"] }],
  },
];

export const SAMPLE_REVIEWS: Review[] = [
  {
    id: "rev-1",
    author: "Anastasia V.",
    rating: 5,
    title: "Best lace wig i have ever bought!",
    text: "The HD Invisible Lace front wig is literally a dream! It melts so beautifully. I didn't even have to pluck much, the hairline was ready to install. Highly recommend to everyone who loves luxury hair quality.",
    date: "June 08, 2026",
    verified: true,
  },
  {
    id: "rev-2",
    author: "Seraphina K.",
    rating: 5,
    title: "Unbelievable skin blend!",
    text: "Bought the Serum Foundation shade 220. It's incredibly breathable and gave me a continuous dewy glow all evening! Doesn't crack or highlight dry spots. Total game changer.",
    date: "June 01, 2026",
    verified: true,
  },
  {
    id: "rev-3",
    author: "Maya J.",
    rating: 4,
    title: "Shampoo sets did wonders to my split ends",
    text: "The Hydrating White Caviar set is amazing. Smells like a high-end French perfume salon. Deducted one star just because shipping took 4 days, but the packaging inside is stunning and the product feels very premium.",
    date: "May 25, 2026",
    verified: true,
  },
];

export const SAMPLE_BLOGS: BlogPost[] = [
  {
    id: "blog-wig-guide",
    title: "How to Melt HD Lace Wigs Professionally at Home",
    excerpt:
      "The ultimate stylist secrets to achieving a completely undetectable, flawless lace hairline install using skin-safe melting tapes and styling wraps.",
    content: [
      "Achieving an undetectable lace front wig installation is the holy grail of beauty. When done correctly, high-definition (HD) lace virtually vanishes against any skin tissue, bringing out an impression that hair is growing straight out of your scalp.",
      "Step 1: Prep is everything. Thoroughly cleanse your natural hair line with skin-neutral micellar water or rubbing alcohol. Any natural sebum or oils will prevent holding gels or melting tapes from adhering and curing correctly. Next, apply a skin protection scalp shield spray.",
      "Step 2: Choose the right adhesive or gel. For a temporary glueless look, a high-holding melting foam is your sweet spot because it washes off with simple water. For standard weekly wear, apply a skin-safe styling adhesive. Work in thin, even layers. Let it cure until tacky.",
      "Step 3: The crucial melting band. Once you lay down the HD lace, immediately tie down your perimeter with a wide, elastic lace melting band. Leave this on for at least 15 minutes. The compression heat binds the lace and adhesive beautifully, rendering the mesh entirely invisible.",
    ],
    author: "Charlotte Dubois",
    authorAvatar:
      "https://images.unsplash.com/photo-1595959183075-c1d0a161b03d?auto=format&fit=crop&q=80&w=80",
    authorRole: "Editorial Hair Stylist",
    date: "June 10, 2026",
    readTime: "5 min read",
    category: "Hair Guides",
    mainImage:
      "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&q=80&w=600",
    isFeatured: true,
    comments: [
      {
        id: "bc-1",
        author: "Lilian Carter",
        text: "This guide literally saved my weekend install! The prep step makes such a huge difference.",
        date: "June 11, 2026",
      },
      {
        id: "bc-2",
        author: "Sasha Banks",
        text: "Which melting foam do you recommend for workouts? Need something sweat-resistant.",
        date: "June 12, 2026",
      },
    ],
  },
  {
    id: "blog-makeup-trends",
    title: "5 Luxury Makeup Trends Taking Over Summer 2026",
    excerpt:
      "From dew drops to custom sunset gaze eyeshadow contours. Discover the curated trends shaping global runway fashion lines this season.",
    content: [
      "This season, the global beauty focus is pivoting back to healthy, glassy glow and warm sunlit terracottas. Heavy baking is officially taking a backseat to custom hydra-glow serum foundations and fresh whipped cream blushes that melt on impact.",
      "1. Cloud Dew Skin: Glowy skin is no longer about metallic highlighters. It is all about a hydration-locked breathable pore look. Use serum foundations containing active triple-dense Hyaluronic Acid to create a moist skin shield.",
      "2. Terracotta Sunset Eyes: Terracotta orange hues blended seamlessly into warm amber and copper eye contours. It adds massive depth and highlights brown, green, and blue gaze tones in summer sunlight.",
      "3. Plush Suede Lips: Matte is back, but soft instead of ultra-dry. Velvet suede lipsticks that stay transferproof but hydrate throughout the hours are taking over backstage fashion prep lines.",
    ],
    author: "Mila Sterling",
    authorAvatar:
      "https://images.unsplash.com/photo-1595959183075-c1d0a161b03d?auto=format&fit=crop&q=80&w=80",
    authorRole: "Vercel Beauty Analyst",
    date: "June 05, 2026",
    readTime: "4 min read",
    category: "Cosmetics & Trends",
    mainImage:
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=600",
    comments: [],
  },
  {
    id: "blog-haircare-routines",
    title: "The White Caviar Hair Care Secret Decoded",
    excerpt:
      "Why premium white caviar Liposomes are becoming the luxury ingredient to reverse decades of cuticle heating damage from stylers.",
    content: [
      "White Caviar extract is deeply treasured in skincare for its extreme lipid density and cell regeneration properties. Now, cosmetic labs have adapted this raw ingredient to structural hair therapy.",
      "Our hair cuticle is made of fine protein shingles that lay flat. Thermal damage from blowouts and straighteners lifts these shingles, letting core hydration evaporate. White caviar proteins work alongside cold-pressed Moroccan argan oil to replenish the lipid-membrane and bind cuticle gaps neatly.",
    ],
    author: "Dr. Elena Rostov",
    authorAvatar:
      "https://images.unsplash.com/photo-1595959183075-c1d0a161b03d?auto=format&fit=crop&q=80&w=80",
    authorRole: "Trichology Specialist",
    date: "May 28, 2026",
    readTime: "7 min read",
    category: "Science of Hair",
    mainImage:
      "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&q=80&w=600",
    comments: [],
  },
];

export const SAMPLE_FAQS = [
  {
    question: "Do you supply 100% human hair for all hair wigs?",
    answer:
      "Absolutely! Every wig and extension we offer is crafted exclusively from 100% Remy or Raw Virgin human donor hair. We do not use any synthetic fibers, plastic hair blends, or non-Remy cuticles, ensuring your hair can be colored, styled, and heat-curled without issues.",
  },
  {
    question: "What makes HD Lace different from Standard Swiss Lace?",
    answer:
      "HD (High Definition) Lace uses active micro-mesh which is considerably thinner, softer, and more transparent than traditional Swiss lace. It melts flawlessly into any skin tone upon applying adhesive or melting spray, providing a clean, professional, scalp-like illusion of organic growth.",
  },
  {
    question: "Are your cosmetics cruelty-free?",
    answer:
      "Yes, Timeless Trends Hair & Cosmetics is 100% cruelty-free. We never test any raw ingredients or finished cosmetic formulas on animals. Our items are formulated with high-quality, non-toxic, skin-enhancing clean ingredients in trusted laboratories.",
  },
  {
    question: "How long do the tape-in hair extensions last?",
    answer:
      "With proper hair care, our premium tape-in human extensions survive up to 8-10 weeks before requiring replacement or re-taping. They are fully reusable. You can simply purchase replacement adhesive tapes from our shop, clean off the old bands, and reorder them.",
  },
  {
    question: "What is your shipping and return policy?",
    answer:
      "We offer free expedited shipping on all orders over $150. For hygiene reasons, wigs and hair extensions can only be returned within 14 days if they are completely unaltered, with the security tags intact, the lace uncut, and packaging unopened. Cosmetics can be returned in as-new condition.",
  },
];

export const PRESET_ORDERS: Order[] = [
  {
    id: "TT-2026-9810",
    date: "June 02, 2026",
    status: "Delivered",
    items: [
      {
        id: "wig-lux-hd-lace-18-natural",
        product: SAMPLE_PRODUCTS[0], // hd lace wig
        quantity: 1,
        selectedVariant: {
          Length: "18 inch",
          Color: "Natural Black",
          Texture: "Body Wave",
        },
      },
      {
        id: "cos-matte-lipstick-crimson",
        product: SAMPLE_PRODUCTS[8], // matte lipstick
        quantity: 2,
        selectedVariant: { Shade: "Sultry Crimson" },
      },
    ],
    total: 376,
    shippingAddress: {
      fullName: "Kofi Frankie",
      email: "kofifrankie@gmail.com",
      phone: "+1 (555) 349-2041",
      addressLine1: "128 Luxury Boulevard",
      addressLine2: "Apt 4B",
      city: "San Francisco",
      state: "CA",
      zipCode: "94107",
      country: "United States",
    },
    paymentMethod: "Credit Card (Visa ending in 4102)",
    trackingNumber: "UPS-990264109",
  },
  {
    id: "TT-2026-3245",
    date: "May 14, 2026",
    status: "Delivered",
    items: [
      {
        id: "hc-shampoo-caviar-250",
        product: SAMPLE_PRODUCTS[6], // caviar shampoo
        quantity: 1,
        selectedVariant: { Size: "250ml Kit" },
      },
    ],
    total: 85,
    shippingAddress: {
      fullName: "Kofi Frankie",
      email: "kofifrankie@gmail.com",
      phone: "+1 (555) 349-2041",
      addressLine1: "128 Luxury Boulevard",
      addressLine2: "Apt 4B",
      city: "San Francisco",
      state: "CA",
      zipCode: "94107",
      country: "United States",
    },
    paymentMethod: "Apple Pay",
    trackingNumber: "FedEx-889021443",
  },
];
