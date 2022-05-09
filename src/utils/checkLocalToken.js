export function checkLocalToken({
  setToken,
  setReload = () => {},
  reload = false,
}) {
  const localToken = localStorage.getItem("token");

  if (localToken.length > 0) {
    setToken(localToken);
    if (setReload) {
      setReload(!reload);
    }
    return;
  }
  console.log("No session stored!");
}
