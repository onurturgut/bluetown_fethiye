<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Site content (address, phone, rooms, FAQ, photos) lives in src/data/property.ts; sections read from it so the owner can verify facts in one place.
- Animations use GSAP + ScrollTrigger via src/lib/motion.ts and shared wrappers in src/components/bt/animations.tsx; Lenis drives smooth scroll. Why: one motion config, proper cleanup via useGSAP.
