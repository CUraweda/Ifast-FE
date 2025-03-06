import { createBrowserRouter } from 'react-router-dom';
import { listed } from './listed';
import SignIn from '@/pages/Login';
import RoleSelection from '@/pages/SelectRole';
import Dashboard from '@/pages/Dashboard';
import Layout from '@/components/Layout';
import ProtectedLayout from './ProtectedLayout';
import SubmissionsList from '@/pages/SubmissionsList';
import DebtList from '@/pages/DebtList';
import Accountability from '@/pages/Accountability';
import History from '@/pages/history';
import User from '@/pages/User';
import Roles from '@/pages/Roles';

const Route: ReturnType<typeof createBrowserRouter> = createBrowserRouter([
  {
    path: listed.signin,
    element: <SignIn />,
  },
  {
    path: listed.selectRole,
    element: <RoleSelection />,
  },
  {
    path: '/',
    element: (
      <ProtectedLayout>
        <Layout />
      </ProtectedLayout>
    ),
    children: [
      {
        path: listed.dashboard,
        element: <Dashboard />,
      },
      {
        path: listed.submissionList,
        element: <SubmissionsList />,
      },
      {
        path: listed.debtList,
        element: <DebtList />,
      },
      {
        path: listed.accountability,
        element: <Accountability />,
      },
      {
        path: listed.history,
        element: <History />,
      },
      {
        path: listed.user,
        element: <User />,
      },
      {
        path: listed.roles,
        element: <Roles />,
      },
     
    ],
  },
]);

export default Route;
