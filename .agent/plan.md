# Implementation Plan — Malaga AI One-Page React Website

## 1. Goal

Build a modern, responsive, one-page React website for **Malaga AI**, a technology community focused on artificial intelligence.

The website must act as a clear entry point for people who want to discover the community, join future events, learn about previous sessions, meet speakers, see community projects, and connect with the organizers.

The entire website must be written in **English only**. Do not mix languages in UI labels, mock content, comments visible to users, navigation items, or page copy.

---

## 2. Non-negotiable requirements

The AI agent must follow these constraints exactly:

1. **Single-page website only**
   - Build one landing page.
   - Do not create multiple routes.
   - Use anchor navigation for page sections.
   - Do not use React Router unless explicitly requested later.

2. **Community name**
   - The community must be called **Malaga AI** everywhere.
   - Do not use generic names such as “AI Community”, “Tech Community”, or “Málaga AI” unless the user explicitly changes the branding.

3. **Language**
   - The website must be completely in English.
   - Do not include Spanish copy.
   - Do not mix Spanish and English.

4. **Removed sections**
   - Do not include an “AI Tracks”, “Tracks”, “Topics”, “Themes”, or similar section.
   - Do not include an FAQ section.

5. **Typography**
   - Use the custom font file: `safiro-medium.otf`.
   - Configure it with `@font-face`.
   - Use it as the main brand/display font.

6. **Modern visual style**
   - Clean, premium, tech-focused, community-oriented.
   - Use strong spacing, gradients, cards, soft borders, subtle motion, and responsive layouts.

---

## 3. Recommended stack

Use this stack unless the user explicitly requests something else:

- React
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui
- Lucide React
- Motion for React or Framer Motion
- clsx
- tailwind-merge

Do not add backend, database, authentication, CMS, or external integrations in the first implementation unless explicitly requested.

---

## 4. Expected final result

The agent must deliver a complete one-page React website with:

- Responsive header with anchor links.
- Hero section.
- Community trust/statistics strip.
- Featured upcoming event section.
- Events section.
- Community value section.
- Speakers section.
- Projects or demos section.
- Resources section.
- Sponsors and partners section.
- Friendly communities section with a list and logos.
- Join / newsletter / community call-to-action section.
- Footer.
- Fully responsive design.
- Mock data that feels realistic for Malaga AI.
- All text in English.
- No FAQ section.
- No AI tracks/topics section.

---

## 5. Suggested content strategy

The page should answer these questions quickly:

1. What is Malaga AI?
2. Why should someone join?
3. What kind of events does the community organize?
4. Who speaks or participates?
5. What projects, demos, or resources can members discover?
6. How can someone join or stay updated?

The tone should be:

- Clear.
- Confident.
- Technical but accessible.
- Community-first.
- Modern and international.

Avoid vague marketing copy. Prefer concrete wording such as:

> Malaga AI brings builders, researchers, engineers, founders, and AI enthusiasts together through technical talks, demos, workshops, and community sessions in Malaga.

---

# Phase 0 — Project setup

## Tasks

1. Create a React + TypeScript project with Vite.
2. Install Tailwind CSS.
3. Configure shadcn/ui.
4. Install Lucide React.
5. Install Motion / Framer Motion.
6. Configure import aliases such as `@/components`, `@/data`, `@/lib`, and `@/types`.
7. Add the custom font file `safiro-medium.otf` to the project.
8. Configure global styles.

## Suggested commands

```bash
npm create vite@latest malaga-ai-web -- --template react-ts
cd malaga-ai-web
npm install
npm install lucide-react motion clsx tailwind-merge
```

Configure Tailwind and shadcn/ui according to the current official documentation.

## Acceptance criteria

- `npm run dev` starts the project successfully.
- TypeScript has no blocking errors.
- Tailwind utility classes work.
- shadcn/ui components can be imported.
- The custom font file is present in the project.
- The app renders a one-page layout.

---

# Phase 1 — File and folder architecture

Create the following structure:

