import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Loader2 } from "lucide-react";
import logo from "../../public/imgs/logo.png";
import { registerApi } from "../api/authApi";

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      setError("Пароли не совпадают");
      return;
    }

    if (!form.terms) {
      setError("Необходимо согласие с условиями");
      return;
    }

    setLoading(true);

    const [firstName, lastName = ""] = form.fullName.split(" ");

    try {
      await registerApi(firstName, lastName, form.email, form.password);
      navigate("/login");
    } catch (error: any) {
      setError(error.response?.data?.detail || "Ошибка регистрации");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-12 sm:py-16 lg:py-20 xl:py-24 min-h-screen flex items-center">
      <div className="p-4 mx-auto max-w-7xl sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-12 lg:gap-x-16 xl:gap-x-36 items-center">
    
          <div className="hidden lg:block">
            <img
              className="object-cover w-full h-full rounded-2xl"
              src={logo}
              alt="Register Illustration"
            />
          </div>

          <div className="dark:bg-gray-950 bg-transparent border-2 dark:border-none px-10 py-20 rounded-3xl">
            <h2 className="text-3xl font-semibold tracking-tight text-red-500 sm:text-4xl lg:text-5xl">
              Еще немного! 🤏
            </h2>
            <p className="mt-4 text-base font-normal leading-7 text-gray-700 dark:text-gray-400 lg:text-lg lg:mt-6 lg:leading-8">
              Заполните форму ниже, чтобы создать аккаунт.
            </p>

            <form onSubmit={handleSubmit} className="mt-12 space-y-6">
              <div>
                <label htmlFor="fullName" className="text-sm font-normal text-gray-700 dark:text-gray-200">
                  Имя и Фамилия
                </label>
                <div className="mt-2">
                  <Input
                    type="text"
                    name="fullName"
                    id="fullName"
                    placeholder="Введите имя и фамилию"
                    value={form.fullName}
                    onChange={handleChange}
                    className="block w-full px-6 py-4 text-base font-normal text-gray-900 dark:text-white placeholder-gray-700 dark:placeholder-gray-400 bg-transparent border border-gray-700 rounded-xl focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="text-sm font-normal text-gray-900 dark:text-white">
                  Почта
                </label>
                <div className="mt-2">
                  <Input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="example@mail.ru"
                    value={form.email}
                    onChange={handleChange}
                    className="block w-full px-6 py-4 text-base font-normal text-gray-900 dark:text-white placeholder-gray-400 bg-transparent border border-gray-700 rounded-xl focus:outline-none "
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="text-sm font-normal text-gray-900 dark:text-white ">
                  Пароль
                </label>
                <div className="mt-2">
                  <Input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="*******"
                    value={form.password}
                    onChange={handleChange}
                    className="block w-full px-6 py-4 text-base font-normal text-gray-900 dark:text-white placeholder-gray-400 bg-transparent border border-gray-700 rounded-xl focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="confirmPassword" className="text-sm font-normal text-gray-900 dark:text-white">
                  Подтвердите пароль
                </label>
                <div className="mt-2">
                  <Input
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    placeholder="*******"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    className="block w-full px-6 py-4 text-base font-normal text-gray-900 dark:text-white placeholder-gray-400 bg-transparent border border-gray-700 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              <div className="relative flex items-start">
                <div className="flex items-center h-5">
                  <input
                    type="checkbox"
                    name="terms"
                    id="terms"
                    checked={form.terms}
                    onChange={handleChange}
                    className="w-4 h-4 text-red-600 border border-gray-200 rounded focus:outline-none focus:ring-red-600"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="terms" className="text-sm font-normal text-gray-900 dark:text-white">
                    Я соглашаюсь с <span className="text-red-500 hover:underline cursor-pointer underline">условиями</span>
                  </label>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full inline-flex items-center justify-center px-12 py-4 text-base font-medium text-white transition-all duration-200 bg-red-600 border border-transparent rounded-full hover:bg-red-700 hover:border-none"
                disabled={loading}
              >
                {loading ? <Loader2 className="animate-spin h-5 w-5" /> : "Создать аккаунт"}
              </Button>
            </form>

            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

            <p className="mt-6 text-sm font-normal text-gray-500">
              Уже есть аккаунт?{" "}
              <span
                onClick={() => navigate("/login")}
                className="text-sm font-semibold text-red-500 hover:underline cursor-pointer"
              >
                Войти
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
