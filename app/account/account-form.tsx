"use client";
import { useCallback, useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { type User } from "@supabase/supabase-js";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// ...

export default function AccountForm({ user }: { user: User | null }) {
  const supabase = createClient();
  const [loading, setLoading] = useState(true);
  const [fullname, setFullname] = useState<string | null>(null);
  const [level, setLevel] = useState<string | null>(null);
const [goals, setGoals] = useState<string | null>(null);
const [learning_style, setLearningStyle] = useState<string | null>(null);


  // const [username, setUsername] = useState<string | null>(null);
  // const [avatar_url, setAvatarUrl] = useState<string | null>(null);

  const getProfile = useCallback(async () => {
    try {
      setLoading(true);

      const { data, error, status } = await supabase
        .from("profiles")
        .select(
          `full_name, 
          learning_profiles (
            level,
            goals,
            learning_style
          )`
        )
        // .select(`full_name, username, avatar_url`)
        .eq("id", user?.id)
        .single();

      if (error && status !== 406) {
        console.log(error);
        throw error;
      }

      if (data) {
        setFullname(data.full_name);
        // setUsername(data.username);
        // setAvatarUrl(data.avatar_url);
      }
    } catch (error) {
      alert("Error loading user data!");
    } finally {
      setLoading(false);
    }
  }, [user, supabase]);

  useEffect(() => {
    getProfile();
  }, [user, getProfile]);

  async function updateProfile({
    fullname,
    level,
    goals,
    learning_style,
  }: {
    fullname: string | null;
    level: string | null;
    goals: string | null;
    learning_style: string | null;
  }) {
    try {
      setLoading(true);

      // Update profiles
      const { error: profileError } = await supabase.from("profiles").upsert({
        id: user?.id as string,
        full_name: fullname,
        // username,
        // avatar_url,
        updated_at: new Date().toISOString(),
      });
      if (profileError) throw profileError;

      // Update learning_profiles
      const { error: learningError } = await supabase
        .from("learning_profiles")
        .upsert({
          profile_id: user?.id as string,
          level,
          goals,
          learning_style,
          updated_at: new Date().toISOString(),
        });
      if (learningError) throw learningError;

      alert("Profile updated!");
    } catch (error) {
      alert("Error updating the data!");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="form-widget flex flex-col">
      {/* ... */}

<div>
  Welcome back {fullname}
</div>
      <div>
        <label htmlFor="email">Email</label>
        <Input id="email" type="text" value={user?.email} disabled />
      </div>
      <div>
        <label htmlFor="fullName">Full Name</label>
        <Input
          id="fullName"
          type="text"
          value={fullname || ""}
          onChange={(e) => setFullname(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="level">Level</label>
        <Input id="level" type="text" value={level || ""} 
        onChange={(e) => setLevel(e.target.value)} />
      </div>

      <div>
        <Button onClick={() => updateProfile({ fullname, level, goals, learning_style })} disabled={loading}>
          {loading ? "Loading ..." : "Update"}
        </Button>
      </div>

      <div>
        <form action="/auth/signout" method="post">
          <Button type="submit">Sign out</Button>
        </form>
      </div>
    </div>
  );
}
