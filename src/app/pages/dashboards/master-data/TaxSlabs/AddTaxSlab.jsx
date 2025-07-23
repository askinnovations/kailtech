import { useNavigate } from "react-router";
import { useState } from "react";
import { Button, Input } from "components/ui";
import { Page } from "components/shared/Page";
import axios from "utils/axios"; // Interceptor should attach token
import { toast } from "sonner";

export default function AddTaxSlab() {
  const navigate = useNavigate();

  // ✅ State for form and loading
    const [formData, setFormData] = useState({ name: "", description: "", percentage: "" });
    const [loading, setLoading] = useState(false);
  
  
    // ✅ Input handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
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
      form.append("name", formData.name);
      form.append("description", formData.description);
      form.append("percentage", formData.percentage);

      await axios.post("/master/create-taxslab", form); // token attached via interceptor

      toast.success("taxslab created successfully ✅", {
        duration: 1000,
        icon: "✅",
      });

      navigate("/dashboards/master-data/tax-slabs");
    } catch (err) {
      console.error("Error creating taxslab:", err);
      toast.error(err?.response?.data?.message || "Failed to create mode ❌");
    } finally {
      setLoading(false);
    }
  };


  return (
    <Page title="Add Tax Slab">
      <div className="p-6">
        {/* ✅ Header + Back Button */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Add Tax Slab</h2>
          <Button
            variant="outline"
            className="text-white bg-blue-600 hover:bg-blue-700"
            onClick={() => navigate("/dashboards/master-data/tax-slabs")}
          >
            Back to List
          </Button>
        </div>

        {/* ✅ Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Tax Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter Tax Name"
            required
          />

          <Input
            type="number"
            name="percentage"
            label="Percentage"
            value={formData.percentage}
            onChange={handleChange}
            placeholder="Enter Percentage"
            required
          />
          <Input
            label="Description"
            name="description"
            onChange={handleChange}
            value={formData.description}
            placeholder="Enter Tax Description"
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
