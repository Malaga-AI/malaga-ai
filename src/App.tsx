import {
  FaBell,
  FaBrain,
  FaCalendarAlt,
  FaCity,
  FaDiscord,
  FaExternalLinkAlt,
  FaLanguage,
  FaLinkedin,
  FaNetworkWired,
  FaRegCommentDots,
  FaRegUserCircle,
  FaRocket,
  FaShareAlt,
  FaTelegramPlane,
  FaUsers,
} from 'react-icons/fa';
import type { IconType } from 'react-icons';
import heroImage from './assets/hero.png';

type Feature = {
  title: string;
  description: string;
  icon: IconType;
  tone: string;
};

type TeamMember = {
  name: string;
  role: string;
  initials: string;
};

type Event = {
  title: string;
  date: string;
  type: string;
  location: string;
  description: string;
};

const features: Feature[] = [
  {
    title: 'Build',
    description: 'Hands-on sessions for agents, retrieval, workflows, evaluations, and useful AI prototypes.',
    icon: FaUsers,
    tone: 'text-mint',
  },
  {
    title: 'Discuss',
    description: 'Technical conversations about trade-offs, failures, safety, adoption, and product impact.',
    icon: FaBrain,
    tone: 'text-lavender',
  },
  {
    title: 'Demo',
    description: 'Small rooms where builders show the thing, explain what broke, and share practical patterns.',
    icon: FaCalendarAlt,
    tone: 'text-periwinkle',
  },
  {
    title: 'Connect',
    description: 'A local network for founders, researchers, operators, students, and product-minded engineers.',
    icon: FaRocket,
    tone: 'text-mint',
  },
];

const team: TeamMember[] = [
  {
    name: 'Adrian Tineo',
    role: 'Founding Node',
    initials: 'AT',
  },
  {
    name: 'Daniel Avila',
    role: 'Community Manager',
    initials: 'DA',
  },
  {
    name: 'Laura Medina',
    role: 'Events Lead',
    initials: 'LM',
  },
  {
    name: 'Nora Ruiz',
    role: 'Research Programs',
    initials: 'NR',
  },
  {
    name: 'Samuel Ortega',
    role: 'Developer Relations',
    initials: 'SO',
  },
  {
    name: 'Maya Chen',
    role: 'Partnerships',
    initials: 'MC',
  },
];

const sponsors = [
  {
    name: 'Neural Coast',
    description: 'Applied AI studio supporting hands-on experimentation and local prototypes.',
  },
  {
    name: 'VectorHub',
    description: 'Cloud infrastructure for demos, workshops, and community-built agents.',
  },
  {
    name: 'Mediterranean Tech School',
    description: 'Learning partner for practical sessions, classrooms, and mentoring circles.',
  },
  {
    name: 'PromptWorks',
    description: 'Product team helping members explore AI workflows for real businesses.',
  },
];

const communityFriends = [
  {
    name: 'Granada Data Circle',
    location: 'Granada',
    focus: 'Data science, ML study groups, and open research meetups.',
  },
  {
    name: 'Sevilla Builders Club',
    location: 'Seville',
    focus: 'Indie hackers, automation builders, and startup operators.',
  },
  {
    name: 'Valencia AI Guild',
    location: 'Valencia',
    focus: 'Applied generative AI, product labs, and technical talks.',
  },
  {
    name: 'Lisbon Agent Lab',
    location: 'Lisbon',
    focus: 'Multi-agent systems, tooling experiments, and demo nights.',
  },
];

const upcomingEvents: Event[] = [
  {
    title: 'Agents in Production',
    date: 'May 16',
    type: 'Deep dive',
    location: 'Malaga TechPark',
    description: 'Memory, tools, traces, and evaluation for agentic systems that survive real users.',
  },
  {
    title: 'Demo Night: Local Builders',
    date: 'May 30',
    type: 'Meetup',
    location: 'Centro Historico',
    description: 'Five short demos from the community, followed by open critique and founder office hours.',
  },
  {
    title: 'AI Product Sprint',
    date: 'Jun 13',
    type: 'Workshop',
    location: 'Hybrid',
    description: 'Turn a model idea into a scoped prototype with UX, data, and deployment constraints.',
  },
];

