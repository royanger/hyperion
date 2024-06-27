"use client";

import { createPost } from "@/actions";

export const CreatePostForm = () => {
  return (
    <form action={createPost}>
      <input name="title" type="text" />
      <input name="content" type="text" />
      <button type="submit">Create</button>
    </form>
  );
};
