   export const getErrMsg = (e: unknown): string | undefined => {
        if (typeof e === "string") return e;
        if (e && typeof e === "object") {
          const maybe = e as { response?: { data?: { message?: string } }; data?: { message?: string } };
          return maybe.response?.data?.message ?? maybe.data?.message;
        }
        return undefined;
      };