const pastEvents = [
  {
    title: 'Agentic Workflows Night',
    date: 'March 2026',
    description: 'Live demos of small teams using agents to automate research and operations.',
  },
  {
    title: 'AI Product Sprint',
    date: 'February 2026',
    description: 'A practical workshop for turning a model idea into a working prototype.',
  },
  {
    title: 'Responsible AI Roundtable',
    date: 'January 2026',
    description: 'A discussion on safety, governance, and practical evaluation methods.',
  },
  {
    title: 'Prompt Engineering Clinic',
    date: 'December 2025',
    description: 'Hands-on review of prompts, workflows, and retrieval patterns from members.',
  },
];

const navItems = [
  { label: 'Home', href: '#explore' },
  { label: 'Events', href: '#events' },
  { label: 'Build', href: '#about' },
  { label: 'Sponsors', href: '#sponsors' },
  { label: 'Network', href: '#friends' },
  { label: 'Team', href: '#team' },
];

function LighthouseMark() {
  return (
    <div className="brand-card">
      <div className="hero-visual-top">
        <span>Live Activity Pulse</span>
        <strong>2.4k</strong>
      </div>
      <img src={heroImage} alt="Layered AI network visualization" className="brand-illustration" />
      <div className="hero-metrics" aria-label="Community highlights">
        <span>Workshops</span>
        <span>Build nights</span>
        <span>Research</span>
      </div>
      <p>Malaga-AI</p>
    </div>
  );
}

function Header() {
  return (
    <header className="site-header">
      <a className="brand" href="#explore" aria-label="Malaga-AI home">
        Malaga-AI
      </a>
      <nav aria-label="Primary">
        {navItems.map((item) => (
          <a key={item.href} href={item.href}>
            {item.label}
          </a>
        ))}
      </nav>
      <div className="header-actions">
        <button aria-label="Notifications" className="icon-button">
          <FaBell />
        </button>
        <button aria-label="Profile" className="icon-button">
          <FaRegUserCircle />
        </button>
        <a className="join-button" href="mailto:hello@malaga-ai.dev">
          Join Collective
        </a>
      </div>
    </header>
  );
}

