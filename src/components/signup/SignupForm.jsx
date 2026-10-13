
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import PasswordField from "./PasswordField";
import AgreementSection from "./AgreementSection";
import AddressModal from "./AddressModal";

function SignupForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    userId: "",
    password: "",
    passwordConfirm: "",
    nickname: "",
    birthDate: "",
    email: "",
    address: "",
  });

  const [agreements, setAgreements] = useState({
    terms: false,
    privacy: false,
    marketing: false,
  });

  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);

  // 비밀번호 불일치 여부
  const isPasswordMismatch =
    formData.passwordConfirm.length > 0 &&
    formData.password !== formData.passwordConfirm;

  // 필수 입력값 확인
  const isAllFieldsFilled =
    formData.userId.trim() !== "" &&
    formData.password.trim() !== "" &&
    formData.passwordConfirm.trim() !== "" &&
    formData.nickname.trim() !== "" &&
    formData.birthDate !== "" &&
    formData.email.trim() !== "" &&
    formData.address.trim() !== "";

  // 비밀번호 일치 확인
  const isPasswordMatched =
    formData.password.length > 0 &&
    formData.password === formData.passwordConfirm;

  // 이메일 형식 확인
  const isEmailValid =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim());

  // 필수 약관 동의 확인
  const isRequiredAgreed =
    agreements.terms && agreements.privacy;

  // 모든 조건 만족 시 회원가입 버튼 활성화
  const isSignupEnabled =
    isAllFieldsFilled &&
    isPasswordMatched &&
    isEmailValid &&
    isRequiredAgreed;

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "nickname" && value.length > 12) {
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAgreementChange = (event) => {
    const { name, checked } = event.target;

    setAgreements((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handleAgreementView = (agreementId) => {
    /*
      추후 팀에서 약관 페이지 또는 약관 모달이 확정되면
      agreementId를 기준으로 연결합니다.
    */
    console.log("약관 보기:", agreementId);
  };

  const handleLoginMove = () => {
    navigate("/login");
  };

  const handleAddressModalOpen = () => {
    setIsAddressModalOpen(true);
  };

  const handleAddressModalClose = () => {
    setIsAddressModalOpen(false);
  };

  const handleAddressApply = (fullAddress) => {
    setFormData((prev) => ({
      ...prev,
      address: fullAddress,
    }));

    setIsAddressModalOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!isSignupEnabled) {
      return;
    }

    /*
      실제 회원가입 API가 연결되면
      이 위치에서 서버로 회원가입 정보를 전달합니다.
    */

    console.log("회원가입 정보:", formData);
    console.log("약관 동의:", agreements);

    navigate("/login");
  };

  return (
    <>
      <form className="signup-form" onSubmit={handleSubmit}>
        {/* 아이디 */}
        <div className="signup-form__field">
          <label htmlFor="userId" className="signup-form__label">
            아이디
          </label>

          <input
            id="userId"
            name="userId"
            type="text"
            value={formData.userId}
            onChange={handleChange}
            placeholder="아이디를 입력해주세요."
            autoComplete="username"
            className="signup-form__input"
          />
        </div>

        {/* 비밀번호 */}
        <PasswordField
          id="password"
          name="password"
          label="비밀번호"
          value={formData.password}
          onChange={handleChange}
          placeholder="비밀번호를 입력해주세요."
        />

        {/* 비밀번호 확인 */}
        <div className="signup-form__field">
          <PasswordField
            id="passwordConfirm"
            name="passwordConfirm"
            label="비밀번호 확인"
            value={formData.passwordConfirm}
            onChange={handleChange}
            placeholder="비밀번호를 한 번 더 입력해주세요."
          />

          {isPasswordMismatch && (
            <p className="signup-form__error" role="alert">
              비밀번호가 다릅니다.
            </p>
          )}
        </div>

        {/* 닉네임 */}
        <div className="signup-form__field">
          <label htmlFor="nickname" className="signup-form__label">
            닉네임
          </label>

          <div className="signup-form__input-wrap">
            <input
              id="nickname"
              name="nickname"
              type="text"
              value={formData.nickname}
              onChange={handleChange}
              placeholder="닉네임을 입력해주세요."
              maxLength={12}
              className="signup-form__input signup-form__input--nickname"
            />

            <span className="signup-form__count">
              {formData.nickname.length} / 12
            </span>
          </div>
        </div>

        {/* 생년월일 */}
        <div className="signup-form__field">
          <label htmlFor="birthDate" className="signup-form__label">
            생년월일
          </label>

          <div className="signup-form__date">
            <input
              id="birthDate"
              name="birthDate"
              type="date"
              value={formData.birthDate}
              onChange={handleChange}
              className="signup-form__input"
            />

            <img
              src="/shop-community/images/signup/calendar.svg"
              alt=""
              className="signup-form__date-icon"
            />
          </div>
        </div>

        {/* 이메일 */}
        <div className="signup-form__field">
          <label htmlFor="email" className="signup-form__label">
            이메일
          </label>

          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="이메일을 입력해주세요."
            autoComplete="email"
            className="signup-form__input"
          />
        </div>

        {/* 주소 */}
        <div className="signup-form__field">
          <label htmlFor="address" className="signup-form__label">
            주소
          </label>

          <div className="signup-form__address">
            <input
              id="address"
              name="address"
              type="text"
              value={formData.address}
              onChange={handleChange}
              placeholder="주소를 입력해주세요."
              autoComplete="street-address"
              className="signup-form__input"
            />

            <button
              type="button"
              className="signup-form__address-search"
              aria-label="주소 입력"
              onClick={handleAddressModalOpen}
            >
              <img
                src="/shop-community/images/signup/search.svg"
                alt=""
              />
            </button>
          </div>
        </div>

        {/* 약관 */}
        <AgreementSection
          agreements={agreements}
          onChange={handleAgreementChange}
          onView={handleAgreementView}
        />

        {/* 회원가입 */}
        <button
          type="submit"
          className="signup-form__submit"
          disabled={!isSignupEnabled}
        >
          회원가입 하기
        </button>

        {/* 로그인 이동 */}
        <div className="signup-form__login">
          <span>이미 회원이신가요?</span>

          <button
            type="button"
            className="signup-form__login-button"
            onClick={handleLoginMove}
          >
            로그인하기
          </button>
        </div>
      </form>

      <AddressModal
        isOpen={isAddressModalOpen}
        onClose={handleAddressModalClose}
        onApply={handleAddressApply}
      />
    </>
  );
}

export default SignupForm;
