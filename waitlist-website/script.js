// EmailJS Keys: replace with your real values from the EmailJS dashboard
const SERVICE_ID = "service_ax6ibyt"; // e.g., "service_abc123"
const TEMPLATE_ID = "template_yhr546r"; // e.g., "template_welcome"
const PUBLIC_KEY = "ABOk9cV9jJNSmQHu0"; // e.g., "Qx0EXAMPLE123"

// Initialize EmailJS as early as possible
if (typeof emailjs !== "undefined") {
  emailjs.init(PUBLIC_KEY);
}

const form = document.getElementById("waitlist-form");
const emailInput = document.getElementById("email");
const dateInput = document.getElementById("signup-date");
const roleHidden = document.getElementById("role");
const replyToInput = document.getElementById("reply_to");
const summaryInput = document.getElementById("summary");
const submitBtn = document.getElementById("submit-btn");
const messageEl = document.getElementById("form-message");
const roleRadios = Array.from(document.querySelectorAll('input[name="role-tab"]'));
const studentSection = document.querySelector('.role-student');
const brandSection = document.querySelector('.role-brand');

function setLoading(isLoading) {
  submitBtn.disabled = isLoading;
  submitBtn.ariaBusy = String(isLoading);
  submitBtn.textContent = isLoading ? "Submitting…" : "Secure My Spot";
}

function showMessage(text, isError = false) {
  messageEl.className = isError ? "message-error" : "message-success";
  messageEl.textContent = text;
}

function hideForm() {
  form.style.display = "none";
}

// Toggle role sections
for (const r of roleRadios) {
  r.addEventListener("change", () => {
    const value = r.value;
    roleHidden.value = value;
    if (value === "student") {
      studentSection.hidden = false;
      brandSection.hidden = true;
    } else if (value === "brand") {
      studentSection.hidden = true;
      brandSection.hidden = false;
    }
  });
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  setLoading(true);
  messageEl.className = "";
  messageEl.textContent = "";

  // Ensure date is populated for the template
  dateInput.value = new Date().toISOString();
  replyToInput.value = emailInput.value;

  // Build concise summary for your email
  try {
    const formData = new FormData(form);
    const role = formData.get("role") || "";
    const parts = [];
    if (role === "student") {
      parts.push(`student`);
      const college = formData.get("college");
      const platform = formData.get("platform");
      const followers = formData.get("followers");
      if (college) parts.push(`college: ${college}`);
      if (platform) parts.push(`platform: ${platform}`);
      if (followers) parts.push(`followers: ${followers}`);
    } else if (role === "brand") {
      parts.push(`brand`);
      const company = formData.get("company");
      const goal = formData.get("goal");
      const minFollowers = formData.get("min_followers");
      if (company) parts.push(`company: ${company}`);
      if (goal) parts.push(`goal: ${goal}`);
      if (minFollowers) parts.push(`minFollowers: ${minFollowers}`);
    }
    summaryInput.value = parts.join(" · ");
  } catch (_) {
    summaryInput.value = "";
  }

  try {
    // Send using EmailJS's sendForm API
    await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form, PUBLIC_KEY);

    hideForm();
    showMessage("🎉 You're in! Check your email for confirmation.");
  } catch (err) {
    console.error("EmailJS error", err);
    showMessage(
      "Something went wrong while submitting. Please try again in a moment.",
      true
    );
  } finally {
    setLoading(false);
  }
});


