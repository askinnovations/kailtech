import { useParams, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { Button, Input } from "components/ui";
import { Page } from "components/shared/Page";

export default function EditUnitType() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [unitType, setUnitType] = useState({ unitName: "", description: "" });

  useEffect(() => {
    // TODO: fetch data by ID
    console.log("Fetching unit type with ID:", id);
    setUnitType({ unitName: "Voltage", description: "Voltage Unit" });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // API call to update
    console.log("Updating unit type:", id);
    navigate("/dashboards/master-data/unit-types");
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
