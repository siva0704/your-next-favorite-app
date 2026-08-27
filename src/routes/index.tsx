import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Reveal, Icon } from "@/components/Reveal";

const IMG = {
  logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuD5NN2I4Z_DhxCT5tuRsE6JEwBkH2noKGXjocnrttgKK2ApGuWTwJT2TqZntR4SGHmWeA-EjoPPiO6rtpRCKAIJPJ85PMZPj2FHBI-y_nfKH617kuL_7Htop4Uur922oxx91_gZjXNxfi-9M18t4Yo3S0kUXA7Fhf_m6zu1uPE9PZ6nHRwni7BXnpK4iZO6lM1UYoEqoanGC4sgSvwWSi0ExdxKLt6nxCq9vnIDJBi5ZUGItulidD8l9fiPCe1goC-ew20",
  hero: "https://lh3.googleusercontent.com/aida/AEtjO1Uu1WiVBCSCjYo3vwlBBTXnrWS353wDKRQeyyWsktGtFcB32yBz5iL3v4qA4N9gUR1ZAU4HejKHKzKIa6tHboGkOTxgfTtHq55kCbdnVjqX3xy9MmmRezjTy2R9kqyuCARNcL9YqGiGS1XOxKCq6QBtT4bGExxxFOvLnp-wn6zL4FyOqf2-GkgtNlcuFyDhIBY9cY1RweX64bsu2WPVOwOITmp9VDpiQtN4zNsfTZKss87S0nPc8j8Yx1k4",
  facility:
    "https://lh3.googleusercontent.com/aida/AEtjO1WIAYyDsia0Aw9FBqhEUVFv-sbRMaSDJmnSMyOTWTiDFZurjlmpFyOK_pe4DXbccFn94d7nrs_9BIlU3Pa50ib1F7Kz3c8cxnXBtCMWN_MdKOOSMFwgOuWO9ybNu_tjq62DjxuLt-6COBIwpyjQutTuCC5Dona18M0_C3XVSGOCnktwHhwbsCD-8_e3EngjlDy3J1WHB8IeIc5HPV4PgUEyEKqYjezMj_t2y0X_9IIKVPk6M4t2OwhfuaDu",
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
  { label: "Logistics", href: "#logistics" },
  { label: "About Us", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const PRODUCTS = [
  {
    bar: "bg-brand-secondary",
    img: IMG.brick,
    badge: "Best Seller",
    title: "Solid Clay Bricks",
    body: "Traditional strength combined with modern manufacturing. Ideal for load-bearing walls and foundational work.",
    icon: "compress",
    tag: "High Density",
    alt: "Close-up of a solid red clay building brick",
  },
  {
    bar: "bg-brand-primary",
    img: IMG.sand,
    title: "High-Grade Construction Sand",
    body: "Clean, fine-textured sand optimized for high-strength concrete mixes and masonry work.",
    icon: "grain",
    tag: "Premium Quality",
    alt: "High-grade construction sand",
  },
  {
    bar: "bg-surface-tint",
    img: IMG.stones,
    title: "Jelly Diamond Stones",
    body: "Premium crushed granite aggregates (jelly stones) providing exceptional load-bearing strength for foundations.",
    icon: "diamond",
    tag: "Industrial Grade",
    alt: "Crushed granite jelly stones",
  },
];

const REVIEWS = [
  {
    when: "2 days ago",
    text: "\"The quality of the solid clay bricks is unmatched. Our foundation work was completed ahead of schedule thanks to the uniform dimensions.\"",
    who: "- Rajesh Kumar, Site Manager",
  },
  {
    when: "1 week ago",
    text: "\"Reliable delivery and excellent customer service. The construction sand was clean and perfect for our high-strength concrete mix.\"",
    who: "- Anita Desai, Architect",
  },
];

function Index() {
  const [rating, setRating] = useState(0);

  return (
    <div className="bg-surface font-body text-body-md text-on-surface">
      <header className="fixed top-0 z-50 w-full bg-surface/90 shadow-[0_1px_8px_rgba(0,0,0,0.04)] backdrop-blur-md">
        <div className="mx-auto flex h-24 w-full max-w-container-max items-center justify-between px-margin-mobile lg:px-margin-desktop">
          <img alt="BYK Bricks Logo" className="h-20 w-auto object-contain" src={IMG.logo} />
          <nav className="hidden items-center gap-gutter lg:flex">
            {NAV.map((item, i) => (
              <a
                key={item}
                href="#"
                className={
                  i === 0
                    ? "font-body text-label-bold font-semibold text-brand-primary transition-colors"
                    : "font-body text-label-bold text-on-surface-variant transition-colors hover:text-brand-primary"
                }
              >
                {item}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <a
              href="#contact"
              className="hidden rounded-xl bg-brand-primary px-6 py-2.5 font-body text-label-bold text-on-primary shadow-sm transition-all hover:brightness-110 sm:flex"
            >
              Get a Quote
            </a>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-primary lg:hidden">
              <Icon name="menu" className="text-[18px] text-on-primary" />
            </div>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-primary">
              <Icon name="person" className="text-[18px] text-on-primary" />
            </div>
          </div>
        </div>
      </header>

      <main className="w-full bg-surface pt-20">
        {/* HERO */}
        <section className="relative z-0 flex w-full flex-col items-center gap-12 px-margin-mobile py-32 pt-40 lg:flex-row lg:gap-gutter lg:px-margin-desktop lg:pb-48">
          <div className="absolute inset-0 z-0 overflow-hidden rounded-bl-[120px]">
            <div className="absolute inset-0 bg-surface-container-low" />
            <img
              alt="Industrial quality control at the BYK Bricks facility"
              className="h-full w-full object-cover opacity-90"
              src={IMG.hero}
            />
            <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]" />
          </div>
          <div className="relative z-10 mx-auto flex w-full max-w-container-max flex-col items-center gap-12 lg:flex-row lg:gap-gutter">
            <div className="flex w-full flex-col gap-8 lg:w-7/12">
              <div className="flex items-center gap-4">
                <span className="h-1 w-12 rounded-full bg-brand-primary" />
                <span className="font-body text-label-bold uppercase tracking-widest text-on-primary">
                  Industrial Precision
                </span>
              </div>
              <h1 className="font-headline text-headline-xl tracking-tight text-on-primary lg:text-[64px] lg:leading-[72px]">
                We Provide <br />
                <span className="relative inline-block text-primary-container">
                  Good Quality Bricks
                  <svg
                    className="absolute -bottom-2 left-0 h-3 w-full text-primary-container/30"
                    preserveAspectRatio="none"
                    viewBox="0 0 100 10"
                  >
                    <path
                      d="M0,5 Q50,10 100,5"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeWidth="4"
                    />
                  </svg>
                </span>
              </h1>
              <p className="mt-4 max-w-2xl font-body text-body-lg text-on-primary/90">
                Building the foundation of your dreams with strength, precision, and unyielding
                reliability. Based in Haveri, proudly serving the region's top construction and
                infrastructure projects.
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-4">
                <a
                  href="#products"
                  className="rounded-xl bg-brand-primary px-8 py-4 font-body text-label-bold text-on-primary shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  View Products
                </a>
                <a
                  href="#contact"
                  className="rounded-xl bg-brand-secondary px-8 py-4 font-body text-label-bold text-on-secondary shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                >
                  Contact Us
                </a>
              </div>
              <div className="mt-8 flex items-center gap-12 border-t border-on-primary/10 pt-8">
                <div>
                  <div className="font-headline text-headline-lg text-primary-container">100+</div>
                  <div className="mt-1 font-body text-label-sm font-bold uppercase tracking-wider text-on-primary">
                    Projects Delivered
                  </div>
                </div>
                <div>
                  <div className="font-headline text-headline-lg text-primary-container">A+</div>
                  <div className="mt-1 font-body text-label-sm font-bold uppercase tracking-wider text-on-primary">
                    Quality Grade
                  </div>
                </div>
              </div>
            </div>
            <div className="hidden lg:block lg:w-5/12" />
          </div>
        </section>

        {/* ABOUT */}
        <section className="w-full bg-surface-container-lowest px-margin-mobile py-32 lg:px-margin-desktop">
          <div className="mx-auto max-w-container-max">
            <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
              <Reveal direction="left" className="relative">
                <div className="relative z-10 aspect-square w-full overflow-hidden rounded-full border-8 border-surface-container-lowest shadow-xl">
                  <img
                    alt="Modern brick manufacturing facility in Haveri"
                    className="h-full w-full object-cover"
                    src={IMG.facility}
                  />
                </div>
                <div className="absolute -left-10 top-10 z-0 select-none font-headline text-[120px] font-bold text-surface-container-high opacity-50">
                  APPAJI
                </div>
              </Reveal>
              <Reveal direction="right" className="flex flex-col gap-6">
                <h2 className="font-headline text-headline-lg text-on-surface">
                  Legacy of Strength under the Leadership of{" "}
                  <span className="text-brand-secondary">Appaji</span>
                </h2>
                <div className="h-1 w-20 rounded-full bg-brand-secondary" />
                <p className="font-body text-body-lg leading-relaxed text-on-surface-variant">
                  With years of deeply rooted expertise, BYK Bricks has evolved from a local kiln
                  into the leading supplier of premium construction materials. Under the visionary
                  leadership of Appaji, we have redefined what it means to build a lasting
                  foundation.
                </p>
                <p className="font-body text-body-md text-on-surface-variant">
                  Our commitment isn't just to manufacturing bricks; it's to forging the backbone of
                  tomorrow's infrastructure. Every batch is rigorously tested for compressive
                  strength, water absorption, and dimensional tolerance.
                </p>
                <div className="mt-6 grid grid-cols-2 gap-6">
                  <div className="rounded-xl bg-surface-container p-6 shadow-sm">
                    <Icon name="architecture" className="mb-4 text-[32px] text-brand-primary" />
                    <h3 className="mb-2 font-headline text-label-bold text-on-surface">Precision</h3>
                    <p className="font-body text-label-sm text-on-surface-variant">
                      Laser-measured cuts ensuring perfect alignment.
                    </p>
                  </div>
                  <div className="rounded-xl bg-surface-container p-6 shadow-sm">
                    <Icon name="gavel" className="mb-4 text-[32px] text-brand-secondary" />
                    <h3 className="mb-2 font-headline text-label-bold text-on-surface">
                      Durability
                    </h3>
                    <p className="font-body text-label-sm text-on-surface-variant">
                      Fired at optimal temperatures for maximum hardness.
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* PRODUCTS */}
        <section
          id="products"
          className="relative w-full bg-surface-container-low px-margin-mobile py-32 lg:px-margin-desktop"
        >
          <div className="mx-auto max-w-container-max">
            <Reveal className="mb-16 flex flex-col items-center text-center">
              <h2 className="mb-4 font-headline text-headline-lg text-on-surface">
                Premium Construction Materials
              </h2>
              <p className="max-w-2xl font-body text-body-md text-on-surface-variant">
                Superior grade bricks, sand, and aggregates engineered for structural integrity and
                lasting endurance.
              </p>
            </Reveal>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {PRODUCTS.map((p, i) => (
                <Reveal key={p.title} delay={i * 100}>
                  <div className="group h-full overflow-hidden rounded-2xl bg-surface-container-lowest shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                    <div className={`h-2 w-full ${p.bar}`} />
                    <div className="relative h-64 overflow-hidden">
                      <img
                        alt={p.alt}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                        src={p.img}
                      />
                      {p.badge ? (
                        <div className="absolute right-4 top-4 rounded-full bg-surface-container-lowest/90 px-3 py-1 font-body text-label-bold text-label-sm text-brand-secondary backdrop-blur">
                          {p.badge}
                        </div>
                      ) : null}
                    </div>
                    <div className="p-6">
                      <h3 className="mb-2 font-headline text-headline-md text-on-surface">
                        {p.title}
                      </h3>
                      <p className="mb-4 font-body text-body-md text-on-surface-variant">{p.body}</p>
                      <div className="flex items-center justify-between font-body text-label-sm font-semibold">
                        <span className="flex items-center gap-1 text-brand-primary">
                          <Icon name={p.icon} className="text-[16px]" /> {p.tag}
                        </span>
                        <button className="flex items-center gap-1 text-brand-secondary transition-colors hover:text-brand-primary">
                          Specs <Icon name="arrow_forward" className="text-[16px]" />
                        </button>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* REVIEWS */}
        <section className="w-full bg-surface-container-lowest px-margin-mobile py-32 lg:px-margin-desktop">
          <div className="mx-auto max-w-container-max">
            <div className="mb-16 flex flex-col items-center text-center">
              <h2 className="mb-4 font-headline text-headline-lg text-on-surface">
                Voice of Our Clients
              </h2>
              <p className="max-w-2xl font-body text-body-md text-on-surface-variant">
                We value your feedback. Share your experience with our premium construction
                materials to help us maintain the highest standards of excellence.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
              <div className="rounded-[2rem] bg-surface-container-low p-8 shadow-sm lg:p-12">
                <h3 className="mb-6 font-headline text-headline-md text-on-surface">
                  Write a Review
                </h3>
                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                  <div>
                    <label className="mb-2 block font-body text-label-bold text-on-surface-variant">
                      Rate Your Experience
                    </label>
                    <div className="flex gap-1 text-brand-primary">
                      {[1, 2, 3, 4, 5].map((n) => (
                        <button
                          key={n}
                          type="button"
                          aria-label={`Rate ${n} star${n > 1 ? "s" : ""}`}
                          onClick={() => setRating(n)}
                          className={n <= rating ? "opacity-100" : "opacity-40"}
                        >
                          <Icon name="star" />
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="mb-2 block font-body text-label-bold text-on-surface-variant">
                      Your Name
                    </label>
                    <input
                      className="w-full rounded-xl border border-outline-variant bg-surface px-4 py-3 transition-colors focus:border-brand-primary focus:outline-none"
                      placeholder="Enter your name"
                      type="text"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block font-body text-label-bold text-on-surface-variant">
                      Your Feedback
                    </label>
                    <textarea
                      className="w-full rounded-xl border border-outline-variant bg-surface px-4 py-3 transition-colors focus:border-brand-primary focus:outline-none"
                      placeholder="Tell us about your experience..."
                      rows={4}
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full rounded-xl bg-brand-primary py-4 font-body text-label-bold text-on-primary shadow-md transition-all hover:brightness-110"
                  >
                    Submit Review
                  </button>
                </form>
              </div>
              <div className="flex flex-col gap-8">
                <h3 className="mb-2 font-headline text-headline-md text-on-surface">
                  Recent Reviews
                </h3>
                <div className="space-y-6">
                  {REVIEWS.map((r) => (
                    <div
                      key={r.when}
                      className="rounded-xl border border-outline-variant bg-surface p-6 shadow-sm"
                    >
                      <div className="mb-3 flex items-center justify-between">
                        <div className="flex text-brand-primary">
                          {[1, 2, 3, 4, 5].map((n) => (
                            <Icon key={n} name="star" className="text-[18px]" />
                          ))}
                        </div>
                        <span className="font-body text-label-sm text-on-surface-variant">
                          {r.when}
                        </span>
                      </div>
                      <p className="mb-4 font-body text-body-md italic text-on-surface">{r.text}</p>
                      <div className="font-body text-label-bold text-brand-secondary">{r.who}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* LOGISTICS */}
        <section className="relative w-full overflow-hidden bg-brand-primary py-32">
          <svg
            className="absolute inset-0 h-full w-full text-primary-fixed-dim/20"
            preserveAspectRatio="none"
            viewBox="0 0 100 100"
          >
            <path d="M0,100 L100,0 L100,100 Z" fill="currentColor" />
          </svg>
          <div className="relative z-10 mx-auto max-w-container-max px-margin-mobile lg:px-margin-desktop">
            <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
              <Reveal direction="left" className="text-on-primary">
                <div className="mb-6 flex items-center gap-4">
                  <Icon name="local_shipping" className="text-[40px]" />
                  <span className="font-headline text-headline-md uppercase tracking-wider">
                    Reliable Logistics
                  </span>
                </div>
                <h2 className="mb-6 font-headline text-headline-xl">
                  Swift &amp; Safe Delivery to Your Construction Site
                </h2>
                <p className="mb-8 font-body text-body-lg opacity-90">
                  Our dedicated transport fleet ensures that your materials arrive exactly when you
                  need them. We eliminate downtime and coordinate with your site managers for
                  seamless, on-time offloading anywhere in the region.
                </p>
                <ul className="space-y-4 font-body text-label-bold">
                  {[
                    "Real-time dispatch tracking",
                    "Heavy-duty offloading capabilities",
                    "Regional mastery around Haveri & Rannebennur",
                  ].map((li) => (
                    <li key={li} className="flex items-center gap-3">
                      <Icon name="check_circle" /> {li}
                    </li>
                  ))}
                </ul>
              </Reveal>
              <Reveal direction="right" className="relative">
                <div className="aspect-video w-full overflow-hidden rounded-2xl bg-surface shadow-2xl">
                  <img
                    alt="Flatbed truck loaded with stacks of BYK bricks"
                    className="h-full w-full object-cover"
                    src={IMG.truck}
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 flex items-center gap-4 rounded-xl bg-surface-container-lowest p-4 text-on-surface shadow-lg">
                  <div className="h-3 w-3 animate-pulse rounded-full bg-green-500" />
                  <div>
                    <div className="font-body text-label-sm text-on-surface-variant">
                      Fleet Status
                    </div>
                    <div className="font-body text-label-bold">Dispatched &amp; On Route</div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section
          id="contact"
          className="relative w-full bg-surface-container-high px-margin-mobile py-32 lg:px-margin-desktop"
        >
          <div className="absolute left-8 top-1/2 z-0 hidden -translate-y-1/2 select-none font-headline text-headline-xl font-bold uppercase tracking-[0.2em] text-surface-variant [writing-mode:vertical-rl] lg:block">
            BYK Bricks
          </div>
          <div className="relative z-10 mx-auto max-w-container-max">
            <Reveal className="mb-20 flex flex-wrap justify-center gap-4">
              {["Sri || Honnikeri Mallayya", "Sri || Durga Devi", "Sri || Renuka Devi"].map((b) => (
                <div
                  key={b}
                  className="flex items-center gap-2 rounded-full bg-brand-secondary px-6 py-2 font-body text-label-sm uppercase tracking-widest text-on-secondary shadow-sm"
                >
                  <Icon name="psychiatry" className="text-[14px]" /> {b}
                </div>
              ))}
            </Reveal>
            <Reveal delay={200}>
              <div className="grid grid-cols-1 gap-12 overflow-hidden rounded-[2rem] bg-surface-container-lowest shadow-xl lg:grid-cols-12">
                <div className="flex flex-col justify-center bg-surface p-12 text-on-surface lg:col-span-5 lg:p-16">
                  <h2 className="mb-8 font-headline text-headline-lg">Ready to start building?</h2>
                  <div className="space-y-8">
                    <div>
                      <div className="mb-2 font-body text-label-sm uppercase tracking-wider text-on-surface-variant">
                        Direct Sales Lines
                      </div>
                      <a
                        href="tel:7204157347"
                        className="block font-headline text-headline-md text-brand-primary transition-colors hover:text-brand-secondary"
                      >
                        7204157347
                      </a>
                      <a
                        href="tel:9448566456"
                        className="block font-headline text-headline-md text-brand-primary transition-colors hover:text-brand-secondary"
                      >
                        9448566456
                      </a>
                    </div>
                    <div>
                      <div className="mb-2 font-body text-label-sm uppercase tracking-wider text-on-surface-variant">
                        Factory Location
                      </div>
                      <p className="font-body text-body-md text-on-surface">
                        Kawalettu, Kumarapatanam (post),
                        <br />
                        Rannebennur (TQ), Haveri (Dist),
                        <br />
                        Karnataka - 581123
                      </p>
                    </div>
                    <button className="mt-4 w-full rounded-xl bg-brand-primary py-4 font-body text-label-bold text-on-primary shadow-md transition-colors duration-300 hover:bg-brand-secondary">
                      Request a Bulk Quote
                    </button>
                  </div>
                </div>
                <div className="relative h-96 lg:col-span-7 lg:h-auto">
                  <div
                    className="absolute inset-0 h-full w-full bg-cover bg-center"
                    style={{ backgroundImage: `url("${IMG.map}")` }}
                  />
                  <div className="pointer-events-none absolute inset-0 bg-brand-primary/10 mix-blend-color" />
                  <div className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 animate-bounce items-center justify-center rounded-full bg-surface-container-lowest shadow-2xl">
                    <Icon name="location_on" className="text-[32px] text-brand-secondary" />
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="w-full bg-surface-container-high py-20">
        <div className="mx-auto grid max-w-container-max grid-cols-1 gap-12 px-margin-mobile md:grid-cols-3 lg:px-margin-desktop">
          <div className="space-y-6">
            <div>
              <div className="mb-4 font-headline text-headline-md text-brand-primary">
                BYK BRICKS
              </div>
              <p className="font-body text-body-md text-on-surface-variant">
                Leading excellence in brick manufacturing and supply. Building the foundations of
                the future with industrial precision.
              </p>
            </div>
            <div className="flex gap-4">
              {["language", "share", "chat"].map((n) => (
                <Icon
                  key={n}
                  name={n}
                  className="cursor-pointer text-on-surface-variant hover:text-brand-primary"
                />
              ))}
            </div>
          </div>
          <div className="space-y-6">
            <h2 className="font-headline text-label-bold uppercase tracking-wider text-on-surface">
              Contact Info
            </h2>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Icon name="call" className="text-brand-primary" />
                <span className="font-body text-body-md text-on-surface-variant">
                  7204157347, 9448566456
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Icon name="mail" className="text-brand-primary" />
                <span className="font-body text-body-md text-on-surface-variant">
                  bykrocky@gmail.com
                </span>
              </li>
            </ul>
          </div>
          <div className="space-y-6">
            <h2 className="font-headline text-label-bold uppercase tracking-wider text-on-surface">
              Address
            </h2>
            <div className="flex items-start gap-3">
              <Icon name="location_on" className="text-brand-primary" />
              <div className="font-body text-body-md text-on-surface-variant">
                Kawalettu, Kumarapatanam (post),
                <br />
                Rannebennur (TQ), Haveri (Dist),
                <br />
                Karnataka - 581123
              </div>
            </div>
          </div>
        </div>
        <div className="mx-auto mt-20 max-w-container-max border-t border-outline-variant px-margin-mobile pt-8 text-center font-body text-label-sm text-on-surface-variant lg:px-margin-desktop">
          © 2024 BYK Bricks. All rights reserved. Manufactured with Precision.
        </div>
      </footer>
    </div>
  );
}
