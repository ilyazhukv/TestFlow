import { useState } from "react";
import { useSuspenseQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Card, CardBody, Chip, Avatar, Tab, Tabs, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Input, Pagination, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@heroui/react";
import { TrashBin, Person, FileText, Layers, Plus } from "@gravity-ui/icons";

import { adminStatsQueryOptions, adminUsersQueryOptions, adminTestsQueryOptions } from "@/entities/admin/admin.api";
import { api } from "@/shared/api/api.instance";

export default function AdminPage() {
  const [selectedTab, setSelectedTab] = useState("dashboard");

  return (
    <div className="animate-slide-up max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 bg-danger rounded-xl flex items-center justify-center">
          <Person fill="currentColor" className="text-white w-5 h-5" />
        </div>
        <div>
          <h1 className="text-4xl font-black text-foreground">Admin Panel</h1>
          <p className="text-default-500">Manage your platform</p>
        </div>
      </div>

      <Tabs
        aria-label="Admin tabs"
        className="mb-8"
        selectedKey={selectedTab}
        size="lg"
        onSelectionChange={(key) => setSelectedTab(key as string)}
      >
        <Tab key="dashboard" title="Dashboard" />
        <Tab key="users" title="Users" />
        <Tab key="tests" title="Tests" />
        <Tab key="categories" title="Categories" />
      </Tabs>

      {selectedTab === "dashboard" && <DashboardTab />}
      {selectedTab === "users" && <UsersTab />}
      {selectedTab === "tests" && <TestsTab />}
      {selectedTab === "categories" && <CategoriesTab />}
    </div>
  );
}

function DashboardTab() {
  const { data } = useSuspenseQuery(adminStatsQueryOptions);

  const statCards = [
    { icon: Person, label: "Users", value: data.stats.usersCount, color: "primary", gradient: "from-blue-500 to-cyan-500" },
    { icon: FileText, label: "Tests", value: data.stats.testsCount, color: "secondary", gradient: "from-purple-500 to-pink-500" },
    { icon: Layers, label: "Categories", value: data.stats.categoriesCount, color: "warning", gradient: "from-yellow-500 to-orange-500" },
    { icon: FileText, label: "Results", value: data.stats.resultsCount, color: "success", gradient: "from-emerald-500 to-teal-500" },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {statCards.map((stat, i) => (
            <Card key={i} className="border-none shadow-lg rounded-2xl">
            <CardBody className="p-6">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center mb-3`}>
                <stat.icon fill="currentColor" className="text-white w-5 h-5" />
              </div>
              <p className="text-3xl font-black">{stat.value}</p>
              <p className="text-sm text-default-500">{stat.label}</p>
            </CardBody>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="rounded-2xl" shadow="sm">
          <CardBody className="p-6">
            <h3 className="font-bold text-lg mb-4">Recent Tests</h3>
            <div className="space-y-3">
              {data.recentTests.map((test: any) => (
                <div key={test._id} className="flex items-center gap-3 p-3 bg-default-50 rounded-xl">
                  <div className="w-8 h-8 rounded-lg kahoot-gradient flex items-center justify-center">
                    <FileText fill="currentColor" className="text-white w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm truncate">{test.title}</p>
                    <p className="text-xs text-default-400">{test.author?.name}</p>
                  </div>
                  <Chip size="sm" variant="flat">{test.isPublic ? "Public" : "Private"}</Chip>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        <Card className="rounded-2xl" shadow="sm">
          <CardBody className="p-6">
            <h3 className="font-bold text-lg mb-4">Recent Users</h3>
            <div className="space-y-3">
              {data.recentUsers.map((user: any) => (
                <div key={user.id} className="flex items-center gap-3 p-3 bg-default-50 rounded-xl">
                  <Avatar className="w-8 h-8 text-xs" name={user.name[0]} size="sm" />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm truncate">{user.name}</p>
                    <p className="text-xs text-default-400">{user.email}</p>
                  </div>
                  <Chip color={user.role === "admin" ? "danger" : "primary"} size="sm" variant="flat">{user.role}</Chip>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

function UsersTab() {
  const [page, setPage] = useState(1);
  const [editUser, setEditUser] = useState<any>(null);
  const queryClient = useQueryClient();
  const { data } = useSuspenseQuery(adminUsersQueryOptions(page));

  const deleteMutation = useMutation({
    mutationFn: async (userId: string) => {
      await api.delete(`/admin/users/${userId}`);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin", "users"] }),
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, role, status }: { id: string; role?: string; status?: string }) => {
      await api.put(`/admin/users/${id}`, { role, status });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "users"] });
      setEditUser(null);
    },
  });

  return (
    <div className="space-y-4">
      <Card className="rounded-2xl" shadow="sm">
        <CardBody className="p-0">
          <Table aria-label="Users table" removeWrapper>
            <TableHeader>
              <TableColumn>USER</TableColumn>
              <TableColumn>EMAIL</TableColumn>
              <TableColumn>ROLE</TableColumn>
              <TableColumn>STATUS</TableColumn>
              <TableColumn>ACTIONS</TableColumn>
            </TableHeader>
            <TableBody>
              {data.users.map((user: any) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="w-8 h-8 text-xs" name={user.name[0]} size="sm" />
                      <span className="font-semibold">{user.name}</span>
                    </div>
                  </TableCell>
                  <TableCell><span className="text-default-500">{user.email}</span></TableCell>
                  <TableCell>
                    <Chip color={user.role === "admin" ? "danger" : "primary"} size="sm" variant="flat">
                      {user.role}
                    </Chip>
                  </TableCell>
                  <TableCell>
                    <Chip color={user.status === "active" ? "success" : "warning"} size="sm" variant="flat">
                      {user.status}
                    </Chip>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" variant="flat" onPress={() => setEditUser(user)}>
                        Edit
                      </Button>
                      <Button
                        isIconOnly
                        color="danger"
                        isLoading={deleteMutation.isPending}
                        size="sm"
                        variant="light"
                        onPress={() => { if (confirm("Delete this user?")) deleteMutation.mutate(user.id); }}
                      >
                        <TrashBin className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardBody>
      </Card>

      {data.pages > 1 && (
        <div className="flex justify-center">
          <Pagination color="primary" page={page} total={data.pages} onChange={setPage} />
        </div>
      )}

      <Modal isOpen={!!editUser} onClose={() => setEditUser(null)}>
        <ModalContent>
          <ModalHeader>Edit User</ModalHeader>
          <ModalBody className="flex flex-col gap-4">
            <select
              className="w-full p-3 rounded-xl border border-default-200 bg-default-50"
              defaultValue={editUser?.role}
              onChange={(e) => setEditUser({ ...editUser, role: e.target.value })}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
            <select
              className="w-full p-3 rounded-xl border border-default-200 bg-default-50"
              defaultValue={editUser?.status}
              onChange={(e) => setEditUser({ ...editUser, status: e.target.value })}
            >
              <option value="active">Active</option>
              <option value="stopped">Stopped</option>
            </select>
          </ModalBody>
          <ModalFooter>
            <Button variant="flat" onPress={() => setEditUser(null)}>Cancel</Button>
            <Button
              color="primary"
              onPress={() => {
                if (editUser) {
                  updateMutation.mutate({ id: editUser.id, role: editUser.role, status: editUser.status });
                }
              }}
            >
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}

function TestsTab() {
  const [page, setPage] = useState(1);
  const { data } = useSuspenseQuery(adminTestsQueryOptions(page));

  return (
    <div className="space-y-4">
      <Card className="rounded-2xl" shadow="sm">
        <CardBody className="p-0">
          <Table aria-label="Tests table" removeWrapper>
            <TableHeader>
              <TableColumn>TITLE</TableColumn>
              <TableColumn>AUTHOR</TableColumn>
              <TableColumn>CATEGORY</TableColumn>
              <TableColumn>VISIBILITY</TableColumn>
              <TableColumn>CREATED</TableColumn>
            </TableHeader>
            <TableBody>
              {data.tests.map((test: any) => (
                <TableRow key={test._id}>
                  <TableCell><span className="font-semibold">{test.title}</span></TableCell>
                  <TableCell><span className="text-default-500">{test.author?.name}</span></TableCell>
                  <TableCell>
                    {test.category && <Chip size="sm" variant="flat">{test.category.title}</Chip>}
                  </TableCell>
                  <TableCell>
                    <Chip color={test.isPublic ? "success" : "default"} size="sm" variant="flat">
                      {test.isPublic ? "Public" : "Private"}
                    </Chip>
                  </TableCell>
                  <TableCell><span className="text-default-500 text-sm">{new Date(test.createdAt).toLocaleDateString()}</span></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardBody>
      </Card>

      {data.pages > 1 && (
        <div className="flex justify-center">
          <Pagination color="primary" page={page} total={data.pages} onChange={setPage} />
        </div>
      )}
    </div>
  );
}

function CategoriesTab() {
  const [newCategory, setNewCategory] = useState("");
  const queryClient = useQueryClient();

  const { data: categories } = useSuspenseQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data } = await api.get("/category");
      return data.categories;
    },
  });

  const createMutation = useMutation({
    mutationFn: async (title: string) => {
      await api.post("/admin/categories", { title });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      setNewCategory("");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/admin/categories/${id}`);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["categories"] }),
  });

  return (
    <div className="space-y-4">
      <Card className="rounded-2xl" shadow="sm">
        <CardBody className="p-4">
          <div className="flex gap-3">
            <Input
              placeholder="New category name"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
            />
            <Button
              color="primary"
              endContent={<Plus className="w-4 h-4" />}
              isLoading={createMutation.isPending}
              onPress={() => newCategory && createMutation.mutate(newCategory)}
            >
              Add
            </Button>
          </div>
        </CardBody>
      </Card>

      <Card className="rounded-2xl" shadow="sm">
        <CardBody className="p-0">
          <Table aria-label="Categories table" removeWrapper>
            <TableHeader>
              <TableColumn>NAME</TableColumn>
              <TableColumn>ACTIONS</TableColumn>
            </TableHeader>
            <TableBody>
              {(categories || []).map((cat: any) => (
                <TableRow key={cat._id}>
                  <TableCell><span className="font-semibold">{cat.title}</span></TableCell>
                  <TableCell>
                    <Button
                      isIconOnly
                      color="danger"
                      isLoading={deleteMutation.isPending}
                      size="sm"
                      variant="light"
                      onPress={() => deleteMutation.mutate(cat._id)}
                    >
                      <TrashBin className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardBody>
      </Card>
    </div>
  );
}