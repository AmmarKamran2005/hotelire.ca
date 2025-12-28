import { useEffect, useState } from "react";

type BalanceItem = {
  currency: string;
  amount: number;
};

type StripeStatusResponse = {
  payoutsStatus: "active" | "restricted" | "pending" | string;
  balanceAvailable: BalanceItem[];
  balancePending: BalanceItem[];
};
const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;


const OwnerStripeStatus: React.FC = () => {
  const [status, setStatus] = useState<StripeStatusResponse>({
    payoutsStatus: "",
    balanceAvailable: [],
    balancePending: [],
  });

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const fetchStatus = async (): Promise<void> => {
    try {
      const res = await fetch(`${baseUrl}/ownerstripestatus/status`, {
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to fetch Stripe status");
      }

      setStatus({
        payoutsStatus: data.payoutsStatus,
        balanceAvailable: data.balanceAvailable ?? [],
        balancePending: data.balancePending ?? [],
      });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatus();
  }, []);

  if (loading) return <p>Loading Stripe info...</p>;

  if (error)
    return <p className="text-red-600 font-medium">{error}</p>;

  return (
    <div className="space-y-4 p-4 border rounded-xl   bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
      <h2 className="font-semibold text-lg">Stripe Connect Status</h2>

      <p>
        Payouts Status:{" "}
        <span
          className={`font-bold ${
            status.payoutsStatus === "active"
              ? "text-green-600"
              : status.payoutsStatus === "restricted"
              ? "text-red-600"
              : "text-yellow-600"
          }`}
        >
          {status.payoutsStatus.toUpperCase()}
        </span>
      </p>

      {status.payoutsStatus === "restricted" && (
        <div className="bg-red-100 p-3 rounded text-red-800 text-sm">
          Your Stripe account payouts are restricted.
          <br />
          Please complete required verification in Stripe to receive money.
        </div>
      )}

      <div>
        <h3 className="font-medium">Available Balance</h3>
        {status.balanceAvailable.length === 0 && <p>0.00</p>}
        {status.balanceAvailable.map((b, i) => (
          <p key={i}>
            {b.amount} {b.currency.toUpperCase()}
          </p>
        ))}
      </div>

      <div>
        <h3 className="font-medium">Pending Balance</h3>
        {status.balancePending.length === 0 && <p>0.00</p>}
        {status.balancePending.map((b, i) => (
          <p key={i}>
            {b.amount} {b.currency.toUpperCase()}
          </p>
        ))}
      </div>
    </div>
  );
};

export default OwnerStripeStatus;
