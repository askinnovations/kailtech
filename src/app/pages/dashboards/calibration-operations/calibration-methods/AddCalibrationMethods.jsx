// Import Dependencies
import { useNavigate } from "react-router";
import { Page } from "components/shared/Page";
import { Button, Input } from "components/ui";

export default function AddCalibrationMethods() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Creating calibration method...");
    // 👉 Call API to save data here
    navigate("/dashboards/calibration-operations/calibration-methods");
  };

  return (
    <Page title="Add Calibration Method">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Add Calibration Method / SOP</h2>
          <Button
            variant="outline"
            className="text-white bg-blue-600 hover:bg-blue-700"
            onClick={() => navigate("/dashboards/calibration-operations/calibration-methods")}
          >
            Back
          </Button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input label="Method Name" placeholder="Enter Method/SOP Name" required />
          <Input label="Description" placeholder="Enter Description" required />
          <Button type="submit" color="primary">Save</Button>
        </form>
      </div>
    </Page>
  );
}
