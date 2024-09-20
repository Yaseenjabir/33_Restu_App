import { Poppins } from "next/font/google";
import DeliveryBoyWrapper from "../../../client_comps/costumerComps/deliveryboywrapper";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  style: "normal",
  subsets: ["latin"],
});
export default function DeliveryBoy() {
  return (
    <>
      <section className="mt-10">
        <h1
          style={{ fontFamily: poppins.style.fontFamily }}
          className="font-bold text-2xl px-4 md:px-8 md:text-3xl lg:px-12 xl:px-14 mb-5"
        >
          Start your journey with us with more profit
        </h1>
        <div
          id="deliveryBackground"
          className="w-full h-[70vh] relative flex justify-center md:justify-start"
        >
          <div className="bg-white rounded-xl py-4 px-5 shadow-2xl shadow-black text-black absolute bottom-[-200px] w-[95%] md:w-[530px] md:ml-8 lg:ml-12 xl:ml-20">
            <h1 className="font-semibold mb-8">
              Join Our Delivery Team and Be Part of the Excitement!
            </h1>
            <p className="font-light leading-5 mb-5">
              Ready to earn while delivering delicious meals and making a
              difference? We&apos;re looking for dedicated delivery
              professionals to join our team.
            </p>
            <p className="font-light leading-5 mb-5">
              As a delivery partner, you'll be the final link in our service
              chain, ensuring our customers receive their orders quickly and
              with a smile. Enjoy flexible hours, competitive pay, and the
              satisfaction of bringing great food to happy customers!
            </p>
            <p className="mb-2">
              Want to make an impact? Apply to join our delivery team today and
              start your journey with us!
            </p>

            <DeliveryBoyWrapper />
          </div>
        </div>
      </section>
    </>
  );
}
