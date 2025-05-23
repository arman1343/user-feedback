import { useState } from "react";

export default function App() {
  const [userName, setUserName] = useState("");
  const [rating, setRating] = useState(0);
  const [feedbackText, setFeedbackText] = useState("");
  const [submitStatus, setSubmitStatus] = useState(null);

  const stars = [1, 2, 3, 4, 5];

  async function handleSubmit(e) {
    e.preventDefault();

    if (!userName.trim() || rating === 0 || !feedbackText.trim()) {
      alert("Please fill in all fields and select a rating.");
      return;
    }

    const data = { userName, rating, feedbackText };

    try {
      const res = await fetch("http://localhost:5000/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setSubmitStatus("Feedback submitted successfully!");
        setUserName("");
        setRating(0);
        setFeedbackText("");
      } else {
        setSubmitStatus("Failed to submit feedback.");
      }
    } catch (error) {
      setSubmitStatus("Error submitting feedback.");
    }
  }

  return (
    <div>
      <h2>User Feedback</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </label>

        <label>
          Rating:
          <div>
            {stars.map((star) => (
              <span
                key={star}
                onClick={() => setRating(star)}
                style={{
                  cursor: "pointer",
                  color: star <= rating ? "#f5b301" : "#ccc",
                  fontSize: 24,
                  userSelect: "none",
                }}
                aria-label={`${star} star`}
              >
                ★
              </span>
            ))}
          </div>
        </label>

        <label>
          Feedback:
          <textarea
            value={feedbackText}
            onChange={(e) => setFeedbackText(e.target.value)}
            rows={4}
          />
        </label>

        <button type="submit">Submit</button>
      </form>

      {submitStatus && <p>{submitStatus}</p>}
    </div>
  );
}
