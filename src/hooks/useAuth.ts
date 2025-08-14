import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { isAuthAtom } from "@/atoms";
import supabase from "@/supabaseClient";

export const useAuth = () => {
  const [isAuth, setIsAuth] = useAtom(isAuthAtom);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setIsAuth(user !== null);
      setLoading(false);
    };

    checkAuth();
  }, [isAuth, loading]);

  return [isAuth, loading];
};
