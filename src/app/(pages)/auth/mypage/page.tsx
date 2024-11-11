"use client";

import UserInfoCard from "@/app/components/common/card/UserInfoCard";
import Header from "@/app/components/layout/Header";
import { useEffect, useState } from "react";
import "./page.css";
import TagList from "@/app/components/common/tag/TagList";
import { TagType } from "@/types/tag/tagTypes";
import { getMemberOverViewAPI } from "@/app/api/member/memberAPI";
import HashLoading from "@/app/components/common/loading/HashLoading";
import { getTagsAPI } from "@/app/api/tag/tagAPI";
import TopTagsChart from "@/app/components/common/auth/TopTagsChart";
import { CustomerType } from "@/types/customer/customerType";
import { getCustomersAPI } from "@/app/api/customer/customerAPI";

interface MemberOverViewType {
  name: string;
  customerCount: number;
  messageCount: number;
}

const INITIALMEMBERDATA = {
  name: "",
  customerCount: 0,
  messageCount: 0,
};

export default function MypagePage() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [tags, setTags] = useState<TagType[]>([]);
  const [customers, setCustomers] = useState<CustomerType[]>([]);
  const [memberData, setMemberData] =
    useState<MemberOverViewType>(INITIALMEMBERDATA);

  useEffect(() => {
    fetchMemberData();
    fetchTagsData();
    fetchCustomerData();
  }, []);

  const fetchMemberData = async () => {
    try {
      const response = await getMemberOverViewAPI();
      setMemberData(response.result);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchTagsData = async () => {
    try {
      const response = await getTagsAPI();
      setTags(response.result.tags);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCustomerData = async () => {
    const { result } = await getCustomersAPI();
    setCustomers(result);
  };

  if (isLoading) {
    return <HashLoading />;
  }

  return (
    <div className="page-container">
      <Header title="마이페이지" />
      <div className="mypage-user-container">
        <UserInfoCard
          name={memberData.name}
          customerCount={memberData.customerCount}
          sentMessageCount={memberData.messageCount}
        />
        <div className="mypage-content-container">
          <div className="mypage-content">
            <p className="mypage-content_title body">태그</p>
            <TagList tags={tags} setTags={setTags} />
          </div>
          <div className="mypage-content">
            <p className="mypage-content_title body">태그 통계</p>
            <div className="mypage-content_chart-container">
              <TopTagsChart data={customers} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
