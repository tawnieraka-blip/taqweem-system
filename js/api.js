/* ==========================================
   منصة إدارة التقويم والمتابعة
   API Service
========================================== */

class API {

    static async request(action, data = {}) {

        try {

            const payload = JSON.stringify({
                action,
                data
            });

            const response = await fetch(CONFIG.API_URL, {

                method: "POST", 

                body: new URLSearchParams({
                    payload
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
