import { useParams, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { Button, Input } from "components/ui";
import { Page } from "components/shared/Page";
import axios from "utils/axios";
import { toast } from "sonner";

export default function EditUnitType() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [unitType, setUnitType] = useState({
    unitName: "",
    description: "",
  });

  // ✅ Fetch existing unit data
  useEffect(() => {
    const fetchUnitType = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/master/get-unit-type-byid/${id}`);
        const result = response.data;

        if (result.status === "true" && result.data) {
          setUnitType({
            unitName: result.data.name || "",
            description: result.data.description || "",
          });
        } else {
          toast.error(result.message || "Failed to load unit type.");
        }
      } catch (err) {
        console.error("Fetch error:", err);
        toast.error("Something went wrong while loading data.");
      } finally {
        setLoading(false);
      }
    };

    fetchUnitType();
  }, [id]);

  // ✅ Submit updated data
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const form = new FormData();
      form.append("name", unitType.unitName);
      form.append("description", unitType.description);

      const response = await axios.post(`/master/update-unit-type/${id}`, form);
      const result = response.data;

      if (result.status === "true") {
        toast.success(result.message || "Unit type updated successfully ✅", {
          duration: 1000,
          icon: "✅",
        });

        navigate("/dashboards/master-data/unit-types");
      } else {
        toast.error(result.message || "Failed to update unit type ❌");
      }
    } catch (err) {
      console.error("Update error:", err);
      toast.error("Something went wrong while updating.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <Page title="Edit Unit Type">
  
        
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">  Edit Unit Type / Parameter</h2>
          <Button
            variant="outline" className="text-white bg-blue-600 hover:bg-blue-700"
            onClick={() => navigate("/dashboards/master-data/unit-types")}>
              Edit Unit Type / Parameter
          </Button>
        </div>
        

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Unit Name"
            value={unitType.unitName}
            onChange={(e) =>
              setUnitType({ ...unitType, unitName: e.target.value })
            }
            required
          />
          <Input
            label="Description"
            value={unitType.description}
            onChange={(e) =>
              setUnitType({ ...unitType, description: e.target.value })
            }
          />
          <Button type="submit" color="primary" disabled={loading}>
            {loading ? (
              <div className="flex items-center gap-2">
                <svg
                  className="animate-spin h-4 w-4 text-white"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 000 8v4a8 8 0 01-8-8z"
                  ></path>
                </svg>
                Updating...
              </div>
            ) : (
              "Update"
            )}
          </Button>
        </form>
      </div>
    </Page>
  );
}
