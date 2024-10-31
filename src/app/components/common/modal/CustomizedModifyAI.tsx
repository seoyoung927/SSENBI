import React, { useEffect, useRef, useState } from "react";
import "./CustomizedModifyAI.css";

interface Message {
  sender: "user" | "ai";
  content: string;
}

interface CustomizedModifyAIProps {
  templateId: string;
  onClose: () => void;
  onSave: (
    title?: string,
    content?: string,
    beforeTags?: number[],
    afterTags?: number[],
    beforeCustomerIds?: number[],
    afterCustomerIds?: number[],
  ) => void;
}

export const CustomizedModifyAI: React.FC<CustomizedModifyAIProps> = ({
  templateId,
  onClose,
  onSave,
}) => {
  const [messages, setMessages] = useState<Message[]>([
    { sender: "ai", content: "안녕하세요! 템플릿을 어떻게 수정할까요?" },
  ]);
  const [newMessage, setNewMessage] = useState<string>("");

  const scrollRef = useRef<HTMLDivElement>(null); // Define scrollRef type as HTMLDivElement

  const handleSendMessage = async () => {
    if (newMessage.trim() === "") return;

    // Add the user's message
    const userMessage: Message = { sender: "user", content: newMessage };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setNewMessage("");

    // Simulate AI response after a delay
    await new Promise((resolve) => setTimeout(resolve, 500)); // 500ms delay

    const aiResponse: Message = {
      sender: "ai",
      content: `AI 응답 예시: "${userMessage.content}"에 대해 템플릿을 수정합니다.`,
    };
    setMessages((prevMessages) => [...prevMessages, aiResponse]);
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSave = () => {
    // You can retrieve the latest information from messages or form fields if needed
    const title = "새로운 제목 예시"; // Replace with actual title
    const content = "새로운 내용 예시"; // Replace with actual content

    // Call onSave with title, content, and other parameters if applicable
    onSave(title, content);
  };

  return (
    <div className="customized-modify-ai">
      <div className="chat-container">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`chat-message ${message.sender === "user" ? "user-message" : "ai-message"}`}
          >
            <div className="chat-bubble">{message.content}</div>
          </div>
        ))}
        <div ref={scrollRef} /> {/* Empty div to scroll into view */}
      </div>

      <div className="chat-input-container">
        <input
          type="text"
          placeholder="메시지를 입력하세요..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="chat-input"
        />
        <button onClick={handleSendMessage} className="send-button">
          전송
        </button>
      </div>

      <div className="modal-footer">
        <button className="modal-cancel" onClick={onClose}>
          취소
        </button>
        <button className="modal-confirm" onClick={handleSave}>
          확인
        </button>
      </div>
    </div>
  );
};
