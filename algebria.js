// Текст формасын табуу
const textForm = document.getElementById("text-form");
const textarea = textForm.querySelector("textarea");

// Жоопту көрсөтүү үчүн DIV түзүү
const resultDiv = document.createElement("div");
resultDiv.style.marginTop = "20px";
textForm.appendChild(resultDiv);

// Math.js колдонуу менен маселени чечүү
textForm.addEventListener("submit", (event) => {
    event.preventDefault(); // Форманын кайра жүктөлүшүн алдын алуу

    const input = textarea.value.trim(); // Киргизилген текстти алуу
    if (!input) {
        resultDiv.textContent = "Сураныч, маселени киргизиңиз!";
        return;
    }

    // Текстти тазалоо жана форматтоо
    let cleanedText = input
        .replace(/[^0-9+\-*/().^Xx]/g, "") // Кирүүчү ката белгелерди алып салуу
        .replace(/X/g, "*") // "X" символдорун * символуна алмаштыруу
        .replace(/fi/g, "f") // "fi" аракети менен болгон катаны оңдоо
        .replace(/i/g, "")  // "i" киргизилгенди алып салуу (керексиз тексттерди тазалоо)
        .replace(/[^0-9+\-*/().^]/g, "") // Математикалык белгилерден тышкары элементтерди алып салуу
        .trim(); // Артыкча боштук менен тактоо

    try {
        // Math.js аркылуу маселени чечүү
        const solution = math.evaluate(cleanedText);
        resultDiv.textContent = `Чечим: ${solution}`;
    } catch (error) {
        resultDiv.textContent = "Математикалык маселени туура киргизиңиз!";
    }
});

// Сүрөт жүктөө жана окуу үчүн форма
const imageForm = document.getElementById("image-form");
const fileInput = document.getElementById("file-input");
const outputDiv = document.getElementById("output");

imageForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const file = fileInput.files[0];
    if (!file) {
        outputDiv.textContent = "Сураныч, файл жүктөңүз!";
        return;
    }

    Tesseract.recognize(file, 'eng', {
        logger: (info) => console.log(info), // Прогресс логун көрсөтүү
    }).then(({ data: { text } }) => {
        outputDiv.textContent = `Окулган текст: ${text}`;

        // Текстти тазалоо жана форматтоо
        let cleanedText = text
            .replace(/[^0-9+\-*/().^Xx]/g, "") // Кирүүчү ката белгелерди алып салуу
            .replace(/X/g, "*") // "X" символдорун * символуна алмаштыруу
            .replace(/fi/g, "f") // "fi" аракети менен болгон катаны оңдоо
            .replace(/i/g, "")  // "i" киргизилгенди алып салуу (керексиз тексттерди тазалоо)
            .replace(/[^0-9+\-*/().^]/g, "") // Математикалык белгилерден тышкары элементтерди алып салуу
            .trim(); // Артыкча боштук менен тактоо

        // Математикалык текстти чечүү
        try {
            const solution = math.evaluate(cleanedText);
            outputDiv.textContent += `\nЧечим: ${solution}`;
        } catch (error) {
            outputDiv.textContent += "\nМатематикалык маселени туура киргизиңиз!";
        }
    }).catch((error) => {
        outputDiv.textContent = `Ката: ${error.message}`;
    });
});