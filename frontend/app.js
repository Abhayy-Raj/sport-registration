console.log("JS LOADED");
document.querySelector("form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const registrationId = document.getElementById("registrationId").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const section = document.getElementById("section").value.trim();
  const year = document.getElementById("year").value.trim();

  try {
    const response = await fetch(
      "https://sport-registration.onrender.com/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          registrationId,
          phone,
          section,
          year,
        }),
      }
    );

    const data = await response.json();

    if (response.ok) {
      alert(data.message); // "Registration successful"
      e.target.reset();
    } else {
      alert(data.message || "Something went wrong");
    }
  } catch (error) {
    console.error(error);
    alert("Network error");
  }
});
