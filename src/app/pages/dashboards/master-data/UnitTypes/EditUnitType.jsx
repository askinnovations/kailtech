import { useParams, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { Button, Input } from "components/ui";
import { Page } from "components/shared/Page";
import axios from "utils/axios";

export default function EditUnitType() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [unitType, setUnitType] = useState({ unitName: "", description: "" });

// ✅ Fetch existing unit data
  useEffect(() => {
    const fetchUnitType = async () => {
      try {
        const response = await axios.get(`/master/get-unit-type-byid/${id}`);
        const data = response.data;

        setUnitType({
          unitName: data.name || "",
          description: data.description || "",
        });
      } catch (err) {
        console.error("Failed to fetch unit type:", err);
        alert("Failed to load unit type.");
      }
    };

    fetchUnitType();
  }, [id]);

  // ✅ Submit updated data
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const form = new FormData();
      form.append("name", unitType.unitName);
      form.append("description", unitType.description);

      await axios.post(`/master/update-unit-type/${id}`, form);

      navigate("/dashboards/master-data/unit-types");
    } catch (err) {
      console.error("Failed to update unit type:", err);
      alert("Update failed. Please try again.");
    }
  };


  return (
    <Page title="Edit Unit Type">
      <div className="p-6">
        <h2 className="text-lg font-semibold mb-4">Edit Unit Type / Parameter</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Unit Name"
            value={unitType.unitName}
            onChange={(e) => setUnitType({ ...unitType, unitName: e.target.value })}
            required
          />
          <Input
            label="Description"
            value={unitType.description}
            onChange={(e) => setUnitType({ ...unitType, description: e.target.value })}
          />
          <Button type="submit" color="primary">Update</Button>
        </form>
      </div>
    </Page>
  );
}
