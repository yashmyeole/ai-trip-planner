"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";

const DemoCredentials = () => {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const email = "admin@gmail.com";
  const password = "admin123yash";

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div className="mt-8 p-4 bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200 rounded-xl shadow-sm">
      <div className="flex items-center gap-2 mb-3">
        <span className="inline-block w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
        <span className="text-xs font-bold text-amber-900 uppercase tracking-wider">
          Demo Credentials
        </span>
      </div>

      <div className="space-y-3">
        {/* Email */}
        <div className="bg-white rounded-lg p-3 border border-amber-100">
          <p className="text-xs text-gray-500 font-medium mb-1">Email</p>
          <div className="flex items-center justify-between gap-2">
            <code className="text-sm font-semibold text-slate-900 break-all">
              {email}
            </code>
            <button
              onClick={() => copyToClipboard(email, "email")}
              className="flex-shrink-0 p-2 hover:bg-gray-100 rounded-md transition-colors"
              title="Copy email"
            >
              {copiedField === "email" ? (
                <Check className="w-4 h-4 text-green-500" />
              ) : (
                <Copy className="w-4 h-4 text-gray-500" />
              )}
            </button>
          </div>
        </div>

        {/* Password */}
        <div className="bg-white rounded-lg p-3 border border-amber-100">
          <p className="text-xs text-gray-500 font-medium mb-1">Password</p>
          <div className="flex items-center justify-between gap-2">
            <code className="text-sm font-semibold text-slate-900 break-all">
              {password}
            </code>
            <button
              onClick={() => copyToClipboard(password, "password")}
              className="flex-shrink-0 p-2 hover:bg-gray-100 rounded-md transition-colors"
              title="Copy password"
            >
              {copiedField === "password" ? (
                <Check className="w-4 h-4 text-green-500" />
              ) : (
                <Copy className="w-4 h-4 text-gray-500" />
              )}
            </button>
          </div>
        </div>
      </div>

      <p className="text-xs text-amber-800 mt-3">
        💡 Try the app with these credentials to see the full experience
      </p>
    </div>
  );
};

export default DemoCredentials;
