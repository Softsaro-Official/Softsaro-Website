export type IconName = "share" | "click" | "target" | "pen" | "mail" | "compass" | "funnel" | "chart" | "eye" | "spark" | "briefcase" | "users" | "rocket" | "store" | "building" | "bed" | "heart" | "layers" | "phone" | "pin" | "clock" | "arrow" | "check" | "plus" | "trend" | "coin" | "globe";

export function Ic({ n, className = "" }: { n: IconName; className?: string }) {
  const s = { fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round", strokeLinejoin: "round" } as const;
  let body: React.ReactNode = null;
  switch (n) {
    case "share": body = <><circle cx="18" cy="5" r="2.6" /><circle cx="6" cy="12" r="2.6" /><circle cx="18" cy="19" r="2.6" /><path d="M8.3 10.8l7.4-4.4M8.3 13.2l7.4 4.4" /></>; break;
    case "click": body = <><path d="M9 9l4.6 11 1.7-4.7L20 13.6z" /><path d="M7 4.5l1 2.2M3.8 8l2.2 1M12 3l-.2 2.4M4.6 4.6L6 6" /></>; break;
    case "target": body = <><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1.2" /></>; break;
    case "pen": body = <><path d="M4 20l1-4L16.5 4.5a2.1 2.1 0 013 3L8 19z" /><path d="M14.5 6.5l3 3" /></>; break;
    case "mail": body = <><rect x="3" y="5.5" width="18" height="13" rx="2" /><path d="M3.5 7l8.5 6 8.5-6" /></>; break;
    case "compass": body = <><circle cx="12" cy="12" r="9" /><path d="M15.8 8.2l-2 5.6-5.6 2 2-5.6z" /></>; break;
    case "funnel": body = <path d="M4 5h16l-6 7.5V19l-4-2v-4.5z" />; break;
    case "chart": body = <><path d="M4 4v16h16" /><path d="M8 15l3.5-4 3 2.5L19 8" /></>; break;
    case "eye": body = <><path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z" /><circle cx="12" cy="12" r="2.8" /></>; break;
    case "spark": body = <><path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z" /><path d="M18.5 16.5l.7 1.8 1.8.7-1.8.7-.7 1.8-.7-1.8-1.8-.7 1.8-.7z" /></>; break;
    case "briefcase": body = <><rect x="3" y="7" width="18" height="12" rx="2" /><path d="M9 7V5.5A1.5 1.5 0 0110.5 4h3A1.5 1.5 0 0115 5.5V7M3 12.5h18" /></>; break;
    case "users": body = <><circle cx="9" cy="8" r="3.2" /><path d="M3 19c0-3.2 2.7-5.5 6-5.5s6 2.3 6 5.5" /><path d="M16 5a3 3 0 010 6M18 14c2 .6 3.5 2.3 3.5 5" /></>; break;
    case "rocket": body = <><path d="M5 19c.5-2.5 1.7-3.7 3.2-4.2M9 15l-1-1c0-4.5 3.5-9.5 11-10 0 7.5-5 11-9.5 11z" /><circle cx="15" cy="9" r="1.4" /></>; break;
    case "store": body = <><path d="M4 9l1.3-4.5h13.4L20 9" /><path d="M4 9a2.6 2.6 0 005.2 0 2.6 2.6 0 005.6 0A2.6 2.6 0 0020 9M5.5 11.5V20h13v-8.5" /><path d="M10 20v-4.5h4V20" /></>; break;
    case "building": body = <><rect x="5" y="3.5" width="9" height="17" rx="1" /><path d="M14 9h4.5a.5.5 0 01.5.5V20.5M8.5 7.5h2M8.5 11h2M8.5 14.5h2M17 13h.01M17 16.5h.01" /></>; break;
    case "bed": body = <><path d="M3 18V7M3 14h18v4M21 14v-2.5A2.5 2.5 0 0018.5 9H11v5" /><circle cx="7" cy="11" r="1.8" /></>; break;
    case "heart": body = <path d="M12 20s-7.5-4.6-7.5-10A4.2 4.2 0 0112 7.6 4.2 4.2 0 0119.5 10c0 5.4-7.5 10-7.5 10z" />; break;
    case "layers": body = <><path d="M12 4l9 4.5-9 4.5-9-4.5z" /><path d="M3 12.5l9 4.5 9-4.5M3 16.5l9 4.5 9-4.5" /></>; break;
    case "phone": body = <path d="M6.5 4h3l1.5 4-2 1.3a10 10 0 005.7 5.7l1.3-2 4 1.5v3a2 2 0 01-2 2A15 15 0 014.5 6a2 2 0 012-2z" />; break;
    case "pin": body = <><path d="M12 21s-6.5-5.7-6.5-11a6.5 6.5 0 0113 0c0 5.3-6.5 11-6.5 11z" /><circle cx="12" cy="10" r="2.3" /></>; break;
    case "clock": body = <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3.2 2" /></>; break;
    case "arrow": body = <path d="M5 12h14M13 6l6 6-6 6" />; break;
    case "check": body = <path d="M5 12.5l4.2 4.2L19 7" />; break;
    case "plus": body = <path d="M12 5v14M5 12h14" />; break;
    case "trend": body = <><path d="M3 17l6-6 4 4 8-8" /><path d="M15 7h6v6" /></>; break;
    case "coin": body = <><circle cx="12" cy="12" r="9" /><path d="M14.8 9.2c-.6-.8-1.6-1.2-2.8-1.2-1.7 0-2.8.8-2.8 2 0 3 5.8 1.2 5.8 4.2 0 1.2-1.1 2-2.9 2-1.3 0-2.4-.5-3.1-1.4M12 6.5V8M12 16v1.5" /></>; break;
    case "globe": body = <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.5 2.5 3.8 5.5 3.8 9S14.5 18.5 12 21c-2.5-2.5-3.8-5.5-3.8-9S9.5 5.5 12 3z" /></>; break;
  }
  return <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...s}>{body}</svg>;
}