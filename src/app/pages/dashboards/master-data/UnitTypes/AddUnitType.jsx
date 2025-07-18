
import { useNavigate } from "react-router";
import { Button, Input } from "components/ui";
import { Page } from "components/shared/Page";

export default function AddUnitType() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // API call to create unit type
    console.log("Creating unit type");
    navigate("/dashboards/master-data/unit-types");
  };

  return (
    <Page title="Add Unit Type">
      <div className="p-6">
      {/* ✅ Header + Back Button */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Add Unit Type / Parameter</h2>
          <Button
            variant="outline" className="text-white bg-blue-600 hover:bg-blue-700"
            onClick={() => navigate("/dashboards/master-data/unit-types")}
          >
            Back Unit  Type
          </Button>
        </div>
        {/* ✅ Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input label="Parameter Name" placeholder="Parameter Name" required />
          <Input label="Description" placeholder="Parameter Description" required/>
          <Button type="submit" color="primary">Save</Button>
        </form>
      </div>
    </Page>
  );
}
