import Link from "next/link";
import { ArrowUpRight, UsersRound } from "lucide-react";

type Person = { name: string; role: string; tone: string };

const management: Person[] = [
  { name: "Santosh Rajbanshi", role: "Chief Executive Officer", tone: "violet" },
  { name: "Sujan Adhikari", role: "Chairman", tone: "ink" },
  { name: "Binaya Neupane", role: "Chief Operating Officer", tone: "lime" },
  { name: "Krishna Prasad Khanal", role: "Business Development Officer", tone: "coral" },
];

const team: Person[] = [
  { name: "Anup Kasula", role: "Technical Director | Senior FullStack Developer", tone: "violet" },
  { name: "Aabishkar Shrestha", role: "Technical Director | Senior FullStack Developer", tone: "ink" },
  { name: "Aryan Miya Mansoor", role: "Technical Director | SEO Expert", tone: "lime" },
  { name: "Rhythem Phuyal", role: "Project Manager", tone: "coral" },
  { name: "Jenish Prajapati", role: "Junior Web Developer", tone: "ink" },
  { name: "Dhiraj Kumar Sarraf", role: "Junior Web Developer", tone: "violet" },
  { name: "Kushal Poudel", role: "Junior Web Developer", tone: "lime" },
  { name: "Alok Kharel", role: "Junior Web Developer", tone: "coral" },
  { name: "Urmila K.c", role: "Content Writer & Creator", tone: "violet" },
  { name: "Smriti Sanjyal", role: "Junior Web Developer", tone: "ink" },
  { name: "Naresh Dhakal", role: "Digital Marketing Expert", tone: "lime" },
  { name: "Shreejan Shrestha", role: "UI/UX & Graphic Designer", tone: "coral" },
  { name: "Shriya Shakya", role: "UI/UX & Digital Marketing", tone: "ink" },
  { name: "Aaditya Shah", role: "Digital Marketing Intern", tone: "violet" },
  { name: "Sokim Rana", role: "Video Editor", tone: "lime" },
  { name: "Dil Maya Kafle", role: "Sales Manager", tone: "coral" },
  { name: "Anjali Kumari", role: "Digital Marketing Intern", tone: "ink" },
];

const initials = (name: string) => name.split(/\s+/).map((part) => part[0]).slice(0, 2).join("").toUpperCase();
function PersonCard({ person, index }: { person: Person; index: number }) {
  return <article className={`team-card team-${person.tone}`}><div className="team-avatar"><span>{initials(person.name)}</span><i /></div><div className="team-card-meta"><small>0{index + 1}</small><h3>{person.name}</h3><p>{person.role}</p></div></article>;
}

export default function TeamPage() {
  return <main className="team-page" id="top">
    <section className="team-hero"><div className="wrap" data-reveal><p className="lab"><i /><span className="gn">Our team /</span> The people behind the work</p><div className="team-hero-grid"><div><h1>Built by people who care about the <em>details.</em></h1><p>Softsaro brings together strategists, designers, engineers and growth specialists who make ambitious ideas useful in the real world.</p></div><div className="team-symbol"><UsersRound /><span>One team,<br />many crafts</span></div></div></div></section>
    <section className="team-group"><div className="wrap" data-reveal><div className="team-heading"><div><p className="blog-category">Leadership</p><h2>Guided by trust and clear direction.</h2></div><p>The people who keep the work focused, collaborative and moving forward.</p></div><div className="team-grid management-grid">{management.map((person, index) => <PersonCard key={person.name} person={person} index={index} />)}</div></div></section>
    <section className="team-group team-group-alt"><div className="wrap" data-reveal><div className="team-heading"><div><p className="blog-category">The wider team</p><h2>Different strengths. One shared standard.</h2></div><p>From first sketch to final release, every perspective makes the work stronger.</p></div><div className="team-grid">{team.map((person, index) => <PersonCard key={person.name} person={person} index={index} />)}</div></div></section>
    <section className="team-cta"><div className="wrap" data-reveal><div><p className="blog-category">Work with us</p><h2>Have a project worth caring about?</h2></div><Link href="/#contact">Meet the team <ArrowUpRight size={20} /></Link></div></section>
  </main>;
}
