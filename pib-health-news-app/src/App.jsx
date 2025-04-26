import { useState } from "react";

const sampleArticles = [
  {
    title: "Government Launches New Digital Health ID System",
    content:
      "The Ministry of Health and Family Welfare launched a Digital Health ID for citizens as part of the National Digital Health Mission.",
  },
  {
    title: "India Sees Rise in Non-Communicable Diseases",
    content:
      "A new report highlights increasing cases of diabetes, hypertension, and cardiovascular diseases in India.",
  },
  {
    title: "Approval for New Cancer Drug Manufacturing",
    content:
      "The pharmaceutical sector gets a boost with approval for manufacturing new cancer drugs.",
  },
  {
    title: "Medical Technologies Innovation Summit",
    content:
      "The Ministry organized a summit focusing on advancements in medical technologies including robotics and AI in surgery.",
  },
  {
    title: "Training Programme for Rural Healthcare Workers",
    content: "A new initiative to train healthcare workers in rural India has been launched.",
  },
];

const categories = {
  "Non Communicable Diseases": [
    "diabetes",
    "hypertension",
    "cardiovascular",
    "cancer",
    "non-communicable",
  ],
  "Digital Health": ["digital health", "health ID", "telemedicine", "e-health"],
  Pharmaceuticals: ["drug", "pharma", "pharmaceutical", "medicine"],
  "Medical Technologies": [
    "medical technology",
    "robotics",
    "AI in surgery",
    "device",
    "innovation",
  ],
};

export default function App() {
  const [groupedArticles, setGroupedArticles] = useState({});

  function categorizeArticles() {
    const categorized = {
      "Non Communicable Diseases": [],
      "Digital Health": [],
      Pharmaceuticals: [],
      "Medical Technologies": [],
      Others: [],
    };

    sampleArticles.forEach((article) => {
      let foundCategory = "Others";
      for (const [category, keywords] of Object.entries(categories)) {
        if (
          keywords.some((keyword) =>
            (article.title + " " + article.content).toLowerCase().includes(keyword)
          )
        ) {
          foundCategory = category;
          break;
        }
      }
      categorized[foundCategory].push(article);
    });

    setGroupedArticles(categorized);
  }

  return (
    <div style={{ padding: "2rem" }}>
      <button
        onClick={categorizeArticles}
        style={{
          padding: "0.5rem 1rem",
          backgroundColor: "#4f46e5",
          color: "white",
          borderRadius: "0.5rem",
          marginBottom: "2rem",
        }}
      >
        Fetch and Categorize Articles
      </button>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "1rem",
        }}
      >
        {Object.keys(groupedArticles).map((category) => (
          <div
            key={category}
            style={{
              border: "1px solid #ccc",
              borderRadius: "1rem",
              padding: "1rem",
              backgroundColor: "white",
            }}
          >
            <h2 style={{ fontSize: "1.25rem", fontWeight: "bold", marginBottom: "1rem" }}>
              {category}
            </h2>
            {groupedArticles[category].length > 0 ? (
              groupedArticles[category].map((article, index) => (
                <div key={index} style={{ marginBottom: "1rem" }}>
                  <h3 style={{ fontSize: "1.125rem", fontWeight: "600" }}>{article.title}</h3>
                  <p style={{ fontSize: "0.875rem", color: "#555" }}>{article.content}</p>
                </div>
              ))
            ) : (
              <p style={{ color: "#888" }}>No articles found.</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
