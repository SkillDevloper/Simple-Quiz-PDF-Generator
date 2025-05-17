let quizData = [];
let currentQuestionIndex = 0;
let quizMode = "objective";

// Load the current question in the form
function loadQuestion(index) {
  const questionData = quizData[index];

  if (questionData) {
    document.getElementById("question").value = questionData.question;
    document.getElementById("options").value = questionData.options.join("\n");

    const correctAnswerSelect = document.getElementById("correct-answer");
    correctAnswerSelect.innerHTML = `<option value="">Select correct answer</option>`;
    questionData.options.forEach((option, i) => {
      const newOptionElem = document.createElement("option");
      newOptionElem.value = i + 1;
      newOptionElem.textContent = `${i + 1}): ${option}`;
      correctAnswerSelect.appendChild(newOptionElem);
    });

    correctAnswerSelect.value = questionData.correctAnswerIndex + 1;
  } else {
    document.getElementById("question").value = "";
    document.getElementById("options").value = "";
    document.getElementById(
      "correct-answer"
    ).innerHTML = `<option value="">Select correct answer</option>`;
  }

  updateCurrentQuestionNumber();
  updatePreviewPane();
}

function updateCurrentQuestionNumber() {
  document.getElementById(
    "current-question-number"
  ).textContent = `Current Question: ${currentQuestionIndex + 1}`;
}

function updatePreviewPane() {
  const previewPane = document.getElementById("question-preview");
  previewPane.innerHTML = "";

  quizData.forEach((question, index) => {
    const questionElement = document.createElement("li");
    questionElement.classList.add("border-b", "pb-4", "mb-4");

    const questionText = document.createElement("p");
    questionText.classList.add("font-semibold", "text-lg");
    questionText.textContent = `Q ${index + 1}: ${question.question}`;

    questionElement.appendChild(questionText);

    if (question.type === "subjective") {
      const answerEl = document.createElement("p");
      answerEl.classList.add("italic", "text-sm", "mt-2");
      answerEl.innerHTML = `Expected Answer: ${(
        question.answer || "N/A"
      ).replace(/\n/g, "<br>")}`;
      // answerEl.textContent = `Expected Answer: ${question.answer || "N/A"}`;
      questionElement.appendChild(answerEl);
    } else if (question.type === "objective") {
      const optionsList = document.createElement("ul");
      optionsList.classList.add("ml-4", "space-y-2");

      question.options.forEach((option, i) => {
        const optionItem = document.createElement("li");
        optionItem.textContent = `${i + 1}: ${option}`;
        if (i === question.correctAnswerIndex) {
          optionItem.classList.add("text-green-500");
        }
        optionsList.appendChild(optionItem);
      });
      questionElement.appendChild(optionsList);
    }

    const editDeleteBtns = document.createElement("div");
    editDeleteBtns.classList.add("flex", "gap-2", "mt-2");

    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.classList.add(
      "bg-yellow-500",
      "text-white",
      "px-2",
      "py-1",
      "rounded",
      "text-xs",
      "cursor-pointer"
    );
    editButton.onclick = () => editQuestion(index);

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add(
      "bg-red-500",
      "text-white",
      "px-2",
      "py-1",
      "rounded",
      "text-xs",
      "cursor-pointer"
    );
    deleteButton.onclick = () => deleteQuestion(index);

    editDeleteBtns.appendChild(editButton);
    editDeleteBtns.appendChild(deleteButton);

    questionElement.appendChild(editDeleteBtns);

    previewPane.appendChild(questionElement);
  });
}

function deleteQuestion(index) {
  if (confirm("Are you shure you want to delete?")) {
    quizData.splice(index, 1);
    if (currentQuestionIndex > 0) currentQuestionIndex -= 1;
    loadQuestion(currentQuestionIndex);
    updatePreviewPane();
  }
}

function editQuestion(index) {
  currentQuestionIndex = index;
  loadQuestion(index);
}

document.getElementById("next-question").addEventListener("click", () => {
  const questionText = document.getElementById("question").value;

  if (!questionText.trim()) {
    alert("Please enter the question.");
    return;
  }

  let questionData;

  if (quizMode === "objective") {
    const optionsText = document.getElementById("options").value;
    const options = optionsText
      .split("\n")
      .map((opt) => opt.trim())
      .filter((opt) => opt !== "");
    const correctAnswerIndex =
      document.getElementById("correct-answer").value - 1;

    if (options.length === 0 || correctAnswerIndex < 0) {
      alert("Please enter options and select correct answer.");
      return;
    }

    questionData = {
      question: questionText,
      options,
      correctAnswerIndex,
      type: "objective",
    };
  } else {
    const subjectiveAnswer = document.getElementById("subjective-answer").value;
    questionData = {
      question: questionText,
      answer: subjectiveAnswer,
      type: "subjective",
    };
  }

  quizData[currentQuestionIndex] = questionData;
  currentQuestionIndex += 1;
  loadQuestion(currentQuestionIndex);
});

document.getElementById("previous-question").addEventListener("click", () => {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex -= 1;
    loadQuestion(currentQuestionIndex);
  }
});

