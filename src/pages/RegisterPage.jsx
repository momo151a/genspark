import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../services/auth.service';
import { useToast } from '../hooks/useToast';
import { ToastContainer } from '../components/common/Toast';

export function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    age: ''
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toasts, success, error: showError, removeToast } = useToast();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password.length < 6) {
      showError('パスワードは6文字以上で入力してください');
      return;
    }

    setLoading(true);

    try {
      await authService.register(
        formData.email,
        formData.password,
        formData.name,
        formData.age ? parseInt(formData.age) : null
      );
      success('登録が完了しました！');
      navigate('/');
    } catch (err) {
      showError(err.message || '登録に失敗しました');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen pt-24 sm:pt-28 bg-mistyrose-gradient flex items-center justify-center">
      <ToastContainer toasts={toasts} onClose={removeToast} />
      <div className="bg-white rounded-3xl p-8 max-w-md w-full mx-4 shadow-xl">
        <h2 className="text-2xl font-light mb-6 text-gray-700">新規登録</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-600 text-sm mb-2">お名前</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              disabled={loading}
              className="w-full px-4 py-2.5 border border-rose-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-200 disabled:bg-gray-50 disabled:cursor-not-allowed"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-600 text-sm mb-2">メールアドレス</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={loading}
              className="w-full px-4 py-2.5 border border-rose-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-200 disabled:bg-gray-50 disabled:cursor-not-allowed"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-600 text-sm mb-2">パスワード</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength="6"
              disabled={loading}
              className="w-full px-4 py-2.5 border border-rose-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-200 disabled:bg-gray-50 disabled:cursor-not-allowed"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-600 text-sm mb-2">年齢（任意）</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              min="1"
              max="120"
              disabled={loading}
              className="w-full px-4 py-2.5 border border-rose-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-200 disabled:bg-gray-50 disabled:cursor-not-allowed"
            />
          </div>

          <div className="flex space-x-3">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-gradient-to-r from-rose-200 to-rose-300 text-white py-2.5 rounded-full hover:from-rose-300 hover:to-rose-400 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? '登録中...' : '登録する'}
            </button>
            <button
              type="button"
              onClick={handleCancel}
              disabled={loading}
              className="flex-1 bg-gray-100 text-gray-600 py-2.5 rounded-full hover:bg-gray-200 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              キャンセル
            </button>
          </div>
        </form>

        <p className="text-center mt-6 text-sm text-gray-600">
          すでにアカウントをお持ちの方は{' '}
          <Link to="/login" className="text-rose-500 hover:text-rose-700 font-medium">
            ログイン
          </Link>
        </p>
      </div>
    </div>
  );
}
