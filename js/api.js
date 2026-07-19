/* ==========================================
   منصة إدارة التقويم والمتابعة
   API Service
========================================== */

class API {

    static async request(action, data = {}) {

        if (!CONFIG.API_URL) {

            console.error("API_URL غير محدد داخل config.js");

            return {
                success: false,
                message: "API غير مهيأ"
            };

        }

        try {

            const response = await fetch(CONFIG.API_URL, {

                method: "POST",

                body: new URLSearchParams({

                    payload: JSON.stringify({

                        action,
                        data

                    })

                })

            });

            if (!response.ok) {

                throw new Error("HTTP Error: " + response.status);

            }

            return await response.json();

        }

        catch (error) {

            console.error("API Error:", error);

            return {

                success: false,

                message: "تعذر الاتصال بالخادم"

            };

        }

    }

}
