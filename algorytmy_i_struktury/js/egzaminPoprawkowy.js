'use strict';

let promise = Promise.resolve();  // Used to hold chain of typesetting calls
const DateTime = luxon.DateTime;

const upIcon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12" width="12" height="12"><path d="M6 4c-.2 0-.4.1-.5.2L2.2 7.5c-.3.3-.3.8 0 1.1.3.3.8.3 1.1 0L6 5.9l2.7 2.7c.3.3.8.3 1.1 0 .3-.3.3-.8 0-1.1L6.6 4.3C6.4 4.1 6.2 4 6 4Z"></path></svg>';
const downIcon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12" width="12" height="12"><path d="M6 8.825c-.2 0-.4-.1-.5-.2l-3.3-3.3c-.3-.3-.3-.8 0-1.1.3-.3.8-.3 1.1 0l2.7 2.7 2.7-2.7c.3-.3.8-.3 1.1 0 .3.3.3.8 0 1.1l-3.2 3.2c-.2.2-.4.3-.6.3Z"></path></svg>';

const students = [
  { id: 85090, fullName: 'Černiavski Tomas' },
  { id: 85015, fullName: 'Chmelevski Tomaš' },
  { id: 85088, fullName: 'Franckevič Kšyštof' },
  { id: 85092, fullName: 'Jakubovskis Dominik' },
  { id: 85120, fullName: 'Kovalevskij Deivid' },
  { id: 85286, fullName: 'Kudžma Valdemar' },
  { id: 85079, fullName: 'Markevič Beata' },
  { id: 85109, fullName: 'Miloš Rafal' },
  { id: 83241, fullName: 'Nazarovas Edvinas'},
  { id: 83242, fullName: 'Pavlovič Sebastian'},
  { id: 85083, fullName: 'Praitnickas Rafal'},
  { id: 85117, fullName: 'Straževičiūtė Edita' },
  { id: 85115, fullName: 'Šturo Edmond' },
  { id: 71304, fullName: 'Trojko Daniel'},
];

