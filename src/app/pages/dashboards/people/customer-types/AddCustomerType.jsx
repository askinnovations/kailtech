import { useNavigate } from "react-router";
import { Button, Input } from "components/ui";
import { Page } from "components/shared/Page";

export default function AddCurrency() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Add actual API call
    console.log("Creating currency...");
    navigate("/dashboards/people/customer-types");
  };

  return (
    <Page title="Add customer-types">
      <div className="p-6">
        {/* ✅ Header + Back Button */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Add Customer Types</h2>
          <Button
            variant="outline"
            className="text-white bg-blue-600 hover:bg-blue-700"
            onClick={() => navigate("/dashboards/people/customer-types")}
          >
            Back to List
          </Button>
        </div>

        {/* ✅ Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          <Input label="Customer Type Name" placeholder="Customer Type Name"  required />
          <Input label="Customer type Description" placeholder="Customer Type Description" required />

          <Button type="submit" color="primary">
            Save
          </Button>
        </form>
      </div>
    </Page>
  );
}
