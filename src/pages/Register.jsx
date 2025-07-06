export default function Register() {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="bg-white p-6 rounded shadow w-80">
          <h2 className="text-xl font-bold mb-4">注册</h2>
          <input
            type="text"
            placeholder="用户名"
            className="w-full p-2 border rounded mb-2"
          />
          <input
            type="password"
            placeholder="密码"
            className="w-full p-2 border rounded mb-4"
          />
          <button className="bg-green-500 text-white px-4 py-2 rounded w-full">
            注册
          </button>
        </div>
      </div>
    );
  }