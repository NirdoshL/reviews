import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Copy } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import apiClient from "@/config/axios/client.instance";
import { client_url } from "@/config/urls";

import DeleteAction from "./deletereviews";
import { toast } from "sonner";
import ReviewDialog from "./singlereview";
import Errordata from "./errordata";
import CreateActions from "./createreview";
import Loader from "./loader";

interface Review {
  _id: string;
  author_name: string;
  rating: number;
  text: string;
  relative_time_description: string;
}

interface ReviewData {
  _id: string;
  sitename: string;
  data: Review[];
}

interface ReviewResponse {
  message: string;
  data: ReviewData[];
}

export default function ResponsiveTable() {
  const {
    isLoading: isLoading,
    data: tableData,
    isError,
  } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const { data } = await apiClient.get(client_url.reviews);
      return data as ReviewResponse;
    },
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  const handleCopyLink = (id: string) => {
    navigator.clipboard.writeText(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/reviews/${id}`
    );
    toast.success("Link copied", {
      description: "Review link copied to clipboard.",
    });
  };

  if (isError) {
    return <Errordata />;
  }

  return !isLoading ? (
    <div className="container mx-auto py-10">
      <CreateActions />
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">SN</TableHead>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>Restaurant Name</TableHead>
              <TableHead>Total Reviews</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tableData &&
              tableData?.data?.map((item, idx) => (
                <TableRow key={item._id}>
                  <TableCell className="font-medium">{idx + 1}</TableCell>
                  <TableCell className="font-medium">{item._id}</TableCell>
                  <TableCell>{item.sitename}</TableCell>
                  <TableCell>{item.data.length}</TableCell>
                  <TableCell className="text-right">
                    <ReviewDialog id={item._id} />
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleCopyLink(item._id)}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                      </Tooltip>
                    </TooltipProvider>
                    <DeleteAction id={item._id} />
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
