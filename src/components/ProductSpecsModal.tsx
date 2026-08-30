import { Icon } from "@/components/Reveal";

export interface ProductSpecData {
  title: string;
  category: string;
  image: string;
  description: string;
  standards: string;
  specs: { label: string; value: string; detail: string }[];
  applications: string[];
}

export function ProductSpecsModal({
  product,
  onClose,
  onOpenCalculator,
}: {
  product: ProductSpecData | null;
  onClose: () => void;
  onOpenCalculator?: () => void;
}) {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-md animate-fadeIn">
      <div
        className="glass-card relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/90"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-2 text-on-surface-variant hover:bg-surface-container transition-colors"
        >
          <Icon name="close" className="text-20px" />
        </button>

        <div className="flex items-start gap-4 mb-6">
          <div className="h-16 w-16 overflow-hidden rounded-2xl border border-white/80 shadow-md shrink-0">
            <img src={product.image} alt={product.title} className="h-full w-full object-cover" />
          </div>
          <div>
            <span className="text-xs uppercase tracking-wider font-bold text-brand-primary">
              {product.category}
            </span>
            <h3 className="font-headline text-headline-md text-on-surface">{product.title}</h3>
            <p className="text-xs font-semibold text-brand-secondary mt-0.5">
              Standard Compliance: {product.standards}
            </p>
          </div>
        </div>

        <p className="text-sm text-on-surface-variant leading-relaxed mb-6">
          {product.description}
        </p>

        <div className="mb-6">
          <h4 className="text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-3">
            Technical &amp; Quality Parameters
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {product.specs.map((spec, i) => (
              <div
                key={i}
                className="p-3.5 rounded-xl bg-surface-container-low/80 dark:bg-surface-container/60 border border-white/80 dark:border-white/10 shadow-sm backdrop-blur-sm"
              >
                <div className="text-xs text-on-surface-variant">{spec.label}</div>
                <div className="font-headline text-sm font-bold text-brand-primary dark:text-cyan-400 mt-0.5">
                  {spec.value}
                </div>
                <div className="text-[11px] text-on-surface-variant/80 mt-1">{spec.detail}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <h4 className="text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-2">
            Recommended Engineering Applications
          </h4>
          <div className="flex flex-wrap gap-2">
            {product.applications.map((app, idx) => (
              <span
                key={idx}
                className="px-3 py-1 rounded-lg text-xs font-semibold bg-brand-primary/10 text-brand-primary border border-brand-primary/20"
              >
                ✓ {app}
              </span>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t border-outline-variant/30 flex flex-wrap gap-3 justify-end">
          {onOpenCalculator && (
            <button
              onClick={() => {
                onClose();
                onOpenCalculator();
              }}
              className="py-2.5 px-5 rounded-xl border border-brand-primary text-brand-primary font-body text-label-bold text-xs hover:bg-brand-primary/10 transition-colors flex items-center gap-1.5"
            >
              <Icon name="calculate" className="text-[16px]" />
              Estimate Quantity
            </button>
          )}
          <a
            href="tel:7204157347"
            className="py-2.5 px-6 rounded-xl bg-brand-primary text-on-primary font-body text-label-bold text-xs shadow-md hover:bg-brand-secondary transition-all flex items-center gap-1.5"
          >
            <Icon name="call" className="text-[16px]" />
            Order Batch (7204157347)
          </a>
        </div>
      </div>
    </div>
  );
}
