import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ActivityManagement() {
  const navigate = useNavigate();
  // 扩展状态字段
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState('');   // 新增：时长
  const [maxPeople, setMaxPeople] = useState(''); // 新增：人数限制
  const [tags, setTags] = useState('');           // 新增：标签
  const [coverImage, setCoverImage] = useState(null); // 新增：封面图

  // 发布活动逻辑（模拟，需对接实际接口）
  const handlePublish = () => {
    // 构造完整活动数据
    const newActivity = {
      title,
      price: Number(price),
      description,
      duration,
      maxPeople,
      tags: tags.split(',').map(tag => tag.trim()), // 转为数组
      coverImage: coverImage ? URL.createObjectURL(coverImage) : null, // 临时预览
    };

    // 模拟提交到“后端”（实际需用 fetch/axios）
    console.log('新增活动数据：', newActivity);
    // 提交成功后跳转到活动列表（示例）
    navigate('/activities');
  };

  // 处理图片上传
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCoverImage(file);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">活动管理</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4">新增活动</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">活动标题</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">价格</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">活动描述</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            rows="3"
          />
        </div>
        {/* 新增字段：时长 */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">时长</label>
          <input
            type="text"
            placeholder="如：1.5 小时"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        {/* 新增字段：人数限制 */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">人数限制</label>
          <input
            type="text"
            placeholder="如：限 15 人"
            value={maxPeople}
            onChange={(e) => setMaxPeople(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        {/* 新增字段：标签 */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">标签（逗号分隔）</label>
          <input
            type="text"
            placeholder="如：羽毛球,社交"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        {/* 新增字段：封面图上传 */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">封面图</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="mt-1 block w-full"
          />
          {coverImage && (
            <img 
              src={URL.createObjectURL(coverImage)} 
              alt="封面预览" 
              className="mt-2 w-48 h-auto rounded"
            />
          )}
        </div>
        <button
          onClick={handlePublish}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          发布活动
        </button>
      </div>
    </div>
  );
}