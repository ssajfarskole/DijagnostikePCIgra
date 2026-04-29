#!/usr/bin/env python3
import re

with open('src/gameData.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Find all compressedAir matches with line numbers
matches = list(re.finditer(r"toolId: 'compressedAir'.*?targetStatus: '(\w+)'", content, re.DOTALL))
print(f"Found {len(matches)} compressedAir usages:")
for idx, m in enumerate(matches):
    line_no = content[:m.start()].count('\n') + 1
    status = m.group(1)
    print(f"{idx+1}. Line {line_no}: targetStatus = '{status}'")

# Replace 2nd compressedAir (Level 7 CPU hladnjak) from 'working' to 'removed'
# Pattern: CPU hladnjak očišćen od prašine!',\n        targetStatus: 'working'
pattern1 = r"(CPU hladnjak očišćen od prašine!',\s+)targetStatus: 'working'"
content = re.sub(pattern1, r"\1targetStatus: 'removed'", content)

# Replace 3rd compressedAir (Level 9 GPU) from 'working' to 'removed'  
# Pattern: Prašina je očišćena s grafičke kartice! Hladnjaci su sada čisti.',\n        targetStatus: 'working'
pattern2 = r"(Prašina je očišćena s grafičke kartice! Hladnjaci su sada čisti!',\s+)targetStatus: 'working'"
content = re.sub(pattern2, r"\1targetStatus: 'removed'", content)

# Write back
with open('src/gameData.ts', 'w', encoding='utf-8') as f:
    f.write(content)

# Verify
print("\nAfter changes:")
matches = list(re.finditer(r"toolId: 'compressedAir'.*?targetStatus: '(\w+)'", content, re.DOTALL))
for idx, m in enumerate(matches):
    line_no = content[:m.start()].count('\n') + 1
    status = m.group(1)
    print(f"{idx+1}. Line {line_no}: targetStatus = '{status}'")

print("\nDone!")
