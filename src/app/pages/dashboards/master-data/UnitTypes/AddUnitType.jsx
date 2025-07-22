
import { useNavigate } from "react-router";
import { Button, Input } from "components/ui";
import { Page } from "components/shared/Page";
import { useState } from "react";
import axios from "utils/axios"; 

export default function AddUnitType() {
  const navigate = useNavigate();

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

    try {
      const form = new FormData();
      form.append("name", formData.name);
      form.append("description", formData.description);

      await axios.post("/master/add-unit-type", form); // 🔐 token is already attached by interceptor

      navigate("/dashboards/master-data/unit-types");
    } catch (err) {
      console.error("Error adding unit type:", err);
      alert(err?.message || "Failed to add unit type.");
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
          <Button type="submit" color="primary">Save</Button>
        </form>
      </div>
    </Page>
  );
}
