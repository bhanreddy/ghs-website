# Geetanjali High School, Maddur — Official Website

> **Build Your Own Identity** — A VVM Partners School

Premium landing website for Geetanjali High School, Maddur. Built with Next.js 16, TypeScript, Tailwind CSS v4, Framer Motion, and Lenis smooth scroll.

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

The site runs at `http://localhost:3000`.

## SchoolIMS gallery integration

Copy `.env.example` to `.env.local` and configure:

```bash
SCHOOL_ID=17
SCHOOLIMS_API_URL=https://your-schoolims-api.example.com/api/v1
```

The landing page reads this school's gallery from SchoolIMS. If the API is
temporarily unavailable, the bundled `src/content/gallery.json` photos are used
as a safe fallback. For another school website, change `SCHOOL_ID`; the gallery
implementation stays the same.

## 🏗 Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Animation:** Framer Motion
- **Smooth Scroll:** Lenis
- **Icons:** Lucide React
- **Fonts:** Inter (body) + Outfit (display) via Google Fonts

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx          # Root layout (fonts, providers, SEO)
│   ├── page.tsx            # Home page (all sections)
│   └── globals.css         # Design system CSS
├── components/
│   ├── providers/          # SmoothScrollProvider, ThemeProvider
│   ├── sections/           # Page sections (Hero, Header, etc.)
│   └── ui/                 # Reusable UI components
├── content/                # JSON content files (swap without touching code)
│   ├── siteConfig.json     # School identity & contact
│   ├── leadership.json     # Principal, Correspondent, VP
│   ├── academics.json      # Grade bands & subjects
│   ├── facilities.json     # Campus facilities
│   ├── gallery.json        # Gallery images & categories
│   ├── stats.json          # Achievement counters
│   └── testimonials.json   # Parent/student/alumni quotes
└── lib/                    # Utilities
    ├── utils.ts            # cn() helper
    └── animations.ts       # Shared animation variants
```

## 📝 Placeholder Inventory

The following items need real content/assets before go-live. Each is tagged with `[PLACEHOLDER: ...]` in the codebase.

### Images & Media
| Section | Placeholder | File |
|---------|------------|------|
| Hero | Campus photo/video | `Hero.tsx` |
| Leadership | Portrait — Principal Vijay Kumar | `leadership.json` |
| Leadership | Portrait — Correspondent Venkataiah | `leadership.json` |
| Leadership | Portrait — Vice Principal Mahesh | `leadership.json` |
| About VVM | VVM logo | `AboutVVM.tsx` |
| Facilities | 8× facility images (labs, library, etc.) | `facilities.json` |
| Gallery | 12× gallery images | `gallery.json` |
| Testimonials | 4× testimonial photos | `testimonials.json` |
| Contact | Embedded Google Map | `Contact.tsx` |
| Header/Footer | School logo (SVG/PNG) | `Header.tsx`, `Footer.tsx` |

### Text Content
| Section | Placeholder | File |
|---------|------------|------|
| Leadership | Welcome message — Principal | `leadership.json` |
| Leadership | Message — Correspondent | `leadership.json` |
| Leadership | Message — Vice Principal | `leadership.json` |
| About VVM | VVM trust description (2–3 paragraphs) | `leadership.json` |
| Academics | Primary school program description | `academics.json` |
| Academics | Middle school program description | `academics.json` |
| Academics | Secondary program description | `academics.json` |
| Stats | Years of Excellence (actual number) | `stats.json` |
| Stats | Students Enrolled (actual number) | `stats.json` |
| Stats | Dedicated Faculty (actual number) | `stats.json` |
| Stats | Board Exam Pass Rate (actual %) | `stats.json` |
| Testimonials | 4× testimonial quotes + real names | `testimonials.json` |

### Social & External Links
| Item | File |
|------|------|
| Facebook URL | `siteConfig.json` |
| Instagram URL | `siteConfig.json` |
| YouTube URL | `siteConfig.json` |
| Twitter/X URL | `siteConfig.json` |

### To Replace
| Item | File |
|------|------|
| Favicon (from school logo) | `src/app/favicon.ico` |
| VVM full expanded name | `siteConfig.json` |

## 🎨 Brand Colors

| Token | Light | Dark |
|-------|-------|------|
| Primary (Purple) | `#6B2FA0` | `#B57EDC` |
| Secondary (Orange) | `#F5921B` | `#FFB74D` |
| Accent (Gold) | `#F9A825` | `#FFD54F` |
| Background | `#FAF5FF` | `#1A0A2E` |
| Text Strong | `#2D0A4E` | `#F5F0FF` |

## 📱 Features

- ✅ Dark/Light mode with localStorage persistence
- ✅ Smooth scroll (Lenis)
- ✅ Kinetic typography hero with word-by-word reveal
- ✅ Magnetic hover CTA buttons
- ✅ 3D tilt-on-hover leadership cards
- ✅ Interactive tab system for academics
- ✅ Bento grid campus layout
- ✅ Gallery with category filters & lightbox
- ✅ Animated stat counters (trigger once on scroll)
- ✅ Auto-advancing testimonial carousel
- ✅ Admissions timeline with animated progress
- ✅ Contact form with inline validation
- ✅ `prefers-reduced-motion` support
- ✅ SEO metadata & Open Graph tags
- ✅ Responsive: mobile → tablet → desktop → ultra-wide
- ✅ School Code (46117) displayed in footer & academics

## 📄 License

© Geetanjali High School, Maddur. All rights reserved.
