"use client";

import React, { useEffect, useState } from "react";
import UserInfoCard from "@/app/components/common/card/UserInfoCard";
import Header from "@/app/components/layout/Header";
import "./page.css";
import TopTagsChart from "@/app/components/common/auth/TopTagsChart";
import { getMemberOverViewAPI } from "@/app/api/member/memberAPI";
import { getTagsAPI } from "@/app/api/tag/tagAPI";
import { getCustomersAPI } from "@/app/api/customer/customerAPI";
import MypageTagList from "@/app/components/common/auth/MypageTagList";
import { CustomerType } from "@/types/customer/customerType";
import { TagColorType, TagType } from "@/types/tag/tagTypes";
import { getEveryMessagesAPI } from "@/app/api/message/messageAPI";
import { MessageType } from "@/types/message/messageTypes";
import HashLoading from "@/app/components/common/loading/HashLoading";
import Cookies from "js-cookie";

const INITIALMEMBERDATA = {
  name: "",
  customerCount: 0,
  messageCount: 0,
};

export default function MypagePage() {
  const [members, setMembers] = useState(INITIALMEMBERDATA);
  const [tags, setTags] = useState<TagType[]>([]);
  const [customers, setCustomers] = useState<CustomerType[]>([]);
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const token = Cookies.get("accessToken");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const memberResponse = await getMemberOverViewAPI(token);
        setMembers(memberResponse.result || INITIALMEMBERDATA);

        const tagsResponse = await getTagsAPI(token);
        setTags(tagsResponse.result.tags || []);

        const customersResponse = await getCustomersAPI(token);
        setCustomers(customersResponse.result || []);

        const messagesResponse = await getEveryMessagesAPI({
          token: token,
          sort: "createdAt",
        });
        setMessages(messagesResponse.result.slice(0, 100) || []);
      } catch (error) {
        setMembers(INITIALMEMBERDATA);
        setTags([]);
        setCustomers([]);
        setMessages([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const tagCounts: Record<string, { count: number; color: string }> = {};
  customers.forEach((customer) => {
    customer.customerTags.forEach((tag) => {
      if (!tagCounts[tag.tagName]) {
        tagCounts[tag.tagName] = { count: 0, color: tag.tagColor };
      }
      tagCounts[tag.tagName].count += 1;
    });
  });

  const sortedTags = Object.entries(tagCounts)
    .map(([tagName, { count, color }]) => ({ tagName, count, color }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5)
    .concat(
      Array.from({ length: 5 }, (_, i) => ({
        tagName: `${i + 1}`,
        count: 0,
        color: "GRAY" as TagColorType,
      })),
    )
    .slice(0, 5);

  const messageTagCounts: Record<string, { count: number; color: string }> = {};
  messages.forEach((message) => {
    message.messageTags.forEach((tag) => {
      if (!messageTagCounts[tag.tagName]) {
        messageTagCounts[tag.tagName] = { count: 0, color: tag.tagColor };
      }
      messageTagCounts[tag.tagName].count += 1;
    });
  });

  const sortedMessageTags = Object.entries(messageTagCounts)
    .map(([tagName, { count, color }]) => ({ tagName, count, color }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5)
    .concat(
      Array.from({ length: 5 }, (_, i) => ({
        tagName: `${i + 1}`,
        count: 0,
        color: "GRAY",
      })),
    )
    .slice(0, 5);

  if (isLoading) return <HashLoading />;

  return (
    <div className="page-container">
      <Header title="마이페이지" />
      <div className="mypage-user-container">
        <UserInfoCard
          name={members.name}
          customerCount={members.customerCount}
          sentMessageCount={members.messageCount}
        />
        <div className="mypage-content-container">
          <div className="mypage-content">
            <p className="mypage-content_title body">태그</p>
            <MypageTagList tags={tags} />
          </div>
          <div className="mypage-charts">
            <div className="mypage-content">
              <p className="mypage-content_title body">고객 통계</p>
              <p className="mypage-content_caption caption">
                전체 고객에 대한 태그별 통계입니다.
              </p>
              <div className="mypage-content_chart-container">
                <TopTagsChart data={sortedTags} />
              </div>
            </div>
            <div className="mypage-content">
              <p className="mypage-content_title body">메시지 통계</p>
              <p className="mypage-content_caption caption">
                최근 100건의 메세지에 대한 태그별 통계입니다.
              </p>
              <div className="mypage-content_chart-container">
                <TopTagsChart data={sortedMessageTags} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
