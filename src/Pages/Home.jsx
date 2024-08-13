import SideBar from "../Components/SideBar";
import RightBar from "../Components/RightBar";
import ContentPage from "../Components/ContentPage";
import Loading from "../Components/Loading";
import { useContext } from "react";
import { LoadingContext } from "../Context/loadingContext";
import NotificationsPopup from "../Components/NotificationsPopup";
import ThemesPopup from "../Components/ThemesPopup";

export default function Home() {
  const loading = useContext(LoadingContext);
  return (
    <>
      {loading.load ? <Loading /> : <></>}
      <NotificationsPopup />
      <ThemesPopup />
      <main>
        <div className="container">
          <SideBar />
          <ContentPage />
          <RightBar />
        </div>
      </main>
    </>
  );
}
