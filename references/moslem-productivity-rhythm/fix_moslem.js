const fs = require('fs');

let content = fs.readFileSync('/Users/alpharon/wahyuteguh.com/resources/moslem-productivity-rhythm.html', 'utf8');

// 1. Name change
content = content.replace(/Ritme Produktivitas Islami/g, 'Moslem Productivity Rhythm');

// 2. Head & Style
const newHead = `<!DOCTYPE html>
<html lang="en" class="light">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Moslem Productivity Rhythm — Wahyu Teguh A.</title>

    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Lora:ital,wght@0,400..700;1,400..700&display=swap" rel="stylesheet">

    <!-- Tailwind CSS (via CDN) -->
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            darkMode: 'class',
            theme: {
                extend: {
                    colors: {
                        cream: '#FAF7F2',
                        'cream-dark': '#F0EBE1',
                        earth: '#8B6F47',
                        'earth-light': '#C4A882',
                        'earth-dark': '#5C4530',
                        charcoal: '#2C2825',
                        'charcoal-mid': '#4A4540',
                        stone: '#9A9390',
                        accent: '#C4622D',
                    },
                    fontFamily: {
                        serif: ['Lora', 'Georgia', 'serif'],
                        sans: ['DM Sans', 'system-ui', 'sans-serif'],
                    }
                }
            }
        }
    </script>

    <!-- FontAwesome & Phosphor Icons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <script src="https://unpkg.com/@phosphor-icons/web"></script>

    <!-- React & ReactDOM (via CDN) -->
    <script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
    <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>

    <!-- Babel -->
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>

    <style>
        :root {
            --cream: #FAF7F2;
            --cream-dark: #F0EBE1;
            --earth: #8B6F47;
            --charcoal: #2C2825;
            --stone: #9A9390;
        }

        body {
            font-family: 'DM Sans', sans-serif;
            margin: 0;
            padding: 0;
            overflow-x: hidden;
            transition: background-color 0.3s ease, color 0.3s ease;
            -webkit-font-smoothing: antialiased;
        }

        .serif { font-family: 'Lora', serif; }

        .nav-blur {
            background: rgba(250, 247, 242, 0.88);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            border-bottom: 1px solid rgba(139, 111, 71, 0.12);
        }
        
        .dark .nav-blur {
            background: rgba(44, 40, 37, 0.88);
            border-bottom: 1px solid rgba(154, 147, 144, 0.2);
        }

        footer {
            padding: 4rem 2rem;
            text-align: center;
            margin-top: 4rem;
        }

        i.fa-solid,
        i.fa-regular {
            font-size: 1.1em;
        }
    </style>
</head>`;
content = content.replace(/<!DOCTYPE html>[\s\S]*?<\/head>/, newHead);

// 3. Body Start & Nav
const newBody = `<body class="bg-cream dark:bg-charcoal text-charcoal dark:text-cream min-h-screen flex flex-col font-sans transition-colors duration-300">

    <!-- Navigation -->
    <nav class="nav-blur sticky top-0 z-50 px-6 py-4 flex items-center justify-between transition-colors duration-300 print:hidden">
        <a href="../index.html" class="text-charcoal dark:text-cream serif font-bold text-lg tracking-tight hover:text-earth dark:hover:text-earth transition">Wahyu Teguh A.</a>
        <div class="flex items-center gap-6">
            <a href="../index.html#resources" class="text-[10px] font-bold uppercase tracking-widest text-stone hover:text-charcoal dark:hover:text-cream transition">Resources</a>
            <button id="theme-toggle" class="text-stone hover:text-charcoal dark:hover:text-cream transition" aria-label="Toggle Dark Mode">
                <!-- Sun Icon -->
                <i class="ph ph-sun text-xl hidden dark:block"></i>
                <!-- Moon Icon -->
                <i class="ph ph-moon text-xl block dark:hidden"></i>
            </button>
        </div>
    </nav>

    <main id="root" class="flex-1"></main>

    <!-- Footer -->
    <footer class="bg-cream dark:bg-charcoal border-t border-cream-dark dark:border-stone/20 transition-colors duration-300 print:hidden">
        <p class="footer-name serif font-bold text-2xl text-charcoal dark:text-cream mb-6">Wahyu Teguh Arifianto</p>
        <ul class="footer-links flex justify-center gap-8 mb-8 flex-wrap">
            <li><a href="../index.html#about" class="text-[10px] font-bold uppercase tracking-widest text-charcoal dark:text-cream hover:text-earth dark:hover:text-earth transition">About</a></li>
            <li><a href="../index.html#expertise" class="text-[10px] font-bold uppercase tracking-widest text-charcoal dark:text-cream hover:text-earth dark:hover:text-earth transition">Expertise</a></li>
            <li><a href="../index.html#writing" class="text-[10px] font-bold uppercase tracking-widest text-charcoal dark:text-cream hover:text-earth dark:hover:text-earth transition">Writing</a></li>
            <li><a href="../index.html#resources" class="text-[10px] font-bold uppercase tracking-widest text-charcoal dark:text-cream hover:text-earth dark:hover:text-earth transition">Resources</a></li>
            <li><a href="../index.html#youtube" class="text-[10px] font-bold uppercase tracking-widest text-charcoal dark:text-cream hover:text-earth dark:hover:text-earth transition">YouTube</a></li>
            <li><a href="../index.html#contact" class="text-[10px] font-bold uppercase tracking-widest text-charcoal dark:text-cream hover:text-earth dark:hover:text-earth transition">Contact</a></li>
        </ul>
        <p class="footer-copy text-[10px] text-stone uppercase tracking-widest">© 2025 Wahyu Teguh Arifianto · wahyuteguh.com</p>
    </footer>

    <!-- Dark Mode Logic -->
    <script>
        const themeToggleBtn = document.getElementById('theme-toggle');
        const htmlDoc = document.documentElement;
        
        if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            htmlDoc.classList.add('dark');
        } else {
            htmlDoc.classList.remove('dark');
        }

        themeToggleBtn.addEventListener('click', () => {
            if (htmlDoc.classList.contains('dark')) {
                htmlDoc.classList.remove('dark');
                localStorage.setItem('theme', 'light');
            } else {
                htmlDoc.classList.add('dark');
                localStorage.setItem('theme', 'dark');
            }
            window.dispatchEvent(new Event('theme-changed'));
        });
    <\/script>

    <script type="text/babel">`;
