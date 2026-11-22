import { Children, cloneElement, isValidElement, type ReactNode } from "react";

export const S = "https://softsaro.com.np";
export const Roll = ({ t }: { t: string }) => (
  <span className="roll"><span>{t}</span><span aria-hidden="true">{t}</span></span>
);
export const Up = () => (<svg className="ar" viewBox="0 0 24 24"><path d="M7 17L17 7M8 7h9v9" /></svg>);

/** Splits text into masked word spans at render time (no DOM mutation); keeps <b> and <br />. */
export function split(children: ReactNode): ReactNode {
  return Children.map(children, (c) => {
    if (typeof c === "string") {
      return c.split(/(\s+)/).map((w, i) =>
        w.trim() ? <span className="wd-w" key={i}><span className="wd-i">{w}</span></span> : w,
      );
    }
    if (isValidElement<{ children?: ReactNode }>(c) && c.type !== "br") {
      return cloneElement(c, undefined, split(c.props.children));
    }
    return c;
  });
}

export const Heading = ({ id, className = "", children }: { id?: string; className?: string; children: ReactNode }) => (
  <h2 id={id} className={`wd-h2 ${className}`.trim()} data-split="">{split(children)}</h2>
);

export const Label = ({ num, light, children }: { num?: string; light?: boolean; children: ReactNode }) => (
  <p className={`lab${light ? " w" : ""}`}>
    <i></i>
    {num && <span className="gn">{num} /</span>} {children}
  </p>
);

export const Btn = ({ href, v = "", arrow = true, children }: { href: string; v?: "" | "dark" | "white" | "ghostw"; arrow?: boolean; children: string }) => (
  <a href={href} className={`btn ${v}`.trim()}>
    <Roll t={children} />
    {arrow && <Up />}
  </a>
);