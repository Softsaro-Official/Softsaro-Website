"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { teamGroups, type TeamMember } from "@/lib/team-data";
import "./team-section.css";

function TeamCard({
  m,
  compact,
  index,
}: {
  m: TeamMember;
  compact?: boolean;
  index: number;
}) {
  const reduce = useReducedMotion();
  const [tapped, setTapped] = useState(false);

  return (
    <motion.li
      className={`team-item${compact ? " team-item--compact" : ""}`}
      initial={reduce ? false : { opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: (index % 4) * 0.08, ease: [0.2, 0.8, 0.2, 1] }}
    >
      <div
        className={`team-card${compact ? " team-card--compact" : ""}`}
        data-tapped={tapped}
        tabIndex={0}
        onClick={(e) => {
          if ((e.nativeEvent as PointerEvent).pointerType === "touch")
            setTapped((v) => !v);
        }}
      >
        <div className="team-card__media">
          <Image
            src={m.photo}
            alt={m.name}
            fill
            sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
            className="team-card__img"
          />
          <Image
            src={m.hover}
            alt=""
            aria-hidden
            fill
            sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
            className="team-card__img team-card__img--hover"
          />
        </div>
        <div className="team-card__shade" />
        <div className="team-card__info">
          <h4>{m.name}</h4>
          <span>{m.role}</span>
          {(m.website || m.linkedin) && (
            <div className="team-card__links">
              {m.website && (
                <a href={m.website} target="_blank" rel="noopener noreferrer" aria-label={`${m.name} website`}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20" />
                  </svg>
                </a>
              )}
              {m.linkedin && (
                <a href={m.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`${m.name} LinkedIn`}>
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.li>
  );
}

export default function TeamSection() {
  return (
    <section id="team" className="team-sec" aria-labelledby="team-heading">
      <div className="team-outer">
        <div className="team-frame">
          <div className="team-head">
            <div className="team-pill-row">
              <i />
              <div className="team-pill">
                <span>Our Team</span>
              </div>
              <i />
            </div>
            <div className="team-head__text">
              <h2 id="team-heading">
                Best IT Experts In Nepal &ndash; Skilled Team At Softsaro Nepal
              </h2>
              <p>
                <a href="https://www.softsaro.com.np/">Softsaro Nepal</a> has a team of
                experienced and dedicated professionals ready to deliver high-quality
                digital solutions. Our team includes the{" "}
                <a href="https://www.softsaro.com.np/teams/it-experts-in-nepal">
                  best IT specialist from Nepal
                </a>{" "}
                with strong skills in web development, mobile apps, SEO and digital
                marketing. We focus on quality work, trusted service, and real results
                for your business. Choose Softsaro Nepal and work with the{" "}
                <a href="https://www.softsaro.com.np/teams/it-experts-in-nepal">
                  best IT expert in Nepal
                </a>{" "}
                to grow your business successfully.
              </p>
            </div>
          </div>

          <div className="team-body">
            <div className="team-wrap">
              {teamGroups.map((g) => (
                <div key={g.title}>
                  <div className="team-group__title">
                    <i />
                    <h3>{g.title}</h3>
                    <i />
                  </div>
                  <ul className="team-grid">
                    {g.members.map((m, i) => (
                      <TeamCard key={m.name} m={m} compact={g.compact} index={i} />
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}