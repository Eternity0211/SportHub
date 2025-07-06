// 模拟订单管理功能（实际对接后端接口）
const orders = [
    { id: 1, activity: '羽毛球局', user: '用户A', status: '已支付' },
    // 更多订单...
  ];
  
  export default function OrderManage() {
    return (
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-6">活动订单管理</h1>
        <div className="bg-white rounded-lg shadow p-6">
          <table className="w-full text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2">订单ID</th>
                <th className="p-2">活动名称</th>
                <th className="p-2">用户</th>
                <th className="p-2">状态</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b">
                  <td className="p-2">{order.id}</td>
                  <td className="p-2">{order.activity}</td>
                  <td className="p-2">{order.user}</td>
                  <td className="p-2">{order.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }