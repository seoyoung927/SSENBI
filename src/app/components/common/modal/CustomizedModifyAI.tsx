import React, { useEffect, useRef, useState } from "react";
import "./CustomizedModifyAI.css";

enum SenderType {
  USER = "user",
  AI = "ai",
}

interface Message {
  sender: SenderType;
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

export default function CustomizedModifyAI({
  templateId,
  onClose,
  onSave,
}: CustomizedModifyAIProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: SenderType.AI,
      content: "안녕하세요! 템플릿을 어떻게 수정할까요?",
    },
  ]);
  const [newMessage, setNewMessage] = useState<string>("");

  const scrollRef = useRef<HTMLDivElement>(null);

  // Separate input change handler
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);
  };

  const handleSendMessage = async () => {
    if (newMessage.trim() === "") return;

    const userMessage: Message = {
      sender: SenderType.USER,
      content: newMessage,
    };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setNewMessage("");

    await new Promise((resolve) => setTimeout(resolve, 500));

    const aiResponse: Message = {
      sender: SenderType.AI,
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
    const title = "새로운 제목 예시";
    const content = "새로운 내용 예시";
    onSave(title, content);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="customized-modify-ai">
      <div className="chat-container">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`chat-message ${message.sender === SenderType.USER ? "user-message" : "ai-message"}`}
          >
            <div className="chat-bubble">{message.content}</div>
          </div>
        ))}
        <div ref={scrollRef} />
      </div>

      <div className="chat-input-container">
        <input
          type="text"
          placeholder="메시지를 입력하세요..."
          value={newMessage}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
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
}
