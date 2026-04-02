import { ErrorBoundary } from "react-error-boundary";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useParams, Link } from "react-router-dom";
import { Button, Avatar, Card, CardBody, Chip, Progress } from "@heroui/react";

import { profileQueryOptions } from "@/entities/profile/profile.api";
import { pathKeys } from "@/shared/router";

export function WatchProfile() {
  return (
    <ErrorBoundary fallback={"Something went wrong..."}>
      <BaseProfile />
    </ErrorBoundary>
  );
}

function BaseProfile() {
  const { name } = useParams<{ name: string }>();
  const { data: profile } = useSuspenseQuery(profileQueryOptions(name!));
  const session = sessionStorage;

  const isOwner = session?.name === profile.name;

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 space-y-8">
      <section className="flex flex-col md:flex-row items-center gap-6 p-6 bg-content1 rounded-2xl shadow-sm border border-divider">
        <Avatar
          className="w-32 h-32 text-4xl"
          name={profile.name[0]}
          src={profile.avatar ?? undefined}
        />

        <div className="flex-1 text-center md:text-left space-y-2">
          <div className="flex items-center justify-center md:justify-start gap-3">
            <h1 className="text-3xl font-bold">{profile.name}</h1>
            <Chip
              color={profile.role === "admin" ? "danger" : "primary"}
              size="sm"
              variant="flat"
            >
              {profile.role}
            </Chip>
          </div>
          <p className="text-default-500">{profile.email}</p>
          <p className="text-tiny text-default-400">
            In the system since{" "}
            {new Date(profile.createdAt).toLocaleDateString()}
          </p>
        </div>

        {isOwner && (
          <Button
            as={Link}
            color="primary"
            radius="full"
            to={pathKeys.profile.root}
            variant="ghost"
          >
            Edit profile
          </Button>
        )}
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold px-2">History of passing tests</h2>

        {profile.results.length > 0 ? (
          <div className="grid gap-3">
            {profile.results.map((result) => (
              <Link key={result._id} to={`/test/${result.testId.slug}`}>
                <Card key={result._id} isHoverable shadow="sm">
                  <CardBody className="flex flex-row items-center justify-between p-4">
                    <div className="space-y-1">
                      <p className="font-semibold text-lg">
                        {typeof result.testId === "object"
                          ? result.testId.title
                          : "Completed test"}
                      </p>
                      <p className="text-tiny text-default-400">
                        {new Date(result.completedAt).toLocaleString()}
                      </p>
                    </div>

                    <div className="text-right w-[10%]">
                      <span>{result.percent}%</span>
                      <Progress
                        className={`text-2xl font-black ${getScoreColor(result.percent)}`}
                        value={result.percent}
                      />
                      <p className="text-tiny text-default-500">
                        {result.score} / {result.maxScore} points
                      </p>
                    </div>
                  </CardBody>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <Card className="p-10 text-center bg-default-50">
            <p className="text-default-400 italic">
              The user has not passed any tests yet.
            </p>
          </Card>
        )}
      </section>

      {/* <section className="space-y-4">
        <h2 className="text-2xl font-bold px-2">History of creating tests</h2>

        {profile.results.length > 0 ? (
          <div className="grid gap-3">
            {profile.results.map((result) => (
              <Link key={result._id} to={`${result.testId.slug}`}>
                <Card key={result._id} isHoverable shadow="sm">
                  <CardBody className="flex flex-row items-center justify-between p-4">
                    <div className="space-y-1">
                      <p className="font-semibold text-lg">
                        {typeof result.testId === "object"
                          ? result.testId.title
                          : "Completed test"}
                      </p>
                      <p className="text-tiny text-default-400">
                        {new Date(result.completedAt).toLocaleString()}
                      </p>
                    </div>

                    <div className="text-right w-[10%]">
                      <span>{result.percent}%</span>
                      <Progress
                        className={`text-2xl font-black ${getScoreColor(result.percent)}`}
                        value={result.percent}
                      />
                      <p className="text-tiny text-default-500">
                        {result.score} / {result.maxScore} points
                      </p>
                    </div>
                  </CardBody>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <Card className="p-10 text-center bg-default-50">
            <p className="text-default-400 italic">
              The user has not created any tests yet.
            </p>
          </Card>
        )}
      </section> */}
    </div>
  );
}

function getScoreColor(percent: number) {
  if (percent >= 80) return "text-success";
  if (percent >= 50) return "text-warning";

  return "text-danger";
}
