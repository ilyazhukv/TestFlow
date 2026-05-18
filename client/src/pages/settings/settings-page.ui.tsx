import { Button } from "@heroui/react";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { api } from "@/shared/api/api.instance";
import { ChangePasswordForm } from "@/features/settings/change-password.ui";
import { TrashBin } from "@gravity-ui/icons";

export default function SettingsPage() {
  const [confirmDelete, setConfirmDelete] = useState(false);

  const deleteMutation = useMutation({
    mutationFn: async () => {
      await api.delete("/user");
    },
    onSuccess: () => {
      window.location.href = "/";
    },
    onError: () => {
      alert("Failed to delete account");
    },
  });

  return (
    <div className="animate-slide-up max-w-2xl mx-auto px-4 py-8 space-y-8">
      <h1 className="text-4xl font-black text-foreground">Settings</h1>

      <ChangePasswordForm />

      <div className="bg-danger-50 dark:bg-danger-900/20 rounded-3xl border border-danger-200 dark:border-danger-800 p-6 md:p-8">
        <h2 className="text-2xl font-bold text-danger mb-2">Danger Zone</h2>
        <p className="text-sm text-danger-600 dark:text-danger-400 mb-4">
          Once you delete your account, there is no going back. Please be certain.
        </p>

        {!confirmDelete ? (
          <Button
            className="font-bold"
            color="danger"
            startContent={<TrashBin fill="currentColor" className="w-4 h-4" />}
            variant="flat"
            onPress={() => setConfirmDelete(true)}
          >
            Delete Account
          </Button>
        ) : (
          <div className="flex gap-3">
            <Button
              className="font-bold"
              color="danger"
              isLoading={deleteMutation.isPending}
              onPress={() => deleteMutation.mutate()}
            >
              Yes, Delete My Account
            </Button>
            <Button
              variant="flat"
              onPress={() => setConfirmDelete(false)}
            >
              Cancel
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}