// src/components/About.tsx

export default function About() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">About</h2>
      </div>
      <div className="flex justify-center">
        <img
          src="/about.png"
          alt="Zi Hao"
          className="w-50 h-50 rounded-full object-cover"
        />
      </div>
      <div className="space-y-4">
        <p className="text-lg font-normal">
          <strong>Budget Buddy</strong> is a desktop budgeting app built with <strong>Electron, 
          React, and SQLite</strong>. It helps you track transactions with data-driven 
          insights, manage budgets effectively, and automate recurring expenses—all 
          in one place. Your data is securely stored locally on your device, ensuring privacy 
          and reliability, with the option to export to CSV for backup or further analysis.
        </p>
        <p className="text-lg font-normal">
            Found a bug or have a suggestion? Feel free to reach out. Feedbacks are always welcome!  
            Feel free to contact me via{" "}
            <a
              href="https://www.linkedin.com/in/wee-zi-hao/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg font-normal underline"
            >
              <strong>LinkedIn</strong>
            </a> or check out this project on{" "}
            <a
              href="https://github.com/27July/budget-buddy.git"
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg font-normal underline"
            >
              <strong>GitHub</strong>
            </a>.
        </p>
      </div>
    </div>
  );
}