const problemsList = [
  {
    id: 1,
    title: 'Emergency Room Triage System',
    description: 'Zaprojektuj program do zarządzania pacjentami w izbie przyjęć z wykorzystaniem kolejki priorytetowej na podstawie ciężkości ich stanu. Pacjentom z cięższymi stanami należy przyznać wyższy priorytet.',
    example: ' ',
    examplePrint: '',
    functionDescription: ``,
    print: '',
    inputFormat: `<pre>
Patient 1: Name: John, Condition: Critical
Patient 2: Name: Mary, Condition: Moderate
Patient 3: Name: David, Condition: Severe
</pre>`,
    constraints: '',
    outputFormat: `<pre>
Next Patient: David (Severe)
Next Patient: John (Critical)
Next Patient: Mary (Moderate)
</pre>`,
    sampleInput: '',
    sampleOutput: '',
    explanation: `
    Input: <pre>Patient 1: Name: John, Condition: Critical
Patient 2: Name: Mary, Condition: Moderate
Patient 3: Name: David, Condition: Severe</pre><br>
Expected Output: <pre>Next Patient: David (Severe)
Next Patient: John (Critical)
Next Patient: Mary (Moderate)</pre>
<br><br>
Input: <pre>Patient 1: Name: Sarah, Condition: Severe
Patient 2: Name: Alex, Condition: Critical
Patient 3: Name: Lisa, Condition: Moderate</pre><br>
Expected Output: <pre>Next Patient: Alex (Critical)
Next Patient: Sarah (Severe)
Next Patient: Lisa (Moderate)</pre><br><br>`,
    hints: '',
    code: `// Code to implement an Emergency Room Triage System using a priority queue
// ...

int main(void) {
    // ...
    // Wprowadzaj i przetwarzaj dane pacjenta
    // ...

    // Ustaw pacjentów w kolejce priorytetowej
    // ...

    // Przetwarzaj pacjentów w oparciu o priorytet
    // ...

    // Usuń z kolejki i lecz pacjentów
    // ...

    return 0;
}`
  },
  {
    id: 2,
    title: 'Stock Market Analysis',
    description: 'Zaimplementuj program do analizy danych giełdowych przy użyciu struktury danych sterty, aby zidentyfikować najlepsze akcje na podstawie zmian ich cen.',
    example: ' ',
    examplePrint: '',
    functionDescription: ``,
    print: '',
    inputFormat: `<pre>Stock 1: Symbol: AAPL, Price Change: 5.2%
Stock 2: Symbol: GOOGL, Price Change: 3.8%
Stock 3: Symbol: AMZN, Price Change: -1.5%
</pre>`,
    constraints: '',
    outputFormat: `<pre>Top-performing Stocks:
AAPL (+5.2%)
GOOGL (+3.8%)
</pre>`,
    sampleInput: '',
    sampleOutput: '',
    explanation: `Input: <br><pre>Stock 1: Symbol: AAPL, Price Change: 5.2%
Stock 2: Symbol: GOOGL, Price Change: 3.8%
Stock 3: Symbol: AMZN, Price Change: -1.5%</pre>
Expected Output: <pre>Top-performing Stocks:
AAPL (+5.2%)
GOOGL (+3.8%)</pre>
<br>
Input: <br><pre>Stock 1: Symbol: MSFT, Price Change: 2.1%
Stock 2: Symbol: FB, Price Change: -0.7%
Stock 3: Symbol: NFLX, Price Change: 4.3%</pre>
Expected Output: <pre>Top-performing Stocks:
NFLX (+4.3%)
MSFT (+2.1%)</pre>`,
    hints: '',
    code: `// Code to implement Stock Market Analysis using a heap
// ...

int main(void) {
    // ...
    // Wprowadzanie i przetwarzanie danych magazynowych
    // ...

    // Dodaj zapasy do sterty
    // ...

    // Analizuj zapasy na podstawie zmian cen
    // ...

    // Pobieraj akcje o najlepszych wynikach
    // ...

    return 0;
}
`
  },
  {
    id: 3,
    title: 'Task Scheduling',
    description: 'Zaimplementuj program do planowania zadań na podstawie ich priorytetu. Zadania o wyższym priorytecie powinny być wykonywane w pierwszej kolejności.',
    example: ' ',
    examplePrint: '',
    functionDescription: ``,
    print: '',
    inputFormat: `<pre>Task 1: Name: Write report, Priority: High
Task 2: Name: Check email, Priority: Low
Task 3: Name: Prepare presentation, Priority: Medium</pre>`,
    constraints: '',
    outputFormat: `<pre>Next Task: Write report (High)
Next Task: Prepare presentation (Medium)
Next Task: Check email (Low)
</pre>`,
    sampleInput: '',
    sampleOutput: '',
    explanation: `Input: <pre>Task 1: Name: Write report, Priority: High
Task 2: Name: Check email, Priority: Low
Task 3: Name: Prepare presentation, Priority: Medium</pre><br>
Expected Output: <pre>Next Task: Write report (High)
Next Task: Prepare presentation (Medium)
Next Task: Check email (Low)</pre>
<br><br>
Input: <pre>Task 1: Name: Debug code, Priority: Medium
Task 2: Name: Attend meeting, Priority: Low
Task 3: Name: Optimize algorithm, Priority: High</pre><br>
Expected Output: <pre>Next Task: Optimize algorithm (High)
Next Task: Debug code (Medium)
Next Task: Attend meeting (Low)</pre><br><br>`,
    hints: '',
    code: `// Code to implement Task Scheduling using a priority queue
// ...

int main(void) {
    // ...
    // Wprowadzanie i przetwarzanie danych zadania
    // ...

    // Kolejkuj zadania w kolejce priorytetowej
    // ...

    // Wykonuj zadania w oparciu o priorytety
    // ...

    // Usuń z kolejki i oznacz zadania jako zakończone
    // ...

    return 0;
}
`
  },
  {
    id: 4,
    title: 'Priority-based Messaging System',
    description: 'Zaimplementuj system przesyłania wiadomości oparty na priorytetach przy użyciu struktury danych sterty. Wiadomości o wyższym priorytecie powinny być dostarczane jako pierwsze.',
    example: ' ',
    examplePrint: '',
    functionDescription: ``,
    print: '',
    inputFormat: `<pre>Message 1: ID: M1, Priority: High
Message 2: ID: M2, Priority: Medium
Message 3: ID: M3, Priority: Low
</pre>`,
    constraints: '',
    outputFormat: `<pre>Delivered Messages:
M1 (Priority: High)
M2 (Priority: Medium)
</pre>`,
    sampleInput: '',
    sampleOutput: '',
    explanation: `Input: <br><pre>Message 1: ID: M1, Priority: High
Message 2: ID: M2, Priority: Medium
Message 3: ID: M3, Priority: Low</pre>
Expected Output: <pre>Delivered Messages:
M1 (Priority: High)
M2 (Priority: Medium)</pre>
<br>
Input: <br><pre>Message 1: ID: M4, Priority: Low
Message 2: ID: M5, Priority: High
Message 3: ID: M6, Priority: Medium</pre>
Expected Output: <pre>Delivered Messages:
M5 (Priority: High)
M6 (Priority: Medium)</pre>`,
    hints: '',
    code: `// Code to implement Priority-based Messaging System using a heap
// ...

int main(void) {
    // ...
    // Wprowadź i przetwórz dane wiadomości
    // ...

    // Dodaj wiadomości do sterty
    // ...

    // Dostarczaj wiadomości na podstawie priorytetu
    // ...

    // Odbierz dostarczone wiadomości
    // ...

    return 0;
}
`
  },
  {
    id: 5,
    title: 'Network Packet Scheduling',
    description: 'Utwórz program do planowania pakietów sieciowych do transmisji na podstawie ich priorytetu. Pakiety o wyższym priorytecie powinny być wysyłane jako pierwsze.',
    example: ' ',
    examplePrint: '',
    functionDescription: ``,
    print: '',
    inputFormat: `<pre>Packet 1: ID: 1234, Priority: High
Packet 2: ID: 5678, Priority: Medium
Packet 3: ID: 9012, Priority: Low
</pre>`,
    constraints: '',
    outputFormat: `<pre>Next Packet: 1234 (High)
Next Packet: 5678 (Medium)
Next Packet: 9012 (Low)
</pre>`,
    sampleInput: '',
    sampleOutput: '',
    explanation: `Input: <pre>Packet 1: ID: 1234, Priority: High
Packet 2: ID: 5678, Priority: Medium
Packet 3: ID: 9012, Priority: Low</pre>
Expected Output: <pre>Next Packet: 1234 (High)
Next Packet: 5678 (Medium)
Next Packet: 9012 (Low)</pre><br>
<br><br>
Input: <pre>Packet 1: ID: 9876, Priority: Medium
Packet 2: ID: 5432, Priority: Low
Packet 3: ID: 1098, Priority: High</pre>
Expected Output: <pre>Next Packet: 1098 (High)
Next Packet: 9876 (Medium)
Next Packet: 5432 (Low)</pre><br>`,
    hints: '',
    code: `// Code to implement Network Packet Scheduling using a priority queue
// ...

int main(void) {
    // ...
    // Wprowadzanie i przetwarzanie danych pakietowych
    // ...

    // Ustawiaj pakiety w kolejce priorytetowej
    // ...

    // Przesyłaj pakiety na podstawie priorytetu
    // ...

    // Usuń z kolejki i oznacz pakiety jako wysłane
    // ...

    return 0;
}
`
  },
  {
    id: 6,
    title: 'Phonebook Management',
    description: 'Opracuj program do zarządzania książką telefoniczną przy użyciu drzewa BST lub AVL. Program powinien umożliwiać użytkownikom wydajne dodawanie kontaktów, wyszukiwanie kontaktów i usuwanie kontaktów.',
    example: ' ',
    examplePrint: '',
    functionDescription: ``,
    print: '',
    inputFormat: `<pre>Contact 1: Name: John, Phone: 1234567890
Contact 2: Name: Mary, Phone: 9876543210
Contact 3: Name: David, Phone: 4567890123
</pre>`,
    constraints: '',
    outputFormat: `<pre>Phonebook:
- John: 1234567890
- Mary: 9876543210
- David: 4567890123
</pre>`,
    sampleInput: '',
    sampleOutput: '',
    explanation: `Input:<br> <pre>Contact 1: Name: John, Phone: 1234567890
Contact 2: Name: Mary, Phone: 9876543210
Contact 3: Name: David, Phone: 4567890123</pre>
Expected Output: <pre>Phonebook:
- John: 1234567890
- Mary: 9876543210
- David: 4567890123</pre>
<br>
Input: <br><pre>Contact 1: Name: Sarah, Phone: 1112223333
Contact 2: Name: Alex, Phone: 4445556666
Contact 3: Name: Lisa, Phone: 7778889999</pre>
Expected Output: <pre>Phonebook:
- Alex: 4445556666
- Lisa: 7778889999
- Sarah: 1112223333</pre>`,
    hints: '',
    code: `// Code to implement Phonebook Management using a BST or AVL tree
// ...

int main(void) {
    // ...
    // Wprowadzaj i przetwarzaj dane książki telefonicznej
    // ...

    // Zbuduj drzewo BST lub AVL z danych książki telefonicznej
    // ...

    // Wykonuj operacje, takie jak dodawanie, wyszukiwanie i usuwanie kontaktów
    // ...

    return 0;
}
`
  },
  {
    id: 7,
    title: 'Airline Boarding',
    description: 'Opracuj program do zarządzania wchodzeniem pasażerów na pokład samolotu przy użyciu kolejki priorytetowej w oparciu o priorytet ich miejsc.',
    example: ' ',
    examplePrint: '',
    functionDescription: ``,
    print: '',
    inputFormat: `<pre>Passenger 1: Name: John, Seat: First Class
Passenger 2: Name: Mary, Seat: Economy
Passenger 3: Name: David, Seat: Business Class</pre>`,
    constraints: '',
    outputFormat: `<pre>Next Passenger: David (Business Class)
Next Passenger: John (First Class)
Next Passenger: Mary (Economy)</pre>`,
    sampleInput: '',
    sampleOutput: '',
    explanation: `Input: <pre>Passenger 1: Name: John, Seat: First Class
Passenger 2: Name: Mary, Seat: Economy
Passenger 3: Name: David, Seat: Business Class</pre><br>
Expected Output: <pre>Next Passenger: David (Business Class)
Next Passenger: John (First Class)
Next Passenger: Mary (Economy)</pre>
<br><br>
Input: <pre>Passenger 1: Name: Sarah, Seat: Economy
Passenger 2: Name: Alex, Seat: First Class
Passenger 3: Name: Lisa, Seat: Business Class</pre><br>
Expected Output: <pre>Next Passenger: Alex (First Class)
Next Passenger: Lisa (Business Class)
Next Passenger: Sarah (Economy)</pre><br>`,
    hints: '',
    code: `// Code to implement Airline Boarding using a priority queue
// ...

int main(void) {
    // ...
    // Wprowadzaj i przetwarzaj dane pasażerów
    // ...

    // Ustaw pasażerów w kolejce priorytetowej
    // ...

    // Wejdź na pokład pasażerów na podstawie pierwszeństwa
    // ...

    // Usuń z kolejki i oznacz pasażerów jako wchodzących na pokład
    // ...

    return 0;
}
`
  },
  {
    id: 8,
    title: 'File System Organization',
    description: 'Zaprojektuj program do organizowania plików i katalogów za pomocą drzewa BST lub AVL. Program powinien umożliwiać sprawne przeszukiwanie i manipulowanie strukturą systemu plików.',
    example: ' ',
    examplePrint: '',
    functionDescription: ``,
    print: '',
    inputFormat: `<pre>Directory 1: Name: Documents
  - File 1: Name: report.docx
  - File 2: Name: notes.txt
Directory 2: Name: Photos
  - File 1: Name: vacation.jpg
  - File 2: Name: family.jpg
</pre>`,
    constraints: '',
    outputFormat: `<pre>File System:
- Documents
  - report.docx
  - notes.txt
- Photos
  - vacation.jpg
  - family.jpg
</pre>`,
    sampleInput: '',
    sampleOutput: '',
    explanation: `Input:<br> <pre>Directory 1: Name: Documents
- File 1: Name: report.docx
- File 2: Name: notes.txt
Directory 2: Name: Photos
- File 1: Name: vacation.jpg
- File 2: Name: family.jpg</pre>
Expected Output:<br> <pre>File System:
- Documents
- report.docx
- notes.txt
- Photos
- vacation.jpg
- family.jpg</pre>
<br>
Input:<br> <pre>Directory 1: Name: Music
- File 1: Name: song1.mp3
- File 2: Name: song2.mp3
Directory 2: Name: Videos
- File 1: Name: video1.mp4</pre>
Expected Output:<br> <pre>File System:
- Music
- song1.mp3
- song2.mp3
- Videos
- video1.mp4</pre>`,
    hints: '',
    code: `// Code to implement File System Organization using a BST or AVL tree
// ...

int main(void) {
    // ...
    // Wprowadzanie i przetwarzanie danych systemu plików
    // ...

    // Zbuduj drzewo BST lub AVL z danych systemu plików
    // ...

    // Wykonuj operacje, takie jak wyszukiwanie plików, dodawanie plików/katalogów i usuwanie plików/katalogów
    // ...

    return 0;
}
`
  },
  {
    id: 9,
    title: 'CPU Process Scheduling',
    description: 'Zaimplementuj program do planowania procesów do wykonania na procesorze przy użyciu kolejki priorytetów na podstawie ich priorytetu. Procesy o wyższym priorytecie powinny być wykonywane w pierwszej kolejności.',
    example: ' ',
    examplePrint: '',
    functionDescription: ``,
    print: '',
    inputFormat: `<pre>Process 1: ID: P1, Priority: High
Process 2: ID: P2, Priority: Low
Process 3: ID: P3, Priority: Medium</pre>`,
    constraints: '',
    outputFormat: `<pre>Next Process: P1 (High)
Next Process: P3 (Medium)
Next Process: P2 (Low)</pre>`,
    sampleInput: '',
    sampleOutput: '',
    explanation: `Input: <pre>Process 1: ID: P1, Priority: High
Process 2: ID: P2, Priority: Low
Process 3: ID: P3, Priority: Medium</pre><br>
Expected Output: <pre>Next Process: P1 (High)
Next Process: P3 (Medium)
Next Process: P2 (Low)</pre>
<br><br>
Input: <pre>Process 1: ID: P4, Priority: Medium
Process 2: ID: P5, Priority: Low
Process 3: ID: P6, Priority: High</pre>
Expected Output: <pre>Next Process: P6 (High)
Next Process: P4 (Medium)
Next Process: P5 (Low)</pre><br>`,
    hints: '',
    code: `// Code to implement CPU Process Scheduling using a priority queue
// ...

int main(void) {
    // ...
    // Wprowadzanie i przetwarzanie danych procesowych
    // ...

    // Kolejkuj procesy w kolejce priorytetowej
    // ...

    // Wykonuj procesy w oparciu o priorytety
    // ...

    // Usuń z kolejki i oznacz procesy jako zakończone
    // ...

    return 0;
}
`
  },
  {
    id: 10,
    title: 'Student Grade Management',
    description: 'Opracuj program do zarządzania ocenami uczniów za pomocą drzewa BST lub AVL. Program powinien sprawnie obsługiwać operacje takie jak dodawanie uczniów, wyszukiwanie ocen uczniów i aktualizowanie ocen uczniów.',
    example: ' ',
    examplePrint: '',
    functionDescription: ``,
    print: '',
    inputFormat: `<pre>Student 1: Name: John, Grade: A
Student 2: Name: Mary, Grade: B
Student 3: Name: David, Grade: C
</pre>`,
    constraints: '',
    outputFormat: `<pre>Student Grades:
- John: A
- Mary: B
- David: C
</pre>`,
    sampleInput: '',
    sampleOutput: '',
    explanation: `Input:<br> <pre>Student 1: Name: John, Grade: A
Student 2: Name: Mary, Grade: B
Student 3: Name: David, Grade: C</pre>
Expected Output:<br> <pre>Student Grades:
- John: A
- Mary: B
- David: C</pre>
<br>
Input:<br> <pre>Student 1: Name: Sarah, Grade: B
Student 2: Name: Alex, Grade: A
Student 3: Name: Lisa, Grade: B</pre>
Expected Output:<br> <pre>Student Grades:
- Alex: A
- Lisa: B
- Sarah: B</pre>`,
    hints: '',
    code: `// Code to implement Student Grade Management using a BST or AVL tree
// ...

int main(void) {
    // ...
    // Wprowadzaj i przetwarzaj dane uczniów
    // ...

    // Zbuduj drzewo BST lub AVL z danych uczniów
    // ...

    // Wykonuj operacje, takie jak dodawanie uczniów, wyszukiwanie ocen uczniów i aktualizowanie ocen uczniów
    // ...

    return 0;
}
`
  },
  {
    id: 11,
    title: 'Dijkstra\'s Shortest Path Algorithm',
    description: 'Utwórz program do znajdowania najkrótszej ścieżki w grafie, korzystając z algorytmu Dijkstry, który można zaimplementować za pomocą kolejki priorytetowej do przetwarzania węzłów na podstawie ich odległości.',
    example: ' ',
    examplePrint: '',
    functionDescription: ``,
    print: '',
    inputFormat: `<pre>Graph:
A -> B (Weight: 4)
A -> C (Weight: 2)
B -> D (Weight: 5)
C -> D (Weight: 1)
</pre>`,
    constraints: '',
    outputFormat: `<pre>Shortest Path from A to D: A -> C -> D (Distance: 3)
</pre>`,
    sampleInput: '',
    sampleOutput: '',
    explanation: `Input: Graph:<br>
<pre>A -> B (Weight: 4)
A -> C (Weight: 2)
B -> D (Weight: 5)
C -> D (Weight: 1)</pre>
Expected Output: <pre>Shortest Path from A to D: A -> C -> D (Distance: 3)</pre>
<br><br>
Input: Graph:<br>
<pre>A -> B (Weight: 3)
A -> C (Weight: 1)
B -> D (Weight: 2)
C -> D (Weight: 4)</pre>
Expected Output: <pre>Shortest Path from A to D: A -> B -> D (Distance: 5)</pre>`,
    hints: '',
    code: `// Code to implement Dijkstra's Algorithm using a priority queue
// ...

int main(void) {
    // ...
    // Wprowadzanie i przetwarzanie danych wykresu
    // ...

    // Zainicjuj odległości i ustaw węzeł źródłowy
    // ...

    // Umieść węzeł źródłowy w kolejce priorytetowej
    // ...

    // Przetwarzaj węzły i aktualizuj odległości
    // ...

    // Wydrukuj najkrótszą ścieżkę
    // ...

    return 0;
}
`
  },
  {
    id: 12,
    title: 'Text Prediction',
    description: 'Zaimplementuj system przewidywania tekstu za pomocą drzewa Splay. Program powinien skutecznie sugerować następne słowa w oparciu o bieżące dane wejściowe, rozkładając często używane słowa bliżej rdzenia.',
    example: ' ',
    examplePrint: '',
    functionDescription: ``,
    print: '',
    inputFormat: `<pre>Input: "Hello"
</pre>`,
    constraints: '',
    outputFormat: `<pre>Predicted Words:
- Hello, how are you?
- Hello, what's up?
- Hello, nice to meet you
</pre>`,
    sampleInput: '',
    sampleOutput: '',
    explanation: `Input:<br> <pre> "Hello"</pre>
Expected Output:<br> <pre>Predicted Words:
- Hello, how are you?
- Hello, what's up?
- Hello, nice to meet you</pre>
<br>
Input:<br> <pre> "I"</pre>
Expected Output:<br> <pre> Predicted Words:
- I am
- I like
- I want</pre>`,
    hints: '',
    code: `// Code to implement Text Prediction using a Splay tree
// ...

int main(void) {
    // ...
    // Wprowadzanie i przetwarzanie danych tekstowych
    // ...

    // Zbuduj drzewo Splay z danych tekstowych
    // ...

    // Wykonuj operacje przewidywania tekstu
    // ...

    return 0;
}
`
  },
  {
    id: 13,
    title: 'Autocomplete',
    description: 'Zaimplementuj system autouzupełniania za pomocą trie. Program powinien wydajnie sugerować słowa na podstawie przedrostka wprowadzonego przez użytkownika, przechodząc przez trie i znajdując wszystkie możliwe słowa pasujące do przedrostka.',
    example: ' ',
    examplePrint: '',
    functionDescription: ``,
    print: '',
    inputFormat: `<pre>Dictionary Word 1: "apple"
Dictionary Word 2: "banana"
Dictionary Word 3: "car"
</pre>`,
    constraints: '',
    outputFormat: `<pre>Autocomplete:
- Input: "a"
  Suggestions: "apple", "banana"
- Input: "b"
  Suggestions: "banana"
- Input: "c"
  Suggestions: "car"
</pre>`,
    sampleInput: '',
    sampleOutput: '',
    explanation: `Input: <br><pre>Dictionary Word 1: "apple"
Dictionary Word 2: "banana"
Dictionary Word 3: "car"</pre>
Expected Output: <pre>Autocomplete:
- Input: "a"
Suggestions: "apple", "banana"
- Input: "b"
Suggestions: "banana"
- Input: "c"
Suggestions: "car"</pre>
<br>
Input: <br><pre> Dictionary Word 1: "cat"
Dictionary Word 2: "dog"
Dictionary Word 3: "bird"</pre>
Expected Output: <pre>Autocomplete:
- Input: "ca"
Suggestions: "cat"
- Input: "d"
Suggestions: "dog"
- Input: "bi"
Suggestions: "bird"</pre>`,
    hints: '',
    code: `// Code to implement Autocomplete using a trie
// ...

int main(void) {
    // ...
    // Wprowadzaj i przetwarzaj dane słownika
    // ...

    // Zbuduj tri z danych słownika
    // ...

    // Wykonuj operacje autouzupełniania
    // ...

    return 0;
}
`
  },
  {
    id: 14,
    title: 'Spell Checker',
    description: 'Develop a spell checker program using a trie data structure. The program should efficiently check the correctness of words by searching for them in the trie. It should also provide suggestions for misspelled words based on the trie\'s stored dictionary.',
    example: ' ',
    examplePrint: '',
    functionDescription: ``,
    print: '',
    inputFormat: `<pre>Dictionary Word 1: "apple"
Dictionary Word 2: "banana"
Dictionary Word 3: "car"
</pre>`,
    constraints: '',
    outputFormat: `<pre>Spell Checker:
- Correct word: "apple"
- Correct word: "banana"
- Incorrect word: "aple" (Suggested words: "apple")
- Incorrect word: "banan" (Suggested words: "banana")
</pre>`,
    sampleInput: '',
    sampleOutput: '',
    explanation: `Input:<br> <pre>Dictionary Word 1: "apple"
Dictionary Word 2: "banana"
Dictionary Word 3: "car"</pre>
Expected Output:<br> <pre>Spell Checker:
- Correct word: "apple"
- Correct word: "banana"
- Incorrect word: "aple" (Suggested words: "apple")
- Incorrect word: "banan" (Suggested words: "banana")</pre>
<br>
Input:<br> <pre>Dictionary Word 1: "cat"
Dictionary Word 2: "dog"
Dictionary Word 3: "bird"</pre>
Expected Output:<br> <pre>Spell Checker:
- Correct word: "cat"
- Correct word: "dog"
- Incorrect word: "doge" (Suggested words: "dog")
- Incorrect word: "bir" (Suggested words: "bird")</pre>`,
    hints: '',
    code: `// Code to implement Spell Checker using a trie
// ...

int main(void) {
    // ...
    // Wprowadzaj i przetwarzaj dane słownika
    // ...

    // Zbuduj tri z danych słownika
    // ...

    // Wykonaj operacje sprawdzania pisowni
    // ...

    return 0;
}
`
  },
];

