import { BookOpen, Brain, Sparkles, Target } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function Landing() {
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "ka" : "en";
    i18n.changeLanguage(newLang);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white">
      <header className="sticky top-0 z-50 border-b bg-white/80 shadow-sm backdrop-blur-md">
        <div className="container mx-auto flex items-center justify-between px-4 py-6">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-600 opacity-20 blur-lg"></div>
              <BookOpen className="relative h-7 w-7 text-blue-600" />
            </div>
            <h1 className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-xl font-bold text-blue-600 text-transparent">
              {t("header.logo")}
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={toggleLanguage}
              className="rounded-full border border-gray-300 px-3 py-1 text-sm font-semibold transition-all duration-300 hover:bg-gray-100"
            >
              {i18n.language.toUpperCase()}
            </button>

            <button className="rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 font-semibold text-white shadow-lg shadow-blue-600/20 transition-all duration-300 hover:shadow-xl hover:shadow-blue-600/30">
              {t("header.ctaButton")}
            </button>
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 30%, rgba(59, 130, 246, 0.3), transparent 50%), radial-gradient(circle at 80% 70%, rgba(147, 51, 234, 0.3), transparent 50%)"
          }}
        ></div>

        <div className="relative container mx-auto grid items-center gap-12 px-4 py-20 lg:grid-cols-2 lg:py-28">
          <div className="relative z-10">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-purple-200/50 bg-white/60 px-4 py-2 shadow-lg shadow-purple-200/20 backdrop-blur-sm">
              <Sparkles className="h-5 w-5 animate-pulse text-purple-600" />
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text font-semibold text-transparent">
                {t("hero.badge")}
              </span>
            </div>

            <h2 className="mb-6 bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-4xl leading-tight font-extrabold text-transparent lg:text-5xl">
              {t("hero.title")}
            </h2>

            <p className="mb-8 text-lg leading-relaxed text-gray-700">
              {t("hero.subtitle")}
            </p>

            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 rounded-lg bg-white px-4 py-2 shadow-md">
                <div className="h-2 w-2 animate-pulse rounded-full bg-green-500"></div>
                <span className="text-gray-700">
                  {t("heroStats.activeUsers")}
                </span>
              </div>
              <div className="flex items-center gap-2 rounded-lg bg-white px-4 py-2 shadow-md">
                <div className="h-2 w-2 animate-pulse rounded-full bg-blue-500"></div>
                <span className="text-gray-700">
                  {t("heroStats.aiEnhanced")}
                </span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-blue-600 to-purple-600 opacity-20 blur-2xl"></div>
            <div className="relative overflow-hidden rounded-3xl border-4 border-white/50 shadow-2xl shadow-purple-500/20">
              <img
                src="https://images.unsplash.com/photo-1701967341617-14499d8bf8c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
                alt={t("hero.imageAlt")}
                className="aspect-[4/3] h-auto w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-purple-600/20"></div>
            </div>

            <div className="absolute -top-6 -right-6 h-24 w-24 rounded-2xl bg-gradient-to-br from-yellow-400 to-orange-500 opacity-80 blur-xl"></div>
            <div className="absolute -bottom-6 -left-6 h-32 w-32 rounded-2xl bg-gradient-to-br from-blue-400 to-cyan-500 opacity-60 blur-xl"></div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-gradient-to-b from-white via-gray-50 to-white py-20">
        <div className="relative container mx-auto px-4">
          <div className="mb-16 text-center">
            <h3 className="mb-4 bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-3xl font-bold text-transparent">
              {t("features.sectionTitle")}
            </h3>
            <p className="mx-auto max-w-2xl text-gray-600">
              {t("features.sectionSubtitle")}
            </p>
          </div>

          <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-3">
            <div className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-8 shadow-lg shadow-blue-100/50 transition-all duration-500 hover:border-blue-200 hover:shadow-2xl hover:shadow-blue-200/50">
              <div className="absolute top-0 right-0 h-32 w-32 rounded-bl-full bg-gradient-to-br from-blue-100 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
              <div className="relative">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 p-3 shadow-lg shadow-blue-500/30 transition-transform duration-300 group-hover:scale-110">
                    <Brain className="h-6 w-6 text-white" />
                  </div>
                  <h4 className="font-semibold text-gray-900">
                    {t("features.feature1.title")}
                  </h4>
                </div>
                <p className="leading-relaxed text-gray-600">
                  {t("features.feature1.description")}
                </p>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-8 shadow-lg shadow-purple-100/50 transition-all duration-500 hover:border-purple-200 hover:shadow-2xl hover:shadow-purple-200/50">
              <div className="absolute top-0 right-0 h-32 w-32 rounded-bl-full bg-gradient-to-br from-purple-100 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
              <div className="relative">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 p-3 shadow-lg shadow-purple-500/30 transition-transform duration-300 group-hover:scale-110">
                    <Sparkles className="h-6 w-6 text-white" />
                  </div>
                  <h4 className="font-semibold text-gray-900">
                    {t("features.feature2.title")}
                  </h4>
                </div>
                <p className="leading-relaxed text-gray-600">
                  {t("features.feature2.description")}
                </p>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-8 shadow-lg shadow-green-100/50 transition-all duration-500 hover:border-green-200 hover:shadow-2xl hover:shadow-green-200/50">
              <div className="absolute top-0 right-0 h-32 w-32 rounded-bl-full bg-gradient-to-br from-green-100 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
              <div className="relative">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-xl bg-gradient-to-br from-green-500 to-green-600 p-3 shadow-lg shadow-green-500/30 transition-transform duration-300 group-hover:scale-110">
                    <Target className="h-6 w-6 text-white" />
                  </div>
                  <h4 className="font-semibold text-gray-900">
                    {t("features.feature3.title")}
                  </h4>
                </div>
                <p className="leading-relaxed text-gray-600">
                  {t("features.feature3.description")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 py-12 text-white">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
            backgroundSize: "40px 40px"
          }}
        ></div>
        <div className="relative container mx-auto px-4 text-center">
          <p>{t("footer.copyright", { year: new Date().getFullYear() })}</p>
        </div>
      </footer>
    </div>
  );
}
