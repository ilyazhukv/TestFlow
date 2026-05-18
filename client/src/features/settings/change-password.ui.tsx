import { useState } from "react";
import { Button, Input } from "@heroui/react";
import { useMutation } from "@tanstack/react-query";
import { api } from "@/shared/api/api.instance";

export function ChangePasswordForm() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const mutation = useMutation({
    mutationFn: async (data: { currentPassword: string; newPassword: string }) => {
      await api.put("/user/password", data);
    },
    onSuccess: () => {
      setSuccess("Password updated successfully!");
      setError("");
    },
    onError: (err: any) => {
      const errors = err?.response?.data?.errors;
      if (errors) {
        setError(Object.values(errors).flat().join(", "));
      } else {
        setError("Failed to update password");
      }
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    mutation.mutate({
      currentPassword: formData.get("currentPassword") as string,
      newPassword: formData.get("newPassword") as string,
    });
  };

  return (
    <div className="bg-background/60 backdrop-blur-xl rounded-3xl shadow-xl border border-default-200/50 p-6 md:p-8">
      <h2 className="text-2xl font-bold mb-6">Change Password</h2>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <Input
          isRequired
          label="Current Password"
          labelPlacement="outside"
          name="currentPassword"
          placeholder="Enter current password"
          type="password"
          variant="bordered"
        />

        <Input
          isRequired
          label="New Password"
          labelPlacement="outside"
          name="newPassword"
          placeholder="Enter new password"
          type="password"
          variant="bordered"
        />

        {error && <p className="text-danger text-small">{error}</p>}
        {success && <p className="text-success text-small">{success}</p>}

        <Button
          className="w-full font-bold"
          color="primary"
          isLoading={mutation.isPending}
          radius="full"
          size="lg"
          type="submit"
        >
          Update Password
        </Button>
      </form>
    </div>
  );
}