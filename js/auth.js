/* ==========================================
   Authentication
========================================== */

const loginBtn = document.getElementById("loginBtn");
const loginCode = document.getElementById("loginCode");

loginBtn.addEventListener("click", login);

loginCode.addEventListener("keypress", function (e) {

    if (e.key === "Enter") {

        login();

    }

});

async function login() {

    const code = loginCode.value.trim();

    if (!code) {

        alert("يرجى إدخال كود الدخول");

        loginCode.focus();

        return;

    }

    loginBtn.disabled = true;
    loginBtn.innerHTML = "جاري تسجيل الدخول...";

    const result = await API.request("login", {

        code

    });

    loginBtn.disabled = false;
    loginBtn.innerHTML = '<i class="fa-solid fa-right-to-bracket"></i> دخول';

    if (!result.success) {

        alert(result.message);

        return;

    }

    const user = result.data;

    localStorage.setItem("user", JSON.stringify(user));

    switch (user.role.toLowerCase()) {

        case "admin":

            window.location.href = "dashboard.html";

            break;

        case "manager":

            window.location.href = "reports.html";

            break;

        case "employee":

            window.location.href = "upload.html";

            break;

        default:

            alert("صلاحية غير معروفة");

    }

}