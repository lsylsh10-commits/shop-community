import { useState } from "react";

import MyPageSidebar from "../components/mypage/MyPageSidebar";
import ProfileSection from "../components/mypage/ProfileSection";
import MyPageTabs from "../components/mypage/MyPageTabs";
import QuickMenu from "../components/mypage/QuickMenu";
import FriendsSection from "../components/mypage/FriendsSection";
import ProductSection from "../components/mypage/ProductSection";
import PostsSection from "../components/mypage/PostsSection";

import WishlistTab from "../components/mypage/WishlistTab";
import CartTab from "../components/mypage/CartTab";
import MyPostsTab from "../components/mypage/MyPostsTab";
import LikedPostsTab from "../components/mypage/LikedPostsTab";
import OrdersTab from "../components/mypage/OrdersTab";
import FriendsTab from "../components/mypage/FriendsTab";
import AccountSettingsTab from "../components/mypage/AccountSettingsTab";
import NotificationSettingsTab from "../components/mypage/NotificationSettingsTab";
import LogoutModal from "../components/mypage/LogoutModal";

import "../styles/mypage.css";

function MyPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const handleTabChange = (tabId) => {
    if (tabId === "logout") {
      setIsLogoutModalOpen(true);
      return;
    }

    setActiveTab(tabId);
  };

  const handleLogoutCancel = () => {
    setIsLogoutModalOpen(false);
  };

  const handleLogoutConfirm = () => {
    setIsLogoutModalOpen(false);

    /*
      실제 로그아웃 처리는 팀의 인증 기능과 연결할 때
      이 위치에 추가합니다.

      예:
      logout();
      navigate("/login");

      현재는 인증 로직을 임의로 수정하지 않습니다.
    */

    console.log("로그아웃 기능 연결 필요");
  };

  const renderContent = () => {
    switch (activeTab) {
      case "orders":
        return <OrdersTab />;

      case "friends":
        return <FriendsTab />;

      case "wishlist":
        return <WishlistTab />;

      case "cart":
        return <CartTab />;

      case "posts":
        return <MyPostsTab />;

      case "liked":
        return <LikedPostsTab />;

      case "settings":
        return <AccountSettingsTab />;

      case "notifications":
        return <NotificationSettingsTab />;

      default:
        return (
          <>
            <ProfileSection />

            <QuickMenu onTabChange={handleTabChange} />

            <FriendsSection />

            <ProductSection />

            <PostsSection />
          </>
        );
    }
  };

  return (
    <>
      <main className="mypage">
        <div className="mypage__inner">
          <MyPageSidebar
            activeTab={activeTab}
            onTabChange={handleTabChange}
          />

          <section className="mypage__content">
            <MyPageTabs
              activeTab={activeTab}
              onTabChange={handleTabChange}
            />

            {renderContent()}
          </section>
        </div>
      </main>

      {isLogoutModalOpen && (
        <LogoutModal
          onCancel={handleLogoutCancel}
          onConfirm={handleLogoutConfirm}
        />
      )}
    </>
  );
}

export default MyPage;