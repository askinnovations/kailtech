// Import Dependencies
import { Navigate } from "react-router";

// Local Imports
import { AppLayout } from "app/layouts/AppLayout";
import { DynamicLayout } from "app/layouts/DynamicLayout";
import AuthGuard from "middleware/AuthGuard";

// ----------------------------------------------------------------------

const protectedRoutes = {
  id: "protected",
  Component: AuthGuard,
  children: [
    // The dynamic layout supports both the main layout and the sideblock.
    {
      Component: DynamicLayout,
      children: [
        {
          index: true,
          element: <Navigate to="/dashboards" />,
        },
        {
          path: "dashboards",
          children: [
            {
              index: true,
              element: <Navigate to="/dashboards/home" />,
            },
            {
              path: "home",
              lazy: async () => ({
                Component: (await import("app/pages/dashboards/home")).default,
              }),
            },
            {
              path: "reports",
              lazy: async () => ({
                Component: (await import("app/pages/dashboards/Reports")).default,
              }),
            },
            // ✅ Material List Routes Start Here
            {
              path: "material-list",
              children: [
                {
                  path: "electro-technical",
                  lazy: async () => ({ 
                    Component: (await import("app/pages/dashboards/material-list/ElectroTechnical")).default,
                  }),
                },
                // {
                //   path: "site-calibration",
                //   lazy: async () => ({
                //     Component: (await import("app/pages/dashboards/material-list/SiteCalibration")).default,
                //   }),
                // },
                // {
                //   path: "calibration",
                //   lazy: async () => ({
                //     Component: (await import("app/pages/dashboards/material-list/Calibration")).default,
                //   }),
                // },
                // {
                //   path: "chemical",
                //   lazy: async () => ({
                //     Component: (await import("app/pages/dashboards/material-list/Chemical")).default,
                //   }),
                // },
                // {
                //   path: "building-material",
                //   lazy: async () => ({
                //     Component: (await import("app/pages/dashboards/material-list/BuildingMaterial")).default,
                //   }),
                // },
                // {
                //   path: "reporting",
                //   lazy: async () => ({
                //     Component: (await import("app/pages/dashboards/material-list/Reporting")).default,
                //   }),
                // },
                // {
                //   path: "calibration-mechanical",
                //   lazy: async () => ({
                //     Component: (await import("app/pages/dashboards/material-list/CalibrationMechanical")).default,
                //   }),
                // },
                // {
                //   path: "calibration-bio-medical",
                //   lazy: async () => ({
                //     Component: (await import("app/pages/dashboards/material-list/CalibrationBioMedical")).default,
                //   }),
                // },
                // {
                //   path: "quality-department",
                //   lazy: async () => ({
                //     Component: (await import("app/pages/dashboards/material-list/QualityDepartment")).default,
                //   }),
                // },
                // {
                //   path: "store-department",
                //   lazy: async () => ({
                //     Component: (await import("app/pages/dashboards/material-list/StoreDepartment")).default,
                //   }),
                // },
                // {
                //   path: "mechanical",
                //   lazy: async () => ({
                //     Component: (await import("app/pages/dashboards/material-list/Mechanical")).default,
                //   }),
                // },
              ],
            },
            // ✅ Material List Routes End Here

            // ✅ Master Data Routes Start Here
            {
              path: "master-data",
              children: [
                // ✅ Unit Types Parent Route
                {
                  path: "unit-types",
                  children: [
                    {
                      path: "", // ✅ List page: /master-data/unit-types
                      lazy: async () => ({
                        Component: (await import("app/pages/dashboards/master-data/UnitTypes")).default,
                      }),
                    },
                    {
                      path: "create", // ✅ Add page: /master-data/unit-types/create
                      lazy: async () => ({
                        Component: (await import("app/pages/dashboards/master-data/UnitTypes/AddUnitType")).default,
                      }),
                    },
                    {
                      path: "edit/:id", // ✅ Edit page: /master-data/unit-types/edit/5
                      lazy: async () => ({
                        Component: (await import("app/pages/dashboards/master-data/UnitTypes/EditUnitType")).default,
                      }),
                    },
                  ],
                },
                // UnitTypes

                {
                  path: "modes",
                  lazy: async () => ({
                    Component: (await import("app/pages/dashboards/master-data/Modes")).default,
                  }),
                },
                {
                  path: "tax-slabs",
                  lazy: async () => ({
                    Component: (await import("app/pages/dashboards/master-data/TaxSlabs")).default,
                  }),
                },
                {
                  path: "verticals",
                  lazy: async () => ({
                    Component: (await import("app/pages/dashboards/master-data/Verticals")).default,
                  }),
                },
                // {
                //   path: "document-master",
                //   lazy: async () => ({
                //     Component: (await import("app/pages/dashboards/master-data/DocumentMaster")).default,
                //   }),
                // },
                {
                  path: "currencies",
                  lazy: async () => ({
                    Component: (await import("app/pages/dashboards/master-data/Currencies")).default,
                  }),
                },
                {
                  path: "units",
                  lazy: async () => ({
                    Component: (await import("app/pages/dashboards/master-data/Units")).default,
                  }),
                },
                // {
                //   path: "statuary-detail",
                //   lazy: async () => ({
                //     Component: (await import("app/pages/dashboards/master-data/StatuaryDetail")).default,
                //   }),
                // },
                // {
                //   path: "units-conversion",
                //   lazy: async () => ({
                //     Component: (await import("app/pages/dashboards/master-data/UnitsConversion")).default,
                //   }),
                // },
                {
                  path: "manage-labs",
                  lazy: async () => ({
                    Component: (await import("app/pages/dashboards/master-data/ManageLabs")).default,
                  }),
                },
                // {
                //   path: "activity-log",
                //   lazy: async () => ({
                //     Component: (await import("app/pages/dashboards/master-data/ViewActivityLog")).default,
                //   }),
                // },
                // {
                //   path: "master-calibration-return",
                //   lazy: async () => ({
                //     Component: (await import("app/pages/dashboards/master-data/MasterCalibrationReturn")).default,
                //   }),
                // },
                // {
                //   path: "general-checklists",
                //   lazy: async () => ({
                //     Component: (await import("app/pages/dashboards/master-data/GeneralChecklists")).default,
                //   }),
                // },
              ],
            }

          ],
        },
      ],
    },
    // The app layout supports only the main layout. Avoid using it for other layouts.
    {
      Component: AppLayout,
      children: [
        {
          path: "settings",
          lazy: async () => ({
            Component: (await import("app/pages/settings/Layout")).default,
          }),
          children: [
            {
              index: true,
              element: <Navigate to="/settings/general" />,
            },
            {
              path: "general",
              lazy: async () => ({
                Component: (await import("app/pages/settings/sections/General"))
                  .default,
              }),
            },
            {
              path: "appearance",
              lazy: async () => ({
                Component: (
                  await import("app/pages/settings/sections/Appearance")
                ).default,
              }),
            },
          ],
        },
      ],
    },
  ],
};

export { protectedRoutes };
