import { useNavigate } from "react-router";
import { Button, Input } from "components/ui";
import { Page } from "components/shared/Page";

export default function AddUnit() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Replace with real API call
    console.log("Creating unit...");
    navigate("/dashboards/master-data/units");
  };

  return (
    <Page title="Add Unit">
      <div className="p-6">
        {/* ✅ Header + Back Button */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Add Unit</h2>
          <Button
            variant="outline"
            className="text-white bg-blue-600 hover:bg-blue-700"
            onClick={() => navigate("/dashboards/master-data/units")}
          >
            Back to List
          </Button>
        </div>

        {/* ✅ Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input label="Unit Name" placeholder="Unit Name" required />
          
          <Input label="Description" placeholder=" Unit Description " />
          <Button type="submit" color="primary">Save</Button>
        </form>
      </div>
    </Page>
  );
}
