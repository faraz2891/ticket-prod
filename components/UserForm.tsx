"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Button } from "./ui/button";
import axios from "axios";
import { User } from "@prisma/client";
import { userSchema } from "@/validationSchemas/users";

type UserFormData = z.infer<typeof userSchema>;

interface Props {
  user?: User;
}

const UserForm = ({ user }: Props) => {
  const router = useRouter();
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const form = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
  });

  const onSubmit = async (values: z.infer<typeof userSchema>) => {
    try {
      setIsSubmitted(true);
      if (user) {
        await axios.patch(`/api/users/${user.id}`, values);
      } else {
        await axios.post("/api/users", values);
      }
      setError("");
      router.push("/users");
      router.refresh();
    } catch (err) {
      setError("Unknown error occured.");
      setIsSubmitted(false);
    }
  };

  const handleCancelUser = () => {
    setError("");
    router.push("/users");
    // if (user) {
    //   router.push(`/users/${user.id}`);
    // } else {
    // }
  };

  return (
    <div className="rounded-md border w-full p-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            defaultValue={user?.name}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Users Full Name..." {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            defaultValue={user?.username}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Enter a Username..." {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            defaultValue=""
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter Password..."
                    required={user ? false : true}
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <div className="flex w-full space-x-4">
            <FormField
              control={form.control}
              name="role"
              defaultValue={user?.role}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value || user?.role}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          placeholder="Status..."
                          defaultValue={user?.role}
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="USER">User</SelectItem>
                      <SelectItem value="TECH">Tech</SelectItem>
                      <SelectItem value="ADMIN">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </div>
          <div className="space-x-4">
            <Button type="submit" disabled={isSubmitted}>
              {user ? "Update User" : "Create User"}
            </Button>
            <Button
              type="button"
              onClick={handleCancelUser}
              disabled={isSubmitted}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Form>
      {error && <p className="text-destructive">{error}</p>}
    </div>
  );
};

export default UserForm;
