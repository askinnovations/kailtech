import { useNavigate } from "react-router";
import { Button, Input } from "components/ui";
import { Page } from "components/shared/Page";

export default function AddCalibrationStandards() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: API call to save calibration standard
    console.log("Saving calibration standard...");
    navigate("/dashboards/calibration-operations/calibration-standards");
  };

  return (
    <Page title="Add Calibration Standard">
      <div className="p-6">
        {/* ✅ Header + Back Button */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Add Calibration Standard</h2>
          <Button
            variant="outline"
            className="text-white bg-blue-600 hover:bg-blue-700"
            onClick={() => navigate("/dashboards/calibration-operations/calibration-standards")}
          >
            Back
          </Button>
        </div>

        {/* ✅ Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input label="Standard Name" placeholder="Enter Standard Name" required />
          <Input label="Description" placeholder="Enter Standard Description" required />
         
          <Button type="submit" color="primary">Save</Button>
        </form>
      </div>
    </Page>
  );
}
