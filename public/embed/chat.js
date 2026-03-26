(function () {
  "use strict";

  var CLIENT_ID = window.MAINLINE_CLIENT_ID;
  if (!CLIENT_ID) {
    console.warn("Mainline: MAINLINE_CLIENT_ID not set");
    return;
  }

  var API_URL = "https://mainlinehq.com/api/chat";
  var conversationId = null;
  var messages = [];
  var isOpen = false;
  var isLoading = false;

  // ---- Styles ----
  var style = document.createElement("style");
  style.textContent = [
    "#ml-chat-bubble{position:fixed;bottom:20px;right:20px;width:56px;height:56px;border-radius:50%;background:#E8630A;cursor:pointer;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 12px rgba(232,99,10,0.4);z-index:99999;transition:transform .2s}",
    "#ml-chat-bubble:hover{transform:scale(1.08)}",
    "#ml-chat-bubble svg{width:28px;height:28px;fill:#fff}",
    "#ml-chat-window{position:fixed;bottom:88px;right:20px;width:370px;max-height:520px;border-radius:16px;background:#fff;box-shadow:0 8px 30px rgba(0,0,0,.15);z-index:99999;display:none;flex-direction:column;overflow:hidden;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif}",
    "#ml-chat-window.open{display:flex}",
    "#ml-chat-header{background:#1A1A2E;padding:14px 16px;display:flex;align-items:center;gap:10px}",
    "#ml-chat-header .ml-avatar{width:36px;height:36px;border-radius:50%;background:rgba(255,255,255,.15);display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;color:#fff}",
    "#ml-chat-header .ml-info{flex:1}",
    "#ml-chat-header .ml-name{color:#fff;font-size:14px;font-weight:600}",
    "#ml-chat-header .ml-status{color:rgba(255,255,255,.6);font-size:11px;display:flex;align-items:center;gap:5px}",
    "#ml-chat-header .ml-dot{width:6px;height:6px;border-radius:50%;background:#16A34A}",
    "#ml-chat-header .ml-close{background:none;border:none;color:rgba(255,255,255,.6);cursor:pointer;padding:4px;font-size:18px;line-height:1}",
    "#ml-chat-header .ml-close:hover{color:#fff}",
    "#ml-chat-messages{flex:1;overflow-y:auto;padding:16px;display:flex;flex-direction:column;gap:12px;background:#f9fafb;min-height:280px;max-height:360px}",
    ".ml-msg{max-width:82%;font-size:13px;line-height:1.5;padding:10px 14px;border-radius:12px;word-wrap:break-word}",
    ".ml-msg.ai{align-self:flex-start;background:#fff;border:1px solid #e5e7eb;border-radius:12px 12px 12px 4px;color:#1f2937}",
    ".ml-msg.user{align-self:flex-end;background:#E8630A;color:#fff;border-radius:12px 12px 4px 12px}",
    ".ml-typing{align-self:flex-start;display:flex;gap:4px;padding:10px 14px;background:#fff;border:1px solid #e5e7eb;border-radius:12px}",
    ".ml-typing span{width:6px;height:6px;border-radius:50%;background:#9ca3af;animation:ml-bounce .6s infinite}",
    ".ml-typing span:nth-child(2){animation-delay:.15s}",
    ".ml-typing span:nth-child(3){animation-delay:.3s}",
    "@keyframes ml-bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-4px)}}",
    "#ml-chat-input{display:flex;gap:8px;padding:12px;border-top:1px solid #e5e7eb;background:#fff}",
    "#ml-chat-input input{flex:1;border:1px solid #e5e7eb;border-radius:8px;padding:8px 12px;font-size:13px;outline:none;background:#f9fafb}",
    "#ml-chat-input input:focus{border-color:#E8630A;background:#fff}",
    "#ml-chat-input button{background:#E8630A;border:none;border-radius:8px;padding:8px 12px;cursor:pointer;display:flex;align-items:center;justify-content:center}",
    "#ml-chat-input button:hover{background:#CF5808}",
    "#ml-chat-input button:disabled{opacity:.4;cursor:not-allowed}",
    "#ml-chat-input button svg{width:18px;height:18px;fill:#fff}",
    "#ml-chat-disclaimer{padding:6px 12px;text-align:center;font-size:10px;color:#9ca3af;background:#fff}",
    "@media(max-width:480px){#ml-chat-window{bottom:0;right:0;left:0;width:100%;max-height:100vh;border-radius:0}#ml-chat-messages{max-height:calc(100vh - 140px)}#ml-chat-bubble{bottom:16px;right:16px}}",
  ].join("\n");
  document.head.appendChild(style);

  // ---- Bubble ----
  var bubble = document.createElement("div");
  bubble.id = "ml-chat-bubble";
  bubble.setAttribute("aria-label", "Chat with our AI");
  bubble.innerHTML = '<svg viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.2L4 17.2V4h16v12z"/></svg>';
  bubble.onclick = function () {
    isOpen = !isOpen;
    win.classList.toggle("open", isOpen);
    if (isOpen && messages.length === 0) addGreeting();
  };

  // ---- Window ----
  var win = document.createElement("div");
  win.id = "ml-chat-window";
  win.innerHTML = [
    '<div id="ml-chat-header">',
    '  <div class="ml-avatar">AI</div>',
    '  <div class="ml-info">',
    '    <div class="ml-name">AI Assistant</div>',
    '    <div class="ml-status"><span class="ml-dot"></span>Online</div>',
    '  </div>',
    '  <button class="ml-close" aria-label="Close chat">&times;</button>',
    '</div>',
    '<div id="ml-chat-messages"></div>',
    '<form id="ml-chat-input">',
    '  <input type="text" placeholder="Type a message..." autocomplete="off" />',
    '  <button type="submit" aria-label="Send"><svg viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg></button>',
    '</form>',
    '<div id="ml-chat-disclaimer">Powered by AI. Not a human.</div>',
  ].join("");

  var closeBtn = win.querySelector(".ml-close");
  closeBtn.onclick = function () {
    isOpen = false;
    win.classList.remove("open");
  };

  var msgContainer = win.querySelector("#ml-chat-messages");
  var form = win.querySelector("#ml-chat-input");
  var input = form.querySelector("input");
  var sendBtn = form.querySelector("button");

  form.onsubmit = function (e) {
    e.preventDefault();
    var text = input.value.trim();
    if (!text || isLoading) return;
    input.value = "";
    sendMessage(text);
  };

  function addGreeting() {
    addMsg("ai", "Hi! I'm an AI assistant. How can I help you today?");
  }

  function addMsg(role, text) {
    messages.push({ role: role === "ai" ? "assistant" : "user", content: text });
    var div = document.createElement("div");
    div.className = "ml-msg " + (role === "ai" ? "ai" : "user");
    div.textContent = text;
    msgContainer.appendChild(div);
    msgContainer.scrollTop = msgContainer.scrollHeight;
  }

  function showTyping() {
    var div = document.createElement("div");
    div.className = "ml-typing";
    div.id = "ml-typing";
    div.innerHTML = "<span></span><span></span><span></span>";
    msgContainer.appendChild(div);
    msgContainer.scrollTop = msgContainer.scrollHeight;
  }

  function hideTyping() {
    var el = document.getElementById("ml-typing");
    if (el) el.remove();
  }

  function sendMessage(text) {
    addMsg("user", text);
    isLoading = true;
    sendBtn.disabled = true;
    showTyping();

    var history = messages.map(function (m) {
      return { role: m.role, content: m.content };
    });

    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        clientId: CLIENT_ID,
        conversationId: conversationId,
        message: text,
        history: history,
      }),
    })
      .then(function (res) { return res.json(); })
      .then(function (data) {
        hideTyping();
        if (data.conversationId) conversationId = data.conversationId;
        addMsg("ai", data.message || "Sorry, something went wrong. Please try again.");
      })
      .catch(function () {
        hideTyping();
        addMsg("ai", "I'm having trouble connecting. Please call us directly.");
      })
      .finally(function () {
        isLoading = false;
        sendBtn.disabled = false;
        input.focus();
      });
  }

  // ---- Mount ----
  document.body.appendChild(bubble);
  document.body.appendChild(win);
})();
