// app/admin/applications/page.tsx
"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";

type Application = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  level: string;
  message: string;
  created_at: string;
  status: string;
};

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const supabase = createClient();
  const [loading, setLoading] = useState(false);

  // Fetch applications
  useEffect(() => {
    const fetchApps = async () => {
      const { data, error } = await supabase
        .from("applications")
        .select("*")
        .order("created_at", { ascending: false });
      if (!error) setApplications(data || []);
    };
    fetchApps();
  }, []);

  const handleApprove = async (id: string) => {
    setLoading(true);
    const { error } = await supabase
      .from("applications")
      .update({ status: "approved" })
      .eq("id", id);
    if (!error) {
      setApplications((prev) =>
        prev.map((a) => (a.id === id ? { ...a, status: "approved" } : a))
      );
    }
    setLoading(false);
  };

  const handleReject = async (id: string) => {
    setLoading(true);
    const { error } = await supabase
      .from("applications")
      .update({ status: "rejected" })
      .eq("id", id);
    if (!error) {
      setApplications((prev) =>
        prev.map((a) => (a.id === id ? { ...a, status: "rejected" } : a))
      );
    }
    setLoading(false);
  };

  return (
    <>
    <div className="container-fluid gap-4 flex flex-col items-center">
      <h2 >Student Applications</h2>

      {applications.length === 0 ? (
        <p className="text-gray-500">No applications yet.</p>
      ) : (
        <>
          {applications.map((app) => (
            <div
              key={app.id}
              className="border rounded-2xl p-4 shadow-sm flex flex-col justify-between items-start w-full max-w-lg"
            >
              <div className="w-full">
                <div className="flex flex-row justify-between">
                  <div className="flex flex-col">
                    <h4 className="font-semibold mt-0! mb-0!">
                      {app.first_name} {app.last_name}
                    </h4>
                    <p className="text-sm text-gray-600">{app.email}</p>
                  </div>
                  <p className="text-sm text-gray-800">Level {app.level}</p>
                </div>
                <div className="h-4" />
                <div className="flex flex-col gap-2">
                  <div className="bg-gray-100 p-2 rounded text-sm text-gray-800 whitespace-pre-wrap">
                    {app.message ? <p>"{app.message}"</p> : <p>No message</p>}
                  </div>

                  <div className="flex flex-row gap-12 justify-between">
                    <p className="text-sm text-gray-400">
                      {new Date(app.created_at).toLocaleString()}
                    </p>
                    <p className="text-sm">
                      Status:{" "}
                      <span
                        className={`font-medium ${
                          app.status === "approved"
                            ? "text-green-600"
                            : app.status === "rejected"
                            ? "text-red-600"
                            : "text-gray-600"
                        }`}
                      >
                        {app.status}
                      </span>
                    </p>
                  </div>
                  {app.status === "pending" && (
                    <div className="flex flex-row gap-2 mt-2">
                      <Button
                        onClick={() => handleApprove(app.id)}
                        disabled={loading}
                        variant="default"
                      >
                        Approve
                      </Button>
                      <Button
                        onClick={() => handleReject(app.id)}
                        disabled={loading}
                        variant="destructive"
                      >
                        Reject
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </>
      )}
      </div>
    </>
  );
}
