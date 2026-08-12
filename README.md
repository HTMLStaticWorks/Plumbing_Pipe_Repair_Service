# Apex Plumbing & Pipe Repair Service - Premium Website

A production-ready, accessible, high-converting multi-page website engineered for professional plumbing, pipe repair, and emergency local service companies.

---

## 1. Project Overview & Structure

The project is built with clean semantic HTML5, Vanilla CSS3 (custom properties design system), and lightweight ES6+ JavaScript. No bloated frameworks or dependencies required.

```text
Plumbing_Pipe_Repair_Service/
│
├── index.html              # Home 1: Classic Split-Screen (Exact 6 Major Sections)
├── home-2.html             # Home 2: Editorial & Before/After (Exact 6 Major Sections)
├── about.html              # About Us (Exact 4 Major Sections)
├── services.html           # Services Hub (Exact 4 Major Sections)
├── service-details.html    # Reusable Service Details Template (Exact 4 Major Sections)
├── booking.html            # Service Appointment Booking (Exact 4 Major Sections)
├── contact.html            # Contact & Interactive Map (Exact 4 Major Sections)
├── 404.html                # Custom Plumbing-Themed 404 Error Page
├── coming-soon.html        # Pre-Launch / Maintenance Page with Email Notification
├── README.md               # Technical Documentation
│
└── assets/
    ├── css/
    │   ├── style.css       # Core Design System, Components, Reset, Breakpoints
    │   ├── dark-mode.css   # Intentional High-Contrast Dark Theme
    │   └── rtl.css         # Right-to-Left (Arabic / Hebrew) Layout Overrides
    │
    ├── js/
    │   └── main.js         # Theme Switcher, RTL, Offcanvas Nav, Counters, Slider, Validation
    │
    └── images/             # Visual Assets & Optimized Media
```

---

## 2. Page & Section Breakdown

| Page | Filename | Major Sections | Highlights |
| :--- | :--- | :--- | :--- |
| **Home 1** | `index.html` | **6 Sections** | 1. Hero (Split-Screen) + Floating Badges<br>2. Services (4 Core Cards)<br>3. Why Choose Us (Benefits + Animated Count-up Stats)<br>4. How It Works (3-Step Timeline)<br>5. Service Area & Emergency Dispatch (Dark)<br>6. Booking CTA & Trust Indicators |
| **Home 2** | `home-2.html` | **6 Sections** | 1. Asymmetric Hero with Subtext + Emergency Squad Badge<br>2. Editorial Service Showcase Panels<br>3. Trust & Experience Pillars (Dark)<br>4. Interactive Before/After Drag Slider<br>5. 3 Verified Customer Testimonials<br>6. Dramatic Final Emergency CTA |
| **About** | `about.html` | **4 Sections** | 1. Hero + Team Visual<br>2. Our Story & Heritage<br>3. Why Customers Trust Us (4 Pillars)<br>4. Action CTA |
| **Services** | `services.html` | **4 Sections** | 1. Services Hero<br>2. Main Services Grid (Pipe Repair, Bathroom Fitting, Drain Cleaning, Water Heater)<br>3. 4-Step Engineering Protocol<br>4. Emergency CTA |
| **Service Details** | `service-details.html` | **4 Sections** | 1. Service Hero<br>2. What We Handle (6 Common Issues)<br>3. Systematic 4-Step Repair Process<br>4. Direct Booking CTA |
| **Booking** | `booking.html` | **4 Sections** | 1. Booking Hero<br>2. Validated Multi-Field Booking Form<br>3. Emergency Direct Hotline Banner<br>4. Service Guarantee & Trust Message |
| **Contact** | `contact.html` | **4 Sections** | 1. Contact Hero<br>2. 4 Info Channel Cards<br>3. Validated Contact Form + Styled Map UI<br>4. Rapid Scheduling CTA |
| **404** | `404.html` | Custom | Plumbing pipe themed 404 page with direct recovery links |
| **Coming Soon**| `coming-soon.html` | Custom | Pre-launch maintenance page with validated newsletter signup |

---

## 3. Brand Design System & Color Tokens

```css
:root {
  --primary: #0B1F33;         /* Deep Navy / Professional Blue */
  --primary-light: #162E47;   /* Elevated Navy Surface */
  --secondary: #F7F9FC;       /* Clean Soft Off-White */
  --accent: #F28C28;          /* Safety Orange / Warm Amber */
  --accent-hover: #D9771C;    /* Deeper Amber */
  --text-main: #1E293B;       /* Slate 800 */
  --text-muted: #64748B;      /* Slate 500 */
  --border-color: #E2E8F0;    /* Slate 200 */
  --font-heading: 'Plus Jakarta Sans', sans-serif;
  --font-body: 'Inter', sans-serif;
}
```

---

## 4. Key Features & Implementation

### Dark / Light Mode Switching
- Automatically reads the user's OS preference (`prefers-color-scheme: dark`).
- Preserves manual choices across sessions using `localStorage`.
- Intentional dark theme with tailored contrast for cards, badges, and form controls.

### RTL (Right-to-Left) Compatibility
- Integrated RTL stylesheet `assets/css/rtl.css`.
- Header toggle allows instant switching to test or deploy Arabic/Hebrew versions.
- Offcanvas drawer, icon arrows, flex layouts, and invalid form indicators automatically flip orientation.

### WCAG 2.1 AA Accessibility
- Top-level keyboard skip link (`.skip-link`).
- Minimum 44px touch targets on buttons and mobile menu items.
- Full support for `@media (prefers-reduced-motion: reduce)` to disable floating animations.
- Descriptive `aria-labels`, `aria-expanded`, and semantic landmark elements (`<header>`, `<main>`, `<section>`, `<article>`, `<footer>`).

### Form Validation & Integration Ready
- Client-side validation enforcing email regex, phone formatting, required inputs, and future dates.
- Clear inline feedback (`.is-invalid` and `.invalid-feedback`).
- Simulated async submission state with loading spinner and smooth scroll to success alerts.
- Formspree & Netlify Forms ready:
  - **Formspree**: Set `action="https://formspree.io/f/YOUR_FORM_ID"` and `method="POST"`.
  - **Netlify**: Add `data-netlify="true"` attribute to the `<form>` tag.

### SEO & Structured Data
- Strict unique `<title>` (under 60 characters) and `<meta name="description">` (150–160 characters) on every page.
- Single `<h1>` per page with semantic hierarchy.
- JSON-LD Structured Data Schema (`schema.org/PlumbingService`) with geolocation, pricing level, phone number, and 24/7 hours of operation.

---

## 5. Browser & Device Testing

The website is fully responsive and tested across all standard viewport sizes:
- **Mobile**: 320px, 360px, 375px, 390px, 414px, 480px
- **Tablet**: 768px, 820px
- **Desktop**: 1024px, 1280px, 1440px, 1920px

Compatible with Chrome, Firefox, Safari, and Microsoft Edge.
