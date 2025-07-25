import { useParams, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { Button, Input } from "components/ui";
import { Page } from "components/shared/Page";
import axios from "utils/axios";
import { toast } from "sonner";

export default function EditVertical() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [vertical, setVertical] = useState({ name: "", code: "" });

  useEffect(() => {
  const fetchVertical = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`inventory/category-byid/${id}`);
      const result = response.data;

      if (result.status === "true" && result.data) {
        const taxSlab = result.data;
        setVertical({
          name: taxSlab.name || "",
          code: taxSlab.code || "",
        });
      } else {
        toast.error(result.message || "Failed to load vertical.");
      }
    } catch (err) {
      console.error("Fetch error:", err);
      toast.error("Something went wrong while loading vertical.");
    } finally {
      setLoading(false);
    }
  };

  fetchVertical();
}, [id]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const form = new FormData();
      form.append("name", vertical.name);
      form.append("code", vertical.code);

      const response = await axios.post(`inventory/category-update/${id}`, form);
      const result = response.data;

      if (result.status === "true") {
        toast.success(result.message || "Category updated successfully ✅", {
          duration: 1000,
          icon: "✅",
        });
        navigate("/dashboards/inventory/categories");
      } else {
        toast.error(result.message || "Failed to update vertical ❌");
      }
    } catch (err) {
      console.error("Update error:", err);
      toast.error("Something went wrong while updating vertical.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Page title="Edit Categories">
      <div className="p-6">
        {/* ✅ Header + Back Button */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
            Edit Categories
          </h2>
          <Button
            variant="outline"
            className="text-white bg-blue-600 hover:bg-blue-700"
            onClick={() => navigate("/dashboards/inventory/categories")}
          >
            Back to List
          </Button>
        </div>

        {/* ✅ Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Category Name"
            value={vertical.name}
            onChange={(e) => setVertical({ ...vertical, name: e.target.value })}
            required
          />
          <Input
            label="Code"
            value={vertical.code}
            onChange={(e) => setVertical({ ...vertical, code: e.target.value })}
            required
          />

          <Button type="submit" color="primary" disabled={loading}>
            {loading ? (
              <div className="flex items-center gap-2">
                <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
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
                Updating...
              </div>
            ) : (
              "Update"
            )}
          </Button>
        </form>
      </div>
    </Page>
  );
}
