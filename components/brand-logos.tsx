/* eslint-disable @next/next/no-img-element */

export type BrandName = "GitHub" | "GDG India" | "Google Cloud";

const brandAssets: Record<BrandName, string> = {
  GitHub: "/brand/github.svg",
  "GDG India": "/brand/gdg.svg",
  "Google Cloud": "/brand/google-cloud.svg",
};

type BrandLogoProps = {
  brand: BrandName;
  className?: string;
  label?: boolean;
};

export function BrandLogo({ brand, className = "", label = true }: BrandLogoProps) {
  return (
    <span className={`brand-lockup ${className}`.trim()} aria-label={brand}>
      <span className="brand-logo-mark" aria-hidden="true">
        <img src={brandAssets[brand]} alt="" />
      </span>
      {label ? <span className="brand-logo-label">{brand}</span> : null}
    </span>
  );
}
