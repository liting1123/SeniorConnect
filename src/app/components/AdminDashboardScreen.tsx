import CaregiverDashboardScreen from './CaregiverDashboardScreen';

export default function AdminDashboardScreen({
  onChangeLanguage,
  onLogout,
}: {
  onChangeLanguage: () => void;
  onLogout: () => void;
}) {
  return (
    <CaregiverDashboardScreen
      alertsLabel="History"
      dashboardLabel="Seniors"
      emptyMessage="No seniors found in ServiceNow."
      loadMode="admin"
      onBack={() => {}}
      onChangeLanguage={onChangeLanguage}
      onLogout={onLogout}
    />
  );
}
