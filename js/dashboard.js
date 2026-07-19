/* ==========================================
   Dashboard
========================================== */

//----------------------------
// التحقق من تسجيل الدخول
//----------------------------

const user = JSON.parse(localStorage.getItem("user"));

if (!user) {

    window.location.href = "index.html";

}

//----------------------------
// اسم المستخدم
//----------------------------

const userName = document.getElementById("userName");

userName.textContent =
    user.fullName ||
    user.name ||
    user.username ||
    "المستخدم";

//----------------------------
// تسجيل الخروج
//----------------------------

document.getElementById("logoutBtn").onclick = function () {

    if (confirm("هل تريد تسجيل الخروج ؟")) {

        localStorage.removeItem("user");

        window.location.href = "index.html";

    }

};

//----------------------------
// الساعة
//----------------------------

function updateClock() {

    const now = new Date();

    const time = now.toLocaleTimeString("ar-SA", {

        hour: "2-digit",
        minute: "2-digit"

    });

    document.getElementById("clock").textContent = time;

}

setInterval(updateClock, 1000);

updateClock();

//----------------------------
// التاريخ الميلادي
//----------------------------

function updateDate() {

    const now = new Date();

    document.getElementById("date").textContent =
        now.toLocaleDateString("ar-SA", {

            weekday: "long",

            year: "numeric",

            month: "long",

            day: "numeric"

        });

}

updateDate();

//----------------------------
// التاريخ الهجري
//----------------------------

function updateHijri() {

    const now = new Date();

    document.getElementById("hijri").textContent =
        new Intl.DateTimeFormat(

            "ar-SA-u-ca-islamic",

            {

                day: "numeric",

                month: "long",

                year: "numeric"

            }

        ).format(now);

}

updateHijri();

//----------------------------
// تحميل البيانات
//----------------------------

loadDashboard();

async function loadDashboard() {

    try {

        //------------------
        // التقارير
        //------------------

        const reportsResponse = await API.request("getReports");

        let reports = [];

        if (reportsResponse.success) {

            reports = reportsResponse.data || [];

        }

        document.getElementById("reportsCount").textContent =
            reports.length;

        //------------------
        // هذا الأسبوع
        //------------------

        const currentWeek = getWeekNumber(new Date());

        let weekReports = 0;

        reports.forEach(report => {

            if (!report.date) return;

            const reportWeek =
                getWeekNumber(new Date(report.date));

            if (reportWeek === currentWeek) {

                weekReports++;

            }

        });

        document.getElementById("weekReports").textContent =
            weekReports;

        //------------------
        // الموظفون
        //------------------

        const employeesResponse =
            await API.request("getEmployees");

        let employees = [];

        if (employeesResponse.success) {

            employees =
                employeesResponse.data || [];

        }

        document.getElementById("employeesCount").textContent =
            employees.length;

        //------------------
        // آخر التقارير
        //------------------

        const reportsList =
            document.getElementById("reportsList");

        reportsList.innerHTML = "";

        if (reports.length === 0) {

            reportsList.innerHTML =

                "<p style='text-align:center;color:#888'>لا توجد تقارير</p>";

            return;

        }

        reports.reverse().slice(0,5).forEach(report => {

            reportsList.innerHTML += `

<div class="report-item">

<div class="report-info">

<h4>

${report.employee || "موظف"}

</h4>

<span>

${report.date || ""}

</span>

</div>

<div class="report-status">

معتمد

</div>

</div>

`;

        });

    }

    catch (error) {

        console.error(error);

    }

}

//----------------------------
// رقم الأسبوع
//----------------------------

function getWeekNumber(date) {

    const firstDay =
        new Date(date.getFullYear(),0,1);

    const days =
        Math.floor((date-firstDay)/86400000);

    return Math.ceil((days+firstDay.getDay()+1)/7);

}
