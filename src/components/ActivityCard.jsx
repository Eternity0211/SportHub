import React from 'react';

export default function ActivityCard({ activity }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
      {/* 固定图片高度为 180px，超出部分隐藏 */}
      <div className="h-60 overflow-hidden">
        <img
          src={activity.image}
          alt={activity.title}
          className="w-full h-full object-cover" // 关键：保持比例填充并裁剪
        />
      </div>
      
      {/* 内容区域：固定高度 + 垂直布局 */}
      <div className="p-4 h-48 flex flex-col">
        <h3 className="text-lg font-bold mb-1 line-clamp-1">
          {activity.title}
        </h3>
        <div className="flex items-center mb-2">
          <span className="text-red-600 font-bold">¥{activity.price}</span>
          <span className="text-gray-400 text-sm ml-2">/ 小时</span>
        </div>
        <p className="text-gray-600 text-sm line-clamp-2">
          {activity.description}
        </p>
        
        {/* 底部信息：自动对齐到底部 */}
        <div className="mt-auto flex justify-between items-center text-sm text-gray-500">
          <div className="flex items-center">
            <i className="fa fa-map-marker mr-1"></i>
            <span>{activity.location}</span>
          </div>
          <div className="flex items-center">
            <i className="fa fa-calendar mr-1"></i>
            <span>{activity.status}</span>
          </div>
        </div>
      </div>
    </div>
  );
}