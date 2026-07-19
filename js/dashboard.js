/* ==========================================
   Dashboard
========================================== */

const user = JSON.parse(localStorage.getItem("user"));

if (!user) {
    window.location.href = "index.html";
}

document.getElementById("userName").textContent =
    user.name || user.code || "مستخدم";

document.getElementById("logoutBtn").onclick = function () {

    if (confirm("هل تريد تسجيل الخروج؟")) {

        localStorage.removeItem("user");

        window.location.href = "index.html";

    }

};

loadDashboard();

async function loadDashboard() {

    try {

        const reports = await API.request("getReports");

        if (reports.success) {

            const data = reports.data || [];

            document.getElementById("reportsCount").textContent = data.length;

            document.getElementById("todayCount").textContent =
                data.filter(r => isToday(r.date)).length;

            document.getElementById("pendingCount").textContent =
                data.filter(r => r.status === "معلق").length;

            const latest = document.getElementById("latestReports");

            latest.innerHTML = "";

            if (data.length === 0) {

                latest.innerHTML = "لا توجد تقارير";

            } else {

                data.slice(0,5).forEach(report => {

                    latest.innerHTML += `
<div class="report-item">

    <div class="report-header">

        <div class="report-avatar">
            <i class="fa-solid fa-user"></i>
        </div>

        <div class="report-info">

            <h4>${report.employee}</h4>

            <span>${report.date}</span> 

        </div>

    </div>

    <div class="report-status">

        <span class="status approved">

            ✓ معتمد

        </span>

    </div>

</div>
`;

        const employees = await API.request("getEmployees");

        if (employees.success) {

            document.getElementById("employeesCount").textContent =
                employees.data.length;

        }

    } catch (e) {

        console.error(e);

    }

}

function isToday(dateString) {

    if (!dateString) return false;

    const today = new Date().toISOString().split("T")[0];

    return dateString.startsWith(today);

}
