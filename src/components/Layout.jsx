import { Link, Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 导航栏 */}
      <nav className="bg-gray-800 text-white p-4">
        <div className="container mx-auto flex justify-between">
          <Link to="/" className="text-xl font-bold">
            SportHub
          </Link>
          <div className="space-x-4">
            <Link to="/" className="hover:underline">
              活动列表
            </Link>
            <Link to="/manage" className="hover:underline">
              活动管理
            </Link>
            <Link to="/orders" className="hover:underline">
              订单管理
            </Link>
            <Link to="/login" className="hover:underline">
              登录
            </Link>
          </div>
        </div>
      </nav>

      {/* 内容区域 */}
      <main className="flex-grow container mx-auto p-4">
        <Outlet /> {/* 渲染子路由内容 */}
      </main>

      {/* 页脚 */}
      <footer className="bg-gray-800 text-white text-center p-4">
        &copy; 2025 SportHub
      </footer>
    </div>
  );
}
