import Sidebar from '../components/AdminDashboard/Sidebar';

export default function AdminPanel({ products, summary }) {
  return (
    <div className='bg-[#fffffff8]'>
      <Sidebar products={products} summary={summary} />
    </div>
  );
}

export async function getServerSideProps(context) {
  let products = [];
  let summary = null;
  const { req } = context;
  const { auth_token } = req.cookies;

  if (!auth_token) {
    return {
      redirect: {
        destination: `/login`,
        permanent: false,
      },
    };
  }

  try {
    const apiUrlProducts = process.env.NEXT_PUBLIC_API_BASE_URL + '/get-all-products';
    const apiUrlOrders = process.env.NEXT_PUBLIC_API_BASE_URL + '/get-all-orders';

    const [productsResponse, ordersResponse] = await Promise.all([
      fetch(apiUrlProducts),
      fetch(apiUrlOrders, {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${auth_token}`,
        },
      })
    ]);

    if (!productsResponse.ok) {
      throw new Error("Failed to fetch products");
    }
    if (!ordersResponse.ok) {
      throw new Error("Failed to fetch orders");
    }

    products = await productsResponse.json();
    summary = await ordersResponse.json();

  } catch (error) {
    console.error("Error fetching data:", error);
  }

  return {
    props: {
      products: products || [],
      summary: summary || null,
    },
  };
}
