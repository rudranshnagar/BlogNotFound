"use client";
import React, { useState, useEffect } from "react";
import { request } from "graphql-request";
import { useSession } from "next-auth/react";
import BlogPostCard from "../_components/BlogPostCard";
import queries from "../../../queries";
import { validate } from "uuid";

const graphqlEndpoint = "http://localhost:4000/";

const BlogPost = ({ params }) => {
  const { id } = params;
  const { data: session } = useSession();
  const [blogData, setBlogData] = useState(null);
  const [authorData, setAuthorData] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!validate(id.trim())) {
          setError("400: BAD INPUT");
          setLoading(false);
          return;
        }

        const blogRes = await request(graphqlEndpoint, queries.GET_BLOG, {
          blogId: id.trim(),
        });

        if (!blogRes || !blogRes.getBlog) {
          setError("404: No data exist for this route");
          setLoading(false);
          return;
        }

        setBlogData(blogRes.getBlog);

        if (session && blogRes.getBlog) {
          const userId = blogRes.getBlog.userId;
          const [authorRes, userRes] = await Promise.all([
            request(graphqlEndpoint, queries.GET_USER, { userId }),
            request(graphqlEndpoint, queries.GET_USER, {
              userId: session.user._id,
            }),
          ]);
          setAuthorData(authorRes?.getUser || null);
          setUserData(userRes?.getUser || null);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(`404: ${error.response.errors[0].message}`);
        setLoading(false);
      }
    };

    fetchData();
  }, [id, session]);

  if (loading)
    return (
      <p className="text-center mt-10 text-lg text-gray-600">Loading...</p>
    );
  if (error)
    return (
      <h1 className="text-center mt-10 text-2xl text-pink-600 font-bold">
        {error}
      </h1>
    );

  if (!blogData || !authorData || !userData) return null;

  return (
    <div>
      <BlogPostCard
        blogData={blogData}
        authorData={authorData}
        userData={userData}
      />
    </div>
  );
};

export default BlogPost;
