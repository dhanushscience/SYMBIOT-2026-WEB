import re
import os

css_path = r'c:\Users\gouta\Downloads\symbiot\frontend\src\style.css'

with open(css_path, 'r', encoding='utf-8') as f:
    text = f.read()

# 1. Update Root Variables for Hardware Theme
new_root = """:root {
  --bg-primary: #0a0a0c; /* Deep Charcoal/Black */
  --bg-secondary: #121418;
  --bg-surface: rgba(18, 20, 24, 0.85);
  --bg-surface-hover: rgba(30, 35, 40, 0.95);
  
  --accent-cyan: #00f0ff; /* Bright tech cyan */
  --accent-blue: #39ff14; /* NEON GREEN for traces/hardware */
  --accent-purple: #00ff66;
  --accent-yellow: #f5b041; /* Slightly dimmed for contrast */
  
  --text-primary: #ffffff;
  --text-secondary: #e2e8f0;
  --text-muted: #94a3b8;
  
  --glow-cyan: rgba(0, 240, 255, 0.4);
  --glow-green: rgba(57, 255, 20, 0.4);
  --glow-yellow: rgba(245, 176, 65, 0.4);
  
  --blur-md: blur(12px);
  --blur-lg: blur(24px);
  
  --transition-smooth: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  --transition-spring: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}"""
text = re.sub(r':root\s*\{[^}]+--transition-spring:[^}]+\}', new_root, text, count=1)

# 2. Update Body Background Graphic (Circuit SVG)
circuit_svg = "%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 10h20v20H10zM40 10h20v20H40zM70 10h20v20H70zM10 40h20v20H10zM40 40h20v20H40zM70 40h20v20H70zM10 70h20v20H10zM40 70h20v20H40zM70 70h20v20H70z' fill='none' stroke='rgba(57,255,20,0.05)' stroke-width='1'/%3E%3Cpath d='M20 20l20 20M50 20l20 20M80 20l20 20M20 50l20 20M50 50l20 20' stroke='rgba(0,240,255,0.05)' stroke-width='1'/%3E%3Ccircle cx='20' cy='20' r='2' fill='rgba(57,255,20,0.1)'/%3E%3Ccircle cx='50' cy='50' r='2' fill='rgba(0,240,255,0.1)'/%3E%3C/svg%3E"

new_body = f"""body {{
  font-family: 'Inter', sans-serif;
  background-color: var(--bg-primary);
  background-image: url("data:image/svg+xml,{circuit_svg}");
  background-size: 150px 150px;
  background-attachment: fixed;
  color: var(--text-primary);
  line-height: 1.6;
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
}}"""
text = re.sub(r'body\s*\{[^}]+-webkit-font-smoothing:[^}]+\}', new_body, text, count=1)

# 3. Update Glass Panel Borders for Tech aesthetic
new_glass = """.glass-panel {
  background: var(--bg-surface);
  backdrop-filter: var(--blur-md);
  -webkit-backdrop-filter: var(--blur-md);
  border: 1px solid rgba(0, 240, 255, 0.2);
  border-radius: 4px; /* Sharper hardware edges */
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4), inset 0 0 15px rgba(57, 255, 20, 0.05);
}"""
text = re.sub(r'\.glass-panel\s*\{[^}]+box-shadow:[^}]+\}', new_glass, text, count=1)

# 4. Buttons (Neon style)
new_btn_primary = """.btn-primary {
  background: transparent;
  color: var(--accent-blue); /* Neon green */
  border: 1px solid var(--accent-blue);
  box-shadow: 0 0 10px rgba(57, 255, 20, 0.2), inset 0 0 10px rgba(57, 255, 20, 0.1);
  border-radius: 2px;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 0 20px rgba(57, 255, 20, 0.5), inset 0 0 15px rgba(57, 255, 20, 0.3);
  background: rgba(57, 255, 20, 0.1);
  color: #fff;
}"""
text = re.sub(r'\.btn-primary\s*\{[^}]+\}\s*\.btn-primary:hover\s*\{[^}]+\}', new_btn_primary, text, count=1)

new_btn_secondary = """.btn-secondary {
  background: transparent;
  color: var(--accent-cyan);
  border: 1px solid rgba(0, 240, 255, 0.4);
  border-radius: 2px;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.btn-secondary:hover {
  border-color: var(--accent-cyan);
  color: #fff;
  transform: translateY(-2px);
  background: rgba(0, 240, 255, 0.1);
  box-shadow: 0 0 15px rgba(0, 240, 255, 0.3);
}"""
text = re.sub(r'\.btn-secondary\s*\{[^}]+\}\s*\.btn-secondary:hover\s*\{[^}]+\}', new_btn_secondary, text, count=1)

# 5. Orbit Elements glow to match neon
text = re.sub(r'box-shadow: 0 0 30px rgba\(255, 255, 255, 0\.1\)', 'box-shadow: 0 0 30px rgba(57, 255, 20, 0.15)', text)
text = re.sub(r'border: 1px solid rgba\(255, 255, 255, 0\.15\)', 'border: 1px solid rgba(0, 240, 255, 0.3)', text)

# 6. Delete old pixel pattern at the bottom of the file
text = re.sub(r'/\* Pixel Background Pattern for Blue Theme \*/[\s\S]*$', '', text)

with open(css_path, 'w', encoding='utf-8') as f:
    f.write(text)

print("Hardware CSS modifications applied.")
