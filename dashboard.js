async function loadDashboard() {

    try {

        // STUDENTS
        const { data: students, error: studentError } =
            await supabaseClient
                .from("students")
                .select("*");

        if (studentError) {
            console.error(studentError);
            return;
        }


        // REQUIREMENTS
        const { data: requirements, error: requirementError } =
            await supabaseClient
                .from("requirements")
                .select("*");

        if (requirementError) {
            console.error(requirementError);
        }


        // COMPLIANCE
        const { data: compliance, error: complianceError } =
            await supabaseClient
                .from("academic_compliance")
                .select("*");

        if (complianceError) {
            console.error(complianceError);
        }


        /* =========================
           DASHBOARD COUNTS
        ========================= */

        document.getElementById("totalStudents").textContent =
            students?.length || 0;


        const activeScholars =
            students?.filter(
                student => student.status === "Active"
            ).length || 0;

        document.getElementById("activeScholars").textContent =
            activeScholars;


        const pendingRequirements =
            requirements?.filter(
                requirement =>
                    requirement.submission_status === "Pending" ||
                    requirement.submission_status === "Missing"
            ).length || 0;

        document.getElementById("pendingRequirements").textContent =
            pendingRequirements;


        const compliantStudents =
            compliance?.filter(
                item =>
                    item.compliance_status === "Compliant"
            ).length || 0;

        document.getElementById("compliantStudents").textContent =
            compliantStudents;


        /* =========================
           RECENT STUDENTS
        ========================= */

        const table =
            document.getElementById("recentStudentsTable");

        table.innerHTML = "";


        const recentStudents =
            (students || []).slice(-5).reverse();


        if (recentStudents.length === 0) {

            table.innerHTML = `
                <tr>
                    <td colspan="5"
                        style="text-align:center; padding:30px; color:#999;">
                        No students registered yet.
                    </td>
                </tr>
            `;

            return;
        }


        recentStudents.forEach(student => {

            const statusClass =
                student.status?.toLowerCase() === "active"
                    ? "status-active"
                    : "status-inactive";


            table.innerHTML += `
                <tr>

                    <td>
                        <strong>${student.student_id}</strong>
                    </td>

                    <td>
                        ${student.full_name}
                    </td>

                    <td>
                        ${student.course}
                    </td>

                    <td>
                        ${student.year_level}
                    </td>

                    <td>
                        <span class="status-badge ${statusClass}">
                            ${student.status}
                        </span>
                    </td>

                </tr>
            `;

        });

    } catch (error) {

        console.error(
            "Dashboard error:",
            error
        );

    }

}


/* LOAD DASHBOARD */

document.addEventListener(
    "DOMContentLoaded",
    loadDashboard
);