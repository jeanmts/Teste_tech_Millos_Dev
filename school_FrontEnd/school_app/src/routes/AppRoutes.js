import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from '../components/Login/Login';
import AdminHome from '../components/Admin/Home';
import AdminTrainingHome from '../components/Admin/Modules/Training/HomeTraining';
import AdminTrainingInsert from '../components/Admin/Modules/Training/InsertTraining/HomeTrainingInsert';
import AdmingGradeHome from '../components/Admin/Modules/Grade/HomeGrade';
import AdmingGradeInsert from '../components/Admin/Modules/Grade/InsertGrade/HomeGradeInsert';

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Login />} />
    <Route path="/admin/" element={<AdminHome />} />
    <Route path="/admin/modules/training/" element={<AdminTrainingHome />} />
    <Route path="/admin/modules/training/insert/" element={<AdminTrainingInsert />} />
    <Route path="/admin/modules/turma/" element={<AdmingGradeHome />} />
    <Route path="/admin/modules/turma/insert" element={<AdmingGradeInsert />} />
  </Routes>
);

export default AppRoutes;