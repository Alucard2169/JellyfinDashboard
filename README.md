# Jellyfin Dashboard

A dashboard that displays **computer stats, Jellyfin logs with filtering, known devices, and available libraries**. It includes authentication using **bcrypt and environment variables**.

## 🚀 Features
- **System Monitoring**: Display CPU, RAM, and storage usage.
- **Jellyfin Logs**: Filter and view logs.
- **Device Management**: Show known devices.
- **Media Libraries**: View available libraries.
- **Authentication**: Secure login/signup using **bcrypt** and **environment variables**.
- **JWT Authentication**: Tokens are stored in HTTP-only cookies.

---

## 🛠️ Setup & Installation
### **1. Clone the repository**
```sh
git clone https://github.com/Alucard2169/JellyfinDashboard.git
cd JellyfinDashboard
```

### **2. Install dependencies**
```sh
npm install  # or yarn install
```

### **3. Create an environment file**
In the project root, create a `.env.local` file:
```sh
IP_ADDRESS=your_server_ip
API_KEY=your_api_key
PORT=your_port
USERNAME=your_username
PASSWORD_HASH=your_bcrypt_hashed_password
```

> ⚠️ The password must be **hashed with bcrypt** before storing it in `.env.local`.

### **4. Run the development server**
```sh
npm run dev  # or yarn dev
```
The app will be available at `http://localhost:3000`

---

## 🔑 Authentication
### **Signup & Login Flow**
- Users enter their **username and password**.
- Passwords are **hashed using bcrypt**.
- A **JWT token** is issued upon successful login.
- The token is stored in an **HTTP-only cookie**.

### **Redirection Logic**
- If the user **visits `/`**, they are:
  - Sent to `/dashboard` if logged in.
  - Sent to `/auth` if not authenticated.

#### 📌 `app/page.tsx`
```tsx
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function Home() {
    const token = cookies().get("token")?.value;
    if (token) redirect("/dashboard");
    else redirect("/auth");
    return null;
}
```

---

## 🔄 Logout
To log out, simply clear the **token cookie** and redirect to `/auth`:
```tsx
const handleLogout = () => {
    document.cookie = "token=; path=/; max-age=0;";
    router.push("/auth");
};
```

---

## ⏳ Global Loading Page
A global loader is shown during API requests.

#### 📌 Example Loader Component (`components/LoadingPage.tsx`)
```tsx
export default function LoadingPage() {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
}
```

---


