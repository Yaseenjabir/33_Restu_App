import AddItem from "./addItem";
import RestaurantDashboard from "./dashboard";
import EarningHistory from "./earningHistory";
import OrderList from "./orderlist";

export default function RestaurantContent({ tab }) {
  return (
    <>
      <div className="flex-1 h-full">
        {tab === "dashboard" ? (
          <RestaurantDashboard />
        ) : tab === "addFood" ? (
          <AddItem />
        ) : tab === "orders" ? (
          <OrderList />
        ) : (
          <EarningHistory />
        )}
      </div>
    </>
  );
}