const headerMapping = {
  description: 'Opis',
  example: 'Przykład',
  examplePrint: 'Przykład wydrukowania',
  functionDescription: 'Opis funkcji',
  print: 'Wydrukować',
  returns: 'Zwroty',
  inputFormat: 'Format wejściowy',
  constraints: 'Ograniczenia',
  outputFormat: 'Format wyjściowy',
  sampleInput: 'Przykładowe wejście',
  sampleOutput: 'Przykładowe dane wyjściowe',
  sampleInputB: 'Przykładowe wejście 2',
  sampleOutputB: 'Przykładowe dane wyjściowe 2',
  explanation: 'Wyjaśnienie',
  code: 'Kod programu'
};

document.body.onload = loadDocument();

function headerMapper(key) {
  return headerMapping[key] || '';
}

function createCardDiv({id, title}, type = '', entity = '') {
  const cardDiv = document.createElement('div');
  cardDiv.setAttribute('class', 'card');
  const cardHeaderDiv = document.createElement('div');
  cardHeaderDiv.setAttribute('class', 'card-header');
  const cardHeaderTitle = document.createElement('p');
  cardHeaderTitle.setAttribute('class', 'card-header-title is-size-4');
  const entityTitleId = entity + type + id + 'Title';
  cardHeaderTitle.setAttribute('id', entityTitleId);

  const newTitleContent = document.createTextNode(`${id}) ${title}`);
  cardHeaderTitle.appendChild(newTitleContent);

  const cardHeaderButton = document.createElement('button');
  cardHeaderButton.setAttribute('class', 'card-header-icon');
  cardHeaderButton.setAttribute('aria-label', 'more options');
  cardHeaderButton.onclick = function() {
    const content = document.getElementById(entity + type + id + 'Content');
    const footer = document.getElementById(entity + type + id + 'Footer');
    const icon = document.getElementById(entity + type + id + 'Icon');

    if (content) {

      if (content.style.display === 'none') {
        content.style.display = 'block';
        footer.style.display = 'block';
        icon.innerHTML = upIcon;
      } else {
        content.style.display = 'none';
        footer.style.display = 'none';
        icon.innerHTML = downIcon;
      }
    }
  };

  const cardHeaderButtonIcon = document.createElement('span');
  cardHeaderButtonIcon.setAttribute('class', 'icon');

  const cardHeaderButtonIconElem = document.createElement('i');
  cardHeaderButtonIconElem.setAttribute('aria-hidden', 'true');
  cardHeaderButtonIconElem.setAttribute('id', entity + type + id + 'Icon');
  cardHeaderButtonIconElem.innerHTML = downIcon;

  cardHeaderButtonIcon.appendChild(cardHeaderButtonIconElem);

  cardHeaderButton.appendChild(cardHeaderButtonIcon);

  cardHeaderDiv.appendChild(cardHeaderTitle);
  cardHeaderDiv.appendChild(cardHeaderButton);
  cardDiv.appendChild(cardHeaderDiv);

  const cardContentDiv = document.createElement('div');
  cardContentDiv.setAttribute('class', 'card-content');

  const contentDiv = document.createElement('div');
  contentDiv.setAttribute('class', 'content');
  const entityContentId = entity + type + id + 'Content';
  contentDiv.setAttribute('id', entityContentId);
  contentDiv.style.display = 'block';

  cardContentDiv.appendChild(contentDiv);
  cardDiv.appendChild(cardContentDiv);

  const cardFooterDiv = document.createElement('div');
  cardFooterDiv.setAttribute('class', 'card-footer');
  cardFooterDiv.setAttribute('id', entity + type + id + 'Footer');
  cardFooterDiv.style.display = 'block';

  const footerItem = document.createElement('p');
  footerItem.setAttribute('class', 'card-footer-item');

  const footerItemContent = document.createElement('span');

  const footerItemContentTag = document.createElement('a');
  footerItemContentTag.setAttribute('href', '#top');
  footerItemContentTag.innerText = 'top';

  footerItemContent.appendChild(footerItemContentTag);
  footerItem.appendChild(footerItemContent);
  cardFooterDiv.appendChild(footerItem);
  cardDiv.appendChild(cardFooterDiv);

  return { cardDiv, entityContentId, entityTitleId, textValue: title };
}

