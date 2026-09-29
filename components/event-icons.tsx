export type EventIconName =
  | "calendar"
  | "code"
  | "users"
  | "network"
  | "trophy"
  | "pin"
  | "layers"
  | "building"
  | "document"
  | "crown"
  | "rupee"
  | "info"\n  | "drone"\n  | "brain"\n  | "automation";

export function EventIcon({ name, className = "" }: { name: EventIconName; className?: string }) {
  const common = { fill: "none", stroke: "currentColor", strokeWidth: 1.9, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

  const paths: Record<EventIconName, React.ReactNode> = {
    calendar: <><rect x="3" y="5" width="18" height="16" rx="3" {...common}/><path d="M7 3v4M17 3v4M3 10h18" {...common}/></>,
    code: <><path d="m8 8-4 4 4 4M16 8l4 4-4 4M14 5l-4 14" {...common}/></>,
    users: <><circle cx="9" cy="8" r="3" {...common}/><circle cx="17" cy="9" r="2.4" {...common}/><path d="M3.5 20c.4-4 2.5-6.3 5.5-6.3s5.1 2.3 5.5 6.3M14 14.6c3.5-.7 5.8 1.2 6.5 4.4" {...common}/></>,
    network: <><circle cx="12" cy="5" r="2.2" {...common}/><circle cx="5" cy="18" r="2.2" {...common}/><circle cx="19" cy="18" r="2.2" {...common}/><path d="m10.8 7-4.6 8.8M13.2 7l4.6 8.8M7.2 18h9.6" {...common}/></>,
    trophy: <><path d="M8 4h8v5a4 4 0 0 1-8 0V4ZM10 16h4M12 13v5M8 20h8" {...common}/><path d="M8 6H4v1c0 3 1.6 5 4.2 5.4M16 6h4v1c0 3-1.6 5-4.2 5.4" {...common}/></>,
    pin: <><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" {...common}/><circle cx="12" cy="10" r="2.4" {...common}/></>,
    layers: <><path d="m12 3 9 5-9 5-9-5 9-5Z" {...common}/><path d="m3 12 9 5 9-5M3 16l9 5 9-5" {...common}/></>,
    building: <><path d="M5 21V7l7-4 7 4v14M3 21h18M9 9h1M14 9h1M9 13h1M14 13h1M10 21v-4h4v4" {...common}/></>,
    document: <><path d="M6 3h8l4 4v14H6V3Z" {...common}/><path d="M14 3v5h5M9 12h6M9 16h6" {...common}/></>,
    crown: <><path d="m4 7 4 4 4-6 4 6 4-4-2 10H6L4 7ZM7 20h10" {...common}/></>,
    rupee: <><path d="M7 5h10M7 9h10M9 5c4 0 5 1.5 5 4s-2 4-6 4h-.5L15 20" {...common}/></>,
    info: <><circle cx="12" cy="12" r="9" {...common}/><path d="M12 10v6M12 7h.01" {...common}/></>,
    drone: <><circle cx="5" cy="6" r="2.5" {...common}/><circle cx="19" cy="6" r="2.5" {...common}/><circle cx="5" cy="18" r="2.5" {...common}/><circle cx="19" cy="18" r="2.5" {...common}/><path d="M7 7.5 10 10m7-2.5L14 10m-7 6.5 3-2.5m7 2.5L14 14M9.5 10h5v4h-5z" {...common}/></>,
    brain: <><path d="M9 4.2A3.2 3.2 0 0 0 4.8 8 3.5 3.5 0 0 0 5 14.8 3.2 3.2 0 0 0 9 19.6M15 4.2A3.2 3.2 0 0 1 19.2 8a3.5 3.5 0 0 1-.2 6.8 3.2 3.2 0 0 1-4 4.8M9 4.2v15.4M15 4.2v15.4M9 8H7.5M15 8h1.5M9 12h6M9 16H7.8M15 16h1.2" {...common}/></>,
    automation: <><circle cx="12" cy="12" r="3.2" {...common}/><path d="M12 2.8v2.1M12 19.1v2.1M21.2 12h-2.1M4.9 12H2.8M18.5 5.5 17 7M7 17l-1.5 1.5M18.5 18.5 17 17M7 7 5.5 5.5" {...common}/><path d="M12 5.3a6.7 6.7 0 1 1-4.7 2" {...common}/></>,
  };

  return <svg className={className} viewBox="0 0 24 24" aria-hidden="true">{paths[name]}</svg>;
}
