import { EditProfileForm } from "@/features/profile/edit-profile/edit-profile.ui";

export default function EditProfilePage() {
  return (
    <div className="animate-slide-up max-w-lg mx-auto px-4 py-8">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-black text-foreground mb-2">
          Edit Profile
        </h1>
        <p className="text-default-500">
          Update your avatar, name, or email
        </p>
      </div>

      <div className="bg-background/60 backdrop-blur-xl rounded-3xl shadow-xl border border-default-200/50 p-6 md:p-8">
        <EditProfileForm />
      </div>
    </div>
  );
}