```txt
src/
  assets/
    fonts/
      safiro-medium.otf
  components/
    ui/
    layout/
      Header.tsx
      Footer.tsx
      MobileMenu.tsx
    sections/
      Hero.tsx
      TrustBar.tsx
      FeaturedEvent.tsx
      Events.tsx
      CommunityValue.tsx
      Speakers.tsx
      Projects.tsx
      Resources.tsx
      Sponsors.tsx
      FriendlyCommunities.tsx
      JoinCommunity.tsx
    community/
      EventCard.tsx
      SpeakerCard.tsx
      ProjectCard.tsx
      ResourceCard.tsx
      SponsorCard.tsx
      FriendCommunityCard.tsx
      StatCard.tsx
  data/
    events.ts
    speakers.ts
    sponsors.ts
    friendlyCommunities.ts
    resources.ts
    projects.ts
    stats.ts
  lib/
    utils.ts
  types/
    community.ts
  App.tsx
  main.tsx
  index.css
```

Do **not** create:

```txt
src/components/sections/FAQ.tsx
src/components/sections/Topics.tsx
src/data/faq.ts
src/data/topics.ts
```

## Acceptance criteria

- The structure is modular and easy to maintain.
- Large sections do not contain hardcoded arrays of data.
- Data lives in `src/data`.
- Shared types live in `src/types/community.ts`.
- No routing folder or multi-page structure exists.

---

# Phase 2 — Custom font setup

## Tasks

1. Place the font file at:

```txt
src/assets/fonts/safiro-medium.otf
```

2. Add the font to `src/index.css`:

```css
@font-face {
  font-family: 'Safiro';
  src: url('./assets/fonts/safiro-medium.otf') format('opentype');
  font-weight: 500;
  font-style: normal;
  font-display: swap;
}
```

3. Extend Tailwind config:

```ts
fontFamily: {
  safiro: ['Safiro', 'Inter', 'system-ui', 'sans-serif'],
  sans: ['Inter', 'system-ui', 'sans-serif'],
}
```

4. Use `font-safiro` for:

- Main hero headline.
- Section titles.
- Navigation brand text.
- Important display text.

5. Use a clean sans-serif fallback for paragraphs and small UI text.

## Acceptance criteria

- The website loads `safiro-medium.otf` correctly.
- The hero headline visibly uses the Safiro font.
- Section headings use the Safiro font.
- Body text remains readable.
- No external font provider is required for Safiro.

---

# Phase 3 — Data model

Create `src/types/community.ts` with the following types:

```ts
export type EventLevel = 'beginner' | 'intermediate' | 'advanced' | 'all'
export type EventLanguage = 'EN' | 'ES' | 'EN/ES'
export type EventType = 'talk' | 'workshop' | 'demo' | 'networking' | 'panel' | 'community-session'

export type Event = {
  id: string
  title: string
  description: string
  date: string
  startTime: string
  endTime: string
  location: string
  address?: string
  type: EventType
  level: EventLevel
  language: EventLanguage
  speakers: string[]
  registrationUrl?: string
  image?: string
  tags: string[]
}

export type Speaker = {
  id: string
  name: string
  role: string
  company?: string
  bio: string
  avatar?: string
  topics: string[]
  links?: {
    linkedin?: string
    github?: string
    x?: string
    website?: string
  }
}

export type Resource = {
  id: string
  title: string
  description: string
  type: 'talk' | 'slides' | 'repo' | 'paper' | 'guide' | 'tool'
  url: string
  tags: string[]
  level: EventLevel
}

export type Project = {
  id: string
  title: string
  description: string
  authors: string[]
  stack: string[]
  repoUrl?: string
  demoUrl?: string
  tags: string[]
}

export type Sponsor = {
  id: string
  name: string
  tier: 'community' | 'venue' | 'pizza' | 'gold' | 'main'
  logo?: string
  url?: string
}

export type FriendlyCommunity = {
  id: string
  name: string
  shortDescription?: string
  logo?: string
  url?: string
}

export type Stat = {
  id: string
  label: string
  value: string
  description?: string
}
```

## Acceptance criteria

- Types cover all visible data sections.
- No `Topic` or `FAQ` types are created.
- Data is typed and reusable.

---

# Phase 4 — Mock data

Create realistic mock data for Malaga AI.

## 4.1 `src/data/stats.ts`

Suggested stats:

