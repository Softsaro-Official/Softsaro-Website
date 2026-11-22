import Image from "next/image";
import type { Person } from "./team-data";

export type TmPerson = Person & { slug: string; ini: string; photo: string | null };

export default function TmPic({ p, sizes, priority = false }: { p: TmPerson; sizes: string; priority?: boolean }) {
  return (
    <span className={`tm-pic tm-t-${p.tone}`}>
      {p.photo ? (
        <Image src={p.photo} alt={p.name} fill sizes={sizes} priority={priority} className="tm-img" />
      ) : (
        <>
          <span className="tm-ini" aria-hidden="true">{p.ini}</span>
          <i className="tm-orb" aria-hidden="true" />
        </>
      )}
    </span>
  );
}