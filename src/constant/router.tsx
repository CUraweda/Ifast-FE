import { createBrowserRouter } from 'react-router-dom';
import { listed } from './listed';
import SignIn from '@/pages/Login';
import RoleSelection from '@/pages/SelectRole';
import Dashboard from '@/pages/Dashboard';
import Layout from '@/components/Layout';
import ProtectedLayout from './ProtectedLayout';
import SubmissionsList from '@/pages/submissions/SubmissionsList';
import DebtList from '@/pages/DebtList';
import Accountability from '@/pages/Accountability';
import History from '@/pages/history';
import User from '@/pages/User';
import Roles from '@/pages/Roles';
import Hirarky from '@/pages/Hirarky';
import SubmissionDetail from '@/pages/submissions/SubmissionDetail';

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
        path: listed.submissionDetail,
        element: <SubmissionDetail />,
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
      {
        path: listed.hirarky,
        element: <Hirarky />,
      },
      
     
    ],
  },
]);

export default Route;