content = content.replace(/<body[^>]*>[\s\S]*?<script type="text\/babel">/, newBody);

// 4. React Theme Logic Adjustments
// Replace the internal `theme` state and toggle with the event listener.
content = content.replace(/const \[theme, setTheme\] = useState\('light'\);/, `const [theme, setTheme] = useState(document.documentElement.classList.contains('dark') ? 'dark' : 'light');
            useEffect(() => {
                const handleThemeChange = () => setTheme(document.documentElement.classList.contains('dark') ? 'dark' : 'light');
                window.addEventListener('theme-changed', handleThemeChange);
                return () => window.removeEventListener('theme-changed', handleThemeChange);
            }, []);`);
content = content.replace(/useEffect\(\(\) => \{\s*if \(theme === 'dark'\) \{\s*document\.documentElement\.classList\.add\('dark'\);\s*\} else \{\s*document\.documentElement\.classList\.remove\('dark'\);\s*\}\s*\}, \[theme\]\);/, '');

// Remove the theme toggle button from React
content = content.replace(/<button\s*onClick=\{\(\) => setTheme\(theme === 'light' \? 'dark' : 'light'\)\}[\s\S]*?<\/button>/, '');
content = content.replace(/<div className="w-px h-4 bg-slate-300 dark:bg-slate-600"><\/div>/, '');

// 5. Replace Tailwind Slate Classes
content = content.replace(/bg-slate-50/g, 'bg-cream dark:bg-charcoal');
content = content.replace(/text-slate-900/g, 'text-charcoal dark:text-cream');
content = content.replace(/text-slate-800/g, 'text-charcoal dark:text-cream');
content = content.replace(/text-slate-700/g, 'text-charcoal-mid dark:text-stone');
content = content.replace(/text-slate-600/g, 'text-stone');
content = content.replace(/text-slate-500/g, 'text-stone');
content = content.replace(/text-slate-400/g, 'text-stone');
content = content.replace(/bg-slate-100/g, 'bg-cream-dark dark:bg-stone/20');
content = content.replace(/bg-slate-200/g, 'bg-cream-dark dark:bg-stone/30');
content = content.replace(/bg-slate-300/g, 'bg-cream-dark dark:bg-stone/40');
content = content.replace(/bg-slate-700/g, 'bg-stone/40 dark:bg-charcoal-mid');
content = content.replace(/bg-slate-800/g, 'bg-charcoal-mid dark:bg-charcoal');
content = content.replace(/bg-slate-900/g, 'bg-charcoal dark:bg-charcoal-mid');
content = content.replace(/border-slate-100/g, 'border-cream-dark dark:border-stone/20');
content = content.replace(/border-slate-200/g, 'border-cream-dark dark:border-stone/20');
content = content.replace(/border-slate-300/g, 'border-cream-dark dark:border-stone/30');
content = content.replace(/border-slate-700/g, 'border-stone/30 dark:border-stone/20');
content = content.replace(/border-slate-800/g, 'border-stone/20 dark:border-charcoal-mid');
content = content.replace(/bg-white/g, 'bg-white dark:bg-charcoal-mid');

fs.writeFileSync('/Users/alpharon/wahyuteguh.com/resources/moslem-productivity-rhythm.html', content);
