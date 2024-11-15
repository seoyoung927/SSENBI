import UserInfoCard from "@/app/components/common/card/UserInfoCard";
import Header from "@/app/components/layout/Header";
import "./page.css";
import TopTagsChart from "@/app/components/common/auth/TopTagsChart";
import { getMemberOverViewAPI } from "@/app/api/member/memberAPI";
import { getTagsAPI } from "@/app/api/tag/tagAPI";
import { getCustomerStatisticsAPI } from "@/app/api/customer/customerAPI";
import MypageTagList from "@/app/components/common/auth/MypageTagList";
import { getMessageStatisticsAPI } from "@/app/api/message/messageAPI";
import { cookies } from "next/headers";

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

  const fetchCustomerStatisticsData = async () => {
    try {
      const { result } = await getCustomerStatisticsAPI(token);
      return result;
    } catch (error) {
      if (error instanceof Error) {
        return [];
      }
    }
  };

  const fetchMessageStatisticsData = async () => {
    try {
      const { result } = await getMessageStatisticsAPI(token);
      return result.slice(0, 100);
    } catch (error) {
      if (error instanceof Error) {
        return [];
      }
    }
  };

  const members = await fetchMemberData();
  const tags = await fetchTagsData();
  const customerStatistics = await fetchCustomerStatisticsData();
  const messageStatistics = await fetchMessageStatisticsData();

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
                <TopTagsChart data={customerStatistics} />
              </div>
            </div>
            <div className="mypage-content">
              <p className="mypage-content_title body">메시지 통계</p>
              <p className="mypage-content_caption caption">
                최근 100건의 메세지에 대한 태그별 통계입니다.
              </p>
              <div className="mypage-content_chart-container">
                <TopTagsChart data={messageStatistics} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
