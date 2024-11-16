"use client";

import {
  postCustomerAPI,
  putCustomerAPI,
} from "@/app/api/customer/customerAPI";
import TagList from "@/app/components/common/tag/TagList";
import {
  CustomerCreationType,
  CustomerType,
} from "@/types/customer/customerType";
import { TagType } from "@/types/tag/tagTypes";
import getRandomTagColor from "@/utils/getRandomTagColor";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import "./CustomerForm.css";
import axios from "axios";

interface RequiredFieldErrorsType {
  name: string;
  age: string;
  phoneNumber: string;
}

interface CustomerFormProps {
  customer?: CustomerType;
}

const INITIAL_REQUIRED_FIELD_ERRORS: RequiredFieldErrorsType = {
  name: "",
  age: "",
  phoneNumber: "",
};

const NAME_ERROR = "고객 이름은 한글,숫자로 이루어진 2~10자리여야 합니다";
const AGE_ERROR = "고객의 나이는 양수여야 합니다.";
const PHONE_NUMBER_ERROR = "전화번호는 숫자로만 이루어진 11자리여야 합니다.";
const NAME_PHONE_NUMEBER_DUPLICATE_ERROR =
  "이름이나 전화번호가 동일한 고객이 존재합니다.";

export default function CustomerForm({ customer }: CustomerFormProps) {
  const router = useRouter();
  const nameRef = useRef<HTMLInputElement>(null);
  const [nameError, setNameError] = useState<boolean>(false);
  const ageRef = useRef<HTMLInputElement>(null);
  const [ageError, setAgeError] = useState<boolean>(false);
  const phoneNumberRef = useRef<HTMLInputElement>(null);
  const [phoneNumberError, setPhoneNumberError] = useState<boolean>(false);
  const memoRef = useRef<HTMLTextAreaElement>(null);
  const [isMale, setIsMale] = useState<boolean>(true);
  const [tags, setTags] = useState<TagType[]>([]);
  const [requiredFieldErrors, setRequiredFieldErrors] =
    useState<RequiredFieldErrorsType>(INITIAL_REQUIRED_FIELD_ERRORS);

  useEffect(() => {
    if (
      !customer ||
      !nameRef.current ||
      !ageRef.current ||
      !phoneNumberRef.current ||
      !memoRef.current
    ) {
      return;
    }
    nameRef.current.value = customer.customerName;
    ageRef.current.value = customer.customerAge.toString();
    phoneNumberRef.current.value = customer.customerPhoneNumber;
    memoRef.current.value = customer.customerMemo;
    setIsMale(customer.customerGender === "MALE");
    setTags(customer.customerTags);
  }, [customer]);

  const handleCreateCustomer = async () => {
    const customerName = nameRef.current?.value?.trim() || "";
    const customerAge = Number(ageRef.current?.value) || 0;
    const customerGender = isMale ? "MALE" : "FEMALE";
    const customerPhoneNumber = phoneNumberRef.current?.value?.trim() || "";
    const customerTags = tags.map((tag) => tag.tagId);
    const customerMemo = memoRef.current?.value?.trim() || "";
    const customerColor = getRandomTagColor();
    const customerData: CustomerCreationType = {
      customerName,
      customerAge,
      customerGender,
      customerPhoneNumber,
      customerTags,
      customerMemo,
      customerColor,
    };

    let isValid = true;

    // 이름 유효성 검사
    if (!/^[가-힣0-9]{2,10}$/.test(customerName)) {
      setNameError(true);
      setRequiredFieldErrors((prevErrors) => ({
        ...prevErrors,
        name: NAME_ERROR,
      }));
      isValid = false;
    } else {
      setNameError(false);
      setRequiredFieldErrors((prevErrors) => ({
        ...prevErrors,
        name: "",
      }));
    }

    // 나이 유효성 검사
    if (customerAge < 0) {
      setAgeError(true);
      setRequiredFieldErrors((prevErrors) => ({
        ...prevErrors,
        age: AGE_ERROR,
      }));
      isValid = false;
    } else {
      setAgeError(false);
      setRequiredFieldErrors((prevErrors) => ({
        ...prevErrors,
        age: "",
      }));
    }

    // 전화번호 유효성 검사
    if (!/^\d{11}$/.test(customerPhoneNumber)) {
      setPhoneNumberError(true);
      setRequiredFieldErrors((prevErrors) => ({
        ...prevErrors,
        phoneNumber: PHONE_NUMBER_ERROR,
      }));
      isValid = false;
    } else {
      setPhoneNumberError(false);
      setRequiredFieldErrors((prevErrors) => ({
        ...prevErrors,
        phoneNumber: "",
      }));
    }

    // 유효성 검사 실패 시 함수 종료
    if (!isValid) return;

    try {
      const { result } = customer
        ? await putCustomerAPI(customer.customerId, customerData)
        : await postCustomerAPI(customerData);
      router.replace(
        result.customerId ? `/customer/${result.customerId}` : "customer",
      );
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        if (error.response.data.code === "C40002") {
          // 고객이름 오류 & 전화번호 오류
          setNameError(true);
          setPhoneNumberError(true);
          setRequiredFieldErrors((prevErrors) => ({
            ...prevErrors,
            name: NAME_PHONE_NUMEBER_DUPLICATE_ERROR,
            phoneNumber: NAME_PHONE_NUMEBER_DUPLICATE_ERROR,
          }));
        }
        if (error.response.data.message === NAME_ERROR) {
          // 고객이름 오류
          setNameError(true);
          setRequiredFieldErrors((prevErrors) => ({
            ...prevErrors,
            phoneNumber: NAME_ERROR,
          }));
        }
        if (error.response.data.message === PHONE_NUMBER_ERROR) {
          // 전화번호 오류
          setPhoneNumberError(true);
          setRequiredFieldErrors((prevErrors) => ({
            ...prevErrors,
            phoneNumber: PHONE_NUMBER_ERROR,
          }));
        }
      }
    }
  };

  return (
    <>
      <div className="field-wrapper ">
        <span className="subheading">이름</span>
        <input
          className="form-input-field"
          ref={nameRef}
          type="text"
          maxLength={20}
        />
        {nameError && (
          <div className="error-message">{requiredFieldErrors.name}</div>
        )}
      </div>
      <div className="field-wrapper">
        <span className="subheading">나이</span>
        <input
          className="form-input-field"
          ref={ageRef}
          type="number"
          defaultValue={customer ? customer.customerAge : 0}
        />
        {ageError && (
          <div className="error-message">{requiredFieldErrors.age}</div>
        )}
      </div>
      <div className="field-wrapper">
        <span className="subheading">성별</span>
        <div className="toggle-wrapper">
          <button
            className={`gender-selector body-medium ${isMale ? "selected" : ""}`}
            onClick={() => setIsMale(true)}
          >
            남자
          </button>
          <button
            className={`gender-selector body-medium ${!isMale ? "selected" : ""}`}
            onClick={() => setIsMale(false)}
          >
            여자
          </button>
        </div>
      </div>
      <div className="field-wrapper">
        <span className="subheading">전화번호</span>
        <input
          className="form-input-field"
          ref={phoneNumberRef}
          type="number"
          maxLength={13}
        />
        {phoneNumberError && (
          <div className="error-message">{requiredFieldErrors.phoneNumber}</div>
        )}
      </div>
      <div className="field-wrapper">
        <label className="subheading">그룹</label>
        <TagList tags={tags} setTags={setTags} />
      </div>
      <div className="field-wrapper">
        <label className="subheading">메모</label>
        <textarea
          ref={memoRef}
          className="body memo form-input-field"
          maxLength={300}
        />
      </div>
      <div className="button-group">
        <button onClick={router.back} className="button body-strong">
          취소
        </button>
        <button
          onClick={handleCreateCustomer}
          className="button primary body-strong"
        >
          {`${customer ? "수정" : "추가"}`}
        </button>
      </div>
    </>
  );
}