```ts
export const stats = [
  {
    id: 'members',
    value: '500+',
    label: 'Community members',
    description: 'Builders, engineers, researchers, founders, and AI enthusiasts.',
  },
  {
    id: 'events',
    value: '20+',
    label: 'Sessions hosted',
    description: 'Technical talks, demos, workshops, and networking events.',
  },
  {
    id: 'speakers',
    value: '35+',
    label: 'Speakers and mentors',
    description: 'Professionals sharing real-world AI experience.',
  },
]
```

## 4.2 `src/data/events.ts`

Include one featured upcoming event and several past or upcoming events.

Suggested event examples:

- `Building Agentic Apps with Modern AI Tooling`
- `AI Agents in Real Software Teams`
- `Defending the Models that Defend Us`
- `Knowing When You Are Wrong: Uncertainty in 3D Vision`
- `From Prototype to Production: Shipping AI Features Safely`

Each event should include:

- Title.
- Description.
- Date.
- Time.
- Location in Malaga.
- Language.
- Level.
- Tags.
- Speaker references.

## 4.3 `src/data/speakers.ts`

Use mock speakers unless real names are explicitly provided by the user.

Each speaker should include:

- Name.
- Role.
- Company.
- Short bio.
- Topics of expertise.
- Optional links.

## 4.4 `src/data/projects.ts`

Suggested project examples:

- `Local RAG Assistant`
- `AI Event Notes Generator`
- `Computer Vision Demo Lab`
- `Prompt Evaluation Toolkit`

Each project should include:

- Description.
- Authors.
- Stack.
- Demo or repository links when available.
- Tags.

## 4.5 `src/data/resources.ts`

Suggested resource examples:

- `Intro to AI Agents`
- `RAG Architecture Checklist`
- `Prompt Evaluation Guide`
- `Responsible AI Deployment Notes`

## 4.6 `src/data/sponsors.ts`

Use neutral placeholders:

- `Community Venue Partner`
- `Pizza Sponsor`
- `Cloud Partner`
- `Education Partner`

## 4.7 `src/data/friendlyCommunities.ts`

Create a small list of friendly communities that Malaga AI can highlight.

Each item should include:

- Name.
- Short description.
- Optional logo.
- Optional external URL.

Suggested examples:

- `GDG Malaga`
- `PyData Malaga`
- `Women Techmakers Malaga`
- `Cloud Native Malaga`

The UI for this section must show both the community name and its logo or a graceful placeholder if no logo is available.

## Acceptance criteria

- All data is in English.
- The community name is Malaga AI.
- Mock data feels realistic.
- No FAQ data exists.
- No tracks/topics data exists.

---

# Phase 5 — Page sections

The website must be implemented as a single page inside `App.tsx`, composed from reusable section components.

Suggested order:

```tsx
<Header />
<main>
  <Hero />
  <TrustBar />
  <FeaturedEvent />
  <Events />
  <CommunityValue />
  <Speakers />
  <Projects />
  <Resources />
  <Sponsors />
  <FriendlyCommunities />
  <JoinCommunity />
</main>
<Footer />
```

Do not include:

```tsx
<Topics />
<FAQ />
```

---

## 5.1 Header

### Purpose

Help users navigate the one-page site quickly.

### Content

- Malaga AI logo or wordmark.
- Anchor links:
  - Events
  - Community
  - Speakers
  - Projects
  - Resources
  - Partners
  - Friend Communities
- Primary CTA:
  - Join the community

### Requirements

- Sticky or semi-sticky header.
- Mobile menu.
- Smooth anchor scrolling.
- Use Safiro for the brand text.
- Keep labels in English only.

### Acceptance criteria

- Header works on desktop and mobile.
- Anchor links scroll to the correct sections.
- No route navigation is used.

---

## 5.2 Hero

### Purpose

Immediately explain what Malaga AI is and invite users to join.

### Suggested copy

Headline:

> Build, learn, and connect with the AI community in Malaga.

Subheadline:

> Malaga AI brings engineers, researchers, founders, and AI enthusiasts together through technical talks, demos, workshops, and community sessions.

Primary CTA:

> Join the community

Secondary CTA:

> Explore events

### Visual ideas

- Abstract AI grid background.
- Gradient glow.
- Floating cards with phrases such as:
  - Agents
  - RAG
  - Computer Vision
  - Responsible AI
  - LLM Apps
- Small badge: `Malaga-based · Open to builders everywhere`

