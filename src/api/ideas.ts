import type { Idea } from "@/types";
import api from "@/lib/axios";

// Fetch all ideas
export const fetchIdeas = async (): Promise<Idea[]> => {
  const res = await api.get("/ideas");
  return res.data;
};

// Fetch a single idea by ID
export const fetchIdea = async (ideaId: string): Promise<Idea> => {
  const res = await api.get(`/ideas/${ideaId}`);
  return res.data;
};

// Create new idea
export const createIdea = async (newIdea: {
  title: string;
  summary: string;
  description: string;
  tags: string[];
}): Promise<Idea> => {
  const res = await api.post("/ideas", {
    ...newIdea,
    createdAt: new Date().toISOString(),
  });

  return res.data;
};

// Delete an idea by its ID
export const deleteIdea = async (ideaId: string): Promise<void> => {
  await api.delete(`/ideas/${ideaId}`);
};

// Update an existing idea
export const updateIdea = async (
  ideaId: string,
  updatedData: {
    title: string;
    summary: string;
    description: string;
    tags: string[];
  },
): Promise<Idea> => {
  const res = await api.put(`/ideas/${ideaId}`, updatedData);
  return res.data;
};
