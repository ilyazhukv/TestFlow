import { useState, useRef } from "react";
import { Button, Input, Avatar } from "@heroui/react";
import { useNavigate } from "react-router-dom";
import { Camera } from "@gravity-ui/icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/shared/api/api.instance";
import { sessionQueryOptions } from "@/entities/session/session.api";

export function EditProfileForm() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [avatar, setAvatar] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState("");

  const updateMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const { data } = await api.put("/user", formData);
      return data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: sessionQueryOptions.queryKey });
      navigate("/");
    },
    onError: (err: any) => {
      const errors = err?.response?.data?.errors;
      if (errors) {
        setError(Object.values(errors).flat().join(", "));
      } else {
        setError("Failed to update profile");
      }
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    if (avatar) formData.set("avatar", avatar);
    updateMutation.mutate(formData);
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatar(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <Avatar
            className="w-24 h-24 text-3xl ring-4 ring-default-200"
            name="?"
            src={preview || undefined}
          />
          <Button
            isIconOnly
            className="absolute bottom-0 right-0"
            color="primary"
            radius="full"
            size="sm"
            onPress={() => fileInputRef.current?.click()}
          >
            <Camera className="w-4 h-4" />
          </Button>
        </div>
        <input
          ref={fileInputRef}
          accept="image/*"
          className="hidden"
          type="file"
          onChange={handleAvatarChange}
        />
      </div>

      <Input
        isRequired
        label="Username"
        labelPlacement="outside"
        name="name"
        placeholder="Your username"
        variant="bordered"
      />

      <Input
        isRequired
        label="Email"
        labelPlacement="outside"
        name="email"
        placeholder="your@email.com"
        type="email"
        variant="bordered"
      />

      {error && <p className="text-danger text-small">{error}</p>}

      <Button
        className="w-full font-bold"
        color="primary"
        isLoading={updateMutation.isPending}
        radius="full"
        size="lg"
        type="submit"
      >
        Save Changes
      </Button>
    </form>
  );
}