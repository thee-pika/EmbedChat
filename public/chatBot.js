(function () {
  const api_Url = "http://localhost:3000/api/chat";

  const scriptTag = document.currentScript;

  const ownerId = scriptTag.getAttribute("data-owner-id");
  if (!ownerId) {
    console.log("ownerId is required");
    return;
  }

  const button = document.createElement("div");
  button.innerHTML = "💬";

  Object.assign(button.style, {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    width: "56px",
    height: "56px",
    backgroundColor: "#000",
    color: "#fff",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "24px",
    cursor: "pointer",
    boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
    zIndex: "9999",
    transition: "all 0.2s ease",
  });

  document.body.appendChild(button);

  const box = document.createElement("div");
  Object.assign(box.style, {
    position: "fixed",
    bottom: "90px",
    right: "20px",
    width: "320px",
    height: "420px",
    backgroundColor: "#fff",
    borderRadius: "16px",
    boxShadow: "0 20px 50px rgba(0,0,0,0.2)",
    zIndex: "9999",
    display: "none",
    flexDirection: "column",
    overflow: "hidden",
    border: "1px solid #e4e4e7",
    fontFamily: "sans-serif",
  });

  box.innerHTML = `
  <div style="
  background:#000;
    display:flex;
    color:#fff;
    padding:12px 14px;
    font-size:14px;
    justify-content:space-between;
    align-items:center;
  ">
     <span>EmbedChat</span>
     <span id="chat-close" style="cursor:pointer;font-size:16px"> ╳ </span>
  </div>
  <div
  id="chat-messages"
  style="
  flex:1;
  padding: 12px;
  overflow-y:auto;
  background:#f9fafb;
  display:flex;
  flex-direction: column;
  gap:8px;
  "></div>

<div
style="
display:flex;
border-top:1px solid #e5e7eb;
padding:8px;
gap:6px;
"
>
<input id="chat-input" type:"text" style=" flex:1; padding: 8px 10px; border: 1px solid #d1d5db; border-radius: 8px; font-size: 13px;
 outline: none; "
placeholder="Type a message"
/>
<button
id="chat-send"
style="
padding:8px 12px;
border:none;
background:#000;
color:#fff;
border-radius:8px;
font-size:13px;
cursor-pointer;
"
> send </button>
</div>
`;
  document.body.appendChild(box);

  button.onclick = () => {
    box.style.display = box.style.display === "none" ? "flex" : "none"
  }

  document.querySelector("#chat-close").onclick = () => {
    box.style.display = "none"
  }

  const input = document.querySelector("#chat-input");
  const sendBtn = document.querySelector("#chat-send");
  const messageArea = document.querySelector("#chat-messages");

  function addMessage(text, from) {
    const bubble = document.createElement("div");
    bubble.innerHTML = text;

    Object.assign(bubble.style, {
      maxWidth: "75%",
      padding: "10px 12px",
      borderRadius: "14px",
      fontSize: "13px",
      lineHeight: "1.4",
      wordBreak: "break-word",
      display: "inline-block",

      alignSelf: from === "user" ? "flex-end" : "flex-start",
      backgroundColor: from === "user" ? "#000" : "#f4f4f5",
      color: from === "user" ? "#fff" : "#111",

      borderBottomRightRadius: from === "user" ? "4px" : "14px",
      borderBottomLeftRadius: from === "user" ? "14px" : "4px",

      marginBottom: "4px"
    });

    messageArea.appendChild(bubble);
    messageArea.scrollTop = messageArea.scrollHeight;
  }

  sendBtn.onclick = async () => {
    const text = input.value.trim();
    if (!text) {
      return;
    }

    addMessage(text, "user");
    input.value = ""

    const typing = document.createElement("div");
    typing.innerHTML = "Typing...";

    Object.assign(typing.style, {
      maxWidth: "60%",
      padding: "8px 12px",
      borderRadius: "14px",
      fontSize: "12px",
      backgroundColor: "#f4f4f5",
      color: "#6b7280",

      alignSelf: "flex-start",
      borderBottomLeftRadius: "4px",
    });

    messageArea.appendChild(typing)
    messageArea.scrollTop = messageArea.scrollHeight;

    try {
      const response = await fetch(api_Url, {
        method: "POST",
        headers: {
          "content-Type": "application/json"
        },
        body: JSON.stringify({
          ownerId, message: text
        })
      })

      const data = await response.json();
      messageArea.removeChild(typing);
      addMessage(data || "Something went wrong", "ai");

    } catch (error) {
      console.log(error);
      messageArea.removeChild(typing);
      addMessage("Something went wrong", "ai");
    }
  }

})();


