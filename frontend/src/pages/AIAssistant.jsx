import { useEffect, useMemo, useState } from "react";
import { api } from "../services/api";

const suggestions = [
  "Recommend a beginner-friendly Java book.",
  "Which books in our library are currently available?",
  "What should I read after learning Core Java?",
  "Explain Clean Code in simple terms.",
];

function AIAssistant() {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [booksLoading, setBooksLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api.getBooks()
      .then((data) => setBooks(Array.isArray(data) ? data : []))
      .catch(() => setBooks([]))
      .finally(() => setBooksLoading(false));
  }, []);

  const availableBooks = useMemo(
    () => books.filter((book) => book.availability),
    [books]
  );

  const ask = async (preset) => {
    const text = (preset ?? question).trim();
    if (!text || loading) return;

    setError("");
    setMessages((current) => [...current, { role: "user", text }]);
    setQuestion("");
    setLoading(true);

    try {
      const data = await api.askAI(text);
      setMessages((current) => [
        ...current,
        { role: "assistant", text: data.answer || "No answer returned." },
      ]);
    } catch (err) {
      setError(err.message);
      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          text: "I couldn't connect to the AI service. Check that the Spring Boot backend is running and OPENAI_API_KEY is configured.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([]);
    setError("");
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>🤖 AI Library Assistant</h1>
          <p>Ask about books, learning paths and your library catalogue.</p>
        </div>
        <button className="secondary-btn" onClick={clearChat}>
          Clear Chat
        </button>
      </div>

      <div className="ai-layout">
        <section className="ai-chat-card">
          <div className="ai-chat-window">
            {messages.length === 0 && (
              <div className="ai-welcome">
                <div className="ai-icon">🤖</div>
                <h2>How can I help?</h2>
                <p>
                  I can recommend books, explain topics, and answer questions
                  using your library catalogue as context.
                </p>
                <div className="suggestion-grid">
                  {suggestions.map((item) => (
                    <button
                      key={item}
                      className="suggestion-btn"
                      onClick={() => ask(item)}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((message, index) => (
              <div
                className={`chat-message ${
                  message.role === "user" ? "user-message" : "assistant-message"
                }`}
                key={`${message.role}-${index}`}
              >
                <div className="message-role">
                  {message.role === "user" ? "You" : "AI Assistant"}
                </div>
                <div className="message-text">{message.text}</div>
              </div>
            ))}

            {loading && (
              <div className="chat-message assistant-message">
                <div className="message-role">AI Assistant</div>
                <div className="message-text">Thinking...</div>
              </div>
            )}
          </div>

          {error && <div className="error-message">{error}</div>}

          <div className="ai-input-row">
            <textarea
              value={question}
              onChange={(event) => setQuestion(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter" && !event.shiftKey) {
                  event.preventDefault();
                  ask();
                }
              }}
              placeholder="Ask something about books..."
              rows="3"
            />
            <button
              className="primary-btn ai-send-btn"
              onClick={() => ask()}
              disabled={loading || !question.trim()}
            >
              {loading ? "Thinking..." : "Ask AI"}
            </button>
          </div>
        </section>

        <aside className="ai-info-card">
          <h2>Library Context</h2>
          {booksLoading ? (
            <p>Loading catalogue...</p>
          ) : (
            <>
              <div className="ai-stat">
                <span>Total books</span>
                <strong>{books.length}</strong>
              </div>
              <div className="ai-stat">
                <span>Available now</span>
                <strong>{availableBooks.length}</strong>
              </div>
            </>
          )}

          <h3>Try asking</h3>
          <ul>
            <li>Recommend a book for learning Java.</li>
            <li>Which books are available right now?</li>
            <li>Suggest a reading path for Spring Boot.</li>
            <li>Explain a programming concept simply.</li>
          </ul>

          <p className="ai-note">
            
          </p>
        </aside>
      </div>
    </div>
  );
}

export default AIAssistant;
