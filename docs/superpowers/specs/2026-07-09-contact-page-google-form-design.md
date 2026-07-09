# Contact Page: Embed Google Feedback Form

## Problem

The Contact page (`src/pages/contact.astro`) has a custom Name/Email/Subject/Message form that doesn't actually send anywhere — it has no backend, so on submit it composes a `mailto:` link and opens the visitor's email client. This is unreliable (many visitors have no configured email client) and duplicates effort the site doesn't need.

The user has a Google Form ("Stockade Feedback Form") already set up to collect feedback:

- Short link: `https://forms.gle/5Msk8yzKpFtNJKDk8`
- Resolved embed source: `https://docs.google.com/forms/d/e/1FAIpQLSfA5TEf_AHaCuygyjHEOOZm3LFKrziqaoKJCn1s8CAvbsVXWQ/viewform?embedded=true`
- Fields: a 1–10 rating ("How did you like our site?") and an open text box ("Please leave your feedback here :)")

Goal: replace the non-functional custom form with the Google Form, embedded directly in the page, so submissions actually land somewhere (the user's Google Form responses).

## Decisions

1. **Integration style: embed inline (iframe).** The form is embedded directly in the page rather than linking out to a new tab, so visitors don't leave the site to give feedback.
2. **Remove the custom form entirely.** Delete the Name/Email/Subject/Message form, its validation/submit `<script>`, and the "Or reach us directly" mailto link. The embedded Google Form becomes the sole contact/feedback mechanism on the page — no parallel form, no mailto fallback.
3. **Simplify the copy to a feedback framing.** The current heading/intro ("Have a question, found a bug, or want to suggest a feature?") assumes a general-purpose contact form. Since the Google Form is just a rating + open text box, the intro is reworded to something like "Tell us what you think" — rate the site and leave any comments, bugs, or ideas in the open box. The page `description` meta is updated to match.
4. **Keep everything else as-is:** Navbar, Footer, the FAQ nudge card at the bottom, page layout/canonical URL.

## Implementation

### Copy (top of `<main>`)

- Eyebrow: keep "Contact" (unchanged — still the right nav-facing label)
- Heading: something like "Tell us what you think"
- Intro paragraph: rework to describe rating + open feedback, no longer implying a full name/email contact form
- `<Layout description="...">` prop: update to match (currently: "Get in touch with the Stockade team. Have a question, found a bug, or want to suggest a feature? We're happy to hear from you.")

### Form section replacement

Remove:
- The entire `<form id="contact-form">...</form>` block (lines ~26–103 in current file)
- The "Or reach us directly" divider + mailto link block (lines ~105–118)
- The trailing `<script>` block that validates fields and builds the `mailto:` link (lines ~134–178)

Add, in their place, an iframe embed wrapped in a card so it doesn't look like a jarring white rectangle dropped onto the dark page:

```html
<div class="bg-[var(--c-bg-soft)] border border-[var(--c-border)] rounded-xl p-2 sm:p-3 mb-12">
  <iframe
    src="https://docs.google.com/forms/d/e/1FAIpQLSfA5TEf_AHaCuygyjHEOOZm3LFKrziqaoKJCn1s8CAvbsVXWQ/viewform?embedded=true"
    width="100%"
    height="700"
    style="border: 0; border-radius: 0.5rem;"
    loading="lazy"
  >Loading…</iframe>
</div>
```

- Card wrapper (`bg-[var(--c-bg-soft)]`, `border-[var(--c-border)]`, `rounded-xl`) matches the existing design language (same treatment as the FAQ nudge box) so the light-colored Google Form reads as intentionally framed.
- Height fixed at `700` — this is Google's typical default embed height for a short 2-question form and comfortably fits title + rating scale + text field + submit button without internal scrolling on most viewports. Not dynamically resized (no backend/JS complexity needed for a static form this short).
- No custom validation/JS needed — Google Forms handles its own submission, validation, and confirmation screen internally.

### FAQ nudge

Unchanged — still valid to keep pointing visitors to the FAQ section for quick answers before/after they leave feedback.

## Out of scope

- No backend or serverless function changes (site remains fully static/client-side, consistent with project architecture).
- No dynamic iframe height/resizing.
- No changes to how the Google Form itself is configured (fields, notifications, etc.) — that's managed on Google's side.
