import type { ProfileDto } from "@/shared/api/api.types";
import type { Profile } from "./profile.types";

export function transformProfileDtoToProfile(profileDto: ProfileDto): Profile {
  return {
    ...profileDto,
    _id: profileDto.id,
    results: profileDto.results || [],
    avatar: profileDto.avatar || null,
  };
}
