const AdminLogin: React.FC = () => {
  // const { isLoggedIn } = useAuthStore();
  // const { clearOtp } = useAuthStageStore();

  // const { t } = useTranslation();
  // const navigate = useNavigate();
  // const { login } = useAuthStore();
  // const { loginStage, setLoginStage, resetStages } = useAuthStageStore();

  // useEffect(() => {
  //   if (isLoggedIn) navigate("/");
  // }, [isLoggedIn, navigate]);

  return "Admin Login Page";
};

export const adminLoginNavigationRoute = {
  element: <AdminLogin />,
  path: "/admin/login",
  isAuthRoute: true
};

export default AdminLogin;
