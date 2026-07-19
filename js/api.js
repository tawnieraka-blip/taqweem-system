/* ==========================================
   منصة إدارة التقويم والمتابعة
   API Service
========================================== */

class API {

    static async request(action, data = {}) {

        try {

            const response = await fetch(CONFIG.API_URL, {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    action: action,
                    data: data
                })

            });

            return await response.json();

        } catch (error) {

            console.error(error);

            return {
                success: false,
                message: error.toString()
            };

        }

    }

}
