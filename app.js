let quizData = [];
let currentQuestionIndex = 0;

// Load the current question in the form
function loadQuestion(index) {
    const questionData = quizData[index];

    if (questionData) {
        document.getElementById('question').value = questionData.question;
        document.getElementById('options').value = questionData.options.join('\n');

        const correctAnswerSelect = document.getElementById('correct-answer');
        correctAnswerSelect.innerHTML = `<option value="">Select correct answer</option>`;
        questionData.options.forEach((option, i) => {
            const newOptionElem = document.createElement('option');
            newOptionElem.value = i + 1;
            newOptionElem.textContent = `${i + 1}): ${option}`; // Format: 1): Option text
            correctAnswerSelect.appendChild(newOptionElem);
        });

        correctAnswerSelect.value = questionData.correctAnswerIndex + 1;
    } else {
        document.getElementById('question').value = '';
        document.getElementById('options').value = '';
        document.getElementById('correct-answer').innerHTML = `<option value="">Select correct answer</option>`;
    }

    updateCurrentQuestionNumber(); // Update the counter for current question
}

// Update the counter for the current question
function updateCurrentQuestionNumber() {
    document.getElementById('current-question-number').textContent = `Current Question: ${currentQuestionIndex + 1}`;
}

// Next Question button event
document.getElementById('next-question').addEventListener('click', () => {
    const questionText = document.getElementById('question').value;
    const optionsText = document.getElementById('options').value;

    const options = optionsText.split('\n').map(option => option.trim()).filter(option => option !== "");
    const correctAnswerIndex = document.getElementById('correct-answer').value - 1;

    if (questionText.trim() === '' || options.length === 0 || correctAnswerIndex < 0) {
        alert('Please enter the question, options, and select the correct answer.');
        return;
    }

    const questionData = { question: questionText, options, correctAnswerIndex };

    if (quizData[currentQuestionIndex]) {
        quizData[currentQuestionIndex] = questionData; // Update the existing question data
    } else {
        quizData.push(questionData); // Add new question
    }

    currentQuestionIndex += 1;
    loadQuestion(currentQuestionIndex); // Load the next question
    console.log("Current Quiz Data:", quizData);
});

// Previous Question button event
document.getElementById('previous-question').addEventListener('click', () => {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex -= 1;
        loadQuestion(currentQuestionIndex); // Load the previous question
    }
});

// Listen to options textarea input to update correct answer dropdown
document.getElementById('options').addEventListener('input', () => {
    const optionsText = document.getElementById('options').value;
    const options = optionsText.split('\n').map(option => option.trim()).filter(option => option !== "");

    const correctAnswerSelect = document.getElementById('correct-answer');
    correctAnswerSelect.innerHTML = `<option value="">Select correct answer</option>`;

    options.forEach((option, i) => {
        const newOptionElem = document.createElement('option');
        newOptionElem.value = i + 1;
        newOptionElem.textContent = `${i + 1}): ${option}`;  // Format: 1): Option text
        correctAnswerSelect.appendChild(newOptionElem);
    });
});

// Generate PDF button event with confirmation
document.getElementById('generate-pdf').addEventListener('click', () => {
    // Before generating PDF, save the current question if not already saved
    const questionText = document.getElementById('question').value;
    const optionsText = document.getElementById('options').value;

    const options = optionsText.split('\n').map(option => option.trim()).filter(option => option !== "");
    const correctAnswerIndex = document.getElementById('correct-answer').value - 1;

    if (questionText.trim() !== '' && options.length !== 0 && correctAnswerIndex >= 0) {
        const questionData = { question: questionText, options, correctAnswerIndex };
        if (!quizData[currentQuestionIndex]) {
            quizData.push(questionData); // Save current question if not already saved
        } else {
            quizData[currentQuestionIndex] = questionData; // Update the existing question
        }
    }

    // Prompt for the custom title
    const customTitle = prompt("Enter the title for your quiz PDF:", "Solve Quiz's");

    if (!customTitle) {
        alert("Please enter a title to generate the PDF.");
        return;
    }

    // Confirm dialog
    const confirmAction = window.confirm(`You have ${quizData.length} questions. Are you sure you want to generate the PDF?`);

    if (confirmAction) {
        if (quizData.length === 0) {
            alert('No questions to generate PDF. Please add more questions.');
            return;
        }

        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        let yOffset = 20;
        doc.setFontSize(18);

        // Set the custom title from user input
        doc.text(customTitle, 10, yOffset);
        doc.setFontSize(14);
        yOffset += 10;

        quizData.forEach((item, index) => {
            // Handle question wrapping if too long
            const question = item.question;
            const questionLines = doc.splitTextToSize(question, 180); // 180 is the max width for text

            // Print the first line with the question number
            doc.setFont("Times New Roman", "bold");
            doc.text(`Q${index + 1}: ${questionLines[0]}`, 10, yOffset);
            yOffset += 8;

            // Print the remaining lines of the question
            for (let i = 1; i < questionLines.length; i++) {
                doc.setFont("Times New Roman", "bold");
                doc.text(questionLines[i], 10, yOffset);
                yOffset += 8;
            }

            item.options.forEach((option, i) => {
                const formattedOption = `${i + 1}): ${option}`;  // Format option as "1): Option text"
                if (i === item.correctAnswerIndex) {
                    doc.setTextColor(0, 128, 0);  // Green color for correct answer
                    doc.setFont("Times New Roman", "bold");
                    doc.text(`  ${formattedOption}`, 15, yOffset);
                    doc.setFont("Times New Roman", "normal");
                    doc.setTextColor(0, 0, 0);  // Reset color to black
                } else {
                    doc.text(`  ${formattedOption}`, 15, yOffset);
                }
                yOffset += 8;
            });

            yOffset += 10;

            // Check if the current content fits before adding a new page
            if (yOffset > doc.internal.pageSize.height - 20) {
                doc.addPage();
                yOffset = 20;
            }
        });

        // Download PDF and show success message
        doc.save('Quiz.pdf');
        alert('Thank you for using the quiz PDF generator!');

        clearQuizData(); // Clear quiz data after generating PDF
        setTimeout(() => {
            location.reload(); // Refresh the page after PDF is generated
        }, 1000); // Wait for a second before refreshing the page
    }
});

// Clear quiz data
function clearQuizData() {
    quizData = [];
    currentQuestionIndex = 0;
    loadQuestion(currentQuestionIndex);
    updateCurrentQuestionNumber(); // Reset the counter when clearing data
}

// Initialize the quiz with the first question if exists
loadQuestion(currentQuestionIndex);
updateCurrentQuestionNumber();
