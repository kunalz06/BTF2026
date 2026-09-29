type BrandName = "GitHub" | "GDG India" | "Google Cloud";

type BrandLogoProps = {
  brand: BrandName;
  className?: string;
  label?: boolean;
};

function GitHubMark() {
  return (
    <svg viewBox="0 0 24 24" role="img" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 .7a11.5 11.5 0 0 0-3.64 22.41c.58.11.79-.25.79-.56v-2.23c-3.22.7-3.9-1.37-3.9-1.37-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.71.08-.71 1.17.08 1.78 1.2 1.78 1.2 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.74-1.55-2.57-.29-5.27-1.28-5.27-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.47.11-3.05 0 0 .97-.31 3.16 1.18a10.97 10.97 0 0 1 5.75 0c2.2-1.49 3.16-1.18 3.16-1.18.63 1.58.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.71 5.38-5.29 5.67.42.36.79 1.06.79 2.14v3.17c0 .31.21.68.8.56A11.5 11.5 0 0 0 12 .7Z"
      />
    </svg>
  );
}

function GdgMark() {
  return (
    <svg viewBox="0 0 48 28" role="img" aria-hidden="true">
      <path d="M16.5 3 5 14l11.5 11" fill="none" stroke="#4285F4" strokeWidth="6" strokeLinecap="square" strokeLinejoin="miter" />
      <path d="M31.5 3 43 14 31.5 25" fill="none" stroke="#34A853" strokeWidth="6" strokeLinecap="square" strokeLinejoin="miter" />
      <path d="m9.5 9.5 7-6.5" fill="none" stroke="#EA4335" strokeWidth="6" strokeLinecap="square" />
      <path d="m38.5 9.5-7-6.5" fill="none" stroke="#FBBC04" strokeWidth="6" strokeLinecap="square" />
    </svg>
  );
}

function GoogleCloudMark() {
  return (
    <svg viewBox="0 0 48 34" role="img" aria-hidden="true">
      <path d="M16.8 29H11A8 8 0 0 1 9.2 13.2 13.2 13.2 0 0 1 33 8.7a9.7 9.7 0 0 1 4.7 18.2H16.8Z" fill="none" stroke="#4285F4" strokeWidth="5.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10.5 13.6a13.3 13.3 0 0 1 7.4-7.9" fill="none" stroke="#EA4335" strokeWidth="5.2" strokeLinecap="round" />
      <path d="M18.1 5.7A13.1 13.1 0 0 1 32.8 9" fill="none" stroke="#FBBC04" strokeWidth="5.2" strokeLinecap="round" />
      <path d="M33 9a9.7 9.7 0 0 1 4.6 17.7" fill="none" stroke="#34A853" strokeWidth="5.2" strokeLinecap="round" />
    </svg>
  );
}

export function BrandLogo({ brand, className = "", label = true }: BrandLogoProps) {
  const mark =
    brand === "GitHub" ? <GitHubMark /> : brand === "GDG India" ? <GdgMark /> : <GoogleCloudMark />;

  return (
    <span className={`brand-lockup ${className}`} aria-label={brand}>
      <span className="brand-logo-mark">{mark}</span>
      {label ? <span className="brand-logo-label">{brand}</span> : null}
    </span>
  );
}
