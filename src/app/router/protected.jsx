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
                // modes
              
                // ✅ Modes Routes (same pattern)
                  {
                    path: "modes",
                    children: [
                      {
                        path: "", // ✅ List page: /master-data/modes
                        lazy: async () => ({
                          Component: (await import("app/pages/dashboards/master-data/Modes")).default,
                        }),
                      },
                      {
                        path: "create", // ✅ Add page: /master-data/modes/create
                        lazy: async () => ({
                          Component: (await import("app/pages/dashboards/master-data/Modes/AddModes")).default,
                        }),
                      },
                      // {
                      //   path: "edit/:id", // ✅ Edit page: /master-data/modes/edit/1
                      //   lazy: async () => ({
                      //     Component: (await import("app/pages/dashboards/master-data/Modes/EditModes")).default,
                      //   }),
                      // },
                    ],
                  },
                {
                  path: "tax-slabs",
                  children: [
                    {
                      path: "", // List page
                      lazy: async () => ({
                        Component: (await import("app/pages/dashboards/master-data/TaxSlabs")).default,
                      }),
                    },
                    {
                      path: "create", // Add page
                      lazy: async () => ({
                        Component: (await import("app/pages/dashboards/master-data/TaxSlabs/AddTaxSlab")).default,
                      }),
                    },
                    // {
                    //   path: "edit/:id", // Edit page
                    //   lazy: async () => ({
                    //     Component: (await import("app/pages/dashboards/master-data/TaxSlabs/EditTaxSlab")).default,
                    //   }),
                    // },
                  ],
                },

                {
                path: "verticals",
                children: [
                  {
                    path: "", // List page
                    lazy: async () => ({
                      Component: (await import("app/pages/dashboards/master-data/Verticals")).default,
                    }),
                  },
                  {
                    path: "create", // Add page
                    lazy: async () => ({
                      Component: (await import("app/pages/dashboards/master-data/Verticals/AddVertical")).default,
                    }),
                  },
                  // {
                  //   path: "edit/:id", // Edit page
                  //   lazy: async () => ({
                  //     Component: (await import("app/pages/dashboards/master-data/Verticals/EditVertical")).default,
                  //   }),
                  // },
                ],
              },

                // {
                //   path: "document-master",
                //   lazy: async () => ({
                //     Component: (await import("app/pages/dashboards/master-data/DocumentMaster")).default,
                //   }),
                // },
                {
                  path: "currencies",
                  children: [
                    {
                      path: "", // ✅ Currency List Page
                      lazy: async () => ({
                        Component: (await import("app/pages/dashboards/master-data/Currencies")).default,
                      }),
                    },
                    {
                      path: "create", // ✅ Add Currency Page
                      lazy: async () => ({
                        Component: (await import("app/pages/dashboards/master-data/Currencies/AddCurrency")).default,
                      }),
                    },
                    // {
                    //   path: "edit/:id", // ✅ Edit Currency Page
                    //   lazy: async () => ({
                    //     Component: (await import("app/pages/dashboards/master-data/Currencies/EditCurrency")).default,
                    //   }),
                    // },
                  ],
                },

                {
                  path: "units",
                  children: [
                    {
                      path: "", // ✅ List Page
                      lazy: async () => ({
                        Component: (await import("app/pages/dashboards/master-data/Units")).default,
                      }),
                    },
                    {
                      path: "create", // ✅ Add Page
                      lazy: async () => ({
                        Component: (await import("app/pages/dashboards/master-data/Units/AddUnit")).default,
                      }),
                    },
                    // {
                    //   path: "edit/:id", // ✅ Edit Page
                    //   lazy: async () => ({
                    //     Component: (await import("app/pages/dashboards/master-data/Units/EditUnit")).default,
                    //   }),
                    // },
                  ],
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
            },
            {
            path: "calibration-operations",
            children: [
              {
                path: "calibration-standards",
                children: [
                  {
                    path: "", // List Page
                    lazy: async () => ({
                      Component: (await import("app/pages/dashboards/calibration-operations/calibration-standards")).default,
                    }),
                  },
                  {
                    path: "add", // Add Page
                    lazy: async () => ({
                      Component: (await import("app/pages/dashboards/calibration-operations/calibration-standards/AddCalibrationStandards")).default,
                    }),
                  },
                ],
              },
                
                {
                  path: "calibration-methods",
                  children: [
                    {
                      path: "", // List Page
                      lazy: async () => ({
                        Component: (await import("app/pages/dashboards/calibration-operations/calibration-methods")).default,
                      }),
                    },
                    {
                      path: "add", // Add Page
                      lazy: async () => ({
                        Component: (await import("app/pages/dashboards/calibration-operations/calibration-methods/AddCalibrationMethods")).default,
                      }),
                    },
                  ],
                },
                // {
                //   path: "bio-medical-visual-test",
                //   lazy: async () => ({
                //     Component: (await import("app/pages/dashboards/calibration-operations/BioMedicalVisualTest")).default,
                //   }),
                // },
                // {
                //   path: "bio-medical-electrical-safety",
                //   lazy: async () => ({
                //     Component: (await import("app/pages/dashboards/calibration-operations/BioMedicalElectricalSafety")).default,
                //   }),
                // },
                // {
                //   path: "calibration-list-of-instruments",
                //   lazy: async () => ({
                //     Component: (await import("app/pages/dashboards/calibration-operations/CalibrationListOfInstruments")).default,
                //   }),
                // },
                // {
                //   path: "discipline",
                //   lazy: async () => ({
                //     Component: (await import("app/pages/dashboards/calibration-operations/Discipline")).default,
                //   }),
                // },
                // {
                //   path: "revision-requests",
                //   lazy: async () => ({
                //     Component: (await import("app/pages/dashboards/calibration-operations/RevisionRequests")).default,
                //   }),
                // },
                // {
                //   path: "lrn-cancel-requests",
                //   lazy: async () => ({
                //     Component: (await import("app/pages/dashboards/calibration-operations/LrnCancelRequests")).default,
                //   }),
                // },
                // {
                //   path: "cmc-scope-sheet",
                //   lazy: async () => ({
                //     Component: (await import("app/pages/dashboards/calibration-operations/CMCScopeSheet")).default,
                //   }),
                // },
              ],
            },
            {
              path: "people",
              children: [
                {
                  path: "customer-categories",
                  lazy: async () => ({
                    Component: (await import("app/pages/dashboards/people/customer-categories")).default,
                  }),
                },
                {
                  path: "customer-categories/add",
                  lazy: async () => ({
                    Component: (await import("app/pages/dashboards/people/customer-categories/AddCustomerCategory")).default,
                  }),
                },

                {
                  path: "customer-types",
                  lazy: async () => ({
                    Component: (await import("app/pages/dashboards/people/customer-types")).default,
                  }),
                },
                {
                  path: "customer-types/add",
                  lazy: async () => ({
                    Component: (await import("app/pages/dashboards/people/customer-types/AddCustomerType")).default,
                  }),
                },

                {
                  path: "specific-purposes",
                  lazy: async () => ({
                    Component: (await import("app/pages/dashboards/people/specific-purposes")).default,
                  }),
                },
                {
                  path: "specific-purposes/add",
                  lazy: async () => ({
                    Component: (await import("app/pages/dashboards/people/specific-purposes/AddSpecificPurpose")).default,
                  }),
                },

                {
                  path: "customers",
                  lazy: async () => ({
                    Component: (await import("app/pages/dashboards/people/customers")).default,
                  }),
                },
                {
                  path: "customers/add",
                  lazy: async () => ({
                    Component: (await import("app/pages/dashboards/people/customers/AddCustomer")).default,
                  }),
                },

                {
                  path: "promoters",
                  lazy: async () => ({
                    Component: (await import("app/pages/dashboards/people/promoters")).default,
                  }),
                },
                {
                  path: "promoters/add",
                  lazy: async () => ({
                    Component: (await import("app/pages/dashboards/people/promoters/AddPromoter")).default,
                  }),
                },

                {
                  path: "suppliers",
                  lazy: async () => ({
                    Component: (await import("app/pages/dashboards/people/suppliers")).default,
                  }),
                },
                {
                  path: "suppliers/add",
                  lazy: async () => ({
                    Component: (await import("app/pages/dashboards/people/suppliers/AddSupplier")).default,
                  }),
                },

                {
                  path: "users",
                  lazy: async () => ({
                    Component: (await import("app/pages/dashboards/people/users")).default,
                  }),
                },
                {
                  path: "users/add",
                  lazy: async () => ({
                    Component: (await import("app/pages/dashboards/people/users/AddUser")).default,
                  }),
                },
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
