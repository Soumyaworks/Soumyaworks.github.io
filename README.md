# Soumya Banerjee Portfolio

Personal portfolio website with a modern animated UI, project highlights, image gallery, and a file-based blog that works on GitHub Pages.

## Live Website
- https://soumyaworks.github.io/

## Features
- One-page portfolio homepage
- Animated moving background (canvas particles + glow effects)
- Social links (LinkedIn, GitHub, Instagram)
- Resume button opening PDF directly
- Version-controlled blog (no local storage dependency)
- Responsive layout for desktop and mobile

## Tech Stack
- HTML5
- CSS3
- Vanilla JavaScript
- GitHub Pages for deployment

## Project Structure
```text
.
├── index.html
├── blog.html
├── data/
│   ├── Soumya_Banerjee_Resume.pdf
│   └── blog-posts.json
├── posts/
│   └── *.html
├── assets/
│   ├── css/portfolio.css
│   └── js/
│       ├── portfolio.js
│       └── blog.js
└── images/
```

## Update Personal Info
Edit these files:
- `index.html`
  - Hero intro, email, phone, social links
  - Academics, highlights, hobbies, gallery captions
- `data/Soumya_Banerjee_Resume.pdf`
  - Replace this file to update resume (keep same file name)
- `images/`
  - Replace/add personal photos used in homepage

## Blog Workflow (Version-Controlled)
1. Create a new post file in `posts/` (copy any existing post file as template).
2. Add a new entry in `data/blog-posts.json`:
   - `title`
   - `excerpt`
   - `url` (path to the post file)
   - `date` (`YYYY-MM-DD`)
   - `readTime`
   - `tags` (array)
3. Commit and push. GitHub Pages will publish automatically.

## Run Locally
From project root:

```bash
python3 -m http.server 8000
```

Open:
- http://localhost:8000

## Deploy
Push changes to `main` branch of this repository (`Soumyaworks.github.io`).
GitHub Pages serves it at:
- https://soumyaworks.github.io/

## Credits
- Base starter originally from HTML5 UP (Landed template)
- Icons: Font Awesome