### Acceptance criteria

- The hero is visually strong.
- The headline uses the Safiro font.
- CTAs are visible above the fold.
- Copy is in English only.

---

## 5.3 TrustBar

### Purpose

Show that Malaga AI is active and community-driven.

### Content

Use the stats from `src/data/stats.ts`.

### Design

- Horizontal cards on desktop.
- Vertical stacked cards on mobile.
- Light borders and subtle background blur.

### Acceptance criteria

- Stats render from data.
- Design is responsive.

---

## 5.4 FeaturedEvent

### Purpose

Promote the next main community event.

### Content

- Event title.
- Description.
- Date and time.
- Location.
- Language.
- Tags.
- CTA: `Register now` or `View details`.

### Design

- Large highlighted card.
- Use calendar, map pin, clock, and users icons.
- Include speaker chips if available.

### Acceptance criteria

- Featured event is pulled from `events.ts`.
- If no registration URL exists, CTA should be hidden or disabled gracefully.
- Mobile layout remains readable.

---

## 5.5 Events

### Purpose

Show upcoming and recent community sessions.

### Content

Render a grid/list of event cards.

Each event card should show:

- Title.
- Short description.
- Date.
- Time.
- Location.
- Language.
- Level.
- Tags.

### Optional filters

If implemented, keep filters simple:

- Upcoming
- Past
- All

Do not add complex category filters based on tracks or topics.

### Acceptance criteria

- Events are rendered from `events.ts`.
- Cards are reusable.
- Layout is responsive.
- No “Tracks” or “Topics” section is introduced.

---

## 5.6 CommunityValue

### Purpose

Explain why Malaga AI exists and what members get from it.

### Suggested content blocks

1. **Technical sessions**
   - Talks, workshops, and demos focused on real AI engineering.

2. **Builders and practitioners**
   - A place for people shipping, researching, or learning AI systems.

3. **Local connections**
   - Meet people building AI products, startups, tools, and research in Malaga.

4. **Practical learning**
   - Learn from real implementations, lessons, limitations, and trade-offs.

### Acceptance criteria

- Section is not a list of AI tracks.
- It focuses on community value.
- Copy is clear and in English.

---

## 5.7 Speakers

### Purpose

Highlight people who share knowledge with the community.

### Content

Render speaker cards from `speakers.ts`.

Each speaker card should show:

- Name.
- Role.
- Company.
- Bio.
- Expertise tags.
- Optional social links.

### Design

- Card grid.
- Avatar placeholder if no image exists.
- Subtle hover animation.

### Acceptance criteria

- Speaker cards are reusable.
- Missing avatar images do not break the layout.
- All copy is in English.

---

## 5.8 Projects

### Purpose

Show what members build, demo, or experiment with.

### Content

Render projects from `projects.ts`.

Each project card should show:

- Project title.
- Description.
- Authors.
- Stack.
- Tags.
- Optional repository/demo links.

### Design

- Cards with stack badges.
- CTA links only if URLs exist.

### Acceptance criteria

- Projects render from data.
- No broken links are displayed.
- Cards remain readable on mobile.

---

## 5.9 Resources

### Purpose

Offer useful material for members and visitors.

### Content

Render resources from `resources.ts`.

Examples:

- Guides.
- Repositories.
- Slides.
- Papers.
- Tools.

### Requirements

- Do not create a separate blog.
- Do not create individual resource pages.
- Keep everything in the one-page layout.

### Acceptance criteria

- Resources are rendered from data.
- External links open safely.
- Layout is clean and scannable.

---

## 5.10 Sponsors

### Purpose

Recognize partners who support Malaga AI.

### Content

Render sponsors from `sponsors.ts`.

Sponsor types may include:

- Venue partner.
- Pizza sponsor.
- Cloud partner.
- Education partner.
- Community partner.

### Acceptance criteria

- Sponsor cards support missing logos.
- Placeholder logos look intentional.
- Section is in English.

---

## 5.11 FriendlyCommunities

### Purpose

Show related or allied communities that Malaga AI collaborates with, supports, or recommends.

### Content

Render friendly communities from `friendlyCommunities.ts`.

Each item should show:

- Community name.
- Logo or placeholder logo.
- Short description.
- Optional external link.