document.getElementById("options").addEventListener("input", () => {
  const optionsText = document.getElementById("options").value;
  const options = optionsText
    .split("\n")
    .map((opt) => opt.trim())
    .filter((opt) => opt !== "");

  const correctAnswerSelect = document.getElementById("correct-answer");
  correctAnswerSelect.innerHTML = `<option value="">Select correct answer</option>`;
  options.forEach((option, i) => {
    const newOptionElem = document.createElement("option");
    newOptionElem.value = i + 1;
    newOptionElem.textContent = `${i + 1}): ${option}`;
    correctAnswerSelect.appendChild(newOptionElem);
  });
});

function switchMode(mode) {
  quizMode = mode;

  const objectiveFields = document.getElementById("objective-fields");
  const subjectiveFields = document.getElementById("subjective-fields");

  if (mode === "objective") {
    objectiveFields.classList.remove("hidden");
    subjectiveFields.classList.add("hidden");
  } else {
    objectiveFields.classList.add("hidden");
    subjectiveFields.classList.remove("hidden");
  }

  loadQuestion(currentQuestionIndex);
}

function drawWatermark(doc) {
  doc.setTextColor(150); // Light grey
  doc.setFontSize(20);
  doc.setFont("helvetica", "bold");

  // Set transparency using GState (opacity ~ 10%)
  const gState = doc.context2d ? null : doc.internal.write("q 0.1 g"); // fallback if context2d not supported

  // Center of page
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  doc.saveGraphicsState && doc.saveGraphicsState(); // modern browsers
  doc.setTextColor(180); // light grey again just to ensure

  doc.text("Daniyal Shahid - Quiz PDF Tool", pageWidth / 2, pageHeight / 2, {
    align: "center",
    angle: 45,
  });

  doc.restoreGraphicsState && doc.restoreGraphicsState();
}

// Generate PDF button event with watermark and dynamic content
document.getElementById("generate-pdf").addEventListener("click", () => {
  const customTitle = prompt(
    "Enter the title for your quiz PDF:",
    "Solve Quiz's"
  );
  if (!customTitle) {
    alert("Please enter a title to generate the PDF.");
    return;
  }
  if (quizData.length === 0) {
    alert("No questions to generate PDF. Please add more questions.");
    return;
  }

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  const pageHeight = doc.internal.pageSize.height;
  let yOffset = 35;

  // Page Title Header
  doc.setFillColor(33, 150, 243);
  doc.rect(0, 10, 210, 15, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text(customTitle, 105, 20, { align: "center" });

  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);

  quizData.forEach((item, index) => {
    // calculate estimatedHeight initially
    let estimatedHeight = 0;

    const questionLines = doc.splitTextToSize(
      `Q${index + 1}: ${item.question}`,
      170
    );
    estimatedHeight += questionLines.length * 6 + 6;

    if (item.type === "objective") {
      estimatedHeight += item.options.length * 6;
    } else if (item.type === "subjective") {
      const answerLines = doc.splitTextToSize(
        `Answer: ${item.answer || ""}`,
        170
      );
      estimatedHeight += answerLines.length * 6 + 6;
    }

    if (yOffset + estimatedHeight > pageHeight - 20) {
      doc.addPage();
      yOffset = 35;
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);
    }

    // Draw question
    doc.setFont("helvetica", "bold");
    doc.setTextColor(0, 0, 0);
    questionLines.forEach((line) => {
      doc.text(line, 15, yOffset);
      yOffset += 6;
    });

    yOffset += 4;

    if (item.type === "objective") {
      item.options.forEach((option, i) => {
        const optionLines = doc.splitTextToSize(`${i + 1}) ${option}`, 170);
        if (i === item.correctAnswerIndex) {
          doc.setTextColor(34, 139, 34); // green
          doc.setFont("helvetica", "bold");
        } else {
          doc.setTextColor(0, 0, 0);
          doc.setFont("helvetica", "normal");
        }
        optionLines.forEach((line) => {
          doc.text(line, 20, yOffset);
          yOffset += 6;
        });
        yOffset += 2;
      });
    } else if (item.type === "subjective") {
      const answerLines = doc.splitTextToSize(
        `Answer: ${item.answer || "N/A"}`,
        170
      );
      doc.setTextColor(34, 139, 34); // green
      doc.setFont("helvetica", "bold");
      answerLines.forEach((line) => {
        doc.text(line, 20, yOffset);
        yOffset += 6;
      });
      yOffset += 8;
    }

    yOffset += 8; // extra space after each question
  });

  // Watermark on each page
  const totalPages = doc.internal.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setTextColor(220, 220, 220);
    doc.setFontSize(30);
    doc.setFont("helvetica", "bold");
    doc.text("Daniyal Shahid - PDF Tool", 105, 150, {
      align: "center",
      angle: 45,
    });
  }

  // Footer with developer name
  doc.setFontSize(10);
  doc.setTextColor(100);
  doc.text("Generated by Daniyal Shahid - quiz PDF tool", 105, 285, {
    align: "center",
  });

  doc.save(`${customTitle}.pdf`);
  alert("PDF generated successfully!");

  clearQuizData();
  setTimeout(() => location.reload(), 1000);
});

function clearQuizData() {
  quizData = [];
  currentQuestionIndex = 0;
  loadQuestion(currentQuestionIndex);
  updateCurrentQuestionNumber();
}

loadQuestion(currentQuestionIndex);
updateCurrentQuestionNumber();
