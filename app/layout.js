import "./globals.css";

export const metadata = {
  title: "CubeLogs | Enterprise Log Auditing & Attendance Tracking SaaS",
  description: "Maximize organizational transparency with CubeLogs. Real-time employee attendance tracking, biometric clock-in verification, structured leave approvals, and fully automated audit logging.",
  keywords: "attendance tracker, clock-in, audit logs, employee management, timesheets, HR SaaS, leave management",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
