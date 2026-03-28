import re

css_path = r"c:\Users\gouta\Downloads\symbiot\frontend\src\style.css"
with open(css_path, "r", encoding="utf-8") as f:
    css = f.read()

# 1. Update Root Theme Variables
css = re.sub(
    r":root\s*\{.*?\n\}",
    """:root {
  --bg-primary: #080d26; /* Deep poster indigo */
  --bg-secondary: #0d163d;
  --bg-surface: rgba(13, 22, 61, 0.7);
  --bg-surface-hover: rgba(20, 34, 92, 0.85);
  
  --accent-cyan: #00e5ff;
  --accent-blue: #00b4d8;
  --accent-purple: #2a9d8f;
  --accent-yellow: #fbc02d; /* Yellow banner */
  
  --text-primary: #ffffff;
  --text-secondary: #cbd5e1;
  --text-muted: #94a3b8;
  
  --glow-cyan: rgba(0, 229, 255, 0.4);
  --glow-blue: rgba(0, 180, 216, 0.4);
  --glow-yellow: rgba(251, 192, 45, 0.4);
  
  --blur-md: blur(12px);
  --blur-lg: blur(24px);
  
  --transition-smooth: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  --transition-spring: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}""",
    css,
    flags=re.DOTALL
)

# 2. Update Body Background Pattern
css = re.sub(
    r"body\s*\{[^}]*?-webkit-font-smoothing:\s*antialiased;\n\}",
    """body {
  font-family: 'Inter', sans-serif;
  background-color: var(--bg-primary);
  background-image: 
    radial-gradient(rgba(0, 229, 255, 0.1) 1px, transparent 1px),
    linear-gradient(180deg, #080d26 0%, #0d163d 100%);
  background-size: 20px 20px, 100% 100%;
  background-attachment: fixed;
  color: var(--text-primary);
  line-height: 1.6;
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
}""",
    css,
    flags=re.DOTALL
)

# 3. Quick hard-coded string replaces for light mode artifacts
css = css.replace("background: rgba(255, 255, 255, 0.85);", "background: rgba(8, 13, 38, 0.85);")
css = css.replace("background: #ffffff;", "background: var(--bg-surface);")
css = css.replace("background: #fff;", "background: var(--bg-surface);")
css = css.replace("color: #0a1128;", "color: #ffffff;")
css = css.replace("background: linear-gradient(135deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.4) 100%);", "background: linear-gradient(135deg, rgba(13,22,61,0.8) 0%, rgba(13,22,61,0.4) 100%);")
css = css.replace("background: linear-gradient(90deg, transparent, rgba(240, 248, 255, 0.6), transparent);", "background: linear-gradient(90deg, transparent, rgba(0, 229, 255, 0.1), transparent);")


# 4. Append new Poster CSS
poster_css = """

/* Poster Restyling */
.hero-poster {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: 100vh;
  padding: 120px 0 0 0;
  position: relative;
  overflow: hidden;
  width: 100%;
}

.poster-top-decor {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

.poster-logo-container {
  width: 280px;
  position: relative;
  z-index: 10;
  margin-bottom: 0.5rem;
  filter: drop-shadow(0 0 20px var(--glow-cyan));
  transition: transform 0.5s ease;
}

.poster-logo-container:hover {
  transform: scale(1.05);
}

.poster-logo-container img {
  width: 100%;
  height: auto;
}

.poster-title {
  font-family: 'Outfit', sans-serif;
  font-size: 5.5rem;
  font-weight: 900;
  letter-spacing: 2px;
  color: #fff;
  text-transform: uppercase;
  margin-bottom: -0.5rem;
  z-index: 10;
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.6);
}

.poster-date {
  font-family: 'Outfit', sans-serif;
  font-size: 2.5rem;
  font-weight: 800;
  color: var(--accent-yellow);
  text-transform: uppercase;
  letter-spacing: 2px;
  text-shadow: 0 5px 15px rgba(251, 192, 45, 0.4);
  margin-bottom: 2rem;
  z-index: 10;
}

.poster-characters {
  position: relative;
  z-index: 5;
  margin-top: auto;
  display: flex;
  justify-content: center;
  width: 100%;
  max-width: 800px;
  padding-bottom: 60px; /* Space for yellow strip */
}

.poster-characters img {
  width: 100%;
  max-width: 700px;
  height: auto;
  object-fit: contain;
  filter: drop-shadow(0 -10px 30px rgba(0,229,255,0.2));
  mask-image: linear-gradient(to bottom, black 80%, transparent 100%);
  -webkit-mask-image: linear-gradient(to bottom, black 80%, transparent 100%);
}

.character-glow {
  position: absolute;
  bottom: 10%;
  left: 50%;
  transform: translateX(-50%);
  width: 60%;
  height: 40%;
  background: radial-gradient(circle, var(--glow-blue) 0%, transparent 70%);
  z-index: -1;
  filter: blur(40px);
}

.yellow-strip-container {
  position: absolute;
  bottom: 0px;
  left: 0;
  width: 100%;
  background: var(--accent-yellow);
  padding: 12px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top: 4px solid #1a1a1a;
  border-bottom: 4px solid #1a1a1a;
  z-index: 20;
  overflow: hidden;
  box-shadow: 0 -10px 30px rgba(0,0,0,0.5);
}

.yellow-strip-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  white-space: nowrap;
  width: 100%;
}

.yellow-strip-text {
  font-family: 'Outfit', sans-serif;
  font-size: 2rem;
  font-weight: 900;
  font-style: italic;
  color: #1a1a1a;
  letter-spacing: 3px;
}

.strip-pattern-left, .strip-pattern-right {
  display: flex;
  gap: 8px;
  flex: 1;
}

.strip-pattern-left {
  justify-content: flex-end;
}
.strip-pattern-right {
  justify-content: flex-start;
}

/* Creating arrow shape with borders */
.strip-arrow-left {
  width: 0; 
  height: 0; 
  border-top: 8px solid transparent;
  border-bottom: 8px solid transparent;
  border-right: 12px solid #1a1a1a;
}

.strip-arrow-right {
  width: 0; 
  height: 0; 
  border-top: 8px solid transparent;
  border-bottom: 8px solid transparent;
  border-left: 12px solid #1a1a1a;
}

/* Adjust mobile styles */
@media (max-width: 768px) {
  .poster-title { font-size: 3.5rem; }
  .poster-date { font-size: 1.5rem; }
  .yellow-strip-text { font-size: 1.5rem; letter-spacing: 1px; }
  .strip-pattern-left, .strip-pattern-right { display: none; }
  .poster-characters img { max-width: 100%; padding: 0 20px;}
}
"""
css += poster_css

with open(css_path, "w", encoding="utf-8") as f:
    f.write(css)

print("CSS styling updated successfully")
