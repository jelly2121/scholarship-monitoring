const requirementModal = document.getElementById("requirementModal");


// ===============================
// RENDER REQUIREMENTS
// ===============================
const renderReq = () => {

    let filter = document.getElementById("requirementFilter").value;
    let d = getData("requirements") || [];

    if (filter !== "All") {
        d = d.filter(x => x.submission_status === filter);
    }

    document.getElementById("requirementsTable").innerHTML = d.map(r => `
        <tr>
            <td>${r.student}</td>

            <td>${r.requirement_name}</td>

            <td>${r.submission_date || "—"}</td>

            <td>${statusBadge(r.submission_status)}</td>

            <td>${r.remarks || "—"}</td>

            <td>
                <button 
                    class="btn small delete-btn"
                    onclick="deleteRequirement('${r.id}')">
                    Delete
                </button>
            </td>
        </tr>
    `).join("");
};


// ===============================
// FILTER
// ===============================
document.getElementById("requirementFilter").onchange = renderReq;


// ===============================
// OPEN ADD REQUIREMENT
// ===============================
document.getElementById("addRequirementBtn").onclick = () => {
    requirementModal.classList.add("show");
};


// ===============================
// CLOSE MODAL
// ===============================
document.getElementById("closeRequirement").onclick = () => {
    requirementModal.classList.remove("show");
};


// ===============================
// ADD REQUIREMENT
// ===============================
document.getElementById("requirementForm").onsubmit = (e) => {

    e.preventDefault();

    let d = getData("requirements") || [];

    const requirement = {

        id: Date.now().toString(),

        student: document
            .getElementById("requirementStudent")
            .value
            .trim(),

        requirement_name: document
            .getElementById("requirementName")
            .value
            .trim(),

        submission_date:
            document.getElementById("submissionDate").value,

        submission_status:
            document.getElementById("submissionStatus").value,

        remarks:
            document.getElementById("remarks").value.trim()
    };


    // Add requirement
    d.push(requirement);

    // Save
    saveData("requirements", d);


    // Reset form
    e.target.reset();

    // Close modal
    requirementModal.classList.remove("show");

    // Refresh table
    renderReq();

    alert("Requirement added successfully!");
};


// ===============================
// DELETE REQUIREMENT
// ===============================
function deleteRequirement(id) {

    if (!confirm("Are you sure you want to delete this requirement?")) {
        return;
    }

    let d = getData("requirements") || [];

    d = d.filter(r => r.id !== id);

    saveData("requirements", d);

    renderReq();
}


// ===============================
// INITIAL LOAD
// ===============================
renderReq();
