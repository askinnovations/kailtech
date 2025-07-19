import { useNavigate } from "react-router";
import { Button, Input } from "components/ui";
import { Page } from "components/shared/Page";

export default function AddModes() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // ✅ API call to create mode (you'll integrate here)
    console.log("Creating mode...");

    // ✅ Redirect to modes list after saving
    navigate("/dashboards/master-data/modes");
  };

  return (
    <Page title="Add Modes">
      <div className="p-6">
        {/* ✅ Header + Back Button */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
            Add Modes
          </h2>
          <Button
            variant="outline"
            className="text-white bg-blue-600 hover:bg-blue-700"
            onClick={() => navigate("/dashboards/master-data/modes")}
          >
            Back to Modes
          </Button>
        </div>

        {/* ✅ Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Mode Name"
            placeholder="Enter mode name"
            required
          />
          <Input
            label="Description"
            placeholder="Enter mode description"
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
