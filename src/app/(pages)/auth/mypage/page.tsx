import UserInfoCard from "@/app/components/common/card/UserInfoCard";
import Header from "@/app/components/layout/Header";
import "./page.css";
import TopTagsChart from "@/app/components/common/auth/TopTagsChart";
import { getMemberOverViewAPI } from "@/app/api/member/memberAPI";
import { getTagsAPI } from "@/app/api/tag/tagAPI";
import { getCustomersAPI } from "@/app/api/customer/customerAPI";
import MypageTagList from "@/app/components/common/auth/MypageTagList";
import { cookies } from "next/headers";
import { CustomerType } from "@/types/customer/customerType";
import { TagColorType, TagType } from "@/types/tag/tagTypes";
import { getEveryMessagesAPI } from "@/app/api/message/messageAPI";
import { MessageType } from "@/types/message/messageTypes";

const INITIALMEMBERDATA = {
  name: "",
  customerCount: 0,
  messageCount: 0,
};

export default async function MypagePage() {
  const cookieStore = cookies();
  const token = cookieStore.get("accessToken")?.value;

  const fetchMemberData = async () => {
    try {
      const response = await getMemberOverViewAPI(token);
      return response.result;
    } catch (error) {
      if (error instanceof Error) {
        return INITIALMEMBERDATA;
      }
    }
  };

  const fetchTagsData = async () => {
    try {
      const response = await getTagsAPI(token);
      return response.result.tags;
    } catch (error) {
      if (error instanceof Error) {
        return [];
      }
    }
  };

  const fetchCustomerData = async () => {
    try {
      const { result } = await getCustomersAPI(token);
      return result;
    } catch (error) {
      if (error instanceof Error) {
        return [];
      }
    }
  };

  const fetchMessageData = async () => {
    try {
      const { result } = await getEveryMessagesAPI({
        token: token,
        sort: "createdAt",
      });
      return result.slice(0, 100);
    } catch (error) {
      if (error instanceof Error) {
        return [];
      }
    }
  };

  const members = await fetchMemberData();
  const tags = await fetchTagsData();
  const customers = await fetchCustomerData();
  const messages = await fetchMessageData();

  // 태그 카운트를 저장할 객체 초기화 (count와 color 포함)
  const tagCounts: Record<string, { count: number; color: string }> = {};
  customers.forEach((customer: CustomerType) => {
    customer.customerTags.forEach((tag: TagType) => {
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

  // Process tags in messages to get top tags with color and count
  const messageTagCounts: Record<string, { count: number; color: string }> = {};
  messages.forEach((message: MessageType) => {
    message.messageTags.forEach((tag: TagType) => {
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
