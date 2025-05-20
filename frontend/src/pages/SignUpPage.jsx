import {
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  MessageSquare,
  User,
} from "lucide-react";
import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";

import AuthImagePattern from "../components/AuthImagePattern";
import { toast } from "react-hot-toast";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const { signup, isSigningUp } = useAuthStore();

  const validateForm = () => {;
  if (!formData.fullName.trim()) return toast.error("Lütfen tam adınızı girin.");
  if (!formData.email.trim()) return toast.error("Lütfen e-posta adresinizi girin.");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) return toast.error("Geçerli bir e-posta adresi girin");
  if (!formData.password.trim()) return toast.error("Parola alanı boş bırakılamaz.");
  if (formData.password.length < 6) return toast.error("Parolanız en az 6 karakterden oluşmalıdır.");

  return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const success = validateForm();

    if (success===true) signup(formData);
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left Side */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="w-12 h-12 mx-auto rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <MessageSquare className="w-6 h-6 text-primary" />
            </div>
            <h1 className="text-2xl font-bold mt-2">Yeni Hesap Oluştur</h1>
            <p className="text-base-content/60">
              Hemen başla, ücretsiz!
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Ad Soyad</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-50">
                  <User className="size-5 text-white" />
                </div>
                <input
                  type="text"
                  className="input input-bordered w-full pl-10 bg-transparent"
                  placeholder="Semih Çavdar"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                />
              </div>
            </div>
            {/* Email */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">E-posta</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-50">
                  <Mail className="size-5 text-white" />
                </div>
                <input
                  type="email"
                  className={"input input-bordered w-full pl-10"}
                  placeholder="giris@ornek.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
            </div>
            {/* Password */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Parola</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-50">
                  <Lock className="size-5 text-white" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className={`input input-bordered w-full pl-10`}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="size-5 text-white" />
                  ) : (
                    <Eye className="size-5 text-white" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className={"btn btn-primary w-full"}
              disabled={isSigningUp}
            >
              {isSigningUp ? (
                <>
                  <Loader2 className="size-5 animate-spin" />
                  Yükleniyor...
                </>
              ) : (
                "Yeni Hesap Oluştur"
              )}
            </button>
          </form>

          <div className="text-center">
            <p className="text-base-content/60">
              Zaten hesabınız var mı?{" "}
              <Link to="/login" className="link link-primary">
                Giriş Yap
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right Side */}

      <AuthImagePattern
        title="Topluluğumuza dahil olun"
        subtitle="Dostlarınla bağlantı kur, anılarını paylaş, sevdiklerinle iletişimde ol."
      />
    </div>
  );
};

export default SignUpPage;
