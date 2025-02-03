import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { useEffect, useState } from "react";
import { CheckCircle } from "lucide-react";
import { getUserProfile } from "../api/userApi";

const Profile = () => {
  const { logout } = useAuthStore();
  const navigate = useNavigate();
  const [user, setUser] = useState<{ email: string; first_name: string; last_name: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profile = await getUserProfile();
        setUser(profile);
      } catch (error) {
        console.error("Ошибка загрузки профиля:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (loading) return <p className="text-center mt-10">Загрузка...</p>;

  return (
    <section className="py-12 sm:py-16 lg:py-20 ">
      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div className="max-w-md mx-auto text-center">
          <CheckCircle className="w-12 h-12 mx-auto text-foreground"/>
          <p className="mt-2 text-base font-medium text-gray-500 dark:text-white">
            Добро пожаловать в ваш профиль.
          </p>
        </div>

        <div className="max-w-2xl mx-auto mt-8 overflow-hidden bg-card shadow-xl md:mt-12 rounded-xl shadow-gray-400/10">
          <div className="p-6">
            <div className="sm:flex ">
              <div className="shrink-0">
                <img
                  className="object-cover h-auto mx-auto rounded-xl w-52 sm:mx-0"
                  src="https://landingfoliocom.imgix.net/store/collection/niftyui/images/mint-success/2/image.png"
                  alt="Profile Avatar"
                />

                <div className="mt-5">
                  <Button
                    onClick={handleLogout}
                    className="inline-flex items-center justify-center w-full px-5 py-3 text-xs font-bold tracking-widest text-gray-100 dark:text-gray-500 uppercase transition-all duration-200 bg-transparent border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 hover:bg-red-500 hover:text-white hover:border-none"
                  >
                    Выйти
                  </Button>
                </div>
              </div>

              <div className="mt-6 sm:ml-8 sm:mt-0 w-full text-card-text">
                <p className="text-2xl font-bold text-foreground text-gray-200 dark:text-gray-600">Профиль</p>

                <ul className="mt-6 space-y-5">
                  <li className="flex items-center justify-between">
                    <p className="text-xs font-bold tracking-wide text-gray-200 dark:text-gray-600 uppercase">
                      Имя:
                    </p>
                    <p className="text-base font-bold text-foreground text-gray-400">
                      {user?.first_name} {user?.last_name}
                    </p>
                  </li>

                  <li className="flex items-center justify-between">
                    <p className="text-xs font-bold tracking-wide text-gray-200 dark:text-gray-600 uppercase">
                      Email:
                    </p>
                    <p className="text-base font-bold text-foreground text-gray-400">{user?.email}</p>
                  </li>

                  <li className="flex items-center justify-between">
                    <p className="text-xs font-bold tracking-wide text-gray-200 dark:text-gray-600 uppercase">
                      Статус:
                    </p>
                    <p className="text-base font-bold text-green-500">Активен</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
