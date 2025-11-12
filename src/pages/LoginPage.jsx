import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../services/auth.service';
import { useToast } from '../hooks/useToast';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { success, error: showError } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await authService.login(email, password);
      success('ログインしました！');
      navigate('/');
    } catch (err) {
      showError(err.message || 'ログインに失敗しました');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen pt-24 sm:pt-28 bg-mistyrose-gradient flex items-center justify-center">
      <div className="bg-white rounded-3xl p-8 max-w-md w-full mx-4 shadow-xl">
        <h2 className="text-2xl font-light mb-6 text-gray-700">ログイン</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-600 text-sm mb-2">メールアドレス</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
              className="w-full px-4 py-2.5 border border-rose-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-200 disabled:bg-gray-50 disabled:cursor-not-allowed"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-600 text-sm mb-2">パスワード</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
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
              {loading ? 'ログイン中...' : 'ログイン'}
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
          アカウントをお持ちでない方は{' '}
          <Link to="/register" className="text-rose-500 hover:text-rose-700 font-medium">
            新規登録
          </Link>
        </p>
      </div>
    </div>
  );
}