async function appendSimple(block, value, key = '', entityContentId) {
  let header;

  if (key) {
    header = document.createElement('h3');
    header.innerHTML = headerMapper(key);
  }

  const elem = document.createElement('p');
  elem.setAttribute('id', `${entityContentId}${key}`);
  elem.innerHTML = value;

  if(header) {
    block.appendChild(header);
  }
  block.appendChild(elem);
}

async function appendPre(block, value, key = '') {
  let header;

  if (key) {
    header = document.createElement('h3');
    header.innerHTML = headerMapper(key);
  }

  const elem = document.createElement('pre');
  elem.innerHTML = ( key=== 'code' ) ? value.replaceAll('<', '&lt;').replaceAll('>', '&gt;') : value;
  if (key === 'code') {
    elem.setAttribute('class', 'has-background-black has-text-white-ter');
  }

  if(header) {
    block.appendChild(header);
  }
  block.appendChild(elem);
}

function appendMenuLink(linkId, title, id) {
  const menuBlock = document.getElementById('menuZadania');

  const elem = document.createElement('li');

  const link = document.createElement('a');
  link.setAttribute('href', `#${linkId}`);
  const txt = document.createTextNode(` ${id}) ${title}`);

  const span = document.createElement('span');
  span.setAttribute('class', 'icon is-small');

  const icon = document.createElement('i');
  icon.setAttribute('class', '');
  icon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16"><path d="m7.775 3.275 1.25-1.25a3.5 3.5 0 1 1 4.95 4.95l-2.5 2.5a3.5 3.5 0 0 1-4.95 0 .751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018 1.998 1.998 0 0 0 2.83 0l2.5-2.5a2.002 2.002 0 0 0-2.83-2.83l-1.25 1.25a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042Zm-4.69 9.64a1.998 1.998 0 0 0 2.83 0l1.25-1.25a.751.751 0 0 1 1.042.018.751.751 0 0 1 .018 1.042l-1.25 1.25a3.5 3.5 0 1 1-4.95-4.95l2.5-2.5a3.5 3.5 0 0 1 4.95 0 .751.751 0 0 1-.018 1.042.751.751 0 0 1-1.042.018 1.998 1.998 0 0 0-2.83 0l-2.5 2.5a1.998 1.998 0 0 0 0 2.83Z"></path></svg>`;

  span.appendChild(icon);
  link.appendChild(span);
  link.appendChild(txt);
  elem.appendChild(link);
  menuBlock.appendChild(elem);
}

