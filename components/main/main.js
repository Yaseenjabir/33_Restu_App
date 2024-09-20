import SideCart from "../../components/main/cart/sideCart";
import CartLogo from "../../components/main/cart/cartLogo";
import TopHeroSection from "./home/topHeroSection";
import RegisterBussiness from "./home/registerBussines";
import Hygienic from "./home/hygienicFood";
import DeliveryBoy from "./home/deliveryboy";
import SectionWrapper from "../../client_comps/costumerComps/sectionsWrapper";

export default function Main() {
  return (
    <>
      <main className="mb-[300px]">
        <TopHeroSection />
        <RegisterBussiness />
        <SectionWrapper />
        <Hygienic />
        <DeliveryBoy />
        <SideCart />
        <CartLogo />
      </main>
    </>
  );
}
