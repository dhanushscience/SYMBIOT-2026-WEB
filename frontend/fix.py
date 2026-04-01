import re

with open('src/ProblemStatements.tsx', 'r', encoding='utf-8') as f:
    text = f.read()

text = text.replace('<button className={\\x08tn  recommender-btn} onClick={handleRecommend} disabled={isSearching}>', 
'<button className={`btn ${isSearching ? \\\'btn-secondary\\\' : \\\'btn-primary\\\'} recommender-btn`} onClick={handleRecommend} disabled={isSearching}>')

# The file contains \x08tn which is literal backspace
import collections
lines = []
with open('src/ProblemStatements.tsx', 'r', encoding='utf-8') as f:
    lines = f.readlines()

for i, line in enumerate(lines):
    if "recommender-btn} onClick" in line:
        lines[i] = "          <button className={`btn ${isSearching ? 'btn-secondary' : 'btn-primary'} recommender-btn`} onClick={handleRecommend} disabled={isSearching}>\n"
        print("Fixed recommender-btn")
    elif ' className={ps-badge ' in line:
        lines[i] = "                      <span className={`ps-badge ${domainBadgeClass[ps.domain]}`}>\n"
        print("Fixed ps-badge")

with open('src/ProblemStatements.tsx', 'w', encoding='utf-8') as f:
    f.writelines(lines)