function App() {
  return (
    <main>
      <Header />

      <section className="hero-section section-shell" id="explore">
        <div className="hero-copy">
          <span className="eyebrow">Mediterranean AI Collective</span>
          <h1>Malaga-AI</h1>
          <p>
            A technical community for people building with AI in Malaga: demos, workshops,
            practical research, sponsor-backed challenges, and the kind of conversations that
            happen before the playbook exists.
          </p>
          <div className="hero-stats" aria-label="Community stats">
            <span><strong>40+</strong> meetups</span>
            <span><strong>800+</strong> members</span>
            <span><strong>12</strong> partner circles</span>
          </div>
          <div className="social-actions" aria-label="Social channels">
            <a className="primary" href="https://discord.com" target="_blank" rel="noreferrer">
              <FaDiscord /> Discord
            </a>
            <a href="https://telegram.org" target="_blank" rel="noreferrer">
              <FaTelegramPlane /> Telegram
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer">
              <FaLinkedin /> LinkedIn
            </a>
          </div>
        </div>
        <LighthouseMark />
      </section>

      <section className="signal-strip section-shell" aria-label="Community signal">
        <div>
          <span>Members</span>
          <strong>800+</strong>
        </div>
        <div>
          <span>Monthly sessions</span>
          <strong>4</strong>
        </div>
        <div>
          <span>Active projects</span>
          <strong>27</strong>
        </div>
        <div>
          <span>Focus</span>
          <strong>Applied AI</strong>
        </div>
      </section>

      <section className="events-section section-shell" id="events">
        <div className="section-intro events-intro">
          <span className="section-kicker">Upcoming Events</span>
          <h2>Designed for builders, not spectators</h2>
          <p>
            The calendar is built around demos, technical depth, and useful connections.
            Come with a problem, a prototype, or a sharp question.
          </p>
        </div>
        <div className="upcoming-list">
          {upcomingEvents.map((event) => (
            <article className="upcoming-card" key={event.title}>
              <div className="event-date">
                <span>{event.date}</span>
                <strong>{event.type}</strong>
              </div>
              <div>
                <h3>{event.title}</h3>
                <p>{event.description}</p>
              </div>
              <span className="event-location">{event.location}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="about-section section-shell" id="about">
        <div className="section-intro">
          <span className="section-kicker">What We Do</span>
          <h2>Small rooms, high signal</h2>
          <p>
            We curate the room so the community stays practical: working code beats hype,
            clear demos beat generic panels, and local trust makes global knowledge useful.
          </p>
        </div>
        <div className="feature-grid">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <article className="feature-card" key={feature.title}>
                <Icon className={feature.tone} />
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="sponsors-section section-shell" id="sponsors">
        <div className="section-intro centered">
          <span className="section-kicker">Sponsors</span>
          <h2>Back the people building next</h2>
          <p>
            Partners help us keep sessions free, fund prototypes, host build nights, and
            connect serious AI talent with real-world problems.
          </p>
        </div>
        <div className="sponsor-grid">
          {sponsors.map((sponsor) => (
            <article className="sponsor-card" key={sponsor.name}>
              <div className="sponsor-logo">{sponsor.name.slice(0, 2).toUpperCase()}</div>
              <h3>{sponsor.name}</h3>
              <p>{sponsor.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="friends-section section-shell" id="friends">
        <div className="section-intro">
          <span className="section-kicker">Network</span>
          <h2>Local roots, wider signal</h2>
          <p>
            Malaga-AI grows in conversation with nearby communities that share our taste for
            practical learning, open demos, and serious curiosity.
          </p>
        </div>
        <div className="friend-list">
          {communityFriends.map((friend) => (
            <article className="friend-card" key={friend.name}>
              <FaCity />
              <div>
                <span>{friend.location}</span>
                <h3>{friend.name}</h3>
                <p>{friend.focus}</p>
              </div>
              <a href="#friends" aria-label={`Visit ${friend.name}`}>
                <FaExternalLinkAlt />
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="archive-section section-shell" id="archive">
        <div className="section-intro centered">
          <span className="section-kicker">Past Events</span>
          <h2>Recent gatherings</h2>
          <p>
            A snapshot of the sessions, roundtables, and build nights that have shaped the
            community over the last months.
          </p>
        </div>
        <div className="event-timeline">
          {pastEvents.map((event) => (
            <article className="event-card" key={event.title}>
              <span>{event.date}</span>
              <h3>{event.title}</h3>
              <p>{event.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="team-section section-shell" id="team">
        <div className="section-intro centered">
          <span className="section-kicker">Team</span>
          <h2>Community builders</h2>
          <p>
            The people shaping the vision, connecting talent, and turning shared ideas into
            useful events, projects, and collaborations.
          </p>
        </div>
        <div className="team-grid">
          {team.map((member) => (
            <article className="team-card" key={member.name}>
              <div className="avatar">{member.initials}</div>
              <h3>{member.name}</h3>
              <p>{member.role}</p>
              <div>
                <button aria-label={`Language options for ${member.name}`}>
                  <FaLanguage />
                </button>
                <button aria-label={`Share ${member.name}'s profile`}>
                  <FaShareAlt />
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <footer>
        <FaNetworkWired />
        <span>Malaga-AI Collective</span>
        <FaRegCommentDots />
      </footer>
    </main>
  );
}

export default App;
