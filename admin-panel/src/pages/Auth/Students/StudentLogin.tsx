const StudentLogin: React.FC = () => {
  // const { isLoggedIn } = useAuthStore();
  // const { clearOtp } = useAuthStageStore();

  // const { t } = useTranslation();
  // const navigate = useNavigate();
  // const { login } = useAuthStore();
  // const { loginStage, setLoginStage, resetStages } = useAuthStageStore();

  // useEffect(() => {
  //   if (isLoggedIn) navigate("/");
  // }, [isLoggedIn, navigate]);

  return "Student Login Page";
};

export const studentLoginNavigationRoute = {
  element: <StudentLogin />,
  path: "/student/login",
  isAuthRoute: true
};

export default StudentLogin;