async function appendProblem(block, problem) {
  const {
    cardDiv,
    entityContentId,
    entityTitleId,
    textValue
  } = createCardDiv(problem, 'Problem', 'problem');

  block.appendChild(cardDiv);
  appendMenuLink(entityTitleId, textValue, problem.id);

  const problemsContentBlock = document.getElementById(entityContentId);

  const {
    description,
    example,
    examplePrint,
    functionDescription,
    print,
    returns,
    inputFormat,
    constraints,
    outputFormat,
    sampleInput,
    sampleOutput,
    sampleInputB,
    sampleOutputB,
    explanation,
    code
  } = problem;

  if (description) {
    await appendSimple(problemsContentBlock, description, '', entityContentId);
  }

  if (example) {
    await appendSimple(problemsContentBlock, example, 'example', entityContentId);
  }

  if (examplePrint) {
    await appendPre(problemsContentBlock, examplePrint, '');
  }

  if (functionDescription) {
    await appendSimple(problemsContentBlock, functionDescription, 'functionDescription', entityContentId);
  }

  if (print) {
    await appendSimple(problemsContentBlock, print, 'print', entityContentId);
  }

  if (returns) {
    await appendSimple(problemsContentBlock, returns, 'returns', entityContentId);
  }

  if (inputFormat) {
    await appendSimple(problemsContentBlock, inputFormat, 'inputFormat', entityContentId);
  }

  if (constraints) {
    await appendSimple(problemsContentBlock, constraints, 'constraints', entityContentId);
  }

  if (outputFormat) {
    await appendSimple(problemsContentBlock, outputFormat, 'outputFormat', entityContentId);
  }

  if (sampleInput) {
    await appendPre(problemsContentBlock, sampleInput, 'sampleInput');
  }

  if (sampleOutput) {
    await appendPre(problemsContentBlock, sampleOutput, 'sampleOutput');
  }

  if (sampleInputB) {
    await appendPre(problemsContentBlock, sampleInputB, 'sampleInput');
  }

  if (sampleOutputB) {
    await appendPre(problemsContentBlock, sampleOutputB, 'sampleOutput');
  }

  if (explanation) {
    await appendSimple(problemsContentBlock, explanation, 'explanation', entityContentId);
  }

  if (code) {
    await appendPre(problemsContentBlock, code, 'code', entityContentId);
  }
}

