import re

with open(r'c:\Users\gouta\Downloads\symbiot\frontend\src\style.css', 'r', encoding='utf-8') as f:
    text = f.read()

# Fix buttons
text = re.sub(r'\.btn-primary\s*\{[^}]+\}', '.btn-primary {\n  background: #ffffff;\n  color: #1233ae;\n  border: none;\n  box-shadow: 0 0 20px rgba(255, 255, 255, 0.3);\n}', text)
text = re.sub(r'\.btn-primary:hover\s*\{[^}]+\}', '.btn-primary:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 0 30px rgba(255, 255, 255, 0.5);\n  background: #f1f5f9;\n  color: #1233ae;\n}', text)

text = re.sub(r'\.btn-secondary\s*\{[^}]+\}', '.btn-secondary {\n  background: transparent;\n  color: #ffffff;\n  border: 1px solid rgba(255, 255, 255, 0.5);\n}', text)
text = re.sub(r'\.btn-secondary:hover\s*\{[^}]+\}', '.btn-secondary:hover {\n  border-color: #ffffff;\n  color: #ffffff;\n  transform: translateY(-2px);\n  background: rgba(255, 255, 255, 0.1);\n}', text)

# Fix orbit positioning
text = re.sub(r'\.logo-container:hover \.orbit-1, \.orbit-elements:hover \.orbit-1\s*\{[^}]+\}', '.logo-container:hover .orbit-1, .orbit-elements:hover .orbit-1 { top: -5%; left: -35%; transform: translate(0, 0) scale(1); margin: 0; border-color: rgba(255, 255, 255, 0.3); cursor: pointer; pointer-events: auto; }', text)
text = re.sub(r'\.logo-container:hover \.orbit-2, \.orbit-elements:hover \.orbit-2\s*\{[^}]+\}', '.logo-container:hover .orbit-2, .orbit-elements:hover .orbit-2 { top: -5%; left: auto; right: -35%; transform: translate(0, 0) scale(1); margin: 0; border-color: rgba(255, 255, 255, 0.3); cursor: pointer; pointer-events: auto; }', text)
text = re.sub(r'\.logo-container:hover \.orbit-3, \.orbit-elements:hover \.orbit-3\s*\{[^}]+\}', '.logo-container:hover .orbit-3, .orbit-elements:hover .orbit-3 { top: auto; bottom: -20%; left: auto; right: -25%; transform: translate(0, 0) scale(1); margin: 0; border-color: rgba(255, 255, 255, 0.3); cursor: pointer; pointer-events: auto; }', text)
text = re.sub(r'\.logo-container:hover \.orbit-4, \.orbit-elements:hover \.orbit-4\s*\{[^}]+\}', '.logo-container:hover .orbit-4, .orbit-elements:hover .orbit-4 { top: auto; bottom: -20%; left: -25%; transform: translate(0, 0) scale(1); margin: 0; border-color: rgba(255, 255, 255, 0.3); cursor: pointer; pointer-events: auto; }', text)
text = re.sub(r'\.logo-container:hover \.orbit-5, \.orbit-elements:hover \.orbit-5\s*\{[^}]+\}', '.logo-container:hover .orbit-5, .orbit-elements:hover .orbit-5 { top: auto; bottom: -10%; left: 50%; transform: translateX(-50%) scale(1); margin: 0; border-color: #fbc02d; cursor: pointer; pointer-events: auto; }', text)

# Fix yellow strip z-index
text = text.replace('z-index: 20;', 'z-index: 100;')

with open(r'c:\Users\gouta\Downloads\symbiot\frontend\src\style.css', 'w', encoding='utf-8') as f:
    f.write(text)
print("CSS updated successfully.")
