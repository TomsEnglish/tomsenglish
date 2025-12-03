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

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || window.location.origin;

  async function handleAction(id: string, action: string) {
    setLoading(true);
    const endpoint = `${baseUrl}/admin/applications/${id}/action`;
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action }),
    });

    if (res.ok) {
      // Refresh the list or optimistically update state
    } else {
      console.error(await res.json());
    }
    setLoading(false);
  }

  // const handleAction = async (id: string, action: "accept-trial" | "reject") => {
  //   setLoading(true);
  //   const endpoint = `${baseUrl}/admin/applications/${action}`;
  //   const res = await fetch(endpoint, {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ id }),
  //   });

  //   if (res.ok) {
  //     alert(`Application ${action}ed and email sent.`);
  //     window.location.reload();
  //   } else {
  //     const { error } = await res.json();
  //     alert(`Error: ${error}`);
  //   }

  //   setLoading(false);
  // };

  return (
    <div className="container-fluid gap-4 flex flex-col items-center">
      <h2>Student Applications</h2>

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
                          app.status === "accepted"
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
                    <>
                      <Button
                        onClick={() =>
                          handleAction(app.id, "trial_accepted")
                        }
                        disabled={loading}
                      >
                        Accept for Trial
                      </Button>
                      <Button
                        onClick={() =>
                          handleAction(app.id, "trial_rejected")
                        }
                        disabled={loading}
                      >
                        Reject
                      </Button>
                    </>
                  )}

                  {app.status === "trial_accepted" && (
                    <>
                      <Button
                        onClick={() =>
                          handleAction(app.id, "student_accepted")
                        }
                        disabled={loading}
                      >
                        Accept as Student
                      </Button>
                      <Button
                        onClick={() =>
                          handleAction(app.id, "student_rejected")
                        }
                        disabled={loading}
                      >
                        Reject After Trial
                      </Button>
                    </>
                  )}

                  {app.status.startsWith("student") && (
                    <p>
                      {app.status === "student_accepted"
                        ? "✅ Full Student"
                        : "❌ Rejected After Trial"}
                    </p>
                  )}

                  {/* {app.status === "pending" && (
                    <div className="flex flex-row gap-2 mt-2">
                      <Button
                        onClick={() => handleAction(app.id, "accept-trial")}
                        className="bg-green-500 hover:bg-green-600"
                        disabled={loading}
                      >
                        Accept
                      </Button>

                      <Button
                        onClick={() => handleAction(app.id, "reject")}
                        className="bg-red-500 hover:bg-red-600"
                        disabled={loading}
                      >
                        Reject
                      </Button>
                    </div>
                  )} */}
                </div>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}
