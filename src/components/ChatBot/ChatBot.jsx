import { useState, useRef, useEffect } from "react";
import { getBotReply } from "../Utils/chatBotBrain";

export default function ChatBot({ products }) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState([
    {
      role: "bot",
      text: "Hey 👋 I'm your AI Shopping Assistant 🔥",
      products: []
    }
  ]);

  const boxRef = useRef(null);

  function sendMessage() {
    if (!input.trim()) return;

    const userMsg = { role: "user", text: input };

    setMessages(prev => [...prev, userMsg]);
    setLoading(true);

    setTimeout(() => {
      const reply = getBotReply(input, products, messages);

      const botMsg =
        typeof reply === "string"
          ? { role: "bot", text: reply, products: [] }
          : { role: "bot", text: reply.text, products: reply.products || [] };

      setMessages(prev => [...prev, botMsg]);
      setLoading(false);
    }, 500);

    setInput("");
  }

  // auto scroll
  useEffect(() => {
    if (boxRef.current) {
      boxRef.current.scrollTop = boxRef.current.scrollHeight;
    }
  }, [messages, loading]);

  return (
    <div className="chat-wrapper">

      {/* BUTTON */}
      <button className="chat-fab" onClick={() => setOpen(!open)}>
        💬
      </button>

      {/* WINDOW */}
      {open && (
        <div className="chat-box">

          {/* HEADER */}
          <div className="chat-header">
            <span>AI Assistant</span>
            <button onClick={() => setOpen(false)}>✖</button>
          </div>

          {/* MESSAGES */}
          <div className="chat-messages" ref={boxRef}>

            {messages.map((m, i) => (
              <div key={i} className={`msg ${m.role}`}>

                <div>{m.text}</div>

                {/* PRODUCT CARDS INSIDE CHAT */}
                {m.products?.length > 0 && (
                  <div className="chat-products">
                    {m.products.map(p => (
                      <div key={p._id} className="chat-card">
                        <img src={p.imageCover} />
                        <div>
                          <h5>{p.title.slice(0, 20)}</h5>
                          <p>{p.price} EGP</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

              </div>
            ))}

            {/* TYPING */}
            {loading && (
              <div className="msg bot typing">
                typing...
              </div>
            )}

          </div>

          {/* INPUT */}
          <div className="chat-input">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Ask anything..."
            />

            <button onClick={sendMessage}>Send</button>
          </div>

        </div>
      )}
    </div>
  );
}