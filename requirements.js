let editingRequirementId = null;


/* =========================================================
   RENDER REQUIREMENTS
   ========================================================= */

const renderReq = () => {

    let filter =
        document.getElementById(
            "requirementFilter"
        ).value;

    let d =
        getData("requirements");


    /* FILTER */

    if (filter !== "All") {

        d = d.filter(
            x =>
                x.submission_status === filter
        );

    }


    const table =
        document.getElementById(
            "requirementsTable"
        );


    if (!d.length) {

        table.innerHTML = `

            <tr>

                <td
                    colspan="6"
                    class="empty"
                >
                    No requirements found.
                </td>

            </tr>

        `;

        return;
    }


    table.innerHTML =
        d.map(r => `

            <tr>

                <td>
                    ${escapeHTML(
                        r.student
                    )}
                </td>

                <td>
                    <strong>
                        ${escapeHTML(
                            r.requirement_name
                        )}
                    </strong>
                </td>

                <td>
                    ${
                        r.submission_date
                            ? escapeHTML(
                                r.submission_date
                            )
                            : "—"
                    }
                </td>

                <td>
                    ${statusBadge(
                        r.submission_status
                    )}
                </td>

                <td>
                    ${
                        r.remarks
                            ? escapeHTML(
                                r.remarks
                            )
                            : ""
                    }
                </td>

                <td>

                    <button
                        class="action-btn view-btn"
                        onclick="viewRequirement('${escapeHTML(r.id)}')"
                    >
                        View
                    </button>

                    <button
                        class="action-btn edit-btn"
                        onclick="editRequirement('${escapeHTML(r.id)}')"
                    >
                        Edit
                    </button>

                    <button
                        class="action-btn delete-btn"
                        onclick="deleteRequirement('${escapeHTML(r.id)}')"
                    >
                        Delete
                    </button>

                </td>

            </tr>

        `).join("");

};


/* =========================================================
   OPEN FORM
   ========================================================= */

function openRequirementForm() {

    editingRequirementId = null;


    document.querySelector(
        "#requirementModal h2"
    ).textContent =
        "Add Requirement";


    document.getElementById(
        "requirementStudent"
    ).value = "";


    document.getElementById(
        "requirementName"
    ).value = "";


    document.getElementById(
        "submissionDate"
    ).value = "";


    document.getElementById(
        "submissionStatus"
    ).value = "Pending";


    document.getElementById(
        "requirementRemarks"
    ).value = "";


    document.getElementById(
        "requirementModal"
    ).classList.add("show");
}


/* =========================================================
   CLOSE FORM
   ========================================================= */

function closeRequirementForm() {

    document.getElementById(
        "requirementModal"
    ).classList.remove("show");

    editingRequirementId = null;
}


/* =========================================================
   GENERATE ID
   ========================================================= */

function generateRequirementId() {

    const data =
        getData("requirements");


    let max = 0;


    data.forEach(item => {

        if (!item.id) return;


        const match =
            item.id.match(/REQ-(\d+)/);


        if (match) {

            const number =
                parseInt(match[1]);


            if (number > max) {
                max = number;
            }

        }

    });


    return "REQ-" +
        String(max + 1).padStart(3, "0");
}


/* =========================================================
   SAVE REQUIREMENT
   ========================================================= */

function saveRequirement() {

    const student =
        document.getElementById(
            "requirementStudent"
        ).value.trim();


    const requirementName =
        document.getElementById(
            "requirementName"
        ).value.trim();


    const submissionDate =
        document.getElementById(
            "submissionDate"
        ).value;


    const submissionStatus =
        document.getElementById(
            "submissionStatus"
        ).value;


    const remarks =
        document.getElementById(
            "requirementRemarks"
        ).value.trim();


    /* VALIDATION */

    if (
        !student ||
        !requirementName
    ) {

        alert(
            "Please enter the student and requirement."
        );

        return;
    }


    let data =
        getData("requirements");


    /* =====================================================
       EDIT
    ===================================================== */

    if (editingRequirementId) {

        const index =
            data.findIndex(
                item =>
                    item.id ===
                    editingRequirementId
            );


        if (index !== -1) {

            data[index] = {

                ...data[index],

                student:
                    student,

                requirement_name:
                    requirementName,

                submission_date:
                    submissionDate,

                submission_status:
                    submissionStatus,

                remarks:
                    remarks

            };

        }

    }


    /* =====================================================
       ADD
    ===================================================== */

    else {

        data.push({

            id:
                generateRequirementId(),

            student:
                student,

            requirement_name:
                requirementName,

            submission_date:
                submissionDate,

            submission_status:
                submissionStatus,

            remarks:
                remarks

        });

    }


    /* SAVE */

    saveData(
        "requirements",
        data
    );


    closeRequirementForm();


    renderReq();


    alert(
        editingRequirementId
            ? "Requirement updated successfully!"
            : "Requirement added successfully!"
    );

}


