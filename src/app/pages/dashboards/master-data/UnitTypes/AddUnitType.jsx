
import { useNavigate } from "react-router";
import { Button, Input } from "components/ui";
import { Page } from "components/shared/Page";
import { useState } from "react";
import axios from "utils/axios"; 
import { toast } from "sonner";


export default function AddUnitType() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);


  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }; 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // 🔁 Start loading

    try {
      const form = new FormData();
      form.append("name", formData.name);
      form.append("description", formData.description);

      await axios.post("/master/add-unit-type", form); // 🔐 token is already attached by interceptor
      toast.success("Unit type added successfully ✅", {
        duration: 1000, // ⏱ Toast will auto-close after 1 second
        icon: "✅",
      });
     // ✅ Success toast
      navigate("/dashboards/master-data/unit-types");
    } catch (err) {
      console.error("Error adding unit type:", err);
      alert(err?.message || "Failed to add unit type.");
      toast.error(err?.message || "Failed to add unit type ❌"); // ✅ Error toast
    }
    finally {
    setLoading(false); // ✅ Stop loading
    }
  };

  return (
    <Page title="Add Unit Type">
      <div className="p-6">
      {/* ✅ Header + Back Button */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Add Unit Type / Parameter</h2>
          <Button
            variant="outline" className="text-white bg-blue-600 hover:bg-blue-700"
            onClick={() => navigate("/dashboards/master-data/unit-types")}>
            Back Unit  Type
          </Button>
        </div>
        {/* ✅ Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input label="Parameter Name" placeholder="Parameter Name" value={formData.name} onChange={handleChange}  name="name" required />
          <Input label="Description" placeholder="Parameter Description" value={formData.description} name="description"  onChange={handleChange}  required/>
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
