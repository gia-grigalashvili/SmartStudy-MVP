const TeacherLogin: React.FC = () => {
  // const { isLoggedIn } = useAuthStore();
  // const { clearOtp } = useAuthStageStore();

  // const { t } = useTranslation();
  // const navigate = useNavigate();
  // const { login } = useAuthStore();
  // const { loginStage, setLoginStage, resetStages } = useAuthStageStore();

  // useEffect(() => {
  //   if (isLoggedIn) navigate("/");
  // }, [isLoggedIn, navigate]);

  return "Teacher Login Page";
};

export const teacherLoginNavigationRoute = {
  element: <TeacherLogin />,
  path: "/teacher/login",
  isAuthRoute: true
};

export default TeacherLogin;
