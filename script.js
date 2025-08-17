const userList = document.getElementById("userList");
const errorMsg = document.getElementById("errorMsg");
const reloadBtn = document.getElementById("reloadBtn");

// Function to fetch and display users
async function fetchUsers() {
  userList.innerHTML = ""; // clear previous
  errorMsg.textContent = ""; // clear errors

  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const users = await response.json();

    users.forEach(user => {
      const card = document.createElement("div");
      card.classList.add("user-card");
      card.innerHTML = `
        <h3>${user.name}</h3>
        <p><strong>Email:</strong> ${user.email}</p>
        <p><strong>Address:</strong> ${user.address.street}, ${user.address.city}</p>
      `;
      userList.appendChild(card);
    });
  } catch (error) {
    errorMsg.textContent = "❌ Failed to load data. Please check your connection.";
    console.error("Error fetching users:", error);
  }
}

// Reload button event
reloadBtn.addEventListener("click", fetchUsers);

// Fetch users on page load
fetchUsers();