document.getElementById('losowacZadaniaDlaStudentow').onclick = function() {
  const listaZadanIStudentowBlock = document.getElementById('listaZadanIStudentow');

  if (listaZadanIStudentowBlock) {
    const randProblemsList = shuffle(problemsList, 0.5).map(({id, title}) => ({id, title}));
    listaZadanIStudentowBlock.innerHTML = '';

    const table = document.createElement('table');

    const tableHead = document.createElement('thead');
    const tableBody = document.createElement('tbody');
    const tableFoot = document.createElement('tfoot');

    const trHead = document.createElement('tr');
    const trFoot = document.createElement('tr');

    const colNum = document.createElement('th');
    colNum.innerText = '';
    trHead.appendChild(colNum);

    const colStudent = document.createElement('th');
    colStudent.innerText = '';
    trHead.appendChild(colStudent);

    const colTask = document.createElement('th');
    colTask.innerText = '';
    trHead.appendChild(colTask);

    tableHead.appendChild(trHead);
    tableFoot.appendChild(trFoot);

    table.appendChild(tableHead);
    table.appendChild(tableFoot);
    for (let i=0; i < students.length; i++) {
      const { id, fullName } = students[i];
      const { id: taskId, title } = randProblemsList[i];
      const trBody = document.createElement('tr');

      const colNum = document.createElement('td');
      colNum.innerText = id;
      trBody.appendChild(colNum);

      const colStudent = document.createElement('td');
      colStudent.innerText = fullName;
      trBody.appendChild(colStudent);

      const colTask = document.createElement('td');
      colTask.innerText = `${taskId} ${title}`;
      trBody.appendChild(colTask);

      tableBody.appendChild(trBody);
    }
    table.appendChild(tableBody);

    listaZadanIStudentowBlock.appendChild(table);
  }
};

document.getElementById('zadanieBtn').onclick = async function() {
  const numerZadania = document.getElementById('numerZadania');
  const problemsBlock = document.getElementById('problemsBlock');

  if (!isNaN(parseInt(numerZadania.value))) {
    const num = parseInt(numerZadania.value);
    if (num > -1 && num <= problemsList.length && problemsList[num-1] && problemsBlock) {
        problemsBlock.innerHTML = '';
        await appendProblem(problemsBlock, problemsList[num-1]);
    } else {
      numerZadania.value = '';
      if (problemsBlock) {
        problemsBlock.innerHTML = '';
      }
    }
  } else {
    numerZadania.value = '';
    if (problemsBlock) {
      problemsBlock.innerHTML = '';
    }
  }
};
async function loadDocument () {
  const problemsBlock = document.getElementById('problemsBlock');
  const { pathname, search } = document.location;
  const params = new URLSearchParams(search);
  const num = parseInt(params.get("zadanie"));
  if (pathname.includes('poprawkowy.html') && num > -1 && num <= problemsList.length && problemsList[num-1] && problemsBlock) {
    problemsBlock.innerHTML = '';
    await appendProblem(problemsBlock, problemsList[num-1]);
  }
}
