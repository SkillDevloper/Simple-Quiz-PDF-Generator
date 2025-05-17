# 📄 Quiz PDF Generator (Objective & Subjective)

A **modern, responsive** web-based tool to generate **PDFs from quiz questions** with support for both **Objective (MCQ)** and **Subjective** formats. This tool also includes a **preview panel**, **dark mode**, and a **professional PDF export** with watermark and layout preservation.

---

## 🚀 Features

* ✅ Supports **Objective** (MCQ) and **Subjective** questions
* 📄 **Dynamic PDF generation** using [jsPDF](https://github.com/parallax/jsPDF)
* 🌙 **Dark mode toggle** with local storage persistence
* 👀 Real-time **preview pane**
* ✏️ **Edit / Delete** questions inline
* 🖨️ Custom **PDF Title Prompt** and watermark on every page
* 🎨 Uses **TailwindCSS** for beautiful, mobile-friendly UI
* 📌 **Answer highlighting** in PDF (correct option shown in green)

---

## ⚙️ Technologies Used

| Stack            | Description                                  |
| ---------------- | -------------------------------------------- |
| **HTML**         | Markup for layout                            |
| **Tailwind CSS** | Styling & theming                            |
| **JavaScript**   | Core logic (quiz management, PDF generation) |
| **jsPDF**        | PDF creation and styling                     |
| **Font Awesome** | Icons                                        |
| **LocalStorage** | Theme (dark/light) state persistence         |

---

## 🧠 How It Works

1. **Choose quiz mode**: Objective or Subjective.
2. **Enter your question**:

   * For **Objective**: Add options and select the correct one.
   * For **Subjective**: Optionally enter the expected answer.
3. **Navigate** using `Next` and `Previous`.
4. **Live preview** builds on the right side.
5. When done, click `Generate PDF`:

   * Prompts for PDF title.
   * Auto-formats content for clean export.
   * Applies watermark and footer on each page.

---

## 🛠️ Installation & Usage

> You don’t need any backend – it’s a fully **frontend-based app**.

### 📁 Manual Usage (Local Machine)

1. Clone the repo or download the files:

```bash
git clone https://github.com/SkillDevloper/Simple-Quiz-PDF-Generator.git
```

2. Open the `index.html` file in any modern browser.

3. Start creating your quiz!

---

## 📸 Screenshots

## User Interface:
![UI Interface](https://github.com/SkillDevloper/Simple-Quiz-PDF-Generator/blob/main/UI%20INTERFACE.png?raw=true)

### Change Title Name:
![PDF TITLE NAME](https://github.com/SkillDevloper/Simple-Quiz-PDF-Generator/blob/main/PDF%20TITLE%20NAME.png?raw=true)

### PDF Export Result:
![PDF EXPORT](https://github.com/SkillDevloper/Simple-Quiz-PDF-Generator/blob/main/PDF%20EXPORT.png?raw=true)




---

## 📌 Notes

* PDF layout is auto-managed for page breaks and spacing.
* Correct options appear **green & bold** in the PDF.
* Subjective answers are displayed as **green bold text**.
* Watermark includes your name **rotated and faded** for professionalism.

---

## 👨‍💻 Developed by

**Daniyal Shahid**
Developer | Designer | CEH13
© 2025 All Rights Reserved
