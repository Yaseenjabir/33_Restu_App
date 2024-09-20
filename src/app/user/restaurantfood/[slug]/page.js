import Image from "next/image";

async function fetchData(_id) {
  const res = await fetch(
    `http://localhost:3000/api/user/displaysingleorder/${_id}`
  );
  const data = await res.json();
  return data;
}

export default async function Page({ params }) {
  const id = params.slug;

  const data = await fetchData(id);

  return (
    <>
      <div className="relative overflow-x-auto w-full max-w-[800px] mx-auto py-10 px-5">
        <h1 className="text-center mb-7 font-semibold">Order Details</h1>
        <table className="w-full text-sm text-left rtl:text-right  shadow-lg text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Image
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Quantity
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.items.map((item, index) => {
                return (
                  <>
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <th scope="row" className="px-4 py-3">
                        <Image src={item.image} width={70} height={70} />
                      </th>
                      <td className="px-6 py-4">{item.name}</td>
                      <td className="px-10 py-4">{item.quantity}</td>
                      <td className="px-6 py-4">Rs{item.price}</td>
                    </tr>
                  </>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
}
