export function getBotReply(message, products = [], history = []) {
  const msg = message.toLowerCase().trim();

  if (!msg) return "Say something 😊";

  // =========================
  // MEMORY CONTEXT (last message)
  // =========================
  const lastBotMessage = history.filter(m => m.role === "bot").slice(-1)[0]?.text;

  // =========================
  // GREETING INTELLIGENCE
  // =========================
  if (/(hi|hello|hey|yo)/.test(msg)) {
    return "Hey 👋 I'm your AI Shopping Assistant.\nAsk me about products, prices or recommendations 🔥";
  }

  // =========================
  // HELP MODE
  // =========================
  if (msg.includes("help")) {
    return `You can ask me:
• cheap products
• shoes / phones / laptops
• best deals
• recommend something`;
  }

  // =========================
  // PRICE FILTERING AI
  // =========================
  if (msg.includes("cheap") || msg.includes("budget")) {
    const cheap = products.filter(p => p.price <= 1000);

    return {
      text: `I found ${cheap.length} budget products 💸`,
      products: cheap.slice(0, 6)
    };
  }

  // =========================
  // CATEGORY DETECTION AI
  // =========================
  const categories = ["shoe", "shirt", "phone", "laptop", "watch"];

  for (let cat of categories) {
    if (msg.includes(cat)) {
      const result = products.filter(p =>
        p.category?.name?.toLowerCase().includes(cat) ||
        p.title?.toLowerCase().includes(cat)
      );

      return {
        text: `Found ${result.length} ${cat}(s) 👌`,
        products: result.slice(0, 6)
      };
    }
  }

  // =========================
  // SMART SEARCH ENGINE
  // =========================
  const found = products.filter(p =>
    p.title?.toLowerCase().includes(msg)
  );

  if (found.length) {
    return {
      text: `I found ${found.length} products matching "${message}" 🔍`,
      products: found.slice(0, 6)
    };
  }

  // =========================
  // FALLBACK AI RESPONSE
  // =========================
  const fallback = [
    "I didn’t fully understand 🤔 try 'cheap shoes' or 'phones'",
    "Try asking about categories like laptops or shirts 🔥",
    "I can help you find the best products 👌"
  ];

  return fallback[Math.floor(Math.random() * fallback.length)];
}