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

- Keep home-page card video lifecycle in CardVideo and unmount it while the project viewer is open, so preview media frees its network and decoder resources without changing embedded sites.
- Keep Jack's DOM motion helpers in a browser-native module under public/project-support so touch input and offscreen animation control work inside its original standalone HTML without replacing its libraries.
