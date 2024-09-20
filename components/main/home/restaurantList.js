import Spinner from "./spinner";
import RestaurantListWrapper from "../../../client_comps/costumerComps/restaurantlistwrapper";

export default function RestaurantList({ loader, avaialbility, resturants }) {
  return (
    <>
      <section className="">
        {loader ? (
          <Spinner />
        ) : avaialbility ? (
          <div className="mx-2 py-5 max-w-[1060px] lg:mx-auto flex items-center justify-center flex-row flex-wrap gap-y-5 gap-x-3">
            {resturants &&
              resturants.map((item) => {
                return (
                  <>
                    <RestaurantListWrapper item={item} />
                  </>
                );
              })}
          </div>
        ) : (
          <p className="text-red-500 text-center text-xl">
            No restaurant found
          </p>
        )}
      </section>
    </>
  );
}
