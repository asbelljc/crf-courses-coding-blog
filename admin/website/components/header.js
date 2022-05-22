import logout from '../api/admin-user/logout';

export default function Header() {
  const requestLogout = () => {
    logout(function () {
      window.location.href = '/login';
    });
  };

  return (
    <div className="header-wrapper">
      <div className="header-logo">
        <a href="/">
          <span>Admin Dashboard</span>
        </a>
      </div>
      <div className="header-log-out" onClick={requestLogout}>
        <span>Logout</span>
      </div>
    </div>
  );
}
