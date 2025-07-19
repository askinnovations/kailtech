import { useNavigate } from "react-router";
import { Button, Input } from "components/ui";
import { Page } from "components/shared/Page";

export default function AddTaxSlab() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: API call to save Tax Slab
    console.log("Creating tax slab...");
    navigate("/dashboards/master-data/tax-slabs");
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
          <Input label="Tax Name" placeholder="Enter Tax Name" required />
          <Input
            type="number"
            label="Tax Percentage"
            placeholder="Enter Tax Percentage (e.g. 18)"
            required
          />
          <Input
            label="Description"
            placeholder="Enter Tax Description"
            required
          />

          <Button type="submit" color="primary">
            Save
          </Button>
        </form>
      </div>
    </Page>
  );
}
