import type { IModule, IMessage } from "@/utils/interfaces/learn"

export const PYTHON_MODULES: IModule[] = [
  {
    section: "Module 1: Getting Started",
    sectionKh: "ម៉ូឌុល ១: ការចាប់ផ្តើម",
    lessons: [
      {
        id: 1,
        title: "What is Python?",
        titleKh: "Python គឺជាអ្វី?",
        type: "theory",
        duration: "8 min",
        xpReward: 50,
        done: true,
        theory: [
          {
            type: "intro",
            body: "Python is a high-level, interpreted programming language famous for its clean, readable syntax. Created in 1991 by Guido van Rossum, it is now the world's most popular language for AI, data science, web development, and automation.",
          },
          {
            type: "code",
            title: "Your very first Python program",
            code: 'print("Hello, Cambodia! 🇰🇭")',
          },
          {
            type: "tip",
            title: "Why Python?",
            body: "Python reads almost like English. You can build a working program in minutes — perfect for beginners and professionals alike.",
          },
          {
            type: "terms",
            items: [
              { term: "interpreter", termKh: "កម្មវិធីបកប្រែ", desc: "Runs your code line-by-line without compiling first" },
              { term: "syntax", termKh: "វាក្យស័ព្ទ", desc: "The rules for how to write valid Python code" },
              { term: "print()", termKh: "បង្ហាញ", desc: "Outputs text to the screen" },
            ],
          },
        ],
        aiWelcome: "សួស្ដី! ខ្ញុំជា KodeKH AI 🎓\n\nWelcome to **Lesson 1: What is Python?** You're about to start Cambodia's most popular coding course. Python is the perfect first language!\n\nFeel free to ask me anything in Khmer or English. 🐍",
        aiSuggestions: [
          "Why is Python so popular?",
          "What can I build with Python?",
          "Is Python good for beginners?",
          "How is Python different from other languages?",
        ],
        aiResponses: {
          "Why is Python so popular?":
            "Python is popular for 3 big reasons! 🌟\n\n1. **Readable** — code looks like plain English\n2. **Versatile** — web, AI, data, automation, games\n3. **Huge community** — millions of free libraries\n\nCompanies like Google, Netflix, NASA, and Instagram all use Python! 🚀",
          "What can I build with Python?":
            "So many things! 🔥\n\n- **Web apps** — with Django or Flask\n- **AI & Machine Learning** — with TensorFlow, PyTorch\n- **Data analysis** — with Pandas, NumPy\n- **Automation** — scripts to save hours of work\n- **Games** — with Pygame\n\nStart simple, dream big! 💪",
          "Is Python good for beginners?":
            "Python is the #1 recommended language for beginners! 🥇\n\nWhy:\n- No complicated syntax like `{}` or `;`\n- Errors are readable in plain English\n- You can do useful things in 5 lines of code\n\n```python\n# This prints your name 5 times — simple!\nfor i in range(5):\n    print('Hello, Dara!')\n```",
          "How is Python different from other languages?":
            "Great comparison question! 🎯\n\n| Language | Python | Java/C++ |\n|---|---|---|\n| Syntax | Clean, simple | Complex, verbose |\n| Speed | Slower | Faster |\n| Learning curve | Low | High |\n| Use case | AI, scripts, web | Systems, games |\n\nFor learning and AI/data work, Python wins every time.",
        },
      },
      {
        id: 2,
        title: "Variables & Data Types",
        titleKh: "អថេរ & ប្រភេទទិន្នន័យ",
        type: "theory",
        duration: "12 min",
        xpReward: 50,
        done: true,
        theory: [
          {
            type: "intro",
            body: "Variables are containers that store data. In Python you create a variable simply by assigning a value — no type declaration needed.",
          },
          {
            type: "code",
            title: "The four core data types",
            code: 'name       = "Sokha"   # str  — text\nage        = 22        # int  — whole number\ngpa        = 3.75      # float — decimal\nis_student = True      # bool — True or False',
          },
          {
            type: "tip",
            title: "Use type() to check",
            body: "Run type(age) and Python will tell you it's <class 'int'>. Very handy for debugging!",
          },
          {
            type: "terms",
            items: [
              { term: "str", termKh: "អក្សរ", desc: "Text surrounded by quotes: \"hello\" or 'hello'" },
              { term: "int", termKh: "ចំនួនគត់", desc: "Whole numbers: 0, 42, -7" },
              { term: "float", termKh: "ចំនួនទសភាគ", desc: "Decimal numbers: 3.14, -0.5" },
              { term: "bool", termKh: "តក្ក", desc: "True or False — used in conditions" },
            ],
          },
          {
            type: "warning",
            title: "Case matters!",
            body: "Python is case-sensitive. `name` and `Name` are two different variables. Always use lowercase_with_underscores for variable names.",
          },
        ],
        aiWelcome: "Lesson 2: Variables & Data Types 📦\n\nVariables are the building blocks of every program. Think of them as labelled boxes that hold information.\n\nAsk me anything — I explain in Khmer too! 🇰🇭",
        aiSuggestions: [
          "What is the difference between int and float?",
          "Can a variable name have spaces?",
          "Explain bool in Khmer",
          "How do I update a variable?",
        ],
        aiResponses: {
          "What is the difference between int and float?":
            "Great question! 🔢\n\n```python\nage    = 22     # int   — no decimal\nheight = 1.72   # float — has decimal\n```\n\nUse **int** for counting things (students, lessons).\nUse **float** for measuring things (price, weight, GPA).\n\nPython converts between them automatically when needed:\n```python\nprint(22 / 7)   # → 3.142857... (auto float)\nprint(22 // 7)  # → 3 (integer division)\n```",
          "Can a variable name have spaces?":
            "No! ❌ Spaces are not allowed in variable names.\n\n```python\n# ❌ Wrong\nmy name = \"Dara\"\n\n# ✅ Use underscore instead\nmy_name = \"Dara\"\nfirst_name = \"Sok\"\nlast_name  = \"Dara\"\n```\n\nPython convention: `lower_case_with_underscores` (called snake_case 🐍).",
          "Explain bool in Khmer":
            "bool មានន័យថា **តក្ករូបន័យ** — True ឬ False តែប៉ុណ្ណោះ!\n\n```python\nis_student = True   # ជាសិស្ស\nis_adult   = False  # មិនទាន់ធំ\n```\n\nBool ត្រូវបានប្រើនៅក្នុង if statements:\n```python\nif is_student:\n    print(\"Welcome to class!\")\n```\n\nចំណាំ: True/False ត្រូវចាប់ផ្ដើមដោយអក្សរធំ T/F!",
          "How do I update a variable?":
            "Just assign a new value — Python overwrites it! 🔄\n\n```python\nscore = 80\nprint(score)  # 80\n\nscore = 95    # update\nprint(score)  # 95\n\nscore += 5    # shortcut: score = score + 5\nprint(score)  # 100\n```\n\nShortcuts: `+=`, `-=`, `*=`, `/=`",
        },
      },
      {
        id: 3,
        title: "Variables Practice",
        titleKh: "អនុវត្ត — អថេរ",
        type: "practice",
        duration: "15 min",
        xpReward: 100,
        done: true,
        task: "Create variables for your personal info and print them in a formatted sentence using an f-string.",
        codeTemplate: `# Create variables for your name, age, city, and GPA
# Then print: "My name is X. I am Y years old, from Z. My GPA is W."

name =
age  =
city =
gpa  =

print(f"My name is {name}. I am {age} years old, from {city}. My GPA is {gpa}.")`,
        solution: `name = "Dara"
age  = 20
city = "Phnom Penh"
gpa  = 3.8

print(f"My name is {name}. I am {age} years old, from {city}. My GPA is {gpa}.")`,
        outputLines: ["My name is Dara. I am 20 years old, from Phnom Penh. My GPA is 3.8."],
        aiWelcome: "Lesson 3: Variables Practice 💪\n\nTime to write real code! Fill in your own name, age, city, and GPA — then run it.\n\nStuck? Ask me and I'll help step by step. 🐍",
        aiSuggestions: [
          "What is an f-string?",
          "Why do strings need quotes?",
          "What if my city has two words?",
          "How do I add another variable?",
        ],
        aiResponses: {
          "What is an f-string?":
            'f-strings are the easiest way to put variables inside text! 🎯\n\n```python\nname = "Bopha"\nage  = 19\n\n# Old way (messy)\nprint("My name is " + name + ". Age: " + str(age))\n\n# f-string (clean!) — put f before the quote\nprint(f"My name is {name}. Age: {age}")\n```\n\nJust add `f` before the quote, then use `{}` to insert any variable.',
          "Why do strings need quotes?":
            'Python needs quotes to know "this is text, not a variable name"! 🤔\n\n```python\nname = "Dara"   # ✅ string stored in variable\nDara            # ❌ Python looks for a variable called Dara!\n\ncity = "Phnom Penh"  # ✅ spaces OK inside quotes\n```\n\nUse `"double"` or `\'single\'` — both work the same.',
        },
      },
      {
        id: 4,
        title: "Type Conversion",
        titleKh: "ការបំប្លែងប្រភេទ",
        type: "theory",
        duration: "10 min",
        xpReward: 50,
        done: true,
        theory: [
          {
            type: "intro",
            body: "Python variables have types, but you can convert between them using built-in functions. This is called type casting.",
          },
          {
            type: "code",
            title: "Converting between types",
            code: 'age_str  = "22"          # str\nage_int  = int(age_str)  # → 22 (int)\n\nprice    = 9.99\nprice_int = int(price)   # → 9 (truncates decimal!)\n\nnum      = 42\nnum_str  = str(num)      # → "42" (str)\n\nis_valid = bool(1)       # → True\nis_empty = bool(0)       # → False',
          },
          {
            type: "warning",
            title: "input() always returns a string",
            body: 'When you use input(), Python gives you a str even if the user types a number. Always convert: age = int(input("Enter age: "))',
          },
          {
            type: "comparison",
            left: {
              label: "❌ Bug — comparing str to int",
              code: 'age = input("Age: ")\nif age > 18:   # TypeError!\n    print("Adult")',
            },
            right: {
              label: "✅ Fix — convert first",
              code: 'age = int(input("Age: "))\nif age > 18:   # works!\n    print("Adult")',
            },
          },
        ],
        aiWelcome: "Lesson 4: Type Conversion 🔄\n\nThis lesson saves you from one of the most common Python bugs — mixing types by accident!\n\nAsk me to explain anything.",
        aiSuggestions: [
          "What happens with int(3.9)?",
          "How do I convert a list to a string?",
          "What is bool() useful for?",
          "Explain type errors in Khmer",
        ],
        aiResponses: {
          "What happens with int(3.9)?":
            "int() **truncates** (cuts off) the decimal — it does NOT round! 🔪\n\n```python\nprint(int(3.9))   # → 3  (not 4!)\nprint(int(3.1))   # → 3\nprint(int(-3.9))  # → -3 (not -4!)\n```\n\nIf you want to round: use `round(3.9)` → 4",
        },
      },
    ],
  },
  {
    section: "Module 2: Strings & Input",
    sectionKh: "ម៉ូឌុល ២: ខ្សែអក្សរ & Input",
    lessons: [
      {
        id: 5,
        title: "String Methods",
        titleKh: "វិធីសាស្ត្រ String",
        type: "theory",
        duration: "14 min",
        xpReward: 50,
        done: true,
        theory: [
          {
            type: "intro",
            body: "Strings come packed with built-in methods — functions you call directly on the string. They let you transform, search, and split text without writing any logic yourself.",
          },
          {
            type: "code",
            title: "Most-used string methods",
            code: 's = "  Hello, Cambodia!  "\n\nprint(s.upper())       # "  HELLO, CAMBODIA!  "\nprint(s.lower())       # "  hello, cambodia!  "\nprint(s.strip())       # "Hello, Cambodia!"  ← removes spaces\nprint(s.strip().replace(",", ""))  # "Hello Cambodia!"\nprint(len(s))          # 22 (includes spaces)\n\nwords = "Python is fun"\nprint(words.split())   # [\'Python\', \'is\', \'fun\']\nprint(words.startswith("Py"))  # True',
          },
          {
            type: "tip",
            title: "Strings are immutable",
            body: "Methods return a NEW string — they don't change the original. Always save the result: clean = s.strip()",
          },
          {
            type: "code",
            title: "String slicing",
            code: 'word = "Cambodia"\n\nprint(word[0])      # "C"   — first character\nprint(word[-1])     # "a"   — last character\nprint(word[0:4])    # "Camb" — index 0 up to (not including) 4\nprint(word[::-1])   # "aibodmaC" — reversed!',
          },
        ],
        aiWelcome: "Lesson 5: String Methods 🔤\n\nStrings are everywhere in real programs — names, messages, file paths. Master these methods and you'll handle text like a pro!\n\nAsk me anything 💬",
        aiSuggestions: [
          "How do I check if a string contains a word?",
          "What does split() return?",
          "How do I reverse a string?",
          "Explain slicing in Khmer",
        ],
        aiResponses: {
          "How do I check if a string contains a word?":
            "Use the `in` keyword — super readable! 🔍\n\n```python\nsentence = \"I love Python programming\"\n\nif \"Python\" in sentence:\n    print(\"Found it!\")\n\n# Also: .find() returns the index, or -1 if not found\nprint(sentence.find(\"Python\"))  # → 7\nprint(sentence.find(\"Java\"))    # → -1\n```",
          "How do I reverse a string?":
            "Use slicing with `[::-1]` — it means 'go backwards'! ⬅️\n\n```python\nword = \"Cambodia\"\nreversed_word = word[::-1]\nprint(reversed_word)  # \"aibodmaC\"\n```\n\n`[::-1]` means: start=end, stop=beginning, step=-1",
          "Explain slicing in Khmer":
            "Slicing គឺការកាត់ string ដើម្បីទទួល substring! ✂️\n\n```python\nword = \"Python\"  # index: P=0, y=1, t=2, h=3, o=4, n=5\n\nword[0:3]   # \"Pyt\"  — ពី 0 រហូត 3 (មិនរាប់ 3)\nword[2:]    # \"thon\" — ពី 2 រហូតចប់\nword[:4]    # \"Pyth\" — ពីដំបូងរហូត 4\nword[-2:]   # \"on\"   — ២ character ចុងក្រោយ\n```\n\nFormat: `[start:stop:step]`",
        },
      },
      {
        id: 6,
        title: "User Input",
        titleKh: "ការបញ្ចូលពីអ្នកប្រើ",
        type: "theory",
        duration: "10 min",
        xpReward: 50,
        done: true,
        theory: [
          {
            type: "intro",
            body: "The input() function pauses your program and waits for the user to type something. It always returns a string.",
          },
          {
            type: "code",
            title: "Basic input usage",
            code: 'name = input("What is your name? ")\nprint(f"Hello, {name}!")\n\n# For numbers — always convert!\nage = int(input("How old are you? "))\nif age >= 18:\n    print("You are an adult.")\nelse:\n    print("You are a minor.")',
          },
          {
            type: "tip",
            title: "Add a space inside the prompt",
            body: 'Always end your prompt with a space: input("Name: ") — otherwise the cursor appears right after the colon with no gap.',
          },
        ],
        aiWelcome: "Lesson 6: User Input ⌨️\n\nNow your programs can talk to users! input() is how you make interactive programs.\n\nRemember: always convert numbers with int() or float()!",
        aiSuggestions: [
          "What if the user types a letter when I expect a number?",
          "How do I ask multiple questions?",
          "Can I give a default value?",
        ],
        aiResponses: {
          "What if the user types a letter when I expect a number?":
            "int() will crash with a ValueError! 💥 To handle it safely:\n\n```python\ntry:\n    age = int(input(\"Age: \"))\n    print(f\"You are {age} years old\")\nexcept ValueError:\n    print(\"Please enter a number!\")\n```\n\nWe'll cover try/except fully later in the course.",
          "How do I ask multiple questions?":
            "Just call input() multiple times! 🔄\n\n```python\nfirst = input(\"First name: \")\nlast  = input(\"Last name:  \")\ncity  = input(\"City:       \")\n\nprint(f\"Hello, {first} {last} from {city}!\")\n```",
        },
      },
      {
        id: 7,
        title: "String Formatting Practice",
        titleKh: "អនុវត្ត — ការតុបតែង String",
        type: "practice",
        duration: "15 min",
        xpReward: 100,
        done: false,
        current: true,
        task: "Ask the user for their name, age, and favourite subject. Then print a formatted student ID card.",
        codeTemplate: `# Student ID Card Generator
# Ask for: name, age, favourite subject
# Output format:
# ╔══════════════════════════╗
# ║  STUDENT ID CARD         ║
# ║  Name:    Dara           ║
# ║  Age:     20             ║
# ║  Subject: Python         ║
# ╚══════════════════════════╝

name    = input("Name: ")
age     = input("Age: ")
subject = input("Favourite subject: ")

# Build the card below
`,
        solution: `name    = input("Name: ")
age     = input("Age: ")
subject = input("Favourite subject: ")

print("╔══════════════════════════╗")
print("║  STUDENT ID CARD         ║")
print(f"║  Name:    {name:<15} ║")
print(f"║  Age:     {age:<15} ║")
print(f"║  Subject: {subject:<15} ║")
print("╚══════════════════════════╝")`,
        outputLines: [
          "Name: Dara",
          "Age: 20",
          "Favourite subject: Python",
          "╔══════════════════════════╗",
          "║  STUDENT ID CARD         ║",
          "║  Name:    Dara            ║",
          "║  Age:     20              ║",
          "║  Subject: Python          ║",
          "╚══════════════════════════╝",
        ],
        aiWelcome: "Lesson 7: String Formatting Practice 🎨\n\nYou're combining input() with f-strings. The `:<15` inside an f-string pads text to a fixed width — great for tables and cards!\n\nTry running the starter code first, then improve it. 💪",
        aiSuggestions: [
          "What does :<15 mean inside an f-string?",
          "How do I make text right-aligned?",
          "What are the box-drawing characters called?",
          "How do I add more fields to the card?",
        ],
        aiResponses: {
          "What does :<15 mean inside an f-string?":
            "It's a format specifier for alignment! 📐\n\n```python\nname = \"Bo\"\nprint(f\"{name:<15}\")  # 'Bo             ' ← left-align, pad to 15 chars\nprint(f\"{name:>15}\")  # '             Bo' ← right-align\nprint(f\"{name:^15}\")  # '      Bo       ' ← center\n```\n\n`<` = left, `>` = right, `^` = center. The number is the total width.",
        },
      },
      {
        id: 8,
        title: "String Reversal Challenge",
        titleKh: "ការប្រឡង — ត្រឡប់ String",
        type: "challenge",
        duration: "20 min",
        xpReward: 200,
        done: false,
        challenge: {
          title: "Palindrome Checker",
          titleKh: "ពិនិត្យ Palindrome",
          difficulty: "Easy",
          description: 'A palindrome reads the same forwards and backwards (e.g. "racecar", "madam"). Write a program that asks the user for a word and tells them if it\'s a palindrome.',
          requirements: [
            "Use input() to get a word from the user",
            "Convert to lowercase before comparing",
            "Use string slicing to reverse the word",
            'Print "✅ Palindrome!" or "❌ Not a palindrome"',
          ],
          expectedOutput: ["Enter a word: racecar", "✅ Palindrome!", "---", "Enter a word: python", "❌ Not a palindrome"],
          xp: 200,
        },
        codeTemplate: `word = input("Enter a word: ").lower()

# Hint: reversed_word = word[::-1]
# Compare word to reversed_word

`,
        solution: `word = input("Enter a word: ").lower()
reversed_word = word[::-1]

if word == reversed_word:
    print("✅ Palindrome!")
else:
    print("❌ Not a palindrome")`,
        outputLines: ["Enter a word: racecar", "✅ Palindrome!"],
        aiWelcome: "Lesson 8: Palindrome Challenge 🏆\n\nThis challenge tests your string skills — slicing, input, and comparison all at once.\n\nHint: reverse a string with `[::-1]`. You've got this! 💪",
        aiSuggestions: [
          "Give me a hint for the palindrome check",
          "How does [::-1] work again?",
          "What other palindromes can I test?",
        ],
        aiResponses: {
          "Give me a hint for the palindrome check":
            "Here's the logic step by step — no full solution! 🤫\n\n```python\nword = input(\"Word: \").lower()  # step 1: get + lowercase\nrev  = word[::-1]               # step 2: reverse\n\n# step 3: compare!\nif word == ___:                 # fill in the blank\n    print(\"✅ Palindrome!\")\nelse:\n    print(\"❌ Not a palindrome\")\n```\n\nWhat goes in the blank? 😊",
        },
      },
    ],
  },
  {
    section: "Module 3: Control Flow",
    sectionKh: "ម៉ូឌុល ៣: លំហូរគ្រប់គ្រង",
    lessons: [
      {
        id: 9,
        title: "If / Else Statements",
        titleKh: "លក្ខខណ្ឌ If / Else",
        type: "theory",
        duration: "12 min",
        xpReward: 50,
        done: false,
        locked: false,
        theory: [
          {
            type: "intro",
            body: "Conditionals let your program make decisions. Use if, elif (else-if), and else to branch your code based on any condition.",
          },
          {
            type: "code",
            title: "Grade calculator",
            code: 'score = 85\n\nif score >= 90:\n    print("A — Excellent!")\nelif score >= 80:\n    print("B — Good job!")\nelif score >= 70:\n    print("C — Keep going!")\nelse:\n    print("Keep studying 💪")',
          },
          {
            type: "code",
            title: "Comparison operators",
            code: "# ==  equal\n# !=  not equal\n# >   greater than\n# <   less than\n# >=  greater or equal\n# <=  less or equal\n# and / or / not  — combine conditions\n\nif age >= 18 and has_id:\n    print('Entry granted')",
          },
          {
            type: "warning",
            title: "= vs ==",
            body: "= assigns a value. == compares two values. A very common beginner mistake!",
          },
        ],
        aiWelcome: "Lesson 9: If/Else Statements 🔀\n\nConditionals are how programs make decisions — they're in every real app you've ever used!\n\nAsk me about any part. 🎓",
        aiSuggestions: [
          "What is the difference between = and ==?",
          "Can I have multiple elif?",
          "How do I combine conditions?",
          "Explain if/else in Khmer",
        ],
        aiResponses: {
          "What is the difference between = and ==?":
            "This trips up everyone at first! 🚨\n\n```python\n# = assigns (stores a value)\nname = \"Dara\"   # now name contains \"Dara\"\n\n# == compares (asks a question)\nname == \"Dara\"  # True\nname == \"Bopha\" # False\n```\n\nInside an `if`, always use `==`:\n```python\nif name == \"Dara\":   # ✅ comparison\n    print(\"Hi Dara!\")\n```",
          "Explain if/else in Khmer":
            "if/else គឺការធ្វើការសម្រេចចិត្ត! 🔀\n\n```python\nmark = 75\n\nif mark >= 80:         # បើ mark >= 80\n    print(\"ជាប់ A\")    # ធ្វើ\nelif mark >= 60:       # បើ mark >= 60 (មិនសំខាន់ if ទីមួយ)\n    print(\"ជាប់ B\")    # ធ្វើ\nelse:                  # បើមិនត្រូវ condition ណាមួយ\n    print(\"ធ្លាក់\")    # ធ្វើ\n```\n\nPython អានពីលើចុះក្រោម — condition ទីមួយដែល True នឹងដំណើរការ!",
        },
      },
      {
        id: 10,
        title: "Conditionals Practice",
        titleKh: "អនុវត្ត — លក្ខខណ្ឌ",
        type: "practice",
        duration: "15 min",
        xpReward: 100,
        done: false,
        locked: false,
        task: "Write a temperature advisor. Ask the user for the temperature in Celsius and give them clothing advice.",
        codeTemplate: `# Temperature Advisor
# Rules:
# >= 35°C → "Very hot! Wear light clothes and stay hydrated. ☀️"
# >= 25°C → "Warm day. A t-shirt is fine. 😊"
# >= 15°C → "Cool. Bring a light jacket. 🧥"
# < 15°C  → "Cold! Wear a coat. 🧤"

temp = float(input("Temperature (°C): "))

# Write your if/elif/else here
`,
        solution: `temp = float(input("Temperature (°C): "))

if temp >= 35:
    print("Very hot! Wear light clothes and stay hydrated. ☀️")
elif temp >= 25:
    print("Warm day. A t-shirt is fine. 😊")
elif temp >= 15:
    print("Cool. Bring a light jacket. 🧥")
else:
    print("Cold! Wear a coat. 🧤")`,
        outputLines: ["Temperature (°C): 32", "Warm day. A t-shirt is fine. 😊"],
        aiWelcome: "Lesson 10: Conditionals Practice 🌡️\n\nYou're building a real decision-making program! Remember to use float() since temperatures can be decimal.\n\nTry different temperatures after you get it working. 🌤️",
        aiSuggestions: [
          "Why float() instead of int()?",
          "How do I test negative temperatures?",
          "What if I want to add more ranges?",
        ],
        aiResponses: {
          "Why float() instead of int()?":
            "Because temperatures can be decimal! 🌡️\n\n```python\ntemp = float(input(\"Temp: \"))\n# User can type: 32.5, -1.5, 100.0\n\n# int() would crash on \"32.5\"!\ntemp = int(input(\"Temp: \"))  # ❌ ValueError on \"32.5\"\n```\n\nRule: use `float()` for measurements, `int()` for counting.",
        },
      },
      {
        id: 11,
        title: "For Loops",
        titleKh: "ចរន្ត For",
        type: "theory",
        duration: "14 min",
        xpReward: 50,
        done: false,
        locked: false,
        theory: [
          {
            type: "intro",
            body: "A for loop repeats code for each item in a sequence — a list, a range of numbers, or characters in a string.",
          },
          {
            type: "code",
            title: "for with range()",
            code: "# range(5) → 0, 1, 2, 3, 4\nfor i in range(5):\n    print(i)\n\n# range(1, 6) → 1, 2, 3, 4, 5\nfor i in range(1, 6):\n    print(i)\n\n# range(0, 10, 2) → 0, 2, 4, 6, 8  (step of 2)\nfor i in range(0, 10, 2):\n    print(i)",
          },
          {
            type: "code",
            title: "Looping over a list",
            code: 'fruits = ["mango", "durian", "rambutan"]\n\nfor fruit in fruits:\n    print(f"I love {fruit}!")\n\n# With index using enumerate()\nfor i, fruit in enumerate(fruits):\n    print(f"{i+1}. {fruit}")',
          },
          {
            type: "tip",
            title: "Loop over a string too!",
            body: 'for char in "Cambodia": — gives you C, a, m, b, o, d, i, a one by one.',
          },
        ],
        aiWelcome: "Lesson 11: For Loops 🔁\n\nFor loops are one of the most powerful tools in Python. Once you master range() and list iteration, you can process any amount of data!\n\nI'm here to help 🐍",
        aiSuggestions: [
          "What is the difference between range(5) and range(1,6)?",
          "How do I loop backwards?",
          "What is enumerate()?",
          "Can I skip values in a loop?",
        ],
        aiResponses: {
          "What is the difference between range(5) and range(1,6)?":
            "Both give 5 numbers but starting from different points! 🔢\n\n```python\nrange(5)     # 0, 1, 2, 3, 4   (starts at 0)\nrange(1, 6)  # 1, 2, 3, 4, 5   (starts at 1, stops before 6)\nrange(2, 10, 2)  # 2, 4, 6, 8  (start, stop, step)\n```\n\nRemember: the **stop** value is **excluded**.",
          "How do I loop backwards?":
            "Use range() with a negative step! ⬅️\n\n```python\nfor i in range(10, 0, -1):  # 10, 9, 8, ... 1\n    print(i)\n\n# Or reverse a list\nfruits = [\"mango\", \"durian\", \"rambutan\"]\nfor f in reversed(fruits):\n    print(f)\n```",
          "What is enumerate()?":
            "enumerate() gives you both the index AND the value! 📊\n\n```python\ncourses = [\"Python\", \"React\", \"SQL\"]\n\n# Without enumerate — have to track i manually\ni = 0\nfor c in courses:\n    print(f\"{i}: {c}\")\n    i += 1\n\n# With enumerate — clean!\nfor i, c in enumerate(courses):\n    print(f\"{i}: {c}\")\n```",
        },
      },
      {
        id: 12,
        title: "While Loops",
        titleKh: "ចរន្ត While",
        type: "theory",
        duration: "12 min",
        xpReward: 50,
        done: false,
        locked: false,
        theory: [
          {
            type: "intro",
            body: "A while loop repeats as long as a condition is True. Use it when you don't know how many times to loop — like waiting for valid user input.",
          },
          {
            type: "code",
            title: "Basic while loop",
            code: "count = 1\n\nwhile count <= 5:\n    print(f'ចំនួន: {count}')\n    count += 1\n\nprint('Done! ✓')",
          },
          {
            type: "warning",
            title: "Always update the condition variable!",
            body: "If count never changes, count <= 5 stays True forever — you get an infinite loop. Always make sure your loop can end.",
          },
          {
            type: "code",
            title: "break and continue",
            code: "# break — exit the loop immediately\nfor i in range(10):\n    if i == 5:\n        break       # stops at 5\n    print(i)        # prints 0 1 2 3 4\n\n# continue — skip this iteration\nfor i in range(6):\n    if i == 3:\n        continue    # skip 3\n    print(i)        # prints 0 1 2 4 5",
          },
          {
            type: "comparison",
            left: {
              label: "for — use when count is known",
              code: "for i in range(5):\n    print(i)",
            },
            right: {
              label: "while — use until condition changes",
              code: "answer = ''\nwhile answer != 'yes':\n    answer = input('> ')",
            },
          },
        ],
        aiWelcome: "សួស្ដី! ខ្ញុំជា KodeKH AI — គ្រូបង្ហាត់ AI របស់អ្នក 🎓\n\nYou're on **Lesson 12: While Loops**. A `while` loop repeats as long as a condition is `True`.\n\nTry running the code to see the output! Ask me anything in Khmer or English. 🐍",
        aiSuggestions: [
          "What's the difference between for and while?",
          "How do I prevent an infinite loop?",
          "Explain count += 1 in Khmer",
          "Show me a real-world example",
        ],
        aiResponses: {
          "What's the difference between for and while?":
            "Great question! 🎯\n\n**for loop** — use when you know how many times:\n```python\nfor i in range(5):  # exactly 5 times\n    print(i)\n```\n\n**while loop** — use until a condition changes:\n```python\nwhile user != 'quit':\n    user = input('> ')\n```\n\nRule: **for** = fixed count, **while** = until a condition.",
          "How do I prevent an infinite loop?":
            "Always **modify the variable** being checked! 🔁\n\n```python\n# ❌ Infinite — count never changes\ncount = 1\nwhile count > 0:\n    print(count)\n\n# ✅ Fixed\ncount = 1\nwhile count <= 5:\n    print(count)\n    count += 1  # crucial!\n```",
          "Explain count += 1 in Khmer":
            "count += 1 មានន័យថា **បន្ថែម 1 ទៅ count**!\n\nនេះគឺដូចគ្នា `count = count + 1`\n\n```python\ncount = 0\ncount += 1  # now 1\ncount += 1  # now 2\ncount += 5  # now 7\n```\n\nYou can also use `count -= 1` (subtract), `count *= 2` (multiply).",
          "Show me a real-world example":
            "Here's a login system! 🔐\n\n```python\nattempts = 0\npassword = \"secret123\"\n\nwhile attempts < 3:\n    guess = input('Password: ')\n    if guess == password:\n        print('✅ Access granted!')\n        break\n    attempts += 1\n    print(f'❌ Wrong! {3 - attempts} tries left')\nelse:\n    print('🔒 Account locked!')\n```",
        },
        codeTemplate: `# ចរន្ត While — While Loops
# Lesson 12: Python Fundamentals

count = 1

while count <= 5:
    print(f"ចំនួន: {count}")
    count += 1

print("Done! ✓")`,
        outputLines: ["ចំនួន: 1", "ចំនួន: 2", "ចំនួន: 3", "ចំនួន: 4", "ចំនួន: 5", "Done! ✓"],
      },
      {
        id: 13,
        title: "FizzBuzz Challenge",
        titleKh: "ការប្រឡង — FizzBuzz",
        type: "challenge",
        duration: "25 min",
        xpReward: 200,
        done: false,
        locked: false,
        challenge: {
          title: "FizzBuzz",
          titleKh: "FizzBuzz",
          difficulty: "Medium",
          description: "Print numbers 1 to 30. For multiples of 3 print \"Fizz\", for multiples of 5 print \"Buzz\", for multiples of both print \"FizzBuzz\".",
          requirements: [
            "Use a for loop with range(1, 31)",
            "Check multiples of 15 first (both 3 and 5)",
            "Then check multiples of 3",
            "Then check multiples of 5",
            "Otherwise print the number",
          ],
          expectedOutput: ["1", "2", "Fizz", "4", "Buzz", "Fizz", "7", "8", "Fizz", "Buzz", "11", "Fizz", "13", "14", "FizzBuzz", "..."],
          xp: 200,
        },
        codeTemplate: `for i in range(1, 31):
    # Check multiples of 15 first!
    # Then 3, then 5, else print i
    pass`,
        solution: `for i in range(1, 31):
    if i % 15 == 0:
        print("FizzBuzz")
    elif i % 3 == 0:
        print("Fizz")
    elif i % 5 == 0:
        print("Buzz")
    else:
        print(i)`,
        outputLines: ["1", "2", "Fizz", "4", "Buzz", "Fizz", "7", "8", "Fizz", "Buzz", "11", "Fizz", "13", "14", "FizzBuzz"],
        aiWelcome: "FizzBuzz Challenge! 🏆\n\nThis is a classic coding interview question. The key insight: check **both** (15) before checking **either** alone.\n\nYou've got this — ask for a hint if you need one! 💪",
        aiSuggestions: [
          "What does % (modulo) do?",
          "Why check 15 before 3 and 5?",
          "Give me a hint",
        ],
        aiResponses: {
          "What does % (modulo) do?":
            "% gives you the **remainder** after division! 🔢\n\n```python\n10 % 3  # → 1  (10 ÷ 3 = 3 remainder 1)\n15 % 5  # → 0  (15 ÷ 5 = 3 remainder 0 — perfect division!)\n12 % 3  # → 0  (multiple of 3!)\n```\n\nSo `i % 3 == 0` means \"i is a multiple of 3\".",
          "Why check 15 before 3 and 5?":
            "Because if you check 3 first, 15 prints \"Fizz\" — not \"FizzBuzz\"! ⚠️\n\n```python\n# ❌ Wrong order — 15 prints \"Fizz\"\nif i % 3 == 0:\n    print(\"Fizz\")     # 15 matches here first!\nelif i % 5 == 0:\n    print(\"Buzz\")\n\n# ✅ Correct — check most specific first\nif i % 15 == 0:       # 15 is multiple of BOTH\n    print(\"FizzBuzz\")\nelif i % 3 == 0:\n    print(\"Fizz\")\n```",
        },
      },
    ],
  },
  {
    section: "Module 4: Functions",
    sectionKh: "ម៉ូឌុល ៤: អនុគមន៍",
    lessons: [
      {
        id: 14,
        title: "Defining Functions",
        titleKh: "បង្កើតអនុគមន៍",
        type: "theory",
        duration: "18 min",
        xpReward: 50,
        done: false,
        locked: false,
        theory: [
          {
            type: "intro",
            body: "Functions are reusable blocks of code. Write the logic once, call it anywhere. They make programs shorter, cleaner, and easier to fix.",
          },
          {
            type: "code",
            title: "Defining and calling",
            code: 'def greet(name):\n    return f"Hello, {name}!"\n\nmessage = greet("Bopha")\nprint(message)   # Hello, Bopha!\nprint(greet("Dara"))  # Hello, Dara!',
          },
          {
            type: "code",
            title: "Default parameters",
            code: 'def greet(name, language="en"):\n    if language == "kh":\n        return f"សួស្ដី, {name}!"\n    return f"Hello, {name}!"\n\nprint(greet("Dara"))         # Hello, Dara!\nprint(greet("Dara", "kh"))  # សួស្ដី, Dara!',
          },
          {
            type: "terms",
            items: [
              { term: "def", termKh: "និយមន័យ", desc: "Keyword to define a function" },
              { term: "parameter", termKh: "ប៉ារ៉ាម៉ែត្រ", desc: "Variable listed in the function definition" },
              { term: "argument", termKh: "តម្លៃ", desc: "Actual value passed when calling the function" },
              { term: "return", termKh: "ត្រឡប់", desc: "Sends a value back to the caller" },
            ],
          },
        ],
        aiWelcome: "Lesson 14: Functions 🛠️\n\nFunctions are the foundation of good code. Every serious Python program is built from functions.\n\nDon't rush this lesson — it's worth taking notes! 📝",
        aiSuggestions: [
          "What happens if I don't use return?",
          "Can a function call another function?",
          "Explain default parameters",
          "What is the difference between parameter and argument?",
        ],
        aiResponses: {
          "What happens if I don't use return?":
            "The function returns `None` — Python's way of saying 'nothing'! 🫥\n\n```python\ndef say_hi(name):\n    print(f\"Hi {name}\")  # no return\n\nresult = say_hi(\"Dara\")  # prints Hi Dara\nprint(result)             # prints None\n```\n\nUse `return` when you need the function to **produce a value** you can use later.",
          "Can a function call another function?":
            "Yes! This is called **function composition** — very powerful! 🔗\n\n```python\ndef square(n):\n    return n * n\n\ndef sum_of_squares(a, b):\n    return square(a) + square(b)  # calls square() twice!\n\nprint(sum_of_squares(3, 4))  # 9 + 16 = 25\n```",
        },
      },
      {
        id: 15,
        title: "Scope & Lambda",
        titleKh: "វិសាលភាព & Lambda",
        type: "theory",
        duration: "15 min",
        xpReward: 50,
        done: false,
        locked: false,
        theory: [
          {
            type: "intro",
            body: "Scope determines which variables your code can see. Lambda creates tiny one-line functions — great for sorting and filtering.",
          },
          {
            type: "code",
            title: "Local vs global scope",
            code: 'name = "Dara"   # global\n\ndef greet():\n    name = "Bopha"  # local — only inside greet()\n    print(name)     # Bopha\n\ngreet()\nprint(name)  # Dara — global unchanged',
          },
          {
            type: "code",
            title: "Lambda functions",
            code: "# Normal function\ndef double(x):\n    return x * 2\n\n# Same as lambda\ndouble = lambda x: x * 2\nprint(double(5))   # 10\n\n# Useful with sorted()\nstudents = [(\"Dara\", 85), (\"Bopha\", 92), (\"Rin\", 78)]\nsorted_students = sorted(students, key=lambda s: s[1])\nprint(sorted_students)  # sorted by score",
          },
        ],
        aiWelcome: "Lesson 15: Scope & Lambda ⚡\n\nScope bugs are sneaky. Lambda functions look strange at first but you'll love them once you see them in action.\n\nAsk me anything! 🐍",
        aiSuggestions: [
          "When should I use lambda?",
          "What is a global variable?",
          "Can lambda have multiple parameters?",
        ],
        aiResponses: {
          "When should I use lambda?":
            "Lambda shines for **short, one-use functions** — especially as arguments! 🎯\n\n```python\nnumbers = [5, 2, 8, 1, 9]\n\n# Sort normally\nsorted(numbers)  # [1, 2, 5, 8, 9]\n\n# Sort by remainder when divided by 3\nsorted(numbers, key=lambda x: x % 3)\n\n# Filter — keep only even numbers\nlist(filter(lambda x: x % 2 == 0, numbers))  # [2, 8]\n```\n\nIf the logic is more than one expression, use a regular `def`.",
        },
      },
      {
        id: 16,
        title: "Functions Practice",
        titleKh: "អនុវត្ត — អនុគមន៍",
        type: "practice",
        duration: "20 min",
        xpReward: 100,
        done: false,
        locked: false,
        task: "Write three functions: one to calculate BMI, one to classify it, and one to print a full health report.",
        codeTemplate: `# Health Report Generator

def calculate_bmi(weight_kg, height_m):
    # Formula: weight / (height * height)
    pass

def classify_bmi(bmi):
    # < 18.5 → "Underweight"
    # 18.5–24.9 → "Normal"
    # 25–29.9 → "Overweight"
    # >= 30 → "Obese"
    pass

def health_report(name, weight_kg, height_m):
    # Calculate BMI, classify, then print a formatted report
    pass

# Test it
health_report("Dara", 65, 1.72)`,
        solution: `def calculate_bmi(weight_kg, height_m):
    return round(weight_kg / (height_m ** 2), 1)

def classify_bmi(bmi):
    if bmi < 18.5:
        return "Underweight"
    elif bmi < 25:
        return "Normal"
    elif bmi < 30:
        return "Overweight"
    else:
        return "Obese"

def health_report(name, weight_kg, height_m):
    bmi = calculate_bmi(weight_kg, height_m)
    category = classify_bmi(bmi)
    print(f"=== Health Report: {name} ===")
    print(f"BMI:      {bmi}")
    print(f"Category: {category}")

health_report("Dara", 65, 1.72)`,
        outputLines: ["=== Health Report: Dara ===", "BMI:      21.97", "Category: Normal"],
        aiWelcome: "Lesson 16: Functions Practice 🏥\n\nThis exercise has three functions calling each other — real-world style! Break it down one function at a time.\n\nStart with calculate_bmi() first, test it, then move on. 💪",
        aiSuggestions: [
          "What does ** mean in Python?",
          "How do I test one function at a time?",
          "What is round()?",
        ],
        aiResponses: {
          "What does ** mean in Python?":
            "** is the **power (exponent) operator**! 🔢\n\n```python\n2 ** 3   # 8  (2 to the power of 3)\n5 ** 2   # 25 (5 squared)\n\n# For BMI: height squared\nheight = 1.72\nprint(height ** 2)  # 2.9584\n```",
        },
      },
      {
        id: 17,
        title: "Recursion Challenge",
        titleKh: "ការប្រឡង — ចំនួន Factorial",
        type: "challenge",
        duration: "25 min",
        xpReward: 200,
        done: false,
        locked: false,
        challenge: {
          title: "Factorial with Recursion",
          titleKh: "Factorial ដោយ Recursion",
          difficulty: "Medium",
          description: "A recursive function calls itself. Write a function factorial(n) that returns n! using recursion. 5! = 5 × 4 × 3 × 2 × 1 = 120.",
          requirements: [
            "Base case: factorial(0) or factorial(1) returns 1",
            "Recursive case: factorial(n) returns n * factorial(n-1)",
            "Test with: factorial(5) → 120, factorial(10) → 3628800",
          ],
          expectedOutput: ["factorial(5)  = 120", "factorial(10) = 3628800"],
          xp: 200,
        },
        codeTemplate: `def factorial(n):
    # Base case: what's the simplest input?
    # Recursive case: n * factorial(?)
    pass

print(f"factorial(5)  = {factorial(5)}")
print(f"factorial(10) = {factorial(10)}")`,
        solution: `def factorial(n):
    if n <= 1:
        return 1
    return n * factorial(n - 1)

print(f"factorial(5)  = {factorial(5)}")
print(f"factorial(10) = {factorial(10)}")`,
        outputLines: ["factorial(5)  = 120", "factorial(10) = 3628800"],
        aiWelcome: "Recursion Challenge! 🌀\n\nRecursion is a mind-bending concept. A function that calls itself!\n\nKey: every recursive function needs a **base case** to stop. Without it → infinite recursion (like an infinite loop).",
        aiSuggestions: [
          "What is a base case?",
          "How does recursion unwind?",
          "Give me a hint",
        ],
        aiResponses: {
          "What is a base case?":
            "The base case is the **stopping condition** — when the function returns without calling itself! 🛑\n\n```python\ndef factorial(n):\n    if n <= 1:         # BASE CASE — stop here!\n        return 1\n    return n * factorial(n - 1)  # recursive case\n```\n\nWithout a base case:\n```python\ndef infinite(n):     # ❌ no base case!\n    return n * infinite(n - 1)  # runs forever → RecursionError\n```",
        },
      },
    ],
  },
  {
    section: "Module 5: Lists & Dictionaries",
    sectionKh: "ម៉ូឌុល ៥: Lists & Dictionaries",
    lessons: [
      {
        id: 18,
        title: "Lists",
        titleKh: "Lists",
        type: "theory",
        duration: "16 min",
        xpReward: 50,
        done: false,
        locked: false,
        theory: [
          {
            type: "intro",
            body: "A list stores multiple values in a single variable, in order. Lists are mutable — you can add, remove, and change items.",
          },
          {
            type: "code",
            title: "List basics",
            code: 'grades = [85, 92, 78, 95, 88]\n\nprint(grades[0])    # 85 — first item\nprint(grades[-1])   # 88 — last item\nprint(len(grades))  # 5\n\ngrades.append(90)   # add to end\ngrades.remove(78)   # remove by value\ngrades.sort()       # sort in place\n\nprint(sum(grades))  # total\nprint(max(grades))  # highest\nprint(min(grades))  # lowest',
          },
          {
            type: "code",
            title: "List comprehension",
            code: "numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]\n\n# Old way\nevens = []\nfor n in numbers:\n    if n % 2 == 0:\n        evens.append(n)\n\n# List comprehension — one line!\nevens = [n for n in numbers if n % 2 == 0]\n# → [2, 4, 6, 8, 10]\n\nsquares = [n**2 for n in range(1, 6)]\n# → [1, 4, 9, 16, 25]",
          },
        ],
        aiWelcome: "Lesson 18: Lists 📋\n\nLists are the most-used data structure in Python. Master them and you can work with any collection of data!\n\nList comprehension looks scary at first — ask me to break it down. 🐍",
        aiSuggestions: [
          "What is the difference between append and insert?",
          "How do I remove duplicates from a list?",
          "Explain list comprehension in Khmer",
          "How do I find an item's index?",
        ],
        aiResponses: {
          "Explain list comprehension in Khmer":
            "List comprehension គឺវិធីខ្លីក្នុងការបង្កើត list ថ្មី! ✨\n\n```python\n# Format: [expression for item in list if condition]\n\nnumbers = [1, 2, 3, 4, 5, 6]\n\n# ចង់បាន list នៃ even numbers:\nevens = [n for n in numbers if n % 2 == 0]\n# → [2, 4, 6]\n\n# ចង់បាន squares:\nsquares = [n**2 for n in numbers]\n# → [1, 4, 9, 16, 25, 36]\n```\n\nគិតថា: \"ដាក់ n សម្រាប់ n ក្នុង numbers ប្រសិនបើ n % 2 == 0\"",
          "How do I find an item's index?":
            "Use .index() method! 🔍\n\n```python\nfruits = [\"mango\", \"durian\", \"rambutan\"]\nprint(fruits.index(\"durian\"))  # 1\n\n# Check if item exists first to avoid ValueError\nif \"mango\" in fruits:\n    print(fruits.index(\"mango\"))  # 0\n```",
        },
      },
      {
        id: 19,
        title: "Dictionaries",
        titleKh: "Dictionaries",
        type: "theory",
        duration: "16 min",
        xpReward: 50,
        done: false,
        locked: false,
        theory: [
          {
            type: "intro",
            body: "A dictionary stores data as key-value pairs. Instead of index numbers, you look up values by meaningful keys — like a real dictionary where you look up a word to get its meaning.",
          },
          {
            type: "code",
            title: "Dictionary basics",
            code: 'student = {\n    "name":  "Dara",\n    "age":   20,\n    "grade": "A",\n    "city":  "Phnom Penh"\n}\n\nprint(student["name"])   # Dara\nprint(student.get("age", 0))  # 20 (safe — no crash if missing)\n\nstudent["email"] = "dara@example.com"  # add new key\nstudent["age"] = 21                    # update existing\n\nfor key, value in student.items():\n    print(f"{key}: {value}")',
          },
          {
            type: "tip",
            title: "Use .get() for safety",
            body: 'student["phone"] raises KeyError if the key doesn\'t exist. student.get("phone", "N/A") returns "N/A" instead — much safer.',
          },
        ],
        aiWelcome: "Lesson 19: Dictionaries 📖\n\nDictionaries are essential for storing structured data — user profiles, API responses, configuration. You'll use them every day as a developer!\n\nAsk me anything. 🐍",
        aiSuggestions: [
          "What is the difference between a list and a dictionary?",
          "How do I loop over a dictionary?",
          "Can a dictionary have a list as a value?",
          "How do I delete a key?",
        ],
        aiResponses: {
          "What is the difference between a list and a dictionary?":
            "Great question — they're for different things! 📊\n\n| | List | Dictionary |\n|---|---|---|\n| Access by | Index (0,1,2) | Key (any string/int) |\n| Order | Yes (insertion order) | Yes (Python 3.7+) |\n| Use for | Sequences of items | Named data |\n| Example | [85, 92, 78] | {\"name\": \"Dara\"} |\n\nUse a **list** for ordered collections.\nUse a **dict** for labelled data.",
          "Can a dictionary have a list as a value?":
            "Yes! Dictionaries can hold any type as values — even other dicts! 🪆\n\n```python\nstudent = {\n    \"name\":   \"Dara\",\n    \"grades\": [85, 92, 78, 95],  # list as value!\n    \"address\": {                 # dict inside dict!\n        \"city\": \"Phnom Penh\",\n        \"district\": \"Daun Penh\"\n    }\n}\n\nprint(student[\"grades\"][0])        # 85\nprint(student[\"address\"][\"city\"])  # Phnom Penh\n```",
        },
      },
      {
        id: 20,
        title: "Lists Practice",
        titleKh: "អនុវត្ត — Lists",
        type: "practice",
        duration: "20 min",
        xpReward: 100,
        done: false,
        locked: false,
        task: "Build a grade analyser. Store 5 scores in a list, then calculate average, highest, lowest, and how many are passing (>= 60).",
        codeTemplate: `# Grade Analyser
scores = [85, 62, 90, 45, 78]

# Calculate:
# 1. Average score
# 2. Highest score
# 3. Lowest score
# 4. Number of passing scores (>= 60)
# 5. List of passing scores only

# Print a formatted report
`,
        solution: `scores = [85, 62, 90, 45, 78]

average = round(sum(scores) / len(scores), 1)
highest = max(scores)
lowest  = min(scores)
passing = [s for s in scores if s >= 60]

print("=== Grade Report ===")
print(f"Scores:   {scores}")
print(f"Average:  {average}")
print(f"Highest:  {highest}")
print(f"Lowest:   {lowest}")
print(f"Passing:  {len(passing)}/{len(scores)}")
print(f"Pass list: {passing}")`,
        outputLines: [
          "=== Grade Report ===",
          "Scores:   [85, 62, 90, 45, 78]",
          "Average:  72.0",
          "Highest:  90",
          "Lowest:   45",
          "Passing:  4/5",
          "Pass list: [85, 62, 90, 78]",
        ],
        aiWelcome: "Lesson 20: Lists Practice 📊\n\nYou're building a real data analysis tool! sum(), max(), min(), and list comprehension all come together here.\n\nTry solving step by step — one calculation at a time. 💪",
        aiSuggestions: [
          "How do I calculate an average?",
          "What is round() for?",
          "How do I filter a list?",
        ],
        aiResponses: {
          "How do I calculate an average?":
            "Sum divided by count! 📐\n\n```python\nscores = [85, 62, 90, 45, 78]\n\naverage = sum(scores) / len(scores)\nprint(average)  # 72.0\n\n# Round to 1 decimal place\nprint(round(average, 1))  # 72.0\n```",
        },
      },
      {
        id: 21,
        title: "Grade Calculator Challenge",
        titleKh: "ការប្រឡង — គ្រូបង្ហាត់",
        type: "challenge",
        duration: "30 min",
        xpReward: 200,
        done: false,
        locked: false,
        challenge: {
          title: "Student Grade Manager",
          titleKh: "ការគ្រប់គ្រងពិន្ទុសិស្ស",
          difficulty: "Hard",
          description: "Build a grade management system using a list of dictionaries. Each student has a name and a list of scores. Calculate each student's average and assign a letter grade.",
          requirements: [
            "Store students as a list of dicts: {name, scores}",
            "Write get_average(scores) function",
            "Write get_grade(avg) function (A≥90, B≥80, C≥70, D≥60, F<60)",
            "Print a formatted leaderboard sorted by average (highest first)",
          ],
          expectedOutput: [
            "=== Class Leaderboard ===",
            "1. Bopha   — Avg: 91.0 — Grade: A",
            "2. Dara    — Avg: 84.0 — Grade: B",
            "3. Rin     — Avg: 67.3 — Grade: D",
          ],
          xp: 200,
        },
        codeTemplate: `students = [
    {"name": "Dara",  "scores": [85, 90, 77]},
    {"name": "Bopha", "scores": [95, 88, 90]},
    {"name": "Rin",   "scores": [60, 72, 70]},
]

def get_average(scores):
    pass

def get_grade(avg):
    pass

# Sort by average descending and print leaderboard
`,
        solution: `students = [
    {"name": "Dara",  "scores": [85, 90, 77]},
    {"name": "Bopha", "scores": [95, 88, 90]},
    {"name": "Rin",   "scores": [60, 72, 70]},
]

def get_average(scores):
    return round(sum(scores) / len(scores), 1)

def get_grade(avg):
    if avg >= 90: return "A"
    if avg >= 80: return "B"
    if avg >= 70: return "C"
    if avg >= 60: return "D"
    return "F"

ranked = sorted(students, key=lambda s: get_average(s["scores"]), reverse=True)

print("=== Class Leaderboard ===")
for i, s in enumerate(ranked, 1):
    avg   = get_average(s["scores"])
    grade = get_grade(avg)
    print(f"{i}. {s['name']:<8} — Avg: {avg} — Grade: {grade}")`,
        outputLines: [
          "=== Class Leaderboard ===",
          "1. Bopha    — Avg: 91.0 — Grade: A",
          "2. Dara     — Avg: 84.0 — Grade: B",
          "3. Rin      — Avg: 67.3 — Grade: D",
        ],
        aiWelcome: "Grade Manager Challenge! 🏆\n\nThis combines dictionaries, lists, functions, sorting, and comprehension — almost everything you've learned!\n\nBreak it down: write get_average() first, test it, then get_grade(), then the leaderboard.",
        aiSuggestions: [
          "How do I sort a list of dictionaries?",
          "How do I use enumerate with a start value?",
          "Give me a hint on the leaderboard",
        ],
        aiResponses: {
          "How do I sort a list of dictionaries?":
            "Use sorted() with a key function! 🔑\n\n```python\nstudents = [\n    {\"name\": \"Dara\",  \"avg\": 84},\n    {\"name\": \"Bopha\", \"avg\": 91},\n]\n\n# Sort by avg ascending\nsorted(students, key=lambda s: s[\"avg\"])\n\n# Sort by avg descending (highest first)\nsorted(students, key=lambda s: s[\"avg\"], reverse=True)\n```",
        },
      },
    ],
  },
  {
    section: "Module 6: OOP Basics",
    sectionKh: "ម៉ូឌុល ៦: OOP",
    lessons: [
      {
        id: 22,
        title: "Classes & Objects",
        titleKh: "Classes & Objects",
        type: "theory",
        duration: "20 min",
        xpReward: 50,
        done: false,
        locked: false,
        theory: [
          {
            type: "intro",
            body: "A class is a blueprint for creating objects. Objects bundle data (attributes) and behaviour (methods) together. This is Object-Oriented Programming (OOP).",
          },
          {
            type: "code",
            title: "Creating a class",
            code: 'class Student:\n    def __init__(self, name, age, gpa):\n        self.name = name\n        self.age  = age\n        self.gpa  = gpa\n\n    def introduce(self):\n        return f"Hi! I\'m {self.name}, {self.age} years old."\n\n    def is_honours(self):\n        return self.gpa >= 3.5\n\n# Create objects (instances)\ndara  = Student("Dara",  20, 3.8)\nbopha = Student("Bopha", 19, 3.2)\n\nprint(dara.introduce())    # Hi! I\'m Dara, 20 years old.\nprint(dara.is_honours())   # True\nprint(bopha.is_honours())  # False',
          },
          {
            type: "terms",
            items: [
              { term: "class", termKh: "ថ្នាក់", desc: "Blueprint for creating objects" },
              { term: "__init__", termKh: "អ្នកកសាង", desc: "Constructor — runs when object is created" },
              { term: "self", termKh: "ខ្លួនឯង", desc: "Refers to the current instance" },
              { term: "attribute", termKh: "គុណលក្ខណ៍", desc: "Data stored on an object (self.name)" },
              { term: "method", termKh: "វិធីសាស្ត្រ", desc: "Function defined inside a class" },
            ],
          },
        ],
        aiWelcome: "Lesson 22: Classes & Objects 🏗️\n\nOOP is how large software is built. Think of a class as a cookie cutter, and objects as the cookies — same shape, different ingredients!\n\nTake your time with __init__ and self. 🐍",
        aiSuggestions: [
          "What is self?",
          "Why do we need __init__?",
          "What is the difference between a class and an object?",
          "Explain OOP in Khmer",
        ],
        aiResponses: {
          "What is self?":
            "self refers to **the specific object** calling the method! 🔍\n\n```python\nclass Dog:\n    def __init__(self, name):\n        self.name = name   # THIS dog's name\n\n    def bark(self):\n        print(f\"{self.name} says: Woof!\")  # uses THIS dog's name\n\nrex   = Dog(\"Rex\")\nbuddy = Dog(\"Buddy\")\n\nrex.bark()    # Rex says: Woof!\nbuddy.bark()  # Buddy says: Woof!\n```\n\nWhen you call rex.bark(), Python automatically passes rex as self.",
          "Explain OOP in Khmer":
            "OOP ជា​ការ​សរ​សេរ​កូដ​ដែល​模仿​ពិភព​លោក​ជា​ក់​ស្ដែង! 🌍\n\n```\nClass  = ប្លង់ (blueprint)\nObject = វត្ថុ (instance)\n```\n\n```python\n# Class = ប្លង់រថយន្ត\nclass Car:\n    def __init__(self, brand, color):\n        self.brand = brand\n        self.color = color\n\n# Objects = រថយន្ត​ជា​ក់​ស្ដែង\ntoyota = Car(\"Toyota\", \"White\")\nhonda  = Car(\"Honda\", \"Red\")\n```\n\nrcar ម្នាក់ goal — បង្រួម data + behavior ជាមួយ!",
        },
      },
      {
        id: 23,
        title: "Inheritance",
        titleKh: "ការទទួលមរតក",
        type: "theory",
        duration: "18 min",
        xpReward: 50,
        done: false,
        locked: false,
        theory: [
          {
            type: "intro",
            body: "Inheritance lets a child class reuse all code from a parent class, then extend or override it. This avoids duplication — write once, reuse everywhere.",
          },
          {
            type: "code",
            title: "Parent and child classes",
            code: 'class Person:\n    def __init__(self, name, age):\n        self.name = name\n        self.age  = age\n\n    def introduce(self):\n        return f"I am {self.name}, {self.age} years old."\n\nclass Student(Person):   # inherits from Person\n    def __init__(self, name, age, student_id):\n        super().__init__(name, age)  # call parent __init__\n        self.student_id = student_id\n\n    def study(self):\n        return f"{self.name} is studying!"\n\ndara = Student("Dara", 20, "KH001")\nprint(dara.introduce())   # inherited from Person!\nprint(dara.study())       # Student method',
          },
          {
            type: "tip",
            title: "super() calls the parent",
            body: "super().__init__() runs the parent class constructor. Always call it first in the child __init__ to set up inherited attributes.",
          },
        ],
        aiWelcome: "Lesson 23: Inheritance 🧬\n\nInheritance is the 'I' in OOP — it lets you build on existing classes without copying code.\n\nThink: Student IS-A Person, so Student inherits everything from Person! 🐍",
        aiSuggestions: [
          "What does super() do?",
          "Can a class inherit from multiple parents?",
          "What is method overriding?",
        ],
        aiResponses: {
          "What is method overriding?":
            "Override = redefine a parent method in the child class! 🔄\n\n```python\nclass Animal:\n    def speak(self):\n        return \"Some sound\"\n\nclass Dog(Animal):\n    def speak(self):       # overrides Animal.speak\n        return \"Woof!\"\n\nclass Cat(Animal):\n    def speak(self):       # overrides Animal.speak\n        return \"Meow!\"\n\ndog = Dog()\ncat = Cat()\nprint(dog.speak())  # Woof!\nprint(cat.speak())  # Meow!\n```",
        },
      },
      {
        id: 24,
        title: "Final Project: Student Manager",
        titleKh: "គម្រោងចុងក្រោយ: ប្រព័ន្ធសិស្ស",
        type: "challenge",
        duration: "40 min",
        xpReward: 300,
        done: false,
        locked: false,
        challenge: {
          title: "Student Management System",
          titleKh: "ប្រព័ន្ធគ្រប់គ្រងសិស្ស",
          difficulty: "Hard",
          description: "Build a full Student Management System using OOP. The system should let you add students, record grades, and generate a class report — all using classes.",
          requirements: [
            "Class Student: name, id, grades list. Methods: add_grade(), get_average(), get_grade_letter()",
            "Class Classroom: list of students. Methods: add_student(), get_top_student(), print_report()",
            "print_report() shows all students sorted by average, highest first",
            "get_top_student() returns the student with the highest average",
          ],
          expectedOutput: [
            "=== Class Report ===",
            "1. Bopha   (KH002) — Avg: 91.0 — Grade: A 🏆 Top Student",
            "2. Dara    (KH001) — Avg: 84.0 — Grade: B",
            "3. Rin     (KH003) — Avg: 67.3 — Grade: D",
          ],
          xp: 300,
        },
        codeTemplate: `class Student:
    def __init__(self, name, student_id):
        self.name       = name
        self.student_id = student_id
        self.grades     = []

    def add_grade(self, grade):
        pass

    def get_average(self):
        pass

    def get_grade_letter(self):
        pass


class Classroom:
    def __init__(self):
        self.students = []

    def add_student(self, student):
        pass

    def get_top_student(self):
        pass

    def print_report(self):
        pass


# Demo
room = Classroom()
dara  = Student("Dara",  "KH001")
bopha = Student("Bopha", "KH002")
rin   = Student("Rin",   "KH003")

for grade in [85, 90, 77]:  dara.add_grade(grade)
for grade in [95, 88, 90]:  bopha.add_grade(grade)
for grade in [60, 72, 70]:  rin.add_grade(grade)

room.add_student(dara)
room.add_student(bopha)
room.add_student(rin)

room.print_report()`,
        solution: `class Student:
    def __init__(self, name, student_id):
        self.name       = name
        self.student_id = student_id
        self.grades     = []

    def add_grade(self, grade):
        self.grades.append(grade)

    def get_average(self):
        if not self.grades:
            return 0
        return round(sum(self.grades) / len(self.grades), 1)

    def get_grade_letter(self):
        avg = self.get_average()
        if avg >= 90: return "A"
        if avg >= 80: return "B"
        if avg >= 70: return "C"
        if avg >= 60: return "D"
        return "F"


class Classroom:
    def __init__(self):
        self.students = []

    def add_student(self, student):
        self.students.append(student)

    def get_top_student(self):
        return max(self.students, key=lambda s: s.get_average())

    def print_report(self):
        top = self.get_top_student()
        ranked = sorted(self.students, key=lambda s: s.get_average(), reverse=True)
        print("=== Class Report ===")
        for i, s in enumerate(ranked, 1):
            tag = " 🏆 Top Student" if s == top else ""
            print(f"{i}. {s.name:<8} ({s.student_id}) — Avg: {s.get_average()} — Grade: {s.get_grade_letter()}{tag}")`,
        outputLines: [
          "=== Class Report ===",
          "1. Bopha    (KH002) — Avg: 91.0 — Grade: A 🏆 Top Student",
          "2. Dara     (KH001) — Avg: 84.0 — Grade: B",
          "3. Rin      (KH003) — Avg: 67.3 — Grade: D",
        ],
        aiWelcome: "🎓 Final Project: Student Management System!\n\nThis is your capstone challenge — it uses EVERYTHING you've learned:\n✅ Classes & OOP\n✅ Lists & Dictionaries\n✅ Functions\n✅ Sorting & Comprehension\n\nTake your time. You've got this! 💪🇰🇭",
        aiSuggestions: [
          "Where do I start?",
          "How does get_top_student work?",
          "What does max() with a key do?",
          "I'm stuck on print_report",
        ],
        aiResponses: {
          "Where do I start?":
            "Start small — finish one method at a time! 🪜\n\n**Step 1:** Implement `Student.add_grade()` and `Student.get_average()`. Test:\n```python\ndara = Student(\"Dara\", \"KH001\")\ndara.add_grade(85)\ndara.add_grade(90)\nprint(dara.get_average())  # should be 87.5\n```\n\n**Step 2:** `get_grade_letter()` — just if/elif chain.\n\n**Step 3:** `Classroom.add_student()` — just append.\n\n**Step 4:** `get_top_student()` — use max() with key.\n\n**Step 5:** `print_report()` — sort + loop.",
          "What does max() with a key do?":
            "max() finds the largest item, and `key` tells it how to measure! 🏆\n\n```python\nstudents = [dara, bopha, rin]\n\n# Without key — compares the objects directly (error!)\nmax(students)  # ❌\n\n# With key — compare by average\ntop = max(students, key=lambda s: s.get_average())\nprint(top.name)  # Bopha (highest avg)\n```\n\nSame pattern works with sorted()!",
        },
      },
    ],
  },
]

/* ── Flat list of all lessons (for easy lookup) ──────────────────────── */

export const ALL_LESSONS = PYTHON_MODULES.flatMap((m) => m.lessons)

/* ── Default AI messages ─────────────────────────────────────────────── */

export const DEFAULT_AI_WELCOME: IMessage = {
  role: "ai",
  content: "សួស្ដី! ខ្ញុំជា KodeKH AI — គ្រូបង្ហាត់ AI របស់អ្នក 🎓\n\nSelect a lesson from the sidebar to get started. Ask me anything in Khmer or English! 🐍",
  time: "Just now",
}

/* ── Legacy exports (keep for backward compat) ───────────────────────── */

export const courseOutline = PYTHON_MODULES.map((m) => ({
  section: m.section,
  lessons: m.lessons,
}))
