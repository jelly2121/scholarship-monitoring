function getData(key) {

    try {

        const data = localStorage.getItem(key);

        return data ? JSON.parse(data) : [];

    } catch (error) {

        console.error("Error loading data:", error);

        return [];

    }

}


/* ==========================================
   LOAD DASHBOARD
========================================== */

function loadDashboard() {

    try {

        /* =========================
           GET DATA
        ========================= */

        const students =
            getData("students") || [];

        const requirements =
            getData("requirements") || [];

        const compliance =
            getData("compliance") || [];


        /* =========================
           TOTAL STUDENTS
        ========================= */

        const totalStudents =
            document.getElementById("totalStudents");

        if (totalStudents) {

            totalStudents.textContent =
                students.length;

        }


        /* =========================
           ACTIVE SCHOLARS
        ========================= */

        const activeScholars =
            students.filter(student =>

                String(student.status || "")
                    .toLowerCase() === "active"

            ).length;


        const activeElement =
            document.getElementById("activeScholars");

        if (activeElement) {

            activeElement.textContent =
                activeScholars;

        }


        /* =========================
           PENDING REQUIREMENTS
        ========================= */

        const pendingRequirements =
            requirements.filter(requirement => {

                const status =
                    String(
                        requirement.submission_status || ""
                    ).toLowerCase();

                return (
                    status === "pending" ||
                    status === "missing"
                );

            }).length;


        const requirementElement =
            document.getElementById(
                "pendingRequirements"
            );

        if (requirementElement) {

            requirementElement.textContent =
                pendingRequirements;

        }


        /* =========================
           COMPLIANT STUDENTS
        ========================= */

        const compliantStudents =
            compliance.filter(item => {

                return String(
                    item.compliance_status || ""
                ).toLowerCase() === "compliant";

            }).length;


        const complianceElement =
            document.getElementById(
                "compliantStudents"
            );

        if (complianceElement) {

            complianceElement.textContent =
                compliantStudents;

        }


        /* =========================
           RECENT STUDENTS
        ========================= */

        renderRecentStudents(students);

    }

    catch (error) {

        console.error(
            "Dashboard error:",
            error
        );

    }

}


/* ==========================================
   RENDER RECENT STUDENTS
========================================== */

function renderRecentStudents(students) {

    const table =
        document.getElementById(
            "recentStudentsTable"
        );


    if (!table) {

        return;

    }


    table.innerHTML = "";


    /* =========================
       NO STUDENTS
    ========================= */

    if (!students.length) {

        table.innerHTML = `

            <tr>

                <td
                    colspan="5"
                    style="
                        text-align:center;
                        padding:30px;
                        color:#999;
                    "
                >

                    No students registered yet.

                </td>

            </tr>

        `;

        return;

    }


    /* =========================
       GET LAST 5 STUDENTS
    ========================= */

    const recentStudents =
        students
            .slice()
            .reverse()
            .slice(0, 5);


    /* =========================
       DISPLAY STUDENTS
    ========================= */

    recentStudents.forEach(student => {

        /* =========================
           SUPPORT BOTH NAME FIELDS
        ========================= */

        const studentName =
            student.full_name ||
            student.name ||
            "-";


        const status =
            student.status ||
            "Active";


        const statusClass =
            String(status)
                .toLowerCase() === "active"
                ? "status-active"
                : "status-inactive";


        const row =
            document.createElement("tr");


        row.innerHTML = `

            <td>

                <span class="student-id">

                    ${escapeHTML(
                        student.student_id || "-"
                    )}

                </span>

            </td>


            <td>

                <span class="student-name">

                    ${escapeHTML(studentName)}

                </span>

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

                <span class="status-badge ${statusClass}">

                    ${escapeHTML(status)}

                </span>

            </td>

        `;


        table.appendChild(row);

    });

}


/* ==========================================
   SAFE HTML
========================================== */

function escapeHTML(value) {

    return String(value)

        .replace(/&/g, "&amp;")

        .replace(/</g, "&lt;")

        .replace(/>/g, "&gt;")

        .replace(/"/g, "&quot;")

        .replace(/'/g, "&#039;");

}


/* ==========================================
   REFRESH DASHBOARD
========================================== */

function refreshDashboard() {

    loadDashboard();

}


/* ==========================================
   LISTEN FOR STUDENT UPDATES
========================================== */

window.addEventListener(
    "storage",
    function (event) {

        if (event.key === "students") {

            loadDashboard();

        }

    }
);


/* ==========================================
   LOAD WHEN PAGE OPENS
========================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        loadDashboard();

    }
);
```

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
