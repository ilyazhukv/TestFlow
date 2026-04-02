import { ReactNode } from "react";

import { WatchProfile } from "@/features/profile/watch-profile/watch-profile";

export default function ProfilePage() {
  return (
    <ProfilePageWrapper>
      <WatchProfile />
    </ProfilePageWrapper>
  );
}

function ProfilePageWrapper(props: { children: ReactNode }) {
  const { children } = props;

  return (
    <div className="editor-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-10 offset-md-1 col-xs-12">{children}</div>
        </div>
      </div>
    </div>
  );
}
