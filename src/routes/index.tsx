import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { Reveal, Icon, StarIcon } from "@/components/Reveal";
import { MaterialCalculator } from "@/components/MaterialCalculator";
import { ProductSpecsModal, type ProductSpecData } from "@/components/ProductSpecsModal";
import { QuoteModal } from "@/components/QuoteModal";
import { ThemeToggle } from "@/lib/theme";
import { toast } from "sonner";
import heroImg from "@/assets/hero-byk.jpg";
import appajiImg from "@/assets/appaji-byk.jpg";

const IMG = {
  logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuD5NN2I4Z_DhxCT5tuRsE6JEwBkH2noKGXjocnrttgKK2ApGuWTwJT2TqZntR4SGHmWeA-EjoPPiO6rtpRCKAIJPJ85PMZPj2FHBI-y_nfKH617kuL_7Htop4Uur922oxx91_gZjXNxfi-9M18t4Yo3S0kUXA7Fhf_m6zu1uPE9PZ6nHRwni7BXnpK4iZO6lM1UYoEqoanGC4sgSvwWSi0ExdxKLt6nxCq9vnIDJBi5ZUGItulidD8l9fiPCe1goC-ew20",
  hero: heroImg,
  facility: appajiImg,
  brick:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBYNSTqruqH8NmtC9W8ejgY5ngio1fngTkzpbTdTmMeZU_KrfeWcMcGk3puTGOwKGiIj8VlKDEdHZOVKYWM6p8BYZQefrxS5h-GZ0O_WrM7Xe0nun9c5xBscQEZdBhWEfd_tUV9ZUs4je6ABBq1Znonlx0h8-tvQQGq4kEvKAPyNzmZKOmeM5ZJnmvbl_e-yATlRRoO25tdR4RCj5C7wiSCzG6QBm7sN-dGwVvvRgPb8XHwrSPRyftk2Q",
  sand: "https://lh3.googleusercontent.com/aida-public/AB6AXuAyYgnUgnKxlNmdIzsExqVVSU8ZHg-jJbZBfJG2IfGIev6mE5t1kxr-BVog4Rb_jFoebz7YenNXztx2rNChiBV0a55VLosonStkp5H3QVdHZfphpfVs08oSXI9hHn9DymiSvHjhaVg672uvGhFshYjdZ_5b1pothOyL1U_hVCTtvyNG38WPJrNPNFlrKx9XCi2FbD5CbGP8-NHETlyR3oELrVqvuxpcCqwrMj9pqKD5t2Q4RcB_Ndkrvg",
  stones:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCeQoNjKF1cvE7J26Ao89KWXsM74Ihq9ke4kx_nWXzEQNjslzmUIpx35M_521kgW41wNuhkf5aOmt5wIinkt4rwHtqm2BC6LJa9cev6u2jCwWZ-2rSo_ZrOEKT3lMpbTgnEsLwRuITuHjDaBGNQY1i_mppW5J4JixwFJ3nbTWg4xfC1YxH2Fm8iir94xLWpN8rW53gvpXM1xG4J4_vQeg1dnySa42TWtUlOHglI1En6R_b_4fw0NmEp3A",
  truck:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuD1agMc80BjgcUCwAaOeFQfAhAW-dcB8-iE2wR1vbQpCQLe2uzXmw_QqaNYrDSTn1csSGBevW-7YZIy80VVTg5btN8Owqgd5XAd00WjwEP4KM3i3e12lgVgmOAcJuNnWfoMgevr-gIHNLzNQahQ-CVN7hSaXMojgZeZTfBuDeAFXnjBdVko9yQjx8GOzxWFm5Bd5LgwpidJBbOmJNkjH3KNNm7Z9NZuodZ__p07Z6wtlMmOF6m_lVC5IQ",
  map: "https://lh3.googleusercontent.com/aida-public/AB6AXuCJCjrpO78Rbz3pFSe-Fub87NNezjFwH0XdjVcaOJdtkUO0pq2Syqd156FO-g8UM2Km_lKrYltvU6BIoDFT8Fq4IaAqIXaK5r1UD0rZPpRX73cN5ycWOxvY3KBdtyzDAme0hrAckV5e1wqAbAn0_ik5pp-e5dySWQzHzyEPBN8HVSn266UPzVEh1hJ7WNA_1FdGIVIy0jNDAUGkyuCwtCw5-OIuKp6eh7HGWXLWtw6HWp6RzL7MwjgPeA",
};

const TITLE = "BYK Bricks — Premium Bricks, Sand & Aggregates in Haveri";
const DESC =
  "BYK Bricks manufactures high-quality solid clay bricks, construction sand and jelly stones in Kawalettu, Rannebennur, Haveri — with reliable regional delivery.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:image", content: IMG.hero },
      { name: "twitter:image", content: IMG.hero },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: "BYK Bricks",
          description: DESC,
          telephone: ["+917204157347", "+919448566456"],
          email: "bykrocky@gmail.com",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Kawalettu, Kumarapatanam (post)",
            addressLocality: "Rannebennur",
            addressRegion: "Karnataka",
            postalCode: "581123",
            addressCountry: "IN",
          },
        }),
      },
    ],
  }),
  component: Index,
});

const NAV = [
  { label: "Home", href: "#home" },
  { label: "Our Products", href: "#products" },
  { label: "Calculator", href: "#calculator" },
  { label: "Logistics", href: "#logistics" },
  { label: "About Us", href: "#about" },
  { label: "Reviews", href: "#reviews" },
  { label: "Contact", href: "#contact" },
];

