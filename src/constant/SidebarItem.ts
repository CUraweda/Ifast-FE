import { listed } from "./listed";

export const sidebarList = [
  {
    label: 'Dashboard',
    path: listed.dashboard,
    icon: '<BsFillHouseFill />',
    subLabel: [],
  },
  {
    label: 'Submissions',
    path: '',
    icon: '<GoTasklist />',
    subLabel: [
      {
        label: "Submission List",
        path: listed.submissionList,
        permission: ['submissionList']
      },
      {
        label: "Debt List",
        path: listed.debtList,
        permission: ['debtList']
      },
      {
        label: "Accountability",
        path: listed.accountability,
        permission: ['accountability']
      },
      {
        label: "History",
        path: listed.history,
        permission: ['history']
      },
     
    ],
    permission: ['submissionList', 'debtList', 'accountability', 'history']
  },
  {
    label: 'Settings',
    path: '',
    icon: '<FaGear />',   
    subLabel: [
      {
        label: "Users",
        path: listed.user,
        permission: ['user']
      },
      {
        label: "Roles",
        path: listed.roles,
        permission: ['roles']
      },
      {
        label: "Permissions",
        path: listed.submissionList,
        permission: ['permissions']
      },
      {
        label: "Hierarchy",
        path: listed.hirarky,
        permission: ['hirarky']
      },
      {
        label: "Submission Setting",
        path: listed.submissionList,
        permission: ['submissionSetting']
      },
      {
        label: "Integrations",
        path: listed.submissionList,
        permission: ['integrations']
      },
     
    ],
    permission: ['user', 'roles', 'permissions', 'hirarky', 'submissionSetting', 'integrations']
  },
 
 
];
