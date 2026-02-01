console.log("JS LOADED");

document.querySelector("form").addEventListener("submit", async (e) => {

    e.preventDefault();

    const data = {
        name: document.getElementById("name").value,
        regId: document.getElementById("reg-id").value,
        phone: document.getElementById("phone").value,
        section: document.getElementById("section").value,
        year: document.getElementById("year").value
    };

    const response = await fetch("https://sport-registration-backend.onrender.com/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    const result = await response.json();
    alert(result.message);
});
