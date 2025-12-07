"use client"

import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { View } from './types';
import { AcademicDashboard } from './views/AcademicDashboard';
import { StudentManager } from './views/StudentManager';
import { StaffManager } from './views/StaffManager';
import { ClassManager } from './views/ClassManager';
import { Gradebook } from './views/GradeBook';

export default function App() {
  const [currentView, setCurrentView] = useState<View>(View.DASHBOARD);

  const renderView = () => {
    switch (currentView) {
      case View.DASHBOARD:
        return <AcademicDashboard onNavigate={setCurrentView} />;
      case View.STUDENTS:
        return <StudentManager />;
      case View.STAFF:
        return <StaffManager />;
      case View.CLASSES:
        return <ClassManager />;
      case View.GRADES:
        return <Gradebook />;
      default:
        return <AcademicDashboard onNavigate={setCurrentView} />;
    }
  };

  return (
    <Layout view={currentView} onNavigate={setCurrentView}>
      {renderView()}
    </Layout>
  );
}