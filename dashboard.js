function getData(key) {

    try {

        const data = localStorage.getItem(key);

        if (!data) {
            return [];
        }

        const parsed = JSON.parse(data);

        return Array.isArray(parsed) ? parsed : [];

    } catch (error) {

        console.error(
            "Error reading localStorage:",
            error
        );

        return [];

    }

}


/* =========================================================
   SAVE DATA TO LOCAL STORAGE
   ========================================================= */

function saveData(key, data) {

    try {

        localStorage.setItem(
            key,
            JSON.stringify(data)
        );

        return true;

    } catch (error) {

        console.error(
            "Error saving localStorage:",
            error
        );

        alert(
            "Unable to save data. Please check your browser storage."
        );

        return false;

    }

}


/* =========================================================
   STATUS BADGE
   ========================================================= */

function statusBadge(status) {

    const value =
        String(status || "Pending");

    const className =
        value.toLowerCase()
            .replace(/\s+/g, "-");


    return `
        <span class="status ${className}">
            ${escapeHTML(value)}
        </span>
    `;

}


/* =========================================================
   ESCAPE HTML
   ========================================================= */

function escapeHTML(value) {

    return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


/* =========================================================
   DASHBOARD
   ========================================================= */

function loadDashboard() {

    const students =
        getData("students");

    const scholarships =
        getData("scholarships");

    const requirements =
        getData("requirements");

    const compliance =
        getData("compliance");


    /* -----------------------------------------
       STUDENT COUNT
       ----------------------------------------- */

    const totalStudents =
        students.length;


    const activeStudents =
        students.filter(
            student =>
                student.status === "Active"
        ).length;


    const inactiveStudents =
        students.filter(
            student =>
                student.status === "Inactive"
        ).length;


    /* -----------------------------------------
       SCHOLARSHIP COUNT
       ----------------------------------------- */

    const totalScholarships =
        scholarships.length;


    const activeScholarships =
        scholarships.filter(
            scholarship =>
                scholarship.status === "Active"
        ).length;


    const pendingScholarships =
        scholarships.filter(
            scholarship =>
                scholarship.status === "Pending"
        ).length;


    /* -----------------------------------------
       SCHOLARSHIP HOLDERS
       ----------------------------------------- */

    const scholarshipHolders =
        students.filter(
            student =>
                student.scholarship &&
                student.scholarship !== ""
        ).length;


    /* -----------------------------------------
       REQUIREMENTS
       ----------------------------------------- */

    let pendingRequirements = 0;


    if (requirements.length > 0) {

        pendingRequirements =
            requirements.filter(
                requirement =>
                    requirement.status === "Pending"
            ).length;

    }


    /* -----------------------------------------
       COMPLIANCE
       ----------------------------------------- */

    let compliantStudents = 0;


    if (compliance.length > 0) {

        compliantStudents =
            compliance.filter(
                item =>
                    item.status === "Compliant"
            ).length;

    }


    /* =================================================
       UPDATE DASHBOARD ELEMENTS
       ================================================= */

    updateElement(
        "totalStudents",
        totalStudents
    );


    updateElement(
        "activeStudents",
        activeStudents
    );


    updateElement(
        "inactiveStudents",
        inactiveStudents
    );


    updateElement(
        "scholarshipHolders",
        scholarshipHolders
    );


    updateElement(
        "totalScholarships",
        totalScholarships
    );


    updateElement(
        "activeScholarships",
        activeScholarships
    );


    updateElement(
        "pendingScholarships",
        pendingScholarships
    );


    updateElement(
        "pendingRequirements",
        pendingRequirements
    );


    updateElement(
        "compliantStudents",
        compliantStudents
    );


    /* -----------------------------------------
       RECENT STUDENTS
       ----------------------------------------- */

    renderRecentStudents(students);


    /* -----------------------------------------
       RECENT SCHOLARSHIPS
       ----------------------------------------- */

    renderRecentScholarships(scholarships);

}


/* =========================================================
   UPDATE ELEMENT SAFELY
   ========================================================= */

function updateElement(id, value) {

    const element =
        document.getElementById(id);


    if (element) {

        element.textContent = value;

    }

}


/* =========================================================
   RECENT STUDENTS
   ========================================================= */

function renderRecentStudents(students) {

    const table =
        document.getElementById(
            "recentStudentTable"
        );


    if (!table) {
        return;
    }


    if (!students.length) {

        table.innerHTML = `
            <tr>
                <td colspan="5"
                    style="text-align:center; padding:25px;">
                    No students found.
                </td>
            </tr>
        `;

        return;

    }


    const recentStudents =
        students.slice(-5).reverse();


    table.innerHTML =
        recentStudents.map(student => `

            <tr>

                <td>
                    ${escapeHTML(
                        student.student_id || "-"
                    )}
                </td>

                <td>
                    <strong>
                        ${escapeHTML(
                            student.full_name ||
                            student.name ||
                            "-"
                        )}
                    </strong>
                </td>

                <td>
                    ${escapeHTML(
                        student.course || "-"
                    )}
                </td>

                <td>
                    ${escapeHTML(
                        student.year_level || "-"
                    )}
                </td>

                <td>
                    ${statusBadge(
                        student.status || "Active"
                    )}
                </td>

            </tr>

        `).join("");

}


/* =========================================================
   RECENT SCHOLARSHIPS
   ========================================================= */

function renderRecentScholarships(scholarships) {

    const table =
        document.getElementById(
            "recentScholarshipTable"
        );


    if (!table) {
        return;
    }


    if (!scholarships.length) {

        table.innerHTML = `
            <tr>
                <td colspan="5"
                    style="text-align:center; padding:25px;">
                    No scholarships found.
                </td>
            </tr>
        `;

        return;

    }


    const recentScholarships =
        scholarships.slice(-5).reverse();


    table.innerHTML =
        recentScholarships.map(scholarship => `

            <tr>

                <td>
                    <strong>
                        ${escapeHTML(
                            scholarship.scholarship_name ||
                            "-"
                        )}
                    </strong>
                </td>

                <td>
                    ${escapeHTML(
                        scholarship.provider ||
                        "-"
                    )}
                </td>

                <td>
                    ₱${Number(
                        scholarship.amount || 0
                    ).toLocaleString()}
                </td>

                <td>
                    ${escapeHTML(
                        scholarship.deadline ||
                        "-"
                    )}
                </td>

                <td>
                    ${statusBadge(
                        scholarship.status ||
                        "Pending"
                    )}
                </td>

            </tr>

        `).join("");

}


/* =========================================================
   REFRESH DASHBOARD
   ========================================================= */

function refreshDashboard() {

    loadDashboard();

}


/* =========================================================
   LOGOUT
   ========================================================= */

function logout() {

    localStorage.removeItem("loggedIn");

    window.location.href =
        "index.html";

}


/* =========================================================
   AUTO REFRESH WHEN LOCAL STORAGE CHANGES
   ========================================================= */

window.addEventListener(
    "storage",
    function(event) {

        if (
            event.key === "students" ||
            event.key === "scholarships" ||
            event.key === "requirements" ||
            event.key === "compliance"
        ) {

            loadDashboard();

        }

    }
);


/* =========================================================
   INITIAL LOAD
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        loadDashboard();

    }
);
### One more important change

When adding a student, save the student with a `status` too:

```javascript
const student = {
    student_id: document.getElementById("studentId").value.trim(),
    full_name: document.getElementById("studentName").value.trim(),
    course: document.getElementById("studentCourse").value.trim(),
    year_level: document.getElementById("studentYear").value,
    contact: document.getElementById("studentContact").value.trim(),
    status: "Active"
};
