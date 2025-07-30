import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import CommentInput from '../components/CommentInput';
import { activities } from './Home';
import request from '../utils/axios'; // 引入统一请求封装

export default function Detail() {
  const { id } = useParams();
  const activity = activities.find((item) => item.id === parseInt(id));
  
  const [enrollStatus, setEnrollStatus] = useState({
    maxPeople: 0,
    enrolledCount: 0,
    isEnrolled: false,
    isFull: false
  });
  const [commentList, setCommentList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      if (!activity) return;
      try {
        setLoading(true);
        // 并行请求（使用统一封装的 request）
        const [enrollRes, commentRes] = await Promise.all([
          request.get(`/activities/${activity.id}/enroll-status`),
          request.get(`/activities/${activity.id}/comments`)
        ]);
        
        setEnrollStatus(enrollRes.data);
        setCommentList(
          commentRes.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        );
        setError('');
      } catch (err) {
        console.error('数据加载失败:', err);
        setError('加载数据失败，请刷新页面重试');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [activity?.id]);

  // 报名/取消报名逻辑（简化，使用 request）
  const handleEnroll = async () => {
    // if (!localStorage.getItem('token')) {
    //   alert('请先登录再进行报名操作');
    //   return;
    // }

    try {
      if (enrollStatus.isEnrolled) {
        await request.post(`/activities/${activity.id}/unenroll`);
        setEnrollStatus((prev) => ({
          ...prev,
          isEnrolled: false,
          enrolledCount: prev.enrolledCount - 1,
          isFull: prev.enrolledCount - 1 >= prev.maxPeople
        }));
        alert('取消报名成功');
      } else {
        if (enrollStatus.isFull) {
          alert('活动名额已满，无法报名');
          return;
        }
        await request.post(`/activities/${activity.id}/enroll`);
        setEnrollStatus((prev) => ({
          ...prev,
          isEnrolled: true,
          enrolledCount: prev.enrolledCount + 1,
          isFull: prev.enrolledCount + 1 >= prev.maxPeople
        }));
        alert('报名成功！');
      }
    } catch (err) {
      console.error('报名操作失败:', err);
      alert(err || '操作失败，请重试');
      fetchEnrollStatus(); // 失败后刷新状态
    }
  };

  // 单独拉取报名状态
  const fetchEnrollStatus = async () => {
    try {
      const res = await request.get(`/activities/${activity.id}/enroll-status`);
      setEnrollStatus(res.data);
    } catch (err) {
      console.error('刷新报名状态失败:', err);
    }
  };

  // 发表评论逻辑（简化，使用 request）
  const handleAddNewComment = async (newCommentContent) => {
    // if (!localStorage.getItem('token')) {
    //   alert('请先登录再发表评论');
    //   return;
    // }

    try {
      const res = await request.post(`/activities/${activity.id}/comments`, {
        content: newCommentContent,
      });
      setCommentList([res.data, ...commentList]);
    } catch (err) {
      console.error('发表评论失败:', err);
      alert(err || '评论发表失败，请重试');
    }
  };

  // 活动不存在处理
  if (!activity) {
    return <div className="p-8 text-center text-gray-500">活动不存在或已删除</div>;
  }

  // 加载中状态
  if (loading) {
    return <div className="p-8 text-center text-gray-500">加载中...</div>;
  }

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto">
      {/* 错误提示 */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      {/* 面包屑导航（使用Link优化路由） */}
      <div className="mb-4 text-sm text-gray-500">
        <Link to="/" className="hover:text-blue-500">首页</Link>
        <span className="mx-2">/</span>
        <Link to="/activities" className="hover:text-blue-500">活动列表</Link>
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
                  <p className="font-medium">
                    {activity.maxPeople ? activity.maxPeople : '无限制'}
                  </p>
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
              <h2 className="text-xl font-bold">活动评论 ({commentList.length})</h2>
              <button className="text-blue-500 hover:text-blue-700 text-sm font-medium">
                查看全部
              </button>
            </div>
            
            {/* 评论列表 */}
            <div className="space-y-6">
              {commentList.length > 0 ? (
                commentList.map((comment) => (
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
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  暂无评论，快来发表第一条评论吧～
                </div>
              )}
            </div>
            
            {/* 发表评论 */}
            <CommentInput 
              activityId={activity.id} 
              onAddComment={handleAddNewComment} 
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
            
            {/* 报名进度（仅在有最大人数限制时显示） */}
            {activity.maxPeople > 0 && (
              <div className="mb-6">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-500">报名进度</span>
                  <span className="font-medium">
                    {enrollStatus.enrolledCount}/{enrollStatus.maxPeople}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-blue-600 h-2.5 rounded-full transition-all duration-500" 
                    style={{ 
                      width: `${(enrollStatus.enrolledCount / enrollStatus.maxPeople) * 100}%` 
                    }}
                  ></div>
                </div>
                {enrollStatus.isFull ? (
                  <p className="text-red-600 text-sm mt-1">
                    <i className="fa fa-times-circle"></i> 名额已满
                  </p>
                ) : (
                  <p className="text-green-600 text-sm mt-1">
                    <i className="fa fa-check-circle"></i> 
                    剩余 {enrollStatus.maxPeople - enrollStatus.enrolledCount} 个名额
                  </p>
                )}
              </div>
            )}
            
            {/* 报名按钮（根据状态禁用/启用） */}
            <button
              onClick={handleEnroll}
              disabled={enrollStatus.isFull && !enrollStatus.isEnrolled} // 满员且未报名时禁用
              className={`w-full py-3 rounded-lg font-bold transition-all duration-300 
                ${enrollStatus.isEnrolled 
                  ? 'bg-gray-200 text-gray-700 hover:bg-gray-300' 
                  : enrollStatus.isFull 
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                    : 'bg-red-500 text-white hover:bg-red-600'
                }`}
            >
              {enrollStatus.isEnrolled ? (
                <span>
                  <i className="fa fa-check mr-2"></i> 已报名
                </span>
              ) : enrollStatus.isFull ? (
                <span>
                  <i className="fa fa-times mr-2"></i> 名额已满
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
                  <Link 
                    key={recActivity.id}
                    to={`/detail/${recActivity.id}`} // 使用Link优化跳转
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
                  </Link>
                ))}
          </div>
        </div>
      </div>
    </div>
  </div>
)}