// src/App.jsx
import React from 'react';
import Card from './Card'; // 💡 引入剛剛建立的 Card 組件

function App() {
  // 個人資料定義
  const me = {
    name: "蔡維馨",
    title: "你好",
    avatar: "https://www.keaitupian.cn/cjpic/frombd/0/253/28190850/1664220321.jpg",
    bio: "",
    skills: ["畫畫", "睡覺", "發呆", "做意義不明的事"],
    email: "5b2g0007@stust.edu.tw"
  };

  const pageStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#efd9eb', // 柔和的背景色
    fontFamily: '"Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    margin: 0
  };

  return (
    <div style={pageStyle}>
      {/* 傳遞整個人員物件進去 */}
      <Card data={me} />
    </div>
  );
}

export default App;