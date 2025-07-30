import { useState } from 'react';

export default function CommentInput({ activityId, onAddComment }) {
  const [commentContent, setCommentContent] = useState(''); // 存储输入的评论内容

  // 处理评论提交
  const handleSubmitComment = () => {
    if (!commentContent.trim()) {
      alert('请输入评论内容');
      return;
    }

    // 构造评论数据（实际项目中，user 应从登录状态获取，id 由后端生成）
    const newComment = {
      id: Date.now(), // 临时用时间戳当唯一ID
      user: '当前登录用户', // 替换为真实用户名（如从全局状态取）
      content: commentContent,
      createdAt: new Date().toLocaleDateString(), // 格式化当前日期
    };

    // 调用父组件传递的方法，更新评论列表
    onAddComment(newComment);

    // 清空输入框
    setCommentContent('');
  };

  return (
    <div className="mt-6">
      {/* 评论输入框 */}
      <textarea
        value={commentContent}
        onChange={e => setCommentContent(e.target.value)}
        placeholder="写下你的评论..."
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        rows="3"
      />

      {/* 提交按钮 */}
      <div className="flex justify-end mt-3">
        <button
          onClick={handleSubmitComment}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
        >
          发布评论
        </button>
      </div>
    </div>
  );
}
