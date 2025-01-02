import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import apiClient from "@/config/axios/client.instance";
import { client_url } from "@/config/urls";
import Errordata from "./errordata";
import { User } from "@/types/auth/user";
import DisableUser from "./disableuser";
import EnableUser from "./enableuser";
import Loader from "./loader";

interface UserResponse {
  message: string;
  data: User[];
}

export default function UserResponsiveTable() {
  const {
    isLoading: isLoading,
    data: tableData,
    isError,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data } = await apiClient.get(client_url.users);
      return data as UserResponse;
    },
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  if (isError) {
    return <Errordata />;
  }

  return !isLoading ? (
    <div className="container mx-auto py-10">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">SN</TableHead>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>User Name</TableHead>
              <TableHead>User email</TableHead>
              <TableHead>User Role</TableHead>
              <TableHead>User Status</TableHead>
              <TableHead>Verified</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tableData &&
              tableData?.data?.map((item, idx) => (
                <TableRow key={item._id}>
                  <TableCell className="font-medium">{idx + 1}</TableCell>
                  <TableCell className="font-medium">{item._id}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.email}</TableCell>
                  <TableCell>{item.role}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                        !item.is_disabled
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {item.is_disabled ? "Disabled" : "Active"}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                        !item.is_verified
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {item.is_verified ? "Verified" : "Not Verified"}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    {item.role !== "ADMIN" ? (
                      item.is_disabled ? (
                        <EnableUser id={item._id} />
                      ) : (
                        <DisableUser id={item._id} />
                      )
                    ) : (
                      <span>No Action</span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </div>
  ) : (
    <Loader />
  );
}
