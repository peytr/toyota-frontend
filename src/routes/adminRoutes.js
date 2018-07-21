import ManageSop from '../components/sop/ManageSop'
import CreateSop from '../components/sop/CreateSop'
import EditSop from '../components/sop/EditSop'
import ManageUsers from '../components/user/ManageUsers'
import ViewUser from '../components/user/ViewUser'
import Register from '../components/auth/Register'

const adminRoutes = [
{
  path: '/managesop',
  component: ManageSop,
}, {
  path: '/manageusers',
  component: ManageUsers,
}, {
  path: '/register',
  component: Register,
}, {
  path: '/users/:id',
  component: ViewUser,
}, {
  path: '/sops/create',
  component: CreateSop,
}, {
  path: '/sops/:id',
  component: EditSop,
}
];

export default adminRoutes