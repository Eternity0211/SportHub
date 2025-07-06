import { useParams } from 'react-router-dom';
import CommentInput from '../components/CommentInput';
import { activities } from './Home';
import { useState } from 'react';

const comments = [
  { id: 1, user: '用户A', content: '活动很棒！', createdAt: '2025-07-04' },
  { id: 2, user: '用户B', content: '环境很好，值得参加！', createdAt: '2025-07-03' },
  // 更多评论...
];

export default function Detail() {
  const { id } = useParams();
  const activity = activities.find((item) => item.id === parseInt(id));
  
  if (!activity) {
    return <div className="p-8 text-center text-gray-500">活动不存在</div>;
  }

  // 模拟报名状态（实际应从后端获取）
  const [enrolledCount, setEnrolledCount] = useState(activity.enrolled || 0); 
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [remainingSlots, setRemainingSlots] = useState(
    activity.maxPeople ? (parseInt(activity.maxPeople) - (activity.enrolled || 0)) : Infinity
  );

  // 处理报名逻辑
  const handleEnroll = () => {
    if (isEnrolled) {
      // 取消报名
      setIsEnrolled(false);
      setEnrolledCount(enrolledCount - 1);
      setRemainingSlots(remainingSlots + 1);
      alert('已取消报名');
    } else {
      // 检查是否还有名额
      if (remainingSlots <= 0) {
        alert('活动名额已满');
        return;
      }
      // 报名成功
      setIsEnrolled(true);
      setEnrolledCount(enrolledCount + 1);
      setRemainingSlots(remainingSlots - 1);
      alert('报名成功！');
    }
  };

  const [commentList, setCommentList] = useState([
    { id: 1, user: '用户A', content: '活动很棒！', createdAt: '2025-07-04' },
    { id: 2, user: '用户B', content: '环境很好，值得参加！', createdAt: '2025-07-03' },
  ]);

  const handleAddNewComment = (newComment) => {
    // 将新评论添加到列表开头（或末尾）
    setCommentList([newComment, ...commentList]);
  };


  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto">
      {/* 面包屑导航 */}
      <div className="mb-4 text-sm text-gray-500">
        <a href="/" className="hover:text-blue-500">首页</a>
        <span className="mx-2">/</span>
        <a href="/activities" className="hover:text-blue-500">活动列表</a>
        <span className="mx-2">/</span>
        <span className="text-gray-700">{activity.title}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 左侧：活动详情卡片 */}
        <div className="lg:col-span-2 space-y-6">
          {/* 活动封面图 */}
          <div className="relative rounded-xl overflow-hidden shadow-lg">
            <img
              src={activity.image}
              alt={activity.title}
              className="w-full h-80 object-cover"
            />
            {/* 活动状态标签 */}
            <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
              {activity.status}
            </div>
          </div>

          {/* 活动信息卡片 */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h1 className="text-2xl md:text-3xl font-bold mb-4">{activity.title}</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="flex items-start space-x-3">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <i className="fa fa-map-marker text-blue-500"></i>
                </div>
                <div>
                  <h3 className="text-sm text-gray-500">地点</h3>
                  <p className="font-medium">{activity.location}</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <i className="fa fa-clock-o text-blue-500"></i>
                </div>
                <div>
                  <h3 className="text-sm text-gray-500">时长</h3>
                  <p className="font-medium">{activity.duration || '无'}</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <i className="fa fa-users text-blue-500"></i>
                </div>
                <div>
                  <h3 className="text-sm text-gray-500">人数限制</h3>
                  <p className="font-medium">{activity.maxPeople || '无'}</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <i className="fa fa-tags text-blue-500"></i>
                </div>
                <div>
                  <h3 className="text-sm text-gray-500">标签</h3>
                  <div className="flex flex-wrap gap-2">
                    {activity.tags?.map((tag, index) => (
                      <span key={index} className="bg-gray-100 px-2 py-1 rounded text-sm">
                        {tag}
                      </span>
                    )) || '无'}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="border-t pt-6">
              <h2 className="text-xl font-bold mb-3">活动描述</h2>
              <p className="text-gray-700 leading-relaxed">{activity.description}</p>
            </div>
          </div>
          
          {/* 评论区 */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">活动评论 ({comments.length})</h2>
              <button className="text-blue-500 hover:text-blue-700 text-sm font-medium">
                查看全部
              </button>
            </div>
            
            {/* 评论列表 */}
            <div className="space-y-6">
              {comments.map((comment) => (
                <div key={comment.id} className="border-b pb-5">
                  <div className="flex items-center mb-3">
                    <img
                      src={`https://picsum.photos/id/${comment.id + 100}/40/40`}
                      alt={comment.user}
                      className="w-10 h-10 rounded-full mr-3"
                    />
                    <div>
                      <h4 className="font-medium">{comment.user}</h4>
                      <p className="text-xs text-gray-500">{comment.createdAt}</p>
                    </div>
                  </div>
                  <p className="text-gray-700">{comment.content}</p>
                </div>
              ))}
            </div>
            
            {/* 发表评论 */}
            <CommentInput 
              activityId={activity.id} 
              onAddComment={handleAddNewComment} // 关键：将更新方法传给子组件
            />
          </div>
        </div>
        
        {/* 右侧：报名卡片 */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-xl shadow-md p-6 sticky top-6">
            <div className="mb-6">
              <h3 className="text-lg font-bold mb-2">活动价格</h3>
              <div className="flex items-baseline">
                <span className="text-3xl font-bold text-red-500">¥{activity.price}</span>
                <span className="text-gray-500 ml-1">/ 小时</span>
              </div>
            </div>
            
            {/* 报名进度 */}
            {activity.maxPeople && (
            <div className="mb-6">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-500">报名进度</span>
                <span className="font-medium">
                  {enrolledCount}/{parseInt(activity.maxPeople)}  {/* 这里改用 enrolledCount */}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-blue-600 h-2.5 rounded-full" 
                  style={{ 
                    width: `${(enrolledCount / parseInt(activity.maxPeople)) * 100}%`  /* 进度条用 enrolledCount 计算 */
                  }}
                ></div>
              </div>
              {remainingSlots > 0 ? (
                <p className="text-green-600 text-sm mt-1">
                  <i className="fa fa-check-circle"></i> 剩余 {remainingSlots} 个名额
                </p>
              ) : (
                <p className="text-red-600 text-sm mt-1">
                  <i className="fa fa-times-circle"></i> 名额已满
                </p>
              )}
            </div>
          )}
            
            {/* 报名按钮 */}
            <button
              onClick={handleEnroll}
              className={`w-full py-3 rounded-lg font-bold transition-all duration-300 
                ${isEnrolled ? 'bg-gray-200 text-gray-700 hover:bg-gray-300' : 'bg-red-500 text-white hover:bg-red-600'}`}
            >
              {isEnrolled ? (
                <span>
                  <i className="fa fa-check mr-2"></i> 已报名
                </span>
              ) : (
                <span>
                  <i className="fa fa-plus mr-2"></i> 立即报名
                </span>
              )}
            </button>
            
            {/* 分享按钮 */}
            <div className="mt-4 flex justify-center space-x-4">
              <button className="p-2 rounded-full bg-blue-100 text-blue-500 hover:bg-blue-200 transition-colors">
                <i className="fa fa-weixin"></i>
              </button>
              <button className="p-2 rounded-full bg-blue-100 text-blue-500 hover:bg-blue-200 transition-colors">
                <i className="fa fa-weibo"></i>
              </button>
              <button className="p-2 rounded-full bg-blue-100 text-blue-500 hover:bg-blue-200 transition-colors">
                <i className="fa fa-qq"></i>
              </button>
            </div>
          </div>
          
          {/* 推荐活动 */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-lg font-bold mb-4">推荐活动</h3>
            <div className="space-y-4">
              {activities
                .filter((item) => item.id !== activity.id)
                .slice(0, 3)
                .map((recActivity) => (
                  <a 
                    key={recActivity.id}
                    href={`/detail/${recActivity.id}`} 
                    className="flex items-center space-x-3 group hover:bg-gray-50 p-2 rounded-lg transition-colors"
                  >
                    <img
                      src={recActivity.image}
                      alt={recActivity.title}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div>
                      <h4 className="font-medium text-gray-800 group-hover:text-blue-500 line-clamp-1">
                        {recActivity.title}
                      </h4>
                      <p className="text-sm text-gray-500">
                        <i className="fa fa-map-marker mr-1"></i> {recActivity.location}
                      </p>
                      <p className="text-sm text-red-500">¥{recActivity.price}</p>
                    </div>
                  </a>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}