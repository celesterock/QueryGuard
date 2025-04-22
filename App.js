import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import QueryGuardDashboard from './QueryGuardDashboard';

const pages = {
  'ip-details': ['192.168.0.1', '203.0.113.42', '10.0.0.2'],
  'recent-injections': ["' OR '1'='1", 'DROP TABLE users;', '-- Comment'],
  'common-injections': ["' OR '1'='1 (85%)", 'UNION SELECT (10%)', 'DROP TABLE (5%)'],
  'suspicious-accounts': ['admin_test', 'sql_h4ck3r', 'guest123'],
  'compromised-accounts': ['user_x', 'dev_root', 'janedoe'],
  'data-sources': ['Database A', 'Customer Table', 'Employee Records'],
};

function DetailPage({ title, items }) {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">{title}</h1>
      <ul className="list-disc ml-6 space-y-2">
        {items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
      <Link to="/" className="text-blue-500 underline mt-4 block">Back to Dashboard</Link>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<QueryGuardDashboard />} />
        {Object.entries(pages).map(([key, items]) => (
          <Route
            key={key}
            path={`/${key}`}
            element={<DetailPage title={key.replace(/-/g, ' ').toUpperCase()} items={items} />}
          />
        ))}
      </Routes>
    </Router>
  );
}