const PRODUCTS_DATA: (ProductSpecData & {
  bar: string;
  badge?: string;
  icon: string;
  tag: string;
  alt: string;
  grade: string;
})[] = [
  {
    title: "Solid Clay Bricks",
    category: "Fired Clay Masonry",
    bar: "bg-brand-secondary",
    image: IMG.brick,
    badge: "Most Popular",
    grade: "Grade A+ Industrial",
    description:
      "Traditional kiln-fired solid red clay bricks manufactured using fine alluvial clay from the Tungabhadra basin. Engineered for load-bearing walls, multi-story structural foundations, and weather-resistant exteriors.",
    standards: "IS 1077 : 1992 (Class 10.5+)",
    icon: "compress",
    tag: "High Compressive Density",
    alt: "Close-up of a solid red clay building brick with uniform edges",
    specs: [
      {
        label: "Compressive Strength",
        value: "> 10.5 - 12.5 N/mm²",
        detail: "Exceeds standard 3.5 N/mm² requirements",
      },
      {
        label: "Water Absorption",
        value: "< 14.5% (by weight)",
        detail: "Low porosity prevents moisture seepage",
      },
      {
        label: "Standard Size",
        value: "225 × 110 × 75 mm",
        detail: "Uniform dimensions with minimal variance",
      },
      {
        label: "Bulk Density",
        value: "~1,850 kg/m³",
        detail: "High acoustic & thermal insulation",
      },
    ],
    applications: [
      "Load-Bearing Structural Walls",
      "Basement & Foundation Footings",
      "Exposed Brick Architectural Facades",
      "High-Load Boundary Walls",
    ],
  },
  {
    title: "High-Grade Construction Sand",
    category: "Aggregates & Mortar",
    bar: "bg-brand-primary",
    image: IMG.sand,
    badge: "Silt-Free Purity",
    grade: "Zone II Fine Graded",
    description:
      "Triple-washed, finely graded construction sand optimized for high-strength concrete mixes, column casting, and smooth plastering. Provides superior chemical bonding with Portland cement.",
    standards: "IS 383 : 2016 (Zone II Specification)",
    icon: "grain",
    tag: "100% Silt & Clay Free",
    alt: "High-grade clean construction sand",
    specs: [
      {
        label: "Silt & Clay Content",
        value: "< 1.2%",
        detail: "Zero organic impurities for solid mortar strength",
      },
      {
        label: "Specific Gravity",
        value: "2.65 - 2.70",
        detail: "Dense particle packing in concrete mixes",
      },
      {
        label: "Grading Zone",
        value: "Zone II IS Specification",
        detail: "Ideal fineness modulus for structural RCC",
      },
      {
        label: "Moisture Content",
        value: "< 3.0%",
        detail: "Delivered dry and ready for batching",
      },
    ],
    applications: [
      "Reinforced Cement Concrete (RCC) Slabs",
      "Column & Beam Casting",
      "External & Internal Wall Plastering",
      "Brick & Block Masonry Mortar",
    ],
  },
  {
    title: "Jelly Diamond Stones",
    category: "Granite Aggregates",
    bar: "bg-surface-tint",
    image: IMG.stones,
    badge: "Crushed Granite",
    grade: "20mm & 40mm Pure Blue Metal",
    description:
      "High-density angular crushed granite aggregates (jelly stones) mined from hard igneous rock. High interlocking angle maximizes tensile and compressive strength in heavy foundational concrete.",
    standards: "IS 383 / MoRTH Compliant",
    icon: "diamond",
    tag: "High Tensile Strength",
    alt: "Crushed blue granite jelly stones",
    specs: [
      {
        label: "Aggregate Crushing Value",
        value: "< 20%",
        detail: "Exceptional resistance to crushing under roller loads",
      },
      { label: "Impact Value", value: "< 18%", detail: "High shock & seismic load absorption" },
      {
        label: "Flakiness Index",
        value: "< 15%",
        detail: "Cubical angular shape ensures high interlocking",
      },
      {
        label: "Specific Gravity",
        value: "2.75 g/cm³",
        detail: "Pure hard blue granite formation",
      },
    ],
    applications: [
      "Heavy Industrial & Commercial Foundations",
      "RCC Pillars, Bridge Girders & Culverts",
      "Road Base Sub-grade & Pavements",
      "Under-slab Anti-capillary Drainage Layers",
    ],
  },
];

interface ReviewItem {
  id: string;
  name: string;
  role: string;
  location: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
}

const INITIAL_REVIEWS: ReviewItem[] = [
  {
    id: "1",
    name: "Rajesh Kumar",
    role: "Senior Site Engineer",
    location: "Rannebennur Project",
    rating: 5,
    date: "2 days ago",
    comment:
      "The quality of the solid clay bricks is unmatched in the district. Our foundation work was completed ahead of schedule thanks to the uniform dimensions and zero breakage upon truck unloading.",
    verified: true,
  },
  {
    id: "2",
    name: "Anita Desai",
    role: "Architect & Consultant",
    location: "Haveri Urban Build",
    rating: 5,
    date: "1 week ago",
    comment:
      "Reliable delivery fleet and excellent customer service from the BYK team. The construction sand was remarkably clean and silt-free, perfect for our high-strength M25 concrete mix.",
    verified: true,
  },
  {
    id: "3",
    name: "Manjunath Patil",
    role: "Residential Contractor",
    location: "Byadgi Infrastructure",
    rating: 5,
    date: "2 weeks ago",
    comment:
      "Appaji and the team have set the standard for construction aggregates. Ordered 4 truckloads of 20mm jelly stones and 15,000 bricks. Everything arrived directly to the site on exact schedule.",
    verified: true,
  },
];

const DELIVERY_ZONES = [
  { name: "Haveri City & Surrounds", dist: "0-15 km", time: "1 - 2 Hours" },
  { name: "Rannebennur & Kumarapatanam", dist: "Plant Hub", time: "Instant Dispatch" },
  { name: "Byadgi & Motebennur", dist: "20-35 km", time: "2 - 3 Hours" },
  { name: "Davangere & Harihar", dist: "30-50 km", time: "Same Day" },
  { name: "Hirekerur & Rattihalli", dist: "35-55 km", time: "Same Day" },
  { name: "Hubballi-Dharwad Corridor", dist: "65-80 km", time: "Next Morning / Scheduled" },
];

