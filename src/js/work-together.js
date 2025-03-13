document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("modal");
    const closeButton = document.getElementById("close");
    const emailInput = document.getElementById("email");
    const commentInput = document.getElementById("comment");
    const message = document.getElementById("message");
    const sendButton = document.getElementById("openModalBtn"); 

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    function validateForm() {
        return emailInput.value.trim() !== "" && commentInput.value.trim() !== "";
    }

    sendButton.addEventListener("click", function (event) {
        event.preventDefault(); 

        if (!validateForm()) {
            alert("Будь ласка, заповніть всі поля.");
            return;
        }

        const formData = {
            email: emailInput.value.trim(),
            comment: commentInput.value.trim(),
        };

        fetch("https://portfolio-js.b.goit.study/api/requests", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Помилка сервера: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                if (data.message && data.message.includes("contact you shortly")) {
                    modal.style.display = "block";
                    modal.classList.add("active");
                    emailInput.value = "";
                    commentInput.value = "";
                    message.classList.add("hidden");

                    emailInput.classList.remove("success");
                    emailInput.classList.remove("error");
                } else {
                    alert("Помилка: " + (data.message || "Невідома помилка"));
                }
            })
            .catch(error => {
                alert("Сталася помилка при відправці: " + error.message);
            });
    });

    // ====== Закриття та відкриття модального вікна ======

    openModalBtn.addEventListener("click", function () {
        modal.classList.add("is-open"); 
    });

    closeButton.onclick = function () {
        modal.style.display = "none";
    };

    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };

    window.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            modal.style.display = "none";
        }
    });

    // ====== Валідація email ======
    emailInput.addEventListener("input", function () {
        if (emailInput.value === "") {
            emailInput.classList.remove("success", "error");
            message.classList.add("hidden");
        } else if (emailPattern.test(emailInput.value)) {
            emailInput.classList.add("success");
            emailInput.classList.remove("error");
            message.textContent = "Success!";
            message.classList.add("success-message");
            message.classList.remove("error-message", "hidden");
        } else {
            emailInput.classList.add("error");
            emailInput.classList.remove("success");
            message.textContent = "Invalid email, try again";
            message.classList.add("error-message");
            message.classList.remove("success-message", "hidden");
        }
    });

    // ====== Обмеження символів ======
    commentInput.addEventListener("blur", function () {
        if (this.value.length > 15) {
            this.dataset.fullText = this.value;
            this.value = this.value.slice(0, 15) + "...";
        }
    });

    commentInput.addEventListener("focus", function () {
        if (this.dataset.fullText) {
            this.value = this.dataset.fullText; 
        }
    });
});