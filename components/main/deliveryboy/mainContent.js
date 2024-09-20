import AvailableOrders from "./availableorders";
import EarningHistory from "./earninghistory";
import MyProfile from "./myprofile";

export default function MainContent({ navigate }) {
  return (
    <>
      <div className="flex flex-1 items-center justify-center border-l bg-gray-50">
        {navigate === "available orders" ? (
          <AvailableOrders />
        ) : navigate === "my profile" ? (
          <MyProfile />
        ) : (
          <EarningHistory />
        )}
      </div>
    </>
  );
}
