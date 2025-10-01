document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault(); // Stop form from reloading page

    // Get values
    let indexNumber = document.getElementById("indexNumber").value.trim();
    let year = document.getElementById("year").value;
    let faculty = document.getElementById("faculty").value;

    // Validate
    if (!indexNumber || !year || !faculty) {
        alert("Please fill in all fields.");
        return;
    }

    // Save data for later use (when navigating back)
    sessionStorage.setItem("studentIndex", indexNumber);
    sessionStorage.setItem("studentYear", year);
    sessionStorage.setItem("studentFaculty", faculty);

    // Display in Results Section
    updateResultsSection();

    // Switch sections
    document.getElementById("loginSection").classList.remove("active");
    document.getElementById("resultsSection").classList.add("active");
});

// ======== UPDATE RESULTS DISPLAY ======== //
function updateResultsSection() {
    document.getElementById("displayIndex").textContent = sessionStorage.getItem("studentIndex");
    document.getElementById("studentInfo").textContent =
        `${sessionStorage.getItem("studentYear")} • ${sessionStorage.getItem("studentFaculty")}`;
}

// ======== NAVIGATION FUNCTIONS ======== //
function showLogin() {
    document.getElementById("resultsSection").classList.remove("active");
    document.getElementById("loginSection").classList.add("active");
}

function showRankings() {
    document.getElementById("resultsSection").classList.remove("active");
    document.getElementById("rankingsSection").classList.add("active");

    // Example: Populate rankings section dynamically
    let facultyStats = document.getElementById("facultyStats");
    facultyStats.innerHTML = `
        <div>Engineering: 12</div>
        <div>Science: 10</div>
        <div>Medicine: 8</div>
        <div>Arts: 6</div>
    `;

    let topStudents = document.getElementById("topStudentsList");
    topStudents.innerHTML = `
        <div>1. John Doe - GPA 3.95</div>
        <div>2. Jane Smith - GPA 3.90</div>
        <div>3. Michael Lee - GPA 3.88</div>
    `;
}

function showResults() {
    document.getElementById("rankingsSection").classList.remove("active");
    document.getElementById("resultsSection").classList.add("active");

    // Keep student data when returning
    updateResultsSection();
}

// ======== CLEAR FORM ======== //
function clearForm() {
    document.getElementById("loginForm").reset();
}

// ======== DOWNLOAD RESULTS BUTTON ======== //
function downloadResults() {
    let index = sessionStorage.getItem("studentIndex");
    let year = sessionStorage.getItem("studentYear");
    let faculty = sessionStorage.getItem("studentFaculty");

    // Create text file content
    let content = `Student Results\n\nIndex Number: ${index}\nAcademic Year: ${year}\nFaculty: ${faculty}\n\nOverall GPA: 3.68\nTotal Credits: 15\nSubjects: 5`;

    // Create a downloadable file
    let blob = new Blob([content], { type: "text/plain" });
    let link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `Results_${index}.txt`;
    link.click();
}