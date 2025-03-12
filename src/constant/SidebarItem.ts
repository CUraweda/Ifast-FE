import { listed } from "./listed";

export const sidebarList = [
  {
    label: 'Dashboard',
    path: listed.dashboard,
    icon: '<BsFillHouseFill />',
    subMenu: false,
    subLabel: [],
  },
  {
    label: 'Submissions',
    path: '',
    icon: '<GoTasklist />',
    subMenu: true,
    subLabel: [
      {
        label: "Submission List",
        path: listed.submissionList
      },
      {
        label: "Debt List",
        path: listed.debtList
      },
      {
        label: "Accountability",
        path: listed.accountability
      },
      {
        label: "History",
        path: listed.history
      },
     
    ],
  },
  {
    label: 'Settings',
    path: '',
    icon: '<FaGear />',
    subMenu: true,
    subLabel: [
      {
        label: "Users",
        path: listed.user
      },
      {
        label: "Roles",
        path: listed.roles
      },
      {
        label: "Permissions",
        path: listed.submissionList
      },
      {
        label: "Hierarchy",
        path: listed.hirarky
      },
      {
        label: "Submission Setting",
        path: listed.submissionList
      },
      {
        label: "Integrations",
        path: listed.submissionList
      },
     
    ],
  },
 
 
];
