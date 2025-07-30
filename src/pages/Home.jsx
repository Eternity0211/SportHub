import { Link } from 'react-router-dom';
import ActivityCard from '../components/ActivityCard';
import badmintonImg from '../assets/images/badminton.png';
import tennisImg from '../assets/images/tennis.png';
import basketballImg from '../assets/images/basketball.png';
import yogaImg from '../assets/images/yoga.png';
import frisbeeImg from '../assets/images/frisbee.png';
import nightRunImg from '../assets/images/nightRun.png';
import { useState } from 'react';
import React from 'react';

// 模拟活动数据（实际对接后端接口）
export const activities = [
  {
    id: 1,
    title: '羽毛球局',
    price: 70,
    image: badmintonImg,
    description: '快来一起打羽毛球，锻炼身体，享受运动乐趣！',
    location: '奥体中心',
    status: '随时可约',
  },
  {
    id: 2,
    title: '活力网球晨练',
    price: 80,
    image: tennisImg,
    description: '清晨的网球时光，开启活力满满的一天！专业教练带队热身',
    location: '奥体中心网球场',
    status: '需提前 1 天预约',
    duration: '1.5 小时',
    maxPeople: 6,
    tags: ['网球', '晨练', '教练指导']
  },
  {
    id: 3,
    title: '热血篮球对抗赛',
    price: 120,
    image: basketballImg,
    description: '半场 3V3 对抗赛！专业裁判+计分系统，释放你的篮球魂！',
    location: '市体育公园篮球场',
    status: '满 6 人开团',
    duration: '3 小时',
    maxPeople: 12,
    tags: ['篮球', '对抗赛', '竞技']
  },
  {
    id: 4,
    title: '瑜伽户外冥想课',
    price: 50,
    image: yogaImg,
    description: '在公园草坪上冥想，资深瑜伽老师带你放松身心，远离城市喧嚣',
    location: '城市中央公园草坪',
    status: '限 15 人（需自带瑜伽垫）',
    duration: '1 小时',
    maxPeople: 15,
    tags: ['瑜伽', '冥想', '户外']
  },
  {
    id: 5,
    title: '趣味飞盘团建局',
    price: 80,
    image: frisbeeImg,
    description: '当下最火的飞盘团建！新手教学+团队对抗，轻松又解压',
    location: '郊区生态运动公园',
    status: '满 10 人发车',
    duration: '2.5 小时',
    maxPeople: 20,
    tags: ['飞盘', '团建', '趣味']
  },
  {
    id: 6,
    title: '夜跑荧光派对',
    price: 30,
    image: nightRunImg,
    description: '夜跑+荧光装备！沿江跑道，音乐陪伴，跑出夏夜多巴胺！',
    location: '滨江步道（地铁口直达）',
    status: '每晚 7 点集合',
    duration: '1.5 小时',
    maxPeople: '不限（建议至少 5 人）',
    tags: ['夜跑', '荧光', '社交']
  },
];

export default function Home() {
  // 用于存储搜索关键词
  const [searchTerm, setSearchTerm] = useState('');
  // 筛选后的活动列表
  const [filteredActivities, setFilteredActivities] = useState(activities); 

  // 处理搜索输入变化的函数
  const handleSearchChange = (e) => {
    const term = e.target.value.toLowerCase(); // 转为小写
    setSearchTerm(term);

    // 实时过滤活动（不区分大小写）
    const filtered = activities.filter((activity) => 
      activity.title.toLowerCase().includes(term) ||
      activity.description.toLowerCase().includes(term) ||
      activity.location.toLowerCase().includes(term) ||
      (activity.tags?.join(' ').toLowerCase().includes(term) || false)
    );

    setFilteredActivities(filtered);
  };


  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">体育活动室</h1>
        <div className="w-1/3"> {/* 搜索框占 1/3 宽度，可调整 */}
          <input
            type="text"
            placeholder="搜索活动"
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full p-2 border border-gray-300 rounded-md px-3"
          />
        </div>
      </div>
      
      {/* 活动列表（使用过滤后的数据） */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredActivities.length > 0 ? (
          filteredActivities.map((activity) => (
            <Link key={activity.id} to={`/detail/${activity.id}`} className="no-underline">
              <ActivityCard activity={activity} />
            </Link>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <i className="fa fa-search text-gray-300 text-5xl mb-4"></i>
            <p className="text-gray-500">没有找到匹配的活动</p>
          </div>
        )}
      </div>
    </div>
  );
}