# Contact Page Google Form Embed Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the non-functional custom Contact form (which only composes a `mailto:` link) with an embedded Google Form, so visitor feedback actually reaches the site owner via Google Form responses.

**Architecture:** Single-file change to `src/pages/contact.astro`. No backend, no new dependencies — an `<iframe>` embeds the existing Google Form directly in the static page, wrapped in a card that matches the site's dark design system. The custom form markup and its validation/mailto `<script>` are deleted outright.

**Tech Stack:** Astro 7 (static output), Tailwind CSS v4 (utility classes, existing `--c-*` CSS variables).

## Global Constraints

- No backend/serverless changes — site remains fully static/client-side (per project architecture).
- Google Form embed URL (exact, from spec): `https://docs.google.com/forms/d/e/1FAIpQLSfA5TEf_AHaCuygyjHEOOZm3LFKrziqaoKJCn1s8CAvbsVXWQ/viewform?embedded=true`
- Iframe fixed height: `700` (no dynamic resizing).
- Remove the custom form, its `<script>`, and the mailto "Or reach us directly" section entirely — no fallback mailto link remains on the page.
- Keep Navbar, Footer, and the FAQ nudge card unchanged.
- Meta `description` must read naturally as a feedback-focused blurb, consistent in length/style with the other pages' `description` props in `src/pages/*.astro` (roughly 120–160 characters, per the site's recent Bing meta-description-length fix).

---

### Task 1: Replace custom contact form with embedded Google Form

**Files:**
- Modify: `src/pages/contact.astro` (entire file — full replacement shown below)

**Interfaces:**
- Consumes: `Layout` component props (`title`, `description`, `canonical`) from `src/layouts/Layout.astro` — unchanged usage pattern, only the `description` value changes.
- Produces: nothing consumed by other files — `contact.astro` is a leaf page route.

- [ ] **Step 1: Replace the full contents of `src/pages/contact.astro`**

Replace the entire file with:

```astro
---
import Layout from '../layouts/Layout.astro';
import Navbar from '../components/layout/Navbar.astro';
import Footer from '../components/layout/Footer.astro';
---

<Layout
  title="Contact | Stockade"
  description="Share feedback on Stockade, our free stock market simulator. Rate your experience and tell us about bugs, ideas, or anything else — takes seconds."
  canonical="https://stockademarketsim.com/contact"
>
  <Navbar />

  <main class="max-w-[680px] mx-auto px-6 py-16">

    <div class="mb-10">
      <div class="text-[11px] font-mono uppercase tracking-widest text-[#f59e0b] mb-3">Contact</div>
      <h1 class="text-4xl font-bold tracking-tight text-[var(--c-text)] mb-3">Tell us what you think</h1>
      <p class="text-[16px] text-[var(--c-text-muted)] leading-relaxed">
        Rate your experience and drop any comments, bug reports, or ideas in the box below —
        we read every submission.
      </p>
    </div>

    <!-- Google Form embed -->
    <div class="bg-[var(--c-bg-soft)] border border-[var(--c-border)] rounded-xl p-2 sm:p-3 mb-12">
      <iframe
        src="https://docs.google.com/forms/d/e/1FAIpQLSfA5TEf_AHaCuygyjHEOOZm3LFKrziqaoKJCn1s8CAvbsVXWQ/viewform?embedded=true"
        width="100%"
        height="700"
        style="border: 0; border-radius: 0.5rem;"
        loading="lazy"
      >Loading…</iframe>
    </div>

    <!-- FAQ nudge -->
    <div class="mt-8 bg-[var(--c-bg-soft)] border border-[var(--c-border)] rounded-xl p-5">
      <p class="text-[13px] text-[var(--c-text-subtle)] leading-relaxed">
        Looking for quick answers? Check the
        <a href="/#faq" class="text-[#f59e0b] hover:text-[#fbbf24] underline underline-offset-2">FAQ section</a>
        on the home page — it covers the most common questions about how the simulator works.
      </p>
    </div>

  </main>

  <Footer />
</Layout>
```

This removes: the `<form id="contact-form">` block (Name/Email/Subject/Message fields), the "Or reach us directly" mailto section, and the trailing `<script>` that built the `mailto:` link. It adds the iframe embed card in their place. The heading, intro copy, and `description` meta are reworded for the feedback framing. Navbar, Footer, and the FAQ nudge card are preserved verbatim.

- [ ] **Step 2: Build the site**

Run: `npm run build`
Expected: Astro build completes with no errors, and `dist/contact/index.html` is regenerated (build output lists `contact/index.html` among the generated static routes).

- [ ] **Step 3: Start preview server and verify the page**

Run:
```powershell
Start-Job -ScriptBlock { Set-Location "C:\Users\kanis\Desktop\AI Side Hustles\Stockade"; npm run preview }
```

Then verify the built HTML contains the iframe and no leftover form/script:
```powershell
$html = (Invoke-WebRequest http://localhost:4321/contact -UseBasicParsing).Content
$html -match 'docs\.google\.com/forms/d/e/1FAIpQLSfA5TEf_AHaCuygyjHEOOZm3LFKrziqaoKJCn1s8CAvbsVXWQ/viewform\?embedded=true'   # expect True
$html -match 'id="contact-form"'   # expect False
$html -match 'mailto:hello@stockademarketsim\.com'   # expect False
$html -match 'Tell us what you think'   # expect True
```
Expected: first and last checks are `True`; the two middle checks are `False`, confirming the old form/mailto markup is gone and the iframe embed with the new heading is present.

Stop the preview job afterward: `Get-Job | Stop-Job`

- [ ] **Step 4: Commit**

```bash
git add src/pages/contact.astro
git commit -m "$(cat <<'EOF'
Replace non-functional Contact form with embedded Google feedback form

The custom Name/Email/Subject/Message form only composed a mailto: link
with no backend to actually receive submissions. Embed the existing
Google Form instead so feedback lands in one place.
EOF
)"
```

---

## Self-Review Notes

- **Spec coverage:** All four spec decisions are covered — embed style (iframe, Step 1), full removal of custom form/mailto (Step 1), simplified feedback copy (Step 1 heading/intro/description), unchanged Navbar/Footer/FAQ nudge (Step 1, preserved verbatim in the replacement file).
- **Placeholder scan:** No TBD/TODO — full file content given verbatim, exact embed URL and height per spec.
- **Type/consistency check:** N/A (no functions/interfaces span tasks — single-file, single-task change with no cross-task signatures to reconcile).
