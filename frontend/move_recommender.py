import sys

with open('src/ProblemStatements.tsx', 'r', encoding='utf-8') as f:
    lines = f.readlines()

recommender_start = -1
recommender_end = -1

for i, line in enumerate(lines):
    if "{/* Recommender Section */}" in line:
        recommender_start = i
    if "{/* Sticky Filters & Search */}" in line:
        recommender_end = i - 1

if recommender_start == -1 or recommender_end == -1:
    print("Could not find recommender section bounds")
    sys.exit(1)

recommender_lines = lines[recommender_start:recommender_end]

# Modify the title
for i, line in enumerate(recommender_lines):
    if '<h3 className="recommender-title">' in line:
        recommender_lines[i] = '        <h3 className="recommender-title">Didn\\'t find a match? Find Your Perfect Problem Statement</h3>\n'

# Find insertion point
insertion_point = -1
for i, line in enumerate(lines):
    if "{/* Modal — SIH-style structured detail view */}" in line:
        insertion_point = i
        break

if insertion_point == -1:
    print("Could not find insertion point")
    sys.exit(1)

new_lines = lines[:recommender_start] + lines[recommender_end:insertion_point] + recommender_lines + lines[insertion_point:]

with open('src/ProblemStatements.tsx', 'w', encoding='utf-8') as f:
    f.writelines(new_lines)

print("Modification complete")
