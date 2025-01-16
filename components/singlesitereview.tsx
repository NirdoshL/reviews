"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Eye, Star } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { client_url } from "@/config/urls";
import apiClient from "@/config/axios/client.instance";
import Loader from "./loader";
import Link from "next/link";

interface ReviewData {
  _id: string;
  author_name: string;
  author_url: string;
  profile_photo_url: string;
  rating: number;
  relative_time_description: string;
  text: string;
}

interface SingleReviewData {
  _id: string;
  sitename: string;
  data: ReviewData[];
}

interface ReviewResponse {
  message: string;
  data: SingleReviewData;
}
const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${
            i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
          }`}
        />
      ))}
    </div>
  );
};
interface ViewActionProps {
  id: string;
}
export default function SingleReviewDialog({ id }: ViewActionProps) {
  const { isLoading: isLoading, data: singleReview } = useQuery({
    queryKey: ["single-site-reviews", id],
    queryFn: async () => {
      const { data } = await apiClient.get(client_url.sitesreview + "/" + id);
      return data as ReviewResponse;
    },
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
  if (isLoading) {
    return <Loader />;
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Eye className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="md:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Customer Reviews</DialogTitle>
        </DialogHeader>
        <div className="mt-4 space-y-4 max-h-[75vh] overflow-y-auto pr-4">
          {singleReview &&
            singleReview?.data?.data?.map((review) => (
              <Card key={review._id}>
                <CardContent className="pt-4">
                  <div className="flex items-start space-x-4">
                    <Avatar>
                      <AvatarImage
                        src={review.profile_photo_url}
                        alt={review.author_name}
                      />
                      <AvatarFallback>
                        {review.author_name.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">
                        {review.author_name}
                      </p>
                      <div className="flex items-center mt-1">
                        <StarRating rating={review.rating} />
                        <span className="ml-2 text-sm text-gray-500">
                          {review.relative_time_description ?? "none"}
                        </span>
                      </div>
                    </div>
                    <div>
                      {review.author_url ? (
                        <Button asChild className="bg-red-600 hover:bg-red-500">
                          <Link target="_blank" href={review.author_url}>
                            View
                          </Link>
                        </Button>
                      ) : null}
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-gray-700">{review.text}</p>
                </CardContent>
              </Card>
            ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
