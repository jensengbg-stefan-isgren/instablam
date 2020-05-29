import Home from "@/views/Home";
import CapturePhoto from "@/views/CapturePhoto";
import Admin from "@/views/Admin";
export default [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/capturePhoto",
    name: "CapturePhoto",
    component: CapturePhoto,
  },
  {
    path: "/Admin",
    name: "Admin",
    component: Admin,
  },
];
