export default function TopHeroSection() {
  return (
    <>
      <section className="w-full">
        <div className="text-center bg-gray-50 px-10 py-10 flex flex-col items-center justify-center">
          <h1 className="text-xl font-semibold mb-4 max-w-[400px] md:text-2xl lg:text-3xl xl:text-4xl xl:font-bold xl:max-w-[500px]">
            Savor Every Bite: Delicious Meals Delivered to Your Door
          </h1>
          <p className="text-lg max-w-[400px] md:text-xl md:max-w-[500px] lg:max-w-[600px] lg:text-2xl">
            Enjoy a curated selection of mouthwatering dishes, freshly prepared
            and delivered straight to your doorstep. Perfect for busy days or
            special occasions, let us bring the finest flavors right to you!
          </p>
        </div>
      </section>
    </>
  );
}
