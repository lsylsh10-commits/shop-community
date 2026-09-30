import { useState } from "react";
import PasswordInput from "./PasswordInput";

function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!formData.email.trim()) {
      alert("이메일을 입력해주세요.");
      return;
    }

    if (!formData.password.trim()) {
      alert("비밀번호를 입력해주세요.");
      return;
    }

    /*
      추후 팀의 실제 로그인 API가 연결되면
      이 위치에서 로그인 요청을 처리합니다.

      현재는 공통 인증 코드 / Router / App.jsx를
      수정하지 않습니다.
    */

    console.log("로그인 입력 데이터:", formData);
  };

  const handleSignUp = () => {
    /*
      회원가입 페이지 라우팅이 확정되면
      이 위치에서 회원가입 화면으로 이동합니다.

      예:
      navigate("/signup");

      현재는 App.jsx / Router를 수정하지 않습니다.
    */
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <div className="login-form__field">
        <label htmlFor="email" className="login-form__label">
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
          className="login-form__input"
        />
      </div>

      <PasswordInput
        value={formData.password}
        onChange={handleChange}
      />

      <div className="login-form__buttons">
        <button
          type="submit"
          className="login-form__button login-form__button--login"
        >
          로그인
        </button>

        <button
          type="button"
          className="login-form__button login-form__button--signup"
          onClick={handleSignUp}
        >
          회원가입
        </button>
      </div>
    </form>
  );
}

export default LoginForm;