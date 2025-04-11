import axios from "axios";
import type { User } from "../types/user";

export async function getUsers(): Promise<User[]> {
  const response = await axios.get("http://localhost:3300/users");
  return response.data.result;
}

// TODO refacto this file