### Design

- Use a logo-first card grid or a clean logo wall with names below each logo.
- Keep the layout light and scannable.
- Make sure the logos feel visually balanced even when the source assets have different proportions.

### Acceptance criteria

- The section exists as its own section in the single-page layout.
- Communities are rendered from data.
- Missing logos do not break the design.
- A list and logos are both visible.
- All text is in English.

---

## 5.12 JoinCommunity

### Purpose

Convert visitors into community members.

### Content

Suggested headline:

> Join Malaga AI and be part of the local AI movement.

Suggested body:

> Get updates about upcoming sessions, open calls for speakers, demos, workshops, and community opportunities.

Suggested CTAs:

- Join the community
- Propose a talk
- Become a partner

### Implementation notes

For the first version, use placeholder links:

```ts
const communityLinks = {
  join: '#',
  proposeTalk: '#',
  partner: '#',
}
```

### Acceptance criteria

- CTA section is visually prominent.
- Placeholder links are easy to replace later.
- No backend form is required.

---

## 5.13 Footer

### Content

- Malaga AI wordmark.
- Short description.
- Anchor links.
- Social links placeholders.
- Copyright.

Suggested copy:

> Malaga AI is a community for people building, learning, and experimenting with artificial intelligence in Malaga.

### Acceptance criteria

- Footer is simple and useful.
- Links match existing sections.
- All text is in English.

---

# Phase 6 — Visual design system

## Style direction

The website should feel:

- Modern.
- Technical.
- Premium.
- Friendly.
- Community-oriented.
- Clean rather than overloaded.

## Suggested visual language

- Dark base background or very light futuristic background.
- Gradient accents.
- Soft glass-like cards.
- Rounded corners.
- Thin borders.
- Subtle noise or grid background.
- Minimal animations.

## Suggested Tailwind tokens

Use consistent design primitives:

```ts
const sectionPadding = 'py-20 md:py-28'
const container = 'mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8'
const card = 'rounded-2xl border bg-background/70 p-6 shadow-sm backdrop-blur'
```

## Acceptance criteria

- The website has a coherent visual identity.
- Spacing is consistent.
- Cards and sections feel part of the same system.
- The design does not look like a default template.

---

# Phase 7 — Components

## Required reusable components

Create reusable components for:

- `EventCard`
- `SpeakerCard`
- `ProjectCard`
- `ResourceCard`
- `SponsorCard`
- `FriendCommunityCard`
- `StatCard`
- `MobileMenu`

## Component rules

- Components must receive typed props.
- Components must not import large unrelated datasets directly unless they are section-level components.
- Cards should gracefully handle optional fields.
- Use accessible buttons and links.
- Use `aria-label` where needed.

## Acceptance criteria

- Components are reusable.
- Props are typed.
- Optional values do not break the UI.
- Code is clean and easy to modify.

---

# Phase 8 — Motion and interaction

## Recommended animations

Use subtle animations only:

- Hero fade-in.
- Cards appearing on scroll.
- Hover lift on cards.
- Mobile menu transition.
- CTA hover states.

## Rules

- Avoid excessive animation.
- Respect readability.
- Avoid animations that hurt performance.
- Keep motion duration short and smooth.

## Acceptance criteria

- Animations improve the experience.
- The page still feels fast.
- Motion does not distract from the content.

---

# Phase 9 — Responsive behavior

## Breakpoints

Ensure the page works well on:

- Mobile: 360px and up.
- Tablet: 768px and up.
- Desktop: 1024px and up.
- Large screens: 1440px and up.

## Requirements

- Header collapses into a mobile menu.
- Cards stack on mobile.
- Hero remains readable on small screens.
- CTAs are easy to tap.
- No horizontal scrolling.

## Acceptance criteria

- Lighthouse mobile layout does not show major issues.
- Text is readable on small screens.
- Navigation is usable on mobile.

---

# Phase 10 — Accessibility

## Requirements

- Use semantic HTML.
- Use one `h1` only.
- Use logical heading order.
- Buttons and links must be keyboard accessible.
- Images must have alt text.
- Decorative elements should use empty alt text or `aria-hidden`.
- Ensure sufficient contrast.
- Do not rely only on color to communicate information.

## Acceptance criteria

