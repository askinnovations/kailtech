import { useNavigate } from "react-router";
import { useState } from "react";
import { Button, Input } from "components/ui";
import { Page } from "components/shared/Page";
import axios from "utils/axios";
import { toast } from "sonner";

export default function AddCurrency() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [currency, setCurrency] = useState({
    name: "",
    description: "",
  });

  // ✅ Input handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrency((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ✅ Form submit
  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    const form = new FormData();
    form.append("name", currency.name);
    form.append("description", currency.description);

    await axios.post("/master/currency-create", form); // token attached via interceptor

    toast.success("Currency created successfully ✅", {
      duration: 1000,
      icon: "✅",
    });

    navigate("/dashboards/master-data/currencies");
  } catch (err) {
    console.error("Error creating currency:", err);
    toast.error(err?.response?.data?.message || "Failed to create currency ❌");
  } finally {
    setLoading(false);
  }
};


  return (
    <Page title="Add Currency">
      <div className="p-6">
        {/* ✅ Header + Back Button */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Add Currency</h2>
          <Button
            variant="outline"
            className="text-white bg-blue-600 hover:bg-blue-700"
            onClick={() => navigate("/dashboards/master-data/currencies")}
          >
            Back to List
          </Button>
        </div>

        {/* ✅ Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Currency Name"
            name="name"
            placeholder="Enter Currency Name"
            value={currency.name}
            onChange={handleChange}
            required
          />
          <Input
            label="Currency Description / Symbol"
            placeholder="Enter Description or Symbol"
            value={currency.description}
            name="description"
            onChange={handleChange}
            required
          />

          <Button type="submit" color="primary" disabled={loading}>
            {loading ? (
              <div className="flex items-center gap-2">
                <svg
                  className="animate-spin h-4 w-4 text-white"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 000 8v4a8 8 0 01-8-8z"
                  ></path>
                </svg>
                Saving...
              </div>
            ) : (
              "Save"
            )}
          </Button>
        </form>
      </div>
    </Page>
  );
}
