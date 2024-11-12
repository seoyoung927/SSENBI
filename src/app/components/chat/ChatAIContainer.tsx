import React, { useEffect, useRef, useState } from "react";
import { postAIChatAPI } from "@/app/api/chat/chatAPI";
import Cookies from "js-cookie";
import CheckIcon from "@/app/assets/svg/Check.svg";
import "./ChatAIContainer.css";
import { TagType } from "@/types/tag/tagTypes";
import { CustomerType } from "@/types/customer/customerType";

enum SenderType {
  NOTICE = "notice",
  USER = "user",
  AI = "ai",
}

interface MessageType {
  sender: SenderType;
  description?: string;
  content: string;
}

interface ChatAIContainerPropsType {
  onClose: () => void;
  onSave: (content: string) => void;
  content: string;
  tags?: TagType[];
  customers?: CustomerType[];
}

export default function ChatAIContainer({
  onClose,
  onSave,
  content = "",
  tags,
  customers,
}: ChatAIContainerPropsType) {
  const [newMessage, setNewMessage] = useState<string>("");
  const [token, setToken] = useState<string>("");
  const [modifiedContent, setModifiedContent] = useState<string>(content);
  const [messages, setMessages] = useState<MessageType[]>([
    {
      sender: SenderType.NOTICE,
      description: `안녕하세요! 템플릿을 어떻게 수정할까요?\n현재 템플릿 내용은 다음과 같습니다.\n\n ======================\n\n`,
      content: `${modifiedContent}\n\n======================\n\n수정 요구사항을 입력해주세요!`,
    },
  ]);

  useEffect(() => {
    const token = Cookies.get("accessToken");
    if (!token) return;
    setToken(token);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const scrollRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);
  };

  const handleSendMessage = async () => {
    if (newMessage.trim() === "") return;

    const userMessage: MessageType = {
      sender: SenderType.USER,
      content: newMessage,
    };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setNewMessage("");

    try {
      const chatResponse = await postAIChatAPI({
        token,
        content: modifiedContent,
        requirements: newMessage,
        ...(tags ? { tagIds: tags.map((tag) => tag.tagId) } : {}),
        ...(customers
          ? { customerIds: customers.map((customer) => customer.customerId) }
          : {}),
      });

      console.log("chatResponse", chatResponse);

      const aiResponse: MessageType = {
        sender: SenderType.AI,
        description: `쎈비 AI 응답은 다음과 같습니다.\n\n-----------------------\n\n`,
        content: `${chatResponse.result}`,
      };
      setMessages((prevMessages) => [...prevMessages, aiResponse]);
    } catch (err) {
      console.error(err);
      alert("ai 응답 과정 중 에러가 발생하였습니다. 관리자에게 문의해주세요");
    }
  };

  const saveContent = (content: string) => {
    onClose();
    onSave(content);
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
            <div className="chat-bubble">{`${message.description}\n${message.content}`}</div>
            {message.sender === SenderType.AI && (
              <div
                className="check-icon-container"
                onClick={() => saveContent(message.content)}
              >
                <CheckIcon className="check-icon" />
                <div className="tooltip">메시지 저장하기</div>
              </div>
            )}
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
    </div>
  );
}
