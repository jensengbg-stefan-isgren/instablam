export const registerServiceWorker = () => {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("/sw.js")
      .then(() => {
        console.log("serviceworker has been registered...");
      })
      .catch((error) => {
        console.log("Can´t register the serviceWorker...", error);
      });
  }
};
