import React, { useState } from "react";
import "./CustomizedModifyAI.css";
import InputField from "../input/InputField";

interface Message {
  sender: "user" | "ai";
  content: string;
}

interface CustomizedModifyAIProps {
  templateId: string;
  onSave: (title: string, content: string) => void;
}

export const CustomizedModifyAI = ({
  templateId,
  onSave,
}: CustomizedModifyAIProps) => {
  const [title, setTitle] = useState<string>("제목 입력");
  const [content, setContent] = useState<string>("내용 입력");
  const [messages, setMessages] = useState<Message[]>([
    { sender: "ai", content: "안녕하세요! 템플릿을 어떻게 수정할까요?" },
  ]);
  const [newMessage, setNewMessage] = useState<string>("");

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;

    const userMessage: Message = { sender: "user", content: newMessage };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    const aiResponse: Message = {
      sender: "ai",
      content: `AI 응답 예시: "${newMessage}"에 대해 템플릿을 수정합니다.`,
    };
    setMessages((prevMessages) => [...prevMessages, aiResponse]);

    setNewMessage("");
  };

  const handleSave = () => {
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
    </div>
  );
};
