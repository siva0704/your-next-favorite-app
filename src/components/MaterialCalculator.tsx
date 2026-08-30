import { useState } from "react";
import { Icon } from "@/components/Reveal";
import { toast } from "sonner";

export function MaterialCalculator({ onClose }: { onClose?: () => void }) {
  const [activeTab, setActiveTab] = useState<"bricks" | "sand" | "stones">("bricks");

  // Brick calculation state
  const [wallLength, setWallLength] = useState<number>(20);
  const [wallHeight, setWallHeight] = useState<number>(10);
  const [wallThickness, setWallThickness] = useState<"4.5" | "9">("9"); // inches

  // Sand calculation state
  const [areaSqFt, setAreaSqFt] = useState<number>(500);
  const [slabThickness, setSlabThickness] = useState<number>(5); // inches

  // Stone calculation state
  const [foundationLength, setFoundationLength] = useState<number>(40);
  const [foundationWidth, setFoundationWidth] = useState<number>(2);
  const [foundationDepth, setFoundationDepth] = useState<number>(3);

  // Calculations
  const wallArea = wallLength * wallHeight;
  const bricksPerSqFt = wallThickness === "9" ? 9 : 4.5;
  const totalBricks = Math.round(wallArea * bricksPerSqFt);
  const brickTruckLoads = (totalBricks / 4000).toFixed(1);

  // Sand estimation (cubic feet -> tons approx 1.6 tons/cu.m)
  const concreteVolumeCuFt = areaSqFt * (slabThickness / 12);
  const sandTonsNeeded = Math.max(1, (concreteVolumeCuFt * 0.045).toFixed(1));

  // Jelly Stone estimation
  const stoneVolumeCuFt = foundationLength * foundationWidth * foundationDepth;
  const stoneTonsNeeded = Math.max(1, (stoneVolumeCuFt * 0.05).toFixed(1));

  const handleSendQuote = (material: string, qty: string) => {
    const text = `Hello BYK Bricks! I calculated my requirement for ${material}: approximately ${qty}. Please share price estimate and delivery time to my site.`;
    const whatsappUrl = `https://wa.me/917204157347?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, "_blank");
    toast.success("Opening WhatsApp with your calculated estimate!");
  };

  return (
    <div className="glass-card relative overflow-hidden rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl border border-white/80">
      {/* Subtle background glow */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary-container/20 blur-3xl" />
      <div className="pointer-events-none absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-brand-secondary/15 blur-3xl" />

      <div className="relative z-10">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-outline-variant/30">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="flex h-2.5 w-2.5 rounded-full bg-brand-primary animate-pulse" />
              <span className="font-body text-label-bold uppercase tracking-wider text-brand-primary text-xs">
                Interactive Tool
              </span>
            </div>
            <h3 className="font-headline text-headline-md text-on-surface flex items-center gap-2">
              <Icon name="calculate" className="text-brand-primary text-28px" />
              Material Quantity Estimator
            </h3>
            <p className="font-body text-label-sm text-on-surface-variant mt-1">
              Calculate exact requirements for your site in Haveri & nearby regions.
            </p>
          </div>

          {onClose && (
            <button
              onClick={onClose}
              className="rounded-full p-2 text-on-surface-variant hover:bg-surface-container transition-colors"
            >
              <Icon name="close" />
            </button>
          )}
        </div>

        {/* Tab Selectors */}
        <div className="mt-6 flex flex-wrap gap-2 p-1.5 rounded-2xl bg-surface-container-low/80 backdrop-blur-md border border-white/40">
          {(
            [
              { id: "bricks", label: "Clay Bricks", icon: "view_in_ar" },
              { id: "sand", label: "M-Sand / Plastering", icon: "grain" },
              { id: "stones", label: "Jelly Diamond Stones", icon: "diamond" },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-1 items-center justify-center gap-2 py-2.5 px-4 rounded-xl font-body text-label-bold text-xs sm:text-sm transition-all duration-300 ${
                activeTab === tab.id
                  ? "bg-brand-primary text-on-primary shadow-md"
                  : "text-on-surface-variant hover:text-brand-primary hover:bg-white/50"
              }`}
            >
              <Icon name={tab.icon} className="text-[18px]" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* BRICK CALCULATOR */}
        {activeTab === "bricks" && (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-7 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-on-surface-variant mb-1.5">
                    Wall Length (Feet)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      min={1}
                      max={1000}
                      value={wallLength}
                      onChange={(e) => setWallLength(Number(e.target.value) || 0)}
                      className="w-full rounded-xl border border-outline-variant/60 dark:border-white/10 bg-white/80 dark:bg-slate-900/80 px-4 py-2.5 text-on-surface font-semibold focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/20 backdrop-blur-sm"
                    />
                    <span className="absolute right-3 top-2.5 text-xs text-on-surface-variant">
                      ft
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-on-surface-variant mb-1.5">
                    Wall Height (Feet)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      min={1}
                      max={200}
                      value={wallHeight}
                      onChange={(e) => setWallHeight(Number(e.target.value) || 0)}
                      className="w-full rounded-xl border border-outline-variant/60 dark:border-white/10 bg-white/80 dark:bg-slate-900/80 px-4 py-2.5 text-on-surface font-semibold focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/20 backdrop-blur-sm"
                    />
                    <span className="absolute right-3 top-2.5 text-xs text-on-surface-variant">
                      ft
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-on-surface-variant mb-1.5">
                  Wall Thickness
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setWallThickness("9")}
                    className={`py-2 px-3 rounded-xl border text-xs font-semibold text-center transition-all ${
                      wallThickness === "9"
                        ? "border-brand-primary bg-brand-primary/10 text-brand-primary dark:text-cyan-400 ring-1 ring-brand-primary"
                        : "border-outline-variant/60 dark:border-white/10 bg-white/60 dark:bg-slate-900/60 text-on-surface-variant hover:bg-white/90 dark:hover:bg-white/10"
                    }`}
                  >
                    9-Inch Main Wall (Double Brick)
                  </button>
                  <button
                    type="button"
                    onClick={() => setWallThickness("4.5")}
                    className={`py-2 px-3 rounded-xl border text-xs font-semibold text-center transition-all ${
                      wallThickness === "4.5"
                        ? "border-brand-primary bg-brand-primary/10 text-brand-primary dark:text-cyan-400 ring-1 ring-brand-primary"
                        : "border-outline-variant/60 dark:border-white/10 bg-white/60 dark:bg-slate-900/60 text-on-surface-variant hover:bg-white/90 dark:hover:bg-white/10"
                    }`}
                  >
                    4.5-Inch Partition (Single Brick)
                  </button>
                </div>
              </div>

              <div className="text-xs text-on-surface-variant bg-surface-container-low/60 dark:bg-surface-container/50 p-3 rounded-xl border border-white/60 dark:border-white/10">
                💡 <span className="font-semibold">BYK Standard:</span> High-compressive fired clay
                bricks (approx 9&quot; × 4.25&quot; × 3&quot;) with consistent sharp edges for
                minimum mortar wastage.
              </div>
            </div>

            <div className="md:col-span-5">
              <div className="glass-primary rounded-2xl p-6 text-on-primary flex flex-col items-center text-center shadow-lg relative overflow-hidden">
                <div className="absolute right-0 top-0 h-32 w-32 bg-primary-container/20 rounded-full blur-2xl" />
                <span className="text-xs uppercase tracking-widest text-primary-fixed-dim font-bold">
                  Estimated Requirement
                </span>
                <div className="mt-2 font-headline text-4xl sm:text-5xl font-bold text-white tracking-tight">
                  {totalBricks.toLocaleString()}
                </div>
                <span className="text-xs text-primary-fixed-dim mt-1 font-medium">
                  Solid Clay Bricks (~{brickTruckLoads} Truck Loads)
                </span>

                <div className="mt-4 w-full pt-4 border-t border-white/20 text-xs space-y-1.5 text-left text-white/90">
                  <div className="flex justify-between">
                    <span>Wall Surface Area:</span>
                    <span className="font-bold">{wallArea} sq.ft</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Recommended Reserve (+5%):</span>
                    <span className="font-bold">
                      {Math.round(totalBricks * 1.05).toLocaleString()} pcs
                    </span>
                  </div>
                </div>

                <button
                  onClick={() =>
                    handleSendQuote(
                      "Solid Clay Bricks",
                      `${totalBricks.toLocaleString()} bricks (~${brickTruckLoads} loads)`,
                    )
                  }
                  className="mt-5 w-full py-3 px-4 rounded-xl bg-white text-brand-primary font-body text-label-bold text-xs uppercase tracking-wider hover:bg-primary-fixed-dim transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <Icon name="chat" className="text-[16px]" />
                  Instant WhatsApp Price
                </button>
              </div>
            </div>
          </div>
        )}

        {/* SAND CALCULATOR */}
        {activeTab === "sand" && (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-7 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-on-surface-variant mb-1.5">
                    Construction Area (Sq Feet)
                  </label>
                  <input
                    type="number"
                    min={50}
                    max={50000}
                    value={areaSqFt}
                    onChange={(e) => setAreaSqFt(Number(e.target.value) || 0)}
                    className="w-full rounded-xl border border-outline-variant/60 dark:border-white/10 bg-white/80 dark:bg-slate-900/80 px-4 py-2.5 text-on-surface font-semibold focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/20 backdrop-blur-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-on-surface-variant mb-1.5">
                    Slab / Layer Thickness (Inches)
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={24}
                    value={slabThickness}
                    onChange={(e) => setSlabThickness(Number(e.target.value) || 0)}
                    className="w-full rounded-xl border border-outline-variant/60 dark:border-white/10 bg-white/80 dark:bg-slate-900/80 px-4 py-2.5 text-on-surface font-semibold focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/20 backdrop-blur-sm"
                  />
                </div>
              </div>

              <div className="text-xs text-on-surface-variant bg-surface-container-low/60 dark:bg-surface-container/50 p-3 rounded-xl border border-white/60 dark:border-white/10">
                ✨ <span className="font-semibold">Silt-Free Grade:</span> BYK triple-washed M-Sand
                & Plastering Sand eliminates river bed extraction, ensuring 20% higher bond
                strength.
              </div>
            </div>

            <div className="md:col-span-5">
              <div className="glass-primary rounded-2xl p-6 text-on-primary flex flex-col items-center text-center shadow-lg relative overflow-hidden">
                <span className="text-xs uppercase tracking-widest text-primary-fixed-dim font-bold">
                  Estimated Requirement
                </span>
                <div className="mt-2 font-headline text-4xl sm:text-5xl font-bold text-white tracking-tight">
                  {sandTonsNeeded}
                </div>
                <span className="text-xs text-primary-fixed-dim mt-1 font-medium">
                  Tons of Clean Construction Sand
                </span>

                <button
                  onClick={() =>
                    handleSendQuote("High-Grade Construction Sand", `${sandTonsNeeded} Tons`)
                  }
                  className="mt-5 w-full py-3 px-4 rounded-xl bg-white text-brand-primary font-body text-label-bold text-xs uppercase tracking-wider hover:bg-primary-fixed-dim transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <Icon name="chat" className="text-[16px]" />
                  Instant WhatsApp Price
                </button>
              </div>
            </div>
          </div>
        )}

        {/* STONES CALCULATOR */}
        {activeTab === "stones" && (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-7 space-y-4">
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-on-surface-variant mb-1.5">
                    Length (ft)
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={foundationLength}
                    onChange={(e) => setFoundationLength(Number(e.target.value) || 0)}
                    className="w-full rounded-xl border border-outline-variant/60 dark:border-white/10 bg-white/80 dark:bg-slate-900/80 px-3 py-2 text-on-surface font-semibold focus:border-brand-primary focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-on-surface-variant mb-1.5">
                    Width (ft)
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={foundationWidth}
                    onChange={(e) => setFoundationWidth(Number(e.target.value) || 0)}
                    className="w-full rounded-xl border border-outline-variant/60 dark:border-white/10 bg-white/80 dark:bg-slate-900/80 px-3 py-2 text-on-surface font-semibold focus:border-brand-primary focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-on-surface-variant mb-1.5">
                    Depth (ft)
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={foundationDepth}
                    onChange={(e) => setFoundationDepth(Number(e.target.value) || 0)}
                    className="w-full rounded-xl border border-outline-variant/60 dark:border-white/10 bg-white/80 dark:bg-slate-900/80 px-3 py-2 text-on-surface font-semibold focus:border-brand-primary focus:outline-none"
                  />
                </div>
              </div>

              <div className="text-xs text-on-surface-variant bg-surface-container-low/60 dark:bg-surface-container/50 p-3 rounded-xl border border-white/60 dark:border-white/10">
                💎 <span className="font-semibold">Granite Purity:</span> 20mm & 40mm cubical
                crushed jelly stones with low flakiness index for RCC pillars & massive raft
                footings.
              </div>
            </div>

            <div className="md:col-span-5">
              <div className="glass-primary rounded-2xl p-6 text-on-primary flex flex-col items-center text-center shadow-lg relative overflow-hidden">
                <span className="text-xs uppercase tracking-widest text-primary-fixed-dim font-bold">
                  Estimated Requirement
                </span>
                <div className="mt-2 font-headline text-4xl sm:text-5xl font-bold text-white tracking-tight">
                  {stoneTonsNeeded}
                </div>
                <span className="text-xs text-primary-fixed-dim mt-1 font-medium">
                  Tons of Crushed Jelly Stone
                </span>

                <button
                  onClick={() => handleSendQuote("Jelly Diamond Stones", `${stoneTonsNeeded} Tons`)}
                  className="mt-5 w-full py-3 px-4 rounded-xl bg-white text-brand-primary font-body text-label-bold text-xs uppercase tracking-wider hover:bg-primary-fixed-dim transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <Icon name="chat" className="text-[16px]" />
                  Instant WhatsApp Price
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
