import { useState } from "react";
import { Icon } from "@/components/Reveal";
import { toast } from "sonner";

export function QuoteModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [productType, setProductType] = useState("Solid Clay Bricks");
  const [quantity, setQuantity] = useState("");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      toast.error("Please enter your name and phone number.");
      return;
    }

    setIsSubmitting(true);
    const message = `*New Quote Request - BYK Bricks*%0A%0A*Name:* ${encodeURIComponent(name)}%0A*Phone:* ${encodeURIComponent(phone)}%0A*Site Location:* ${encodeURIComponent(location || "Haveri / Regional")}%0A*Product:* ${encodeURIComponent(productType)}%0A*Quantity:* ${encodeURIComponent(quantity || "Standard Load")}%0A*Notes:* ${encodeURIComponent(notes || "None")}`;

    setTimeout(() => {
      setIsSubmitting(false);
      onClose();
      window.open(`https://wa.me/917204157347?text=${message}`, "_blank");
      toast.success("Quote request sent! Opening WhatsApp for instant direct confirmation.");
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-md">
      <div
        className="glass-card relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/90 animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-2 text-on-surface-variant hover:bg-surface-container transition-colors"
        >
          <Icon name="close" className="text-20px" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-primary text-white shadow-md">
            <Icon name="request_quote" className="text-[26px]" />
          </div>
          <div>
            <h3 className="font-headline text-headline-md text-on-surface">
              Request Instant Quote
            </h3>
            <p className="text-xs text-on-surface-variant">
              Factory direct pricing for Haveri, Rannebennur & surrounding districts.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-on-surface-variant mb-1">
              Your Name / Contractor Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Ramesh Patil / Patil Builders"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-xl border border-outline-variant/60 dark:border-white/10 bg-white/80 dark:bg-slate-900/80 px-4 py-2.5 text-sm text-on-surface focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/20 backdrop-blur-sm"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-on-surface-variant mb-1">
                Phone Number *
              </label>
              <input
                type="tel"
                required
                placeholder="e.g. 9448566456"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full rounded-xl border border-outline-variant/60 dark:border-white/10 bg-white/80 dark:bg-slate-900/80 px-4 py-2.5 text-sm text-on-surface focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/20 backdrop-blur-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-on-surface-variant mb-1">
                Site Delivery Location
              </label>
              <input
                type="text"
                placeholder="e.g. Rannebennur, Haveri"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full rounded-xl border border-outline-variant/60 dark:border-white/10 bg-white/80 dark:bg-slate-900/80 px-4 py-2.5 text-sm text-on-surface focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/20 backdrop-blur-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-on-surface-variant mb-1">
                Material Required
              </label>
              <select
                value={productType}
                onChange={(e) => setProductType(e.target.value)}
                className="w-full rounded-xl border border-outline-variant/60 dark:border-white/10 bg-white/80 dark:bg-slate-900/80 px-4 py-2.5 text-sm text-on-surface focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/20 backdrop-blur-sm"
              >
                <option value="Solid Clay Bricks" className="dark:bg-slate-900 text-on-surface">
                  Solid Clay Bricks
                </option>
                <option
                  value="High-Grade Construction Sand"
                  className="dark:bg-slate-900 text-on-surface"
                >
                  High-Grade Construction Sand
                </option>
                <option value="Jelly Diamond Stones" className="dark:bg-slate-900 text-on-surface">
                  Jelly Diamond Stones
                </option>
                <option
                  value="Full Construction Package (All)"
                  className="dark:bg-slate-900 text-on-surface"
                >
                  Complete Foundation Package (All)
                </option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-on-surface-variant mb-1">
                Approx Quantity / Loads
              </label>
              <input
                type="text"
                placeholder="e.g. 10,000 Bricks / 2 Truck Loads"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-full rounded-xl border border-outline-variant/60 dark:border-white/10 bg-white/80 dark:bg-slate-900/80 px-4 py-2.5 text-sm text-on-surface focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/20 backdrop-blur-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-on-surface-variant mb-1">
              Additional Notes (Optional)
            </label>
            <textarea
              rows={2}
              placeholder="Unloading requirements, timeline, or specific delivery address..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full rounded-xl border border-outline-variant/60 dark:border-white/10 bg-white/80 dark:bg-slate-900/80 px-4 py-2 text-sm text-on-surface focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/20 backdrop-blur-sm"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-2 py-3.5 px-6 rounded-xl bg-brand-primary hover:bg-brand-secondary text-white font-body text-label-bold text-sm shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <span className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
            ) : (
              <>
                <Icon name="send" className="text-[18px]" />
                Send Request via WhatsApp / Direct Dispatch
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