- Keyboard navigation works.
- Main sections have meaningful headings.
- Links and buttons have accessible names.
- No obvious contrast issues.

---

# Phase 11 — Performance

## Requirements

- Avoid heavy dependencies.
- Use local static data.
- Optimize images if added.
- Avoid large background videos.
- Avoid unnecessary re-renders.
- Keep animations lightweight.

## Acceptance criteria

- Initial page load is fast.
- No console errors.
- No large unused assets.
- Font is loaded with `font-display: swap`.

---

# Phase 12 — Final QA checklist

Before considering the implementation complete, verify:

## Content

- [ ] The entire website is in English.
- [ ] The community is named Malaga AI everywhere.
- [ ] There is no FAQ section.
- [ ] There is no Tracks, Topics, Themes, or AI Areas section.
- [ ] Copy is clear and community-focused.

## Layout

- [ ] The website is a single page.
- [ ] No React Router or multi-page navigation is used.
- [ ] Header anchor links work.
- [ ] Sections appear in a logical order.
- [ ] The Friendly Communities section shows a list and logos.
- [ ] Mobile layout works.

## Typography

- [ ] `safiro-medium.otf` is included in the project.
- [ ] `@font-face` is configured correctly.
- [ ] Safiro is used for brand/display text.
- [ ] Body text remains readable.

## Code

- [ ] TypeScript has no blocking errors.
- [ ] Components are reusable.
- [ ] Data is separated from UI components.
- [ ] Optional fields are handled safely.
- [ ] No dead FAQ or Topics files remain.

## Design

- [ ] The design feels modern and polished.
- [ ] Spacing is consistent.
- [ ] Cards, badges, and buttons share a coherent style.
- [ ] Animations are subtle and useful.

## Accessibility

- [ ] There is only one `h1`.
- [ ] Heading structure is logical.
- [ ] Links and buttons are keyboard accessible.
- [ ] Images have alt text.
- [ ] Contrast is acceptable.

---

# Phase 13 — Suggested implementation order for the AI agent

The agent should implement the site in this order:

1. Project setup.
2. Tailwind and shadcn/ui setup.
3. Font setup with `safiro-medium.otf`.
4. Global styles and design tokens.
5. Data types.
6. Mock data files.
7. Layout components: `Header`, `Footer`, `MobileMenu`.
8. Reusable card components.
9. Hero section.
10. TrustBar section.
11. FeaturedEvent section.
12. Events section.
13. CommunityValue section.
14. Speakers section.
15. Projects section.
16. Resources section.
17. Sponsors section.
18. FriendlyCommunities section.
19. JoinCommunity section.
20. Responsive adjustments.
21. Accessibility checks.
22. Final cleanup.

---

# Phase 14 — Final agent instruction

Use the following instruction as the implementation prompt:

```txt
Build a modern one-page React + TypeScript + Vite website for a community called Malaga AI.

The site must be entirely in English and must use the custom font safiro-medium.otf as the main display/brand font.

Do not create multiple pages or routes. Use a single landing page with anchor navigation.

Do not include FAQ, Tracks, Topics, Themes, or AI Areas sections.

Implement these sections only: Header, Hero, TrustBar, FeaturedEvent, Events, CommunityValue, Speakers, Projects, Resources, Sponsors, FriendlyCommunities, JoinCommunity, and Footer.

Use Tailwind CSS, shadcn/ui, Lucide React, and subtle Motion animations.

Keep all data in src/data, all shared types in src/types/community.ts, and all reusable cards in src/components/community.

Make the design modern, responsive, accessible, and polished.

Use realistic mock data related to Malaga AI, AI events, speakers, projects, resources, partners, and friendly communities.

Before finishing, verify that the site is single-page, English-only, uses Malaga AI everywhere, includes the Safiro font, contains a Friendly Communities section with a list and logos, and contains no FAQ or Tracks/Topics sections.
```

---

# Definition of done

The task is complete when:

- The React app runs locally.
- The landing page is fully implemented.
- The website is responsive.
- All content is in English.
- The name Malaga AI is used consistently.
- The custom Safiro font is configured and visible.
- A Friendly Communities section exists with a list and logos.
- No FAQ section exists.
- No Tracks/Topics section exists.
- The implementation is clean enough for future iteration.