/* =========================================================
   VIEW
   ========================================================= */

function viewRequirement(id) {

    const data =
        getData("requirements");


    const item =
        data.find(
            r => r.id === id
        );


    if (!item) {

        alert(
            "Requirement not found."
        );

        return;
    }


    alert(

        "Requirement Details\n\n" +

        "Student: " +
        item.student +

        "\nRequirement: " +
        item.requirement_name +

        "\nSubmission Date: " +
        (
            item.submission_date ||
            "—"
        ) +

        "\nStatus: " +
        item.submission_status +

        "\nRemarks: " +
        (
            item.remarks ||
            "—"
        )

    );

}


/* =========================================================
   EDIT
   ========================================================= */

function editRequirement(id) {

    const data =
        getData("requirements");


    const item =
        data.find(
            r => r.id === id
        );


    if (!item) {

        alert(
            "Requirement not found."
        );

        return;
    }


    editingRequirementId =
        id;


    document.querySelector(
        "#requirementModal h2"
    ).textContent =
        "Edit Requirement";


    document.getElementById(
        "requirementStudent"
    ).value =
        item.student || "";


    document.getElementById(
        "requirementName"
    ).value =
        item.requirement_name || "";


    document.getElementById(
        "submissionDate"
    ).value =
        item.submission_date || "";


    document.getElementById(
        "submissionStatus"
    ).value =
        item.submission_status || "Pending";


    document.getElementById(
        "requirementRemarks"
    ).value =
        item.remarks || "";


    document.getElementById(
        "requirementModal"
    ).classList.add("show");
}


/* =========================================================
   DELETE
   ========================================================= */

function deleteRequirement(id) {

    const data =
        getData("requirements");


    const item =
        data.find(
            r => r.id === id
        );


    if (!item) {

        alert(
            "Requirement not found."
        );

        return;
    }


    const confirmed =
        confirm(
            "Delete " +
            item.requirement_name +
            " for " +
            item.student +
            "?"
        );


    if (!confirmed) {
        return;
    }


    const updated =
        data.filter(
            r => r.id !== id
        );


    saveData(
        "requirements",
        updated
    );


    renderReq();


    alert(
        "Requirement deleted successfully!"
    );
}


/* =========================================================
   FILTER
   ========================================================= */

document.getElementById(
    "requirementFilter"
).onchange = renderReq;


/* =========================================================
   BUTTONS
   ========================================================= */

document.getElementById(
    "addRequirementBtn"
).onclick =
    openRequirementForm;


document.getElementById(
    "saveRequirement"
).onclick =
    saveRequirement;


document.getElementById(
    "cancelRequirement"
).onclick =
    closeRequirementForm;


/* =========================================================
   LOGOUT
   ========================================================= */

document.getElementById(
    "logoutBtn"
).onclick = function() {

    localStorage.removeItem(
        "loggedIn"
    );

    window.location.href =
        "index.html";
};


/* =========================================================
   CLOSE MODAL OUTSIDE
   ========================================================= */

window.addEventListener(
    "click",
    function(event) {

        const modal =
            document.getElementById(
                "requirementModal"
            );


        if (
            event.target === modal
        ) {

            closeRequirementForm();

        }

    }
);


/* =========================================================
   INITIAL LOAD
   ========================================================= */

renderReq();