function Index() {
  const [selectedProduct, setSelectedProduct] = useState<ProductSpecData | null>(null);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [calculatorOpen, setCalculatorOpen] = useState(true);

  // Review states
  const [reviews, setReviews] = useState<ReviewItem[]>(INITIAL_REVIEWS);
  const [reviewRating, setReviewRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [authorName, setAuthorName] = useState("");
  const [authorRole, setAuthorRole] = useState("");
  const [authorLocation, setAuthorLocation] = useState("");
  const [reviewFeedback, setReviewFeedback] = useState("");
  const [selectedRatingFilter, setSelectedRatingFilter] = useState<number | null>(null);

  const filteredReviews = useMemo(() => {
    if (!selectedRatingFilter) return reviews;
    return reviews.filter((r) => r.rating === selectedRatingFilter);
  }, [reviews, selectedRatingFilter]);

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !reviewFeedback.trim()) {
      toast.error("Please provide your name and review comments.");
      return;
    }

    const newRev: ReviewItem = {
      id: Date.now().toString(),
      name: authorName.trim(),
      role: authorRole.trim() || "Verified Buyer",
      location: authorLocation.trim() || "Karnataka",
      rating: reviewRating,
      date: "Just now",
      comment: reviewFeedback.trim(),
      verified: true,
    };

    setReviews([newRev, ...reviews]);
    setAuthorName("");
    setAuthorRole("");
    setAuthorLocation("");
    setReviewFeedback("");
    setReviewRating(5);
    toast.success("Thank you! Your verified review has been published.");
  };

  const handleQuickCall = (num: string) => {
    window.location.href = `tel:${num}`;
  };

  return (
    <div className="relative min-h-screen bg-surface font-body text-body-md text-on-surface antialiased selection:bg-brand-primary/20 selection:text-brand-primary">
      {/* Background Architectural Mesh & Subtle Pattern */}
      <div className="fixed inset-0 pointer-events-none z-0 bg-grid-pattern opacity-60" />

      {/* Floating Ambient Glow Orbs for Glass Refraction */}
      <div className="fixed -top-40 -left-40 h-96 w-96 rounded-full bg-brand-primary/10 blur-[120px] pointer-events-none z-0" />
      <div className="fixed top-1/3 -right-40 h-[500px] w-[500px] rounded-full bg-primary-container/15 blur-[140px] pointer-events-none z-0" />
      <div className="fixed bottom-20 left-1/4 h-80 w-80 rounded-full bg-brand-secondary/10 blur-[120px] pointer-events-none z-0" />

      {/* ========================================================= */}
      {/* TOP FLOATING GLASS HEADER */}
      {/* ========================================================= */}
      <header className="fixed top-0 z-50 w-full px-4 sm:px-6 lg:px-12 py-3 transition-all duration-300">
        <div className="glass-card mx-auto flex h-20 max-w-container-max items-center justify-between px-6 sm:px-8 rounded-2xl sm:rounded-3xl border border-white/80 dark:border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.06)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.4)]">
          <a href="#home" className="flex items-center gap-3 group">
            <div className="relative">
              <img
                alt="BYK Bricks Logo"
                className="h-14 sm:h-16 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                src={IMG.logo}
              />
              <span className="absolute -bottom-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
              </span>
            </div>
            <div className="hidden sm:block">
              <div className="font-headline text-lg font-bold text-brand-primary dark:text-cyan-400 tracking-tight">
                BYK BRICKS
              </div>
              <div className="text-[11px] text-on-surface-variant font-medium tracking-wide">
                Haveri &bull; Rannebennur
              </div>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 p-1.5 rounded-2xl bg-surface-container-low/60 dark:bg-surface-container/60 backdrop-blur-md border border-white/60 dark:border-white/10">
            {NAV.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="px-3.5 py-1.5 rounded-xl font-body text-xs font-semibold text-on-surface-variant transition-all duration-200 hover:text-brand-primary dark:hover:text-cyan-400 hover:bg-white/80 dark:hover:bg-white/10"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Theme Toggle Button */}
            <ThemeToggle className="shrink-0" />

            <a
              href="tel:7204157347"
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-brand-primary dark:text-cyan-400 hover:bg-brand-primary/10 transition-colors"
            >
              <Icon name="phone" className="text-[18px]" />
              <span className="hidden md:inline">7204157347</span>
            </a>

            <button
              onClick={() => setIsQuoteModalOpen(true)}
              className="relative overflow-hidden rounded-xl bg-brand-primary hover:bg-brand-primary/90 px-4 sm:px-5 py-2.5 font-body text-xs font-bold uppercase tracking-wider text-on-primary shadow-md hover:shadow-lg hover:brightness-110 transition-all duration-300 active:scale-95 flex items-center gap-2 group"
            >
              <span className="absolute inset-0 w-full h-full bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <Icon name="request_quote" className="text-[18px]" />
              <span className="hidden xs:inline">Get a Quote</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-surface-container-low dark:bg-surface-container border border-white/60 dark:border-white/10 lg:hidden text-on-surface shadow-sm"
              aria-label="Toggle navigation"
            >
              <Icon name={mobileMenuOpen ? "close" : "menu"} className="text-[22px]" />
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Glass Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 mx-auto max-w-container-max glass-card rounded-2xl p-5 border border-white/90 dark:border-white/10 shadow-2xl animate-fadeIn">
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between pb-3 border-b border-outline-variant/30">
                <span className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                  Theme Appearance
                </span>
                <ThemeToggle showLabel className="!py-1.5 !px-3" />
              </div>

              {NAV.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-2.5 rounded-xl font-body text-sm font-semibold text-on-surface hover:bg-brand-primary/10 hover:text-brand-primary dark:hover:text-cyan-400 transition-all flex items-center justify-between"
                >
                  <span>{item.label}</span>
                  <Icon name="arrow_forward" className="text-[16px] opacity-60" />
                </a>
              ))}
              <div className="pt-3 mt-2 border-t border-outline-variant/30 flex flex-col gap-2">
                <a
                  href="tel:7204157347"
                  className="w-full py-2.5 rounded-xl bg-brand-primary/10 text-brand-primary dark:text-cyan-400 font-bold text-xs flex items-center justify-center gap-2"
                >
                  <Icon name="call" className="text-[16px]" /> Call: 7204157347 / 9448566456
                </a>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* ========================================================= */}
      {/* MAIN CONTENT AREA */}
      {/* ========================================================= */}
      <main className="relative z-10 w-full pt-28 sm:pt-32">
        {/* HERO SECTION WITH GLASSMORPHIC HUD & STATS */}
        <section
          id="home"
          className="relative min-h-[85vh] flex items-center px-4 sm:px-6 lg:px-12 py-12 lg:py-20"
        >
          <div className="mx-auto w-full max-w-container-max">
            <div className="relative overflow-hidden rounded-3xl sm:rounded-[2.5rem] border border-white/90 shadow-2xl">
              {/* Background Hero Image with frosted gradient overlay */}
              <div className="absolute inset-0 z-0">
                <img
                  alt="Industrial quality control and clay brick kiln at BYK Bricks"
                  className="h-full w-full object-cover object-center transform scale-105"
                  src={IMG.hero}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/75 to-slate-900/40 backdrop-blur-[2px]" />
                <div className="absolute inset-0 bg-grid-pattern-dark opacity-30" />
              </div>

              {/* Hero Inner Grid */}
              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-10 md:p-14 lg:p-16 items-center text-white">
                <div className="lg:col-span-8 space-y-6">
                  {/* Status Badge */}
                  <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full glass-dark border border-white/20 text-xs font-semibold text-primary-fixed-dim">
                    <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Active Kiln &amp; Plant Dispatch &bull; Haveri, Karnataka</span>
                  </div>

                  <h1 className="font-headline text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
                    Building Stronger Foundations with{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-fixed-dim via-cyan-300 to-amber-300">
                      Industrial Precision.
                    </span>
                  </h1>

                  <p className="max-w-2xl font-body text-sm sm:text-base md:text-lg text-slate-200 leading-relaxed">
                    Under the visionary legacy of{" "}
                    <strong className="text-amber-300 font-semibold">Appaji</strong>, BYK Bricks
                    delivers premium solid clay kiln bricks, triple-washed construction sand, and
                    diamond-crushed aggregates engineered for uncompromising structural strength.
                  </p>

                  {/* Primary CTA button group */}
                  <div className="flex flex-wrap items-center gap-3.5 pt-2">
                    <button
                      onClick={() => setIsQuoteModalOpen(true)}
                      className="px-6 sm:px-8 py-3.5 rounded-2xl bg-gradient-to-r from-primary-container to-brand-primary text-white font-body text-xs sm:text-sm font-bold uppercase tracking-wider shadow-lg hover:shadow-cyan-500/25 hover:brightness-110 transition-all duration-300 flex items-center gap-2"
                    >
                      <Icon name="request_quote" className="text-[18px]" />
                      Get Instant Quote
                    </button>

                    <a
                      href="#calculator"
                      className="px-6 sm:px-8 py-3.5 rounded-2xl glass-dark hover:bg-white/20 text-white font-body text-xs sm:text-sm font-bold tracking-wider transition-all duration-300 flex items-center gap-2 border border-white/20"
                    >
                      <Icon name="calculate" className="text-[18px] text-cyan-300" />
                      Material Calculator
                    </a>

                    <a
                      href="#products"
                      className="px-5 py-3.5 rounded-2xl text-xs sm:text-sm font-semibold text-slate-300 hover:text-white transition-colors flex items-center gap-1.5"
                    >
                      <span>Explore Catalog</span>
                      <Icon name="arrow_downward" className="text-[16px]" />
                    </a>
                  </div>

                  {/* Glassmorphic Trust Metric Bar */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-white/15">
                    <div className="glass-dark rounded-2xl p-3.5 text-center border border-white/10">
                      <div className="font-headline text-2xl sm:text-3xl font-bold text-cyan-300">
                        100+
                      </div>
                      <div className="text-[11px] font-medium text-slate-300 mt-0.5">
                        Major Projects Delivered
                      </div>
                    </div>

                    <div className="glass-dark rounded-2xl p-3.5 text-center border border-white/10">
                      <div className="font-headline text-2xl sm:text-3xl font-bold text-amber-400">
                        Grade A+
                      </div>
                      <div className="text-[11px] font-medium text-slate-300 mt-0.5">
                        Lab Certified Strength
                      </div>
                    </div>

                    <div className="glass-dark rounded-2xl p-3.5 text-center border border-white/10">
                      <div className="font-headline text-2xl sm:text-3xl font-bold text-emerald-300">
                        24-48h
                      </div>
                      <div className="text-[11px] font-medium text-slate-300 mt-0.5">
                        Site Direct Offloading
                      </div>
                    </div>

                    <div className="glass-dark rounded-2xl p-3.5 text-center border border-white/10">
                      <div className="font-headline text-2xl sm:text-3xl font-bold text-purple-300">
                        100%
                      </div>
                      <div className="text-[11px] font-medium text-slate-300 mt-0.5">
                        Basin Pure Clay &amp; Stone
                      </div>
                    </div>
                  </div>
                </div>

                {/* Hero Right Quick Dispatch Radar Card */}
                <div className="lg:col-span-4 hidden lg:block">
                  <div className="glass-dark rounded-3xl p-6 border border-white/20 shadow-2xl space-y-4">
                    <div className="flex items-center justify-between border-b border-white/10 pb-3">
                      <div className="flex items-center gap-2">
                        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-ping" />
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-200">
                          Direct Plant Line
                        </span>
                      </div>
                      <span className="text-[11px] text-cyan-300 font-semibold">
                        Haveri &bull; RNB
                      </span>
                    </div>

                    <div className="space-y-3">
                      <button
                        onClick={() => handleQuickCall("7204157347")}
                        className="w-full p-3 rounded-2xl bg-white/10 hover:bg-white/20 transition-all flex items-center justify-between text-left group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="h-9 w-9 rounded-xl bg-cyan-500/20 text-cyan-300 flex items-center justify-center">
                            <Icon name="call" className="text-[20px]" />
                          </div>
                          <div>
                            <div className="text-xs text-slate-300">Sales &amp; Dispatch 1</div>
                            <div className="font-headline font-bold text-sm text-white group-hover:text-cyan-300 transition-colors">
                              +91 7204157347
                            </div>
                          </div>
                        </div>
                        <Icon
                          name="arrow_forward"
                          className="text-[16px] text-slate-400 group-hover:translate-x-1 transition-transform"
                        />
                      </button>

                      <button
                        onClick={() => handleQuickCall("9448566456")}
                        className="w-full p-3 rounded-2xl bg-white/10 hover:bg-white/20 transition-all flex items-center justify-between text-left group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="h-9 w-9 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center">
                            <Icon name="phone_in_talk" className="text-[20px]" />
                          </div>
                          <div>
                            <div className="text-xs text-slate-300">Sales &amp; Plant Line 2</div>
                            <div className="font-headline font-bold text-sm text-white group-hover:text-amber-300 transition-colors">
                              +91 9448566456
                            </div>
                          </div>
                        </div>
                        <Icon
                          name="arrow_forward"
                          className="text-[16px] text-slate-400 group-hover:translate-x-1 transition-transform"
                        />
                      </button>
                    </div>

                    <div className="pt-2 text-[11px] text-slate-300 leading-normal flex items-start gap-2">
                      <Icon
                        name="verified_user"
                        className="text-[16px] text-emerald-400 shrink-0 mt-0.5"
                      />
                      <span>
                        Zero-brokerage direct factory procurement with digital weighbridge invoice
                        guarantee.
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* PRODUCT CATALOG WITH GLASSMORPHIC CARDS & SPECS MODAL */}
        {/* ========================================================= */}
        <section id="products" className="relative px-4 sm:px-6 lg:px-12 py-20 lg:py-28">
          <div className="mx-auto max-w-container-max">
            <Reveal className="mb-14 text-center max-w-3xl mx-auto space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-pill text-brand-primary text-xs font-bold uppercase tracking-wider">
                <Icon name="inventory_2" className="text-[16px]" />
                Engineered Construction Products
              </div>
              <h2 className="font-headline text-3xl sm:text-4xl font-bold text-on-surface">
                Standard-Compliant Building Materials
              </h2>
              <p className="font-body text-sm sm:text-base text-on-surface-variant">
                Manufactured under stringent quality control with laboratory-tested compressive
                strength, uniform geometry, and zero silt impurities.
              </p>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {PRODUCTS_DATA.map((product, idx) => (
                <Reveal key={product.title} delay={idx * 120}>
                  <div className="glass-card glass-card-hover group flex flex-col h-full rounded-3xl overflow-hidden border border-white/90">
                    {/* Top color indicator bar */}
                    <div className={`h-2.5 w-full ${product.bar}`} />

                    {/* Image container with glass tags */}
                    <div className="relative h-64 overflow-hidden bg-slate-100 dark:bg-slate-800">
                      <img
                        alt={product.alt}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-108"
                        src={product.image}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

                      {product.badge && (
                        <div className="absolute top-4 right-4 glass-pill px-3 py-1 text-xs font-bold text-brand-secondary dark:text-purple-300">
                          {product.badge}
                        </div>
                      )}

                      <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white text-xs">
                        <span className="glass-dark px-2.5 py-1 rounded-lg font-semibold">
                          {product.grade}
                        </span>
                        <span className="font-medium text-slate-200">
                          {product.standards.split("(")[0]}
                        </span>
                      </div>
                    </div>

                    {/* Card Content Body */}
                    <div className="p-6 sm:p-7 flex flex-col flex-grow justify-between space-y-4">
                      <div>
                        <div className="text-xs uppercase tracking-wider font-bold text-brand-primary dark:text-cyan-400 mb-1">
                          {product.category}
                        </div>
                        <h3 className="font-headline text-xl font-bold text-on-surface group-hover:text-brand-primary dark:group-hover:text-cyan-400 transition-colors">
                          {product.title}
                        </h3>
                        <p className="mt-2 text-sm text-on-surface-variant leading-relaxed line-clamp-3">
                          {product.description}
                        </p>
                      </div>

                      {/* Mini Key Specifications */}
                      <div className="grid grid-cols-2 gap-2 py-3 border-y border-outline-variant/30 text-xs">
                        {product.specs.slice(0, 2).map((s, i) => (
                          <div
                            key={i}
                            className="p-2 rounded-xl bg-surface-container-low/70 dark:bg-surface-container/50"
                          >
                            <div className="text-on-surface-variant/80 text-[11px] truncate">
                              {s.label}
                            </div>
                            <div className="font-bold text-brand-primary dark:text-cyan-400 truncate">
                              {s.value}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Card Action Buttons */}
                      <div className="flex items-center gap-3 pt-2">
                        <button
                          onClick={() => setSelectedProduct(product)}
                          className="flex-1 py-2.5 px-3.5 rounded-xl glass-pill hover:bg-brand-primary hover:text-white dark:hover:bg-cyan-500 dark:hover:text-slate-900 text-brand-primary dark:text-cyan-400 text-xs font-bold transition-all duration-300 flex items-center justify-center gap-1.5"
                        >
                          <Icon name="description" className="text-[16px]" />
                          Full Specs
                        </button>

                        <button
                          onClick={() => setIsQuoteModalOpen(true)}
                          className="flex-1 py-2.5 px-3.5 rounded-xl bg-brand-primary text-white text-xs font-bold shadow-sm hover:bg-brand-secondary transition-all flex items-center justify-center gap-1.5"
                        >
                          <Icon name="request_quote" className="text-[16px]" />
                          Get Quote
                        </button>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* INTERACTIVE MATERIAL QUANTITY CALCULATOR SECTION */}
        {/* ========================================================= */}
        <section id="calculator" className="relative px-4 sm:px-6 lg:px-12 py-16">
          <div className="mx-auto max-w-container-max">
            <MaterialCalculator />
          </div>
        </section>

        {/* ========================================================= */}
        {/* ABOUT & APPAJI HERITAGE SECTION WITH GLASS SHOWCASE */}
        {/* ========================================================= */}
        <section id="about" className="relative px-4 sm:px-6 lg:px-12 py-20 lg:py-28">
          <div className="mx-auto max-w-container-max">
            <div className="glass-card rounded-[2.5rem] p-8 sm:p-12 lg:p-16 border border-white/90 shadow-2xl relative overflow-hidden">
              {/* Decorative Blueprint Background Motif */}
              <div className="absolute right-0 top-0 w-96 h-96 bg-brand-primary/5 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                {/* Founder Image with Glass Badge */}
                <div className="lg:col-span-5 relative">
                  <div className="aspect-[4/5] sm:aspect-square w-full rounded-3xl overflow-hidden border-4 border-white/90 shadow-xl relative group">
                    <img
                      alt="Modern brick manufacturing facility and leadership in Haveri"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      src={IMG.facility}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

                    <div className="absolute bottom-4 left-4 right-4 glass-dark rounded-2xl p-4 text-white border border-white/20">
                      <div className="text-xs uppercase tracking-wider text-amber-300 font-bold">
                        Visionary Founder
                      </div>
                      <div className="font-headline text-lg font-bold text-white">
                        Sri BYK Durgappa
                      </div>
                      <div className="text-xs text-slate-300">
                        Pioneering Quality Construction in Haveri &amp; Rannebennur
                      </div>
                    </div>
                  </div>
                </div>

                {/* Founder & Heritage Story Content */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-pill text-brand-secondary text-xs font-bold uppercase tracking-wider">
                    <Icon name="history_edu" className="text-[16px]" />
                    Legacy &amp; Foundation
                  </div>

                  <h2 className="font-headline text-2xl sm:text-4xl font-bold text-on-surface leading-tight">
                    Building Trust &amp; Strength under the Leadership of{" "}
                    <span className="text-brand-secondary">Appaji</span>
                  </h2>

                  <div className="h-1 w-24 rounded-full bg-gradient-to-r from-brand-secondary to-brand-primary" />

                  <p className="font-body text-sm sm:text-base text-on-surface-variant leading-relaxed">
                    With decades of hands-on kiln craft and mineral expertise, BYK Bricks has grown
                    from a revered local enterprise into Karnataka&apos;s leading supplier of
                    structural masonry, high-purity construction sand, and granite jelly stones.
                    Under Appaji&apos;s visionary stewardship, every product adheres to strict
                    structural integrity guidelines.
                  </p>

                  <p className="font-body text-sm sm:text-base text-on-surface-variant leading-relaxed">
                    We believe the strength of any building lies in the honesty of its raw
                    materials. That is why our clay is sourced from natural river basins, fired at
                    optimal sustained temperatures, and inspected with precision gauge calipers
                    before loading.
                  </p>

                  {/* Core Value Glass Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div className="glass-card rounded-2xl p-4.5 border border-white/80 space-y-2">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-xl bg-brand-primary/10 text-brand-primary flex items-center justify-center">
                          <Icon name="architecture" className="text-[22px]" />
                        </div>
                        <h4 className="font-headline text-sm font-bold text-on-surface">
                          Laser Precision Cuts
                        </h4>
                      </div>
                      <p className="text-xs text-on-surface-variant">
                        Clean square edges and uniform dimensions ensure uniform mortar joints and
                        eliminate on-site masonry trimming.
                      </p>
                    </div>

                    <div className="glass-card rounded-2xl p-4.5 border border-white/80 space-y-2">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-xl bg-brand-secondary/10 text-brand-secondary flex items-center justify-center">
                          <Icon name="gavel" className="text-[22px]" />
                        </div>
                        <h4 className="font-headline text-sm font-bold text-on-surface">
                          Controlled Kiln Firing
                        </h4>
                      </div>
                      <p className="text-xs text-on-surface-variant">
                        High thermal gradient baking cures the clay uniformly, providing resistance
                        to efflorescence and weathering.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* LOGISTICS & REGIONAL RADAR SECTION */}
        {/* ========================================================= */}
        <section
          id="logistics"
          className="relative px-4 sm:px-6 lg:px-12 py-20 lg:py-28 overflow-hidden"
        >
          <div className="mx-auto max-w-container-max">
            <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-brand-primary via-[#004e6e] to-[#00364d] p-8 sm:p-12 lg:p-16 text-white shadow-2xl border border-white/20">
              {/* Background Geometry Pattern */}
              <div className="absolute inset-0 bg-grid-pattern-dark opacity-20 pointer-events-none" />
              <div className="absolute -right-20 -bottom-20 h-96 w-96 rounded-full bg-primary-container/20 blur-3xl pointer-events-none" />

              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                <div className="lg:col-span-7 space-y-6">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-dark text-cyan-300 text-xs font-bold uppercase tracking-wider border border-white/15">
                    <Icon name="local_shipping" className="text-[18px]" />
                    Direct Site Transport Fleet
                  </div>

                  <h2 className="font-headline text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
                    Swift, Safe &amp; Direct Delivery to Your Jobsite.
                  </h2>

                  <p className="font-body text-sm sm:text-base text-slate-200 leading-relaxed">
                    Our dedicated heavy-duty transport vehicles ensure that your bricks, sand, and
                    aggregates arrive directly to your job site on time. We coordinate with your
                    site supervisors for safe offloading, preventing bottlenecks and downtime.
                  </p>

                  {/* Delivery Highlights */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                    {[
                      {
                        icon: "gps_fixed",
                        title: "Real-time Dispatch Alerts",
                        desc: "Know the moment your truck leaves the kiln yard.",
                      },
                      {
                        icon: "health_and_safety",
                        title: "Zero-Breakage Offloading",
                        desc: "Expert unloading crews protect delicate brick edges.",
                      },
                      {
                        icon: "local_gas_station",
                        title: "Dedicated Tipper Fleet",
                        desc: "Hydraulic tipper trucks for instant sand & aggregate dumping.",
                      },
                      {
                        icon: "verified",
                        title: "Weighbridge Guaranteed",
                        desc: "Accurate computerized weight receipts on every load.",
                      },
                    ].map((item, i) => (
                      <div
                        key={i}
                        className="glass-dark p-3.5 rounded-2xl border border-white/10 flex items-start gap-3"
                      >
                        <div className="h-8 w-8 rounded-xl bg-cyan-400/20 text-cyan-300 flex items-center justify-center shrink-0">
                          <Icon name={item.icon} className="text-[18px]" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-white">{item.title}</div>
                          <div className="text-[11px] text-slate-300 mt-0.5">{item.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Regional Delivery Zones */}
                  <div className="pt-4 border-t border-white/15">
                    <div className="text-xs font-bold uppercase tracking-wider text-cyan-300 mb-3">
                      Serving Key Districts &amp; Corridors
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {DELIVERY_ZONES.map((zone) => (
                        <div
                          key={zone.name}
                          className="glass-dark px-3 py-1.5 rounded-xl text-xs font-medium text-slate-200 border border-white/10 flex items-center gap-1.5"
                        >
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                          <span className="font-semibold text-white">{zone.name}</span>
                          <span className="text-[11px] text-cyan-300 font-mono">({zone.time})</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Truck Fleet Visual Card */}
                <div className="lg:col-span-5 relative">
                  <div className="aspect-[4/3] w-full rounded-3xl overflow-hidden border-4 border-white/20 shadow-2xl relative group">
                    <img
                      alt="Flatbed truck loaded with stacks of BYK bricks ready for dispatch"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      src={IMG.truck}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                  </div>

                  {/* Floating Fleet Status Badge */}
                  <div className="mt-4 glass-dark rounded-2xl p-4 border border-white/20 text-white flex items-center justify-between shadow-xl">
                    <div className="flex items-center gap-3">
                      <span className="flex h-3 w-3 rounded-full bg-emerald-400 animate-ping" />
                      <div>
                        <div className="text-[11px] text-slate-300">Fleet Status</div>
                        <div className="text-xs font-bold text-white">
                          Daily Multi-Load Dispatches Active
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => handleQuickCall("7204157347")}
                      className="px-3.5 py-1.5 rounded-xl bg-cyan-400 text-slate-900 text-xs font-bold hover:bg-white transition-colors"
                    >
                      Book Truck
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* REVIEWS & VERIFIED CLIENT FEEDBACK SECTION */}
        {/* ========================================================= */}
        <section id="reviews" className="relative px-4 sm:px-6 lg:px-12 py-20 lg:py-28">
          <div className="mx-auto max-w-container-max">
            <Reveal className="mb-14 text-center max-w-3xl mx-auto space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-pill text-brand-secondary text-xs font-bold uppercase tracking-wider">
                <Icon name="star" className="text-[16px] text-amber-500" />
                Client Testimonials &amp; Feedback
              </div>
              <h2 className="font-headline text-3xl sm:text-4xl font-bold text-on-surface">
                Trusted by Contractors, Engineers &amp; Homeowners
              </h2>
              <p className="font-body text-sm sm:text-base text-on-surface-variant">
                Read genuine reviews from structural contractors and builders across Karnataka.
                Share your own site experience below.
              </p>
            </Reveal>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Write a Review Glassmorphic Form */}
              <div className="lg:col-span-5 glass-card rounded-3xl p-6 sm:p-8 border border-white/90 shadow-xl">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-outline-variant/30">
                  <div className="h-10 w-10 rounded-xl bg-brand-secondary/10 text-brand-secondary flex items-center justify-center">
                    <Icon name="rate_review" className="text-[22px]" />
                  </div>
                  <div>
                    <h3 className="font-headline text-lg font-bold text-on-surface">
                      Submit Your Review
                    </h3>
                    <p className="text-xs text-on-surface-variant">
                      Rate your experience with BYK Bricks.
                    </p>
                  </div>
                </div>

                <form onSubmit={handleReviewSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-on-surface-variant mb-1.5">
                      Your Rating *
                    </label>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((star) => {
                        const isFilled = star <= (hoverRating || reviewRating);
                        return (
                          <button
                            key={star}
                            type="button"
                            onMouseEnter={() => setHoverRating(star)}
                            onMouseLeave={() => setHoverRating(0)}
                            onClick={() => setReviewRating(star)}
                            className="transition-transform duration-200 hover:scale-125 focus:outline-none"
                            aria-label={`Rate ${star} stars`}
                          >
                            <StarIcon filled={isFilled} size={32} />
                          </button>
                        );
                      })}
                      <span className="text-xs font-bold text-brand-primary ml-2">
                        {reviewRating} of 5 Stars
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-on-surface-variant mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Suresh Gowda"
                      value={authorName}
                      onChange={(e) => setAuthorName(e.target.value)}
                      className="w-full rounded-xl border border-outline-variant/60 dark:border-white/10 bg-white/80 dark:bg-slate-900/80 px-4 py-2.5 text-sm text-on-surface focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/20 backdrop-blur-sm"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-on-surface-variant mb-1">
                        Role / Designation
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Civil Contractor / Owner"
                        value={authorRole}
                        onChange={(e) => setAuthorRole(e.target.value)}
                        className="w-full rounded-xl border border-outline-variant/60 dark:border-white/10 bg-white/80 dark:bg-slate-900/80 px-4 py-2 text-sm text-on-surface focus:border-brand-primary focus:outline-none backdrop-blur-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-on-surface-variant mb-1">
                        Location
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Haveri / Rannebennur"
                        value={authorLocation}
                        onChange={(e) => setAuthorLocation(e.target.value)}
                        className="w-full rounded-xl border border-outline-variant/60 dark:border-white/10 bg-white/80 dark:bg-slate-900/80 px-4 py-2 text-sm text-on-surface focus:border-brand-primary focus:outline-none backdrop-blur-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-on-surface-variant mb-1">
                      Your Feedback *
                    </label>
                    <textarea
                      rows={3}
                      required
                      placeholder="Share your thoughts on brick quality, delivery speed, sand consistency..."
                      value={reviewFeedback}
                      onChange={(e) => setReviewFeedback(e.target.value)}
                      className="w-full rounded-xl border border-outline-variant/60 dark:border-white/10 bg-white/80 dark:bg-slate-900/80 px-4 py-2.5 text-sm text-on-surface focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/20 backdrop-blur-sm"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 px-6 rounded-xl bg-brand-primary hover:bg-brand-secondary text-white font-body text-xs font-bold uppercase tracking-wider shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <Icon name="send" className="text-[16px]" />
                    Post Client Review
                  </button>
                </form>
              </div>

              {/* Feed of Reviews with Filter */}
              <div className="lg:col-span-7 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3 pb-2">
                  <div className="font-headline text-lg font-bold text-on-surface">
                    Verified Reviews ({filteredReviews.length})
                  </div>

                  {/* Rating Filters */}
                  <div className="flex items-center gap-1.5 text-xs">
                    <button
                      onClick={() => setSelectedRatingFilter(null)}
                      className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                        selectedRatingFilter === null
                          ? "bg-brand-primary text-white shadow-sm"
                          : "bg-surface-container-low dark:bg-surface-container text-on-surface-variant hover:bg-white/80 dark:hover:bg-white/10"
                      }`}
                    >
                      All
                    </button>
                    {[5, 4].map((stars) => (
                      <button
                        key={stars}
                        onClick={() => setSelectedRatingFilter(stars)}
                        className={`px-3 py-1 rounded-lg font-semibold transition-all flex items-center gap-1 ${
                          selectedRatingFilter === stars
                            ? "bg-brand-primary text-white shadow-sm"
                            : "bg-surface-container-low dark:bg-surface-container text-on-surface-variant hover:bg-white/80 dark:hover:bg-white/10"
                        }`}
                      >
                        <span>{stars}★</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  {filteredReviews.map((rev) => (
                    <div
                      key={rev.id}
                      className="glass-card glass-card-hover rounded-2xl p-5 sm:p-6 border border-white/90 dark:border-white/10 shadow-sm space-y-3"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map((s) => (
                              <StarIcon key={s} filled={s <= rev.rating} size={18} />
                            ))}
                          </div>
                          {rev.verified && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-[10px] font-bold border border-emerald-200 dark:border-emerald-800">
                              <Icon name="verified" className="text-[12px]" /> Verified Client
                            </span>
                          )}
                        </div>

                        <span className="text-xs text-on-surface-variant font-medium">
                          {rev.date}
                        </span>
                      </div>

                      <p className="text-sm text-on-surface leading-relaxed font-body">
                        &ldquo;{rev.comment}&rdquo;
                      </p>

                      <div className="pt-2 border-t border-outline-variant/30 flex items-center justify-between text-xs">
                        <div className="font-bold text-on-surface">{rev.name}</div>
                        <div className="text-on-surface-variant">
                          {rev.role} &bull;{" "}
                          <span className="font-medium text-brand-primary dark:text-cyan-400">
                            {rev.location}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* CONTACT, LOCATION MAP & SACRED BLESSINGS SECTION */}
        {/* ========================================================= */}
        <section id="contact" className="relative px-4 sm:px-6 lg:px-12 py-20 lg:py-28">
          <div className="mx-auto max-w-container-max space-y-12">
            {/* Sacred Divine Blessings Ribbon */}
            <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-4">
              {["Sri || Honnikeri Mallayya", "Sri || Durga Devi", "Sri || Renuka Devi"].map(
                (blessing) => (
                  <div
                    key={blessing}
                    className="glass-pill px-5 py-2 rounded-full border border-brand-secondary/30 text-brand-secondary font-headline text-xs uppercase tracking-widest font-bold shadow-sm flex items-center gap-2"
                  >
                    <span className="text-amber-500">⚜</span> {blessing}
                  </div>
                ),
              )}
            </div>

            {/* Contact Grid Card */}
            <div className="glass-card rounded-[2.5rem] overflow-hidden border border-white/90 shadow-2xl grid grid-cols-1 lg:grid-cols-12">
              {/* Left Contact Information */}
              <div className="lg:col-span-5 p-8 sm:p-12 lg:p-14 space-y-8 bg-surface-container-lowest/70 backdrop-blur-md">
                <div>
                  <div className="text-xs uppercase tracking-wider font-bold text-brand-primary mb-1">
                    Direct Plant Inquiries
                  </div>
                  <h2 className="font-headline text-2xl sm:text-3xl font-bold text-on-surface">
                    Ready to Order Your Batch?
                  </h2>
                  <p className="text-sm text-on-surface-variant mt-2">
                    Speak directly with our factory dispatch manager for immediate pricing, load
                    reservations, and customized regional delivery.
                  </p>
                </div>

                <div className="space-y-6">
                  {/* Phone Lines */}
                  <div className="space-y-2">
                    <div className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                      Direct Sales &amp; Dispatch
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <a
                        href="tel:7204157347"
                        className="flex items-center gap-3 p-3.5 rounded-2xl glass-card border border-white hover:border-brand-primary text-brand-primary font-headline font-bold text-base transition-all group"
                      >
                        <div className="h-9 w-9 rounded-xl bg-brand-primary text-white flex items-center justify-center">
                          <Icon name="call" className="text-[18px]" />
                        </div>
                        <div>
                          <div className="text-[10px] text-on-surface-variant uppercase">
                            Line 1
                          </div>
                          <div>7204157347</div>
                        </div>
                      </a>

                      <a
                        href="tel:9448566456"
                        className="flex items-center gap-3 p-3.5 rounded-2xl glass-card border border-white hover:border-brand-secondary text-brand-secondary font-headline font-bold text-base transition-all group"
                      >
                        <div className="h-9 w-9 rounded-xl bg-brand-secondary text-white flex items-center justify-center">
                          <Icon name="phone_in_talk" className="text-[18px]" />
                        </div>
                        <div>
                          <div className="text-[10px] text-on-surface-variant uppercase">
                            Line 2
                          </div>
                          <div>9448566456</div>
                        </div>
                      </a>
                    </div>
                  </div>

                  {/* Email Line */}
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1">
                      Official Email
                    </div>
                    <a
                      href="mailto:bykrocky@gmail.com"
                      className="inline-flex items-center gap-2 text-sm font-semibold text-brand-primary hover:underline"
                    >
                      <Icon name="mail" className="text-[18px]" />
                      bykrocky@gmail.com
                    </a>
                  </div>

                  {/* Plant Address */}
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1">
                      Factory Kiln Address
                    </div>
                    <div className="flex items-start gap-2.5 text-sm text-on-surface">
                      <Icon
                        name="location_on"
                        className="text-brand-primary text-[20px] shrink-0 mt-0.5"
                      />
                      <div>
                        <strong>BYK Bricks Manufacturing Unit</strong>
                        <br />
                        Kawalettu, Kumarapatanam (Post),
                        <br />
                        Rannebennur (TQ), Haveri (Dist),
                        <br />
                        Karnataka - 581123, India
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setIsQuoteModalOpen(true)}
                    className="w-full py-3.5 px-6 rounded-2xl bg-brand-primary hover:bg-brand-secondary text-white font-body text-xs font-bold uppercase tracking-wider shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <Icon name="request_quote" className="text-[18px]" />
                    Request Factory Bulk Quote
                  </button>
                </div>
              </div>

              {/* Right Interactive Location Map View */}
              <div className="lg:col-span-7 relative min-h-[380px] lg:min-h-full overflow-hidden bg-slate-900">
                <div
                  className="absolute inset-0 h-full w-full bg-cover bg-center transition-transform duration-700 hover:scale-105"
                  style={{ backgroundImage: `url("${IMG.map}")` }}
                />
                <div className="absolute inset-0 bg-brand-primary/20 backdrop-blur-[1px] mix-blend-multiply pointer-events-none" />

                {/* Floating Map Pin Badge */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 glass-dark rounded-3xl p-5 border border-white/30 text-white shadow-2xl text-center space-y-2 max-w-xs animate-float">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-primary text-white shadow-lg">
                    <Icon name="factory" className="text-[28px]" />
                  </div>
                  <div className="font-headline font-bold text-base text-white">
                    BYK Bricks Kiln Plant
                  </div>
                  <div className="text-xs text-slate-200">
                    Kawalettu, Kumarapatanam &bull; Rannebennur, Haveri
                  </div>
                  <a
                    href="https://maps.google.com/?q=Kawalettu+Kumarapatanam+Rannebennur+Haveri"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white text-brand-primary text-xs font-bold hover:bg-cyan-100 transition-colors shadow-md mt-2"
                  >
                    <Icon name="directions" className="text-[16px]" />
                    Get Google Maps Route
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ========================================================= */}
      {/* GLASSMORPHIC FOOTER */}
      {/* ========================================================= */}
      <footer className="relative z-10 w-full bg-surface-container-low/80 backdrop-blur-xl border-t border-outline-variant/30 py-16 px-4 sm:px-6 lg:px-12">
        <div className="mx-auto max-w-container-max grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <img alt="BYK Bricks Logo" className="h-12 w-auto object-contain" src={IMG.logo} />
              <div>
                <div className="font-headline text-lg font-bold text-brand-primary">BYK BRICKS</div>
                <div className="text-xs text-on-surface-variant">
                  Quality Masonry &amp; Aggregates
                </div>
              </div>
            </div>
            <p className="font-body text-sm text-on-surface-variant max-w-sm leading-relaxed">
              Industrial excellence in clay brick kilning, construction sand refinement, and granite
              aggregate supply. Building the foundations of tomorrow with unyielding strength.
            </p>
            <div className="text-xs text-brand-secondary font-semibold">
              Under the guidance of Sri B.Y. Kadashettar (Appaji)
            </div>
          </div>

          <div className="md:col-span-3 space-y-3">
            <h4 className="font-headline text-xs font-bold uppercase tracking-wider text-on-surface">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-sm text-on-surface-variant">
              {NAV.map((n) => (
                <li key={n.label}>
                  <a
                    href={n.href}
                    className="hover:text-brand-primary transition-colors flex items-center gap-1.5"
                  >
                    <span className="text-[10px] text-brand-primary">▸</span> {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4 space-y-3">
            <h4 className="font-headline text-xs font-bold uppercase tracking-wider text-on-surface">
              Plant Headquarters
            </h4>
            <div className="text-sm text-on-surface-variant space-y-2">
              <p>
                Kawalettu, Kumarapatanam (Post),
                <br />
                Rannebennur (TQ), Haveri (Dist), Karnataka - 581123
              </p>
              <div className="font-bold text-brand-primary">Phones: 7204157347, 9448566456</div>
              <div className="text-xs text-on-surface-variant">Email: bykrocky@gmail.com</div>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-container-max mt-12 pt-6 border-t border-outline-variant/30 flex flex-wrap items-center justify-between gap-4 text-xs text-on-surface-variant">
          <div>
            &copy; {new Date().getFullYear()} BYK Bricks. All rights reserved. Manufactured with
            Precision in Haveri.
          </div>
          <div className="flex items-center gap-4">
            <a href="#home" className="hover:text-brand-primary transition-colors">
              Back to Top ↑
            </a>
          </div>
        </div>
      </footer>

      {/* Floating Theme Quick Switcher in Bottom Corner */}
      <div className="fixed bottom-6 right-6 z-40 hidden sm:flex items-center gap-2 p-1.5 rounded-2xl glass-card border border-white/80 dark:border-white/10 shadow-2xl backdrop-blur-xl">
        <ThemeToggle showLabel className="!px-3.5 !py-2 !text-xs" />
      </div>

      {/* ========================================================= */}
      {/* MODALS */}
      {/* ========================================================= */}
      <ProductSpecsModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onOpenCalculator={() => {
          const el = document.getElementById("calculator");
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }}
      />

      <QuoteModal isOpen={isQuoteModalOpen} onClose={() => setIsQuoteModalOpen(false)} />
    </div>
  );
